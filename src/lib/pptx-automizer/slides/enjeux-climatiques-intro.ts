import { AddTemplateSlide, PptxSlideInfo } from "./types";

/**
 * Slide 2: section divider introducing the climate slides. The sous_titre_enjeux_climatiques
 * bullet list is applied automatically by addTemplateSlide; nothing else is specific to this slide.
 */
export const addEnjeuxClimatiquesIntroSlide = (addTemplateSlide: AddTemplateSlide, slideInfo: PptxSlideInfo) => {
  addTemplateSlide(slideInfo);
};
