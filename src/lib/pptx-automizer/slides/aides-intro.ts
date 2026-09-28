import { AddTemplateSlide, PptxSlideInfo } from "./types";

/**
 * Slide 7: section divider introducing the aides slides. Fixed slide, only the tags shared by
 * every slide apply here. Included only when at least one aide was passed to the export (see
 * generate-synthese-projet-pptx.ts).
 */
export const addAidesIntroSlide = (addTemplateSlide: AddTemplateSlide, slideInfo: PptxSlideInfo) => {
  addTemplateSlide(slideInfo);
};
