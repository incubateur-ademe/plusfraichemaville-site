import { modify } from "pptx-automizer";
import { AddTemplateSlide, PptxSlideInfo } from "./types";
import { PptxSlideElement, PptxTemplateTag } from "../types";
import { ProjetIndiEnSimuation } from "@/src/lib/prisma/prismaCustomTypes";
import {
  getRangeFromValue,
  INDIEN_RAFRAICHISSEMENT_URBAIN,
} from "@/src/helpers/indicateurs-environnementaux/indicateurs-environnementaux-list";

// Layout constants (EMU), read off the pristine template slide (3)'s own shapes: the cursor's
// x when it points at 0, and the width of zone_coeff_ru_echelle (the 0 → 1 scale).
const CURSEUR_RU_X_AT_ZERO_EMU = 538547;
const ECHELLE_RU_WIDTH_EMU = 5444237;

/**
 * Slide 3: analyse simplifiée de la surchauffe de l'espace, mirroring IndienResultRanges.
 * Only the coefficient de rafraîchissement urbain is displayed for now: its value, its range
 * analysis, and the cursor moved along the scale to that value.
 */
export const addAnalyseSimplifieeSlide = (
  addTemplateSlide: AddTemplateSlide,
  slideInfo: PptxSlideInfo,
  indiEnResults: ProjetIndiEnSimuation,
) => {
  const coeffRafraichissementUrbain = indiEnResults.coeffRafraichissementUrbain;
  const range = getRangeFromValue(coeffRafraichissementUrbain, INDIEN_RAFRAICHISSEMENT_URBAIN);
  const curseurX = Math.round(
    CURSEUR_RU_X_AT_ZERO_EMU + Math.min(Math.max(coeffRafraichissementUrbain, 0), 1) * ECHELLE_RU_WIDTH_EMU,
  );

  addTemplateSlide(
    slideInfo,
    [
      { replace: PptxTemplateTag.COEFF_RU, by: { text: `${coeffRafraichissementUrbain}` } },
      { replace: PptxTemplateTag.ANALYSE_COEFF_RU, by: { text: range.title } },
    ],
    (slide) => {
      slide.modifyElement({ name: PptxSlideElement.ZONE_COEFF_RU_CURSEUR }, [modify.setPosition({ x: curseurX })]);
    },
  );
};
