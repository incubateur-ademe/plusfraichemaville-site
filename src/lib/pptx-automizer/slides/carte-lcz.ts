import Automizer, { ModifyImageHelper, ShapeModificationCallback } from "pptx-automizer";
import { AddTemplateSlide, PptxSlideInfo } from "./types";
import { PptxSlideElement } from "../types";
import { stripSvgBlipExtension } from "../helpers";
import { renderCarteLczImage } from "./carte-lcz-image";
import { Climadiag } from "@/src/components/climadiag/types";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

const getCarteLczImageFilename = (codeInsee: string) => `carte-lcz-${codeInsee}.png`;

// Ratio of the template's carte_lcz shape, used when its position can't be read.
const DEFAULT_CARTE_LCZ_RATIO = 6104423 / 4055659;

const getCarteLczRatio = (slideInfo: PptxSlideInfo) => {
  const position = slideInfo.elements?.find((element) => element.name === PptxSlideElement.CARTE_LCZ)?.position;
  return position && position.cx > 0 && position.cy > 0 ? position.cx / position.cy : DEFAULT_CARTE_LCZ_RATIO;
};

/**
 * Renders the commune's LCZ map and registers it in the presentation's media. Returns whether
 * it could be rendered: if not, the slide must be left out of the synthese.
 */
export const loadCarteLczImage = async (
  pres: Automizer,
  slideInfo: PptxSlideInfo,
  codeInsee: string,
  climadiagInfo: Climadiag,
) => {
  try {
    const pngBuffer = await renderCarteLczImage({ codeInsee, climadiagInfo, ratio: getCarteLczRatio(slideInfo) });
    if (!pngBuffer) return false;
    pres.loadMediaBuffer(getCarteLczImageFilename(codeInsee), pngBuffer);
    return true;
  } catch (e) {
    customCaptureException(`Error rendering carte LCZ for synthese projet pptx, code INSEE ${codeInsee}`, e);
    return false;
  }
};

/**
 * Slide 3: cartographie des zones climatiques locales. The carte_lcz picture is swapped for the
 * commune's map, which loadCarteLczImage must have loaded beforehand. explication_lcz's
 * commune_projet tag is one of the tags shared by every slide.
 */
export const addCarteLczSlide = (addTemplateSlide: AddTemplateSlide, slideInfo: PptxSlideInfo, codeInsee: string) => {
  addTemplateSlide(slideInfo, [], (slide) => {
    slide.modifyElement({ name: PptxSlideElement.CARTE_LCZ }, [
      ModifyImageHelper.setRelationTarget(getCarteLczImageFilename(codeInsee)) as ShapeModificationCallback,
      stripSvgBlipExtension,
    ]);
  });
};
