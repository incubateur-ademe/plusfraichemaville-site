import { AddTemplateSlide, PptxSlideInfo } from "./types";

/**
 * Slide 7: section divider introducing the ressources utiles slides. Fixed slide, only the
 * tags shared by every slide apply here. Included only when at least one selected fiche
 * solution has ressources utiles content (see generate-synthese-projet-pptx.ts).
 */
export const addRessourcesUtilesIntroSlide = (addTemplateSlide: AddTemplateSlide, slideInfo: PptxSlideInfo) => {
  addTemplateSlide(slideInfo);
};
