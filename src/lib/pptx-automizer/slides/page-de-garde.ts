import { AddTemplateSlide, PptxSlideInfo } from "./types";

/**
 * Slide 1: cover page. Only the tags shared by every slide (nom_projet, commune_projet,
 * date_generation_synthese, ...) apply here — nothing specific to this slide yet.
 */
export const addPageDeGardeSlide = (addTemplateSlide: AddTemplateSlide, slideInfo: PptxSlideInfo) => {
  addTemplateSlide(slideInfo);
};
