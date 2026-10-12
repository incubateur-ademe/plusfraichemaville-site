import { ISlide, ReplaceText } from "pptx-automizer";

// Minimal shape of the slide info returned by `pres.getInfo().slidesByTemplate(...)` that
// slide modules need — kept local instead of importing pptx-automizer's own `SlideInfo`
// type, which isn't part of the package's public type exports.
export type PptxSlideInfo = {
  number: number;
  elements?: {
    name: string;
    nameIdx: number;
    hasTextBody: boolean;
    position?: { x: number; y: number; cx: number; cy: number };
  }[];
};

/**
 * Adds one slide duplicated from the "template" source slide, applying the tags shared by
 * every slide (nom_projet, commune_projet, date_generation_synthese, ...) plus any
 * slide-specific `slideReplacements`. `onSlideCreated` runs after text replacement, for
 * non-text modifications (removing or swapping shapes) — see slide modules for examples.
 *
 * `elementsToRemove` removes shapes by name. A text-bearing shape must be removed through it
 * rather than through slide.removeElement in `onSlideCreated`: pptx-automizer merges every
 * action queued on one shape into the first one, so a removeElement queued after this
 * function's own text modification of the same shape is silently ignored.
 */
export type AddTemplateSlide = (
  slideInfo: PptxSlideInfo,
  slideReplacements?: ReplaceText[],
  onSlideCreated?: (slide: ISlide) => void,
  elementsToRemove?: string[],
) => void;
