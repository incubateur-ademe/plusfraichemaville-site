import { AddTemplateSlide, PptxSlideInfo } from "./types";

/**
 * Slide 3: cartographie des zones climatiques locales. Only the tags shared by every slide
 * (commune_projet) apply. The carte_lcz image is the template's own and is not specific to the
 * project's commune yet.
 */
export const addCarteLczSlide = (addTemplateSlide: AddTemplateSlide, slideInfo: PptxSlideInfo) => {
  addTemplateSlide(slideInfo);
};
