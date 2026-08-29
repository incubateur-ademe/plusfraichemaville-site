import Automizer, { modify } from "pptx-automizer";
import path from "path";
import { GenerateSyntheseProjetPptxParams, PptxTemplateTag } from "./types";
import { mergeTextRunsInElement } from "./helpers";

export const generateSyntheseProjetPptx = async ({
  projet,
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

  const replacements = [
    {
      replace: PptxTemplateTag.NOM_PROJET,
      by: { text: projet.nom ?? "" },
    },
    {
      replace: PptxTemplateTag.NOM_PROJET_LEGACY,
      by: { text: projet.nom ?? "" },
    },
  ];

  for (const slideInfo of slides) {
    pres.addSlide("template", slideInfo.number, async (slide) => {
      const textElements = await slide.getAllTextElementIds();
      textElements.forEach((elementId) => {
        slide.modifyElement(elementId, [
          mergeTextRunsInElement,
          modify.replaceText(replacements),
        ]);
      });
    });
  }

  const zip = await pres.getJSZip();
  const buffer = (await zip.generateAsync({ type: "nodebuffer" })) as Buffer;
  return buffer;
};
