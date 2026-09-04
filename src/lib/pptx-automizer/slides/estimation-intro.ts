import { AddTemplateSlide, PptxSlideInfo } from "./types";

/**
 * Slide 5: section divider introducing the budget estimation slides. Only the tags shared
 * by every slide apply here — nothing specific to this slide yet. Included only when an
 * estimation was passed to the export (see generate-synthese-projet-pptx.ts).
 */
export const addEstimationIntroSlide = (addTemplateSlide: AddTemplateSlide, slideInfo: PptxSlideInfo) => {
  addTemplateSlide(slideInfo);
};
