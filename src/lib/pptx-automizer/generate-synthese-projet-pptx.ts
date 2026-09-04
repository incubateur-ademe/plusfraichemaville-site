import Automizer, { modify, ReplaceText, XmlElement } from "pptx-automizer";
import path from "path";
import { GenerateSyntheseProjetPptxParams, PptxSlide, PptxTemplateTag } from "./types";
import { mergeTextRunsInElement, replaceTagWithBulletList } from "./helpers";
import { AddTemplateSlide } from "./slides/types";
import { addPageDeGardeSlide } from "./slides/page-de-garde";
import { addFichesSolutionIntroSlide } from "./slides/fiches-solution-intro";
import { addFicheSolutionDetailSlide, loadCobeneficeIcons } from "./slides/fiche-solution-detail";
import { addFicheSolutionMateriauxSlides, loadMateriauxImages } from "./slides/fiche-solution-materiaux";
import { getFicheSolutionByIdsComplete } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

export const generateSyntheseProjetPptx = async ({
  projet,
  solutionIds = [],
  estimationId,
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
  const orderedFichesSolutions = solutionIds
    .map((id) => fichesSolutionsMap.get(id))
    .filter((ficheSolution): ficheSolution is FicheSolution => Boolean(ficheSolution));
  const titresFichesSolutions = orderedFichesSolutions.map((ficheSolution) => ficheSolution.titre);

  const estimation = estimationId ? projet.estimations.find((e) => e.id === estimationId) : undefined;
  const estimationFichesSolutions = estimation?.estimations_fiches_solutions ?? [];

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

  // The materiaux slide (4) is a blueprint too, but it is handled together with the detail
  // slide (3) below so that a fiche solution's materiaux slide(s) directly follow its detail
  // slide, instead of every detail slide followed by every materiaux slide.
  const materiauxSlideInfo = slides.find((slideInfo) => slideInfo.number === PptxSlide.FICHE_SOLUTION_MATERIAUX);

  const slidesNeedingFichesSolutions: number[] = [PptxSlide.FICHES_SOLUTION_INTRO, PptxSlide.FICHE_SOLUTION_DETAIL];

  for (const slideInfo of slides) {
    if (slideInfo.number === PptxSlide.FICHE_SOLUTION_MATERIAUX) {
      continue;
    }
    if (slidesNeedingFichesSolutions.includes(slideInfo.number) && orderedFichesSolutions.length === 0) {
      continue;
    }

    switch (slideInfo.number) {
      case PptxSlide.FICHE_SOLUTION_DETAIL: {
        // The detail slide is a blueprint: it is duplicated once per selected fiche solution,
        // each one immediately followed by its own materiaux slide(s), if any.
        await loadCobeneficeIcons(pres, orderedFichesSolutions);
        if (materiauxSlideInfo) {
          await loadMateriauxImages(pres, orderedFichesSolutions, estimationFichesSolutions);
        }

        orderedFichesSolutions.forEach((ficheSolution, index) => {
          addFicheSolutionDetailSlide({ addTemplateSlide, slideInfo, ficheSolution, index });

          if (materiauxSlideInfo) {
            addFicheSolutionMateriauxSlides({
              addTemplateSlide,
              slideInfo: materiauxSlideInfo,
              ficheSolution,
              ficheSolutionIndex: index,
              estimationFicheSolution: estimationFichesSolutions.find(
                (efs) => efs.fiche_solution_id === ficheSolution.documentId,
              ),
            });
          }
        });
        break;
      }
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
