import Automizer, { modify, ReplaceText, XmlElement } from "pptx-automizer";
import path from "path";
import { GenerateSyntheseProjetPptxParams, PptxSlide, PptxTemplateTag } from "./types";
import { mergeTextRunsInElement, replaceTagWithBulletList } from "./helpers";
import { AddTemplateSlide } from "./slides/types";
import { addPageDeGardeSlide } from "./slides/page-de-garde";
import { addFichesSolutionIntroSlide } from "./slides/fiches-solution-intro";
import { addFicheSolutionDetailSlides } from "./slides/fiche-solution-detail";
import { getFicheSolutionByIdsComplete } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

export const generateSyntheseProjetPptx = async ({
  projet,
  solutionIds = [],
  templateFileName = "template_synthese_projet.pptx",
}: GenerateSyntheseProjetPptxParams): Promise<Buffer> => {
  const templateDir = path.join(process.cwd(), "public", "templates");

  const automizer = new Automizer({
    templateDir,
    removeExistingSlides: true,
    verbosity: 0,
  });

  const pres = automizer.loadRoot(templateFileName).load(templateFileName, "template");

  const info = await pres.getInfo();
  const slides = info.slidesByTemplate("template");

  const fichesSolutions = solutionIds.length > 0 ? await getFicheSolutionByIdsComplete(solutionIds) : [];
  const fichesSolutionsMap = new Map(fichesSolutions.map((fs) => [fs.documentId, fs]));
  // Strapi returns the fiches in its own order: re-order them to follow the selection order.
  const orderedFichesSolutions = solutionIds
    .map((id) => fichesSolutionsMap.get(id))
    .filter((ficheSolution): ficheSolution is FicheSolution => Boolean(ficheSolution));
  const titresFichesSolutions = orderedFichesSolutions.map((ficheSolution) => ficheSolution.titre);

  const dateGenerationSynthese = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const replacements: ReplaceText[] = [
    {
      replace: PptxTemplateTag.NOM_PROJET,
      by: { text: projet.nom ?? "" },
    },
    {
      replace: PptxTemplateTag.COMMUNE_PROJET,
      by: { text: projet.collectivite?.nom ?? "" },
    },
    {
      replace: PptxTemplateTag.CODE_POSTAL_PROJET,
      by: { text: projet.collectivite?.code_postal ?? "" },
    },
    {
      replace: PptxTemplateTag.ADRESSE_PROJET,
      by: { text: projet.adresse ?? "" },
    },
    {
      replace: PptxTemplateTag.DATE_GENERATION_SYNTHESE,
      by: { text: dateGenerationSynthese },
    },
  ];

  // Shared by every slide module: applies the tags common to all slides (above) plus any
  // slide-specific ones, and duplicates the template slide into the output presentation.
  const addTemplateSlide: AddTemplateSlide = (slideInfo, slideReplacements = [], onSlideCreated) => {
    pres.addSlide("template", slideInfo.number, (slide) => {
      slideInfo.elements?.forEach((element) => {
        if (element.hasTextBody) {
          slide.modifyElement({ name: element.name, nameIdx: element.nameIdx }, [
            mergeTextRunsInElement,
            (el: XmlElement) =>
              replaceTagWithBulletList(el, PptxTemplateTag.TITRE_FICHES_SOLUTION, titresFichesSolutions),
            modify.replaceText([...replacements, ...slideReplacements]),
          ]);
        }
      });
      onSlideCreated?.(slide);
    });
  };

  const slidesNeedingFichesSolutions: number[] = [PptxSlide.FICHES_SOLUTION_INTRO, PptxSlide.FICHE_SOLUTION_DETAIL];

  for (const slideInfo of slides) {
    if (slidesNeedingFichesSolutions.includes(slideInfo.number) && orderedFichesSolutions.length === 0) {
      continue;
    }

    switch (slideInfo.number) {
      case PptxSlide.FICHE_SOLUTION_DETAIL:
        // The detail slide is a blueprint: it is duplicated once per selected fiche solution.
        await addFicheSolutionDetailSlides({
          pres,
          addTemplateSlide,
          slideInfo,
          fichesSolutions: orderedFichesSolutions,
        });
        break;
      case PptxSlide.FICHES_SOLUTION_INTRO:
        addFichesSolutionIntroSlide(addTemplateSlide, slideInfo);
        break;
      case PptxSlide.PAGE_DE_GARDE:
        addPageDeGardeSlide(addTemplateSlide, slideInfo);
        break;
      default:
        // Any other slide (credits, sources, ...) has no slide-specific logic yet.
        addTemplateSlide(slideInfo);
    }
  }

  const zip = await pres.getJSZip();
  const buffer = (await zip.generateAsync({ type: "nodebuffer" })) as Buffer;
  return buffer;
};
