import { ISlide, ReplaceText } from "pptx-automizer";

// Minimal shape of the slide info returned by `pres.getInfo().slidesByTemplate(...)` that
// slide modules need — kept local instead of importing pptx-automizer's own `SlideInfo`
// type, which isn't part of the package's public type exports.
export type PptxSlideInfo = {
  number: number;
  elements?: { name: string; nameIdx: number; hasTextBody: boolean }[];
};

/**
 * Adds one slide duplicated from the "template" source slide, applying the tags shared by
 * every slide (nom_projet, commune_projet, date_generation_synthese, ...) plus any
 * slide-specific `slideReplacements`. `onSlideCreated` runs after text replacement, for
 * non-text modifications (removing or swapping shapes) — see slide modules for examples.
 */
export type AddTemplateSlide = (
  slideInfo: PptxSlideInfo,
  slideReplacements?: ReplaceText[],
  onSlideCreated?: (slide: ISlide) => void,
) => void;
