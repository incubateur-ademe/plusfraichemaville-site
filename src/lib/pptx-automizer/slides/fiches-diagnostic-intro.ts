import { AddTemplateSlide, PptxSlideInfo } from "./types";

/**
 * Slide 2: intro listing the titles of the selected fiches diagnostic. The
 * titre_fiches_diagnostic bullet list is applied automatically by addTemplateSlide;
 * nothing else is specific to this slide yet.
 */
export const addFichesDiagnosticIntroSlide = (addTemplateSlide: AddTemplateSlide, slideInfo: PptxSlideInfo) => {
  addTemplateSlide(slideInfo);
};
