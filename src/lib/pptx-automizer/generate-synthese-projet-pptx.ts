import Automizer, { modify, XmlElement } from "pptx-automizer";
import path from "path";
import { GenerateSyntheseProjetPptxParams, PptxSlide, PptxTemplateTag } from "./types";
import { mergeTextRunsInElement, replaceTagWithBulletList } from "./helpers";
import { getFicheSolutionByIds } from "@/src/lib/strapi/queries/fichesSolutionsQueries";

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

  const pres = automizer
    .loadRoot(templateFileName)
    .load(templateFileName, "template");

  const info = await pres.getInfo();
  const slides = info.slidesByTemplate("template");

  const fichesSolutions = solutionIds.length > 0 ? await getFicheSolutionByIds(solutionIds) : [];
  const fichesSolutionsMap = new Map(fichesSolutions.map((fs) => [fs.documentId, fs.titre]));
  const titresFichesSolutions = solutionIds
    .map((id) => fichesSolutionsMap.get(id))
    .filter((titre): titre is string => Boolean(titre));

  const dateGenerationSynthese = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const replacements = [
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

  for (const slideInfo of slides) {
    if (slideInfo.number === PptxSlide.INTRO_FICHES_SOLUTION && titresFichesSolutions.length === 0) {
      continue;
    }

    pres.addSlide("template", slideInfo.number, (slide) => {
      slideInfo.elements?.forEach((element) => {
        if (element.hasTextBody) {
          slide.modifyElement({ name: element.name, nameIdx: element.nameIdx }, [
            mergeTextRunsInElement,
            (el: XmlElement) =>
              replaceTagWithBulletList(el, PptxTemplateTag.TITRE_FICHES_SOLUTION, titresFichesSolutions),
            modify.replaceText(replacements),
          ]);
        }
      });
    });
  }

  const zip = await pres.getJSZip();
  const buffer = (await zip.generateAsync({ type: "nodebuffer" })) as Buffer;
  return buffer;
};
