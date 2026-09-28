import { AddTemplateSlide, PptxSlideInfo } from "./types";

/**
 * Slide 2: intro listing the titles of the selected fiches solutions. The
 * titre_fiches_solution bullet list is applied automatically by addTemplateSlide;
 * nothing else is specific to this slide yet.
 */
export const addFichesSolutionIntroSlide = (addTemplateSlide: AddTemplateSlide, slideInfo: PptxSlideInfo) => {
  addTemplateSlide(slideInfo);
};
