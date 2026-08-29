import Automizer, { ModifyImageHelper, ShapeModificationCallback } from "pptx-automizer";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";
import { AddTemplateSlide, PptxSlideInfo } from "./types";
import {
  getCobeneficeTextTag,
  getPictoCobeneficeElementName,
  MAX_COBENEFICE_SLOTS,
  PptxSlideElement,
  PptxTemplateTag,
} from "../types";
import { stripSvgBlipExtension } from "../helpers";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { Icone } from "@/src/lib/strapi/types/api/cobenefice";
import { getPorteeBaisseTemperatureLabelFromCode } from "@/src/helpers/porteeBaisseTemperatureFicheSolution";

const COBENEFICE_BLANK_ICON = "cobenefice-blank";

// The cobenefice icons on the site are SVGs, but the pptx placeholder pictos must stay
// plain PNG-based images (not SVG) to avoid OOXML's dual PNG/SVG image relation, which
// pptx-automizer's relation-swap helper cannot reliably update both sides of.
const getCobeneficeIconPngFilename = (icone?: Icone) => `${icone ?? COBENEFICE_BLANK_ICON}.png`;

const getCobeneficeIconPngBuffer = async (icone?: Icone) => {
  const svgPath = path.join(process.cwd(), "public", "images", "cobenefices", `${icone ?? COBENEFICE_BLANK_ICON}.svg`);
  const svgBuffer = await fs.readFile(svgPath);
  return sharp(svgBuffer, { density: 300 }).png().toBuffer();
};

// Converts every distinct cobenefice icon actually displayed (capped at MAX_COBENEFICE_SLOTS
// per fiche) to PNG once, then registers the buffers as media the pictos can point to.
const loadCobeneficeIcons = async (pres: Automizer, fichesSolutions: FicheSolution[]) => {
  const iconesToLoad = new Set<Icone | undefined>();
  fichesSolutions.forEach((ficheSolution) => {
    (ficheSolution.cobenefices ?? []).slice(0, MAX_COBENEFICE_SLOTS).forEach((cobenefice) => {
      iconesToLoad.add(cobenefice.icone);
    });
  });
  for (const icone of Array.from(iconesToLoad)) {
    const pngBuffer = await getCobeneficeIconPngBuffer(icone);
    pres.loadMediaBuffer(getCobeneficeIconPngFilename(icone), pngBuffer);
  }
};

/**
 * Slide 3: one fiche solution's detail. This is a blueprint slide, duplicated once per
 * selected fiche solution (unlike the other slides, added only once).
 */
export const addFicheSolutionDetailSlides = async ({
  pres,
  addTemplateSlide,
  slideInfo,
  fichesSolutions,
}: {
  pres: Automizer;
  addTemplateSlide: AddTemplateSlide;
  slideInfo: PptxSlideInfo;
  fichesSolutions: FicheSolution[];
}) => {
  await loadCobeneficeIcons(pres, fichesSolutions);

  fichesSolutions.forEach((ficheSolution, index) => {
    const hasBaisseTemperature = Boolean(ficheSolution.baisse_temperature);
    const cobeneficeTextReplacements = Array.from({ length: MAX_COBENEFICE_SLOTS }, (_, slotIndex) => ({
      replace: getCobeneficeTextTag(slotIndex),
      by: { text: ficheSolution.cobenefices?.[slotIndex]?.description ?? "" },
    }));

    addTemplateSlide(
      slideInfo,
      [
        { replace: PptxTemplateTag.NUMERO_FICHE_SOLUTION, by: { text: `${index + 1}` } },
        { replace: PptxTemplateTag.TITRE_FICHE_SOLUTION, by: { text: ficheSolution.titre ?? "" } },
        {
          replace: PptxTemplateTag.DESCRIPTION_COURTE_FICHE_SOLUTION,
          by: { text: ficheSolution.description_courte ?? "" },
        },
        {
          replace: PptxTemplateTag.PORTEE_BAISSE_TEMPERATURE_FICHE_SOLUTION,
          by: {
            text: hasBaisseTemperature
              ? getPorteeBaisseTemperatureLabelFromCode(ficheSolution.portee_baisse_temperature)
              : ficheSolution.libelle_avantage_solution ?? "",
          },
        },
        {
          replace: PptxTemplateTag.BAISSE_TEMPERATURE_FICHE_SOLUTION,
          by: { text: hasBaisseTemperature ? `-${ficheSolution.baisse_temperature?.toLocaleString("fr")}°C` : "" },
        },
        ...cobeneficeTextReplacements,
      ],
      (slide) => {
        // The picto is only shown as a fallback when there is no baisse_temperature value to display.
        if (hasBaisseTemperature) {
          slide.removeElement({ name: PptxSlideElement.PICTO_THERMOMETRE_BAISSE_TEMPERATURE });
        }

        // The cobenefice pictos are a fixed number of named slots on the template slide:
        // point each one to the matching cobenefice's icon, and drop the unused slots.
        for (let slotIndex = 0; slotIndex < MAX_COBENEFICE_SLOTS; slotIndex++) {
          const slotName = getPictoCobeneficeElementName(slotIndex);
          const cobenefice = ficheSolution.cobenefices?.[slotIndex];
          if (cobenefice) {
            slide.modifyElement({ name: slotName }, [
              ModifyImageHelper.setRelationTarget(
                getCobeneficeIconPngFilename(cobenefice.icone),
              ) as ShapeModificationCallback,
              stripSvgBlipExtension,
            ]);
          } else {
            slide.removeElement({ name: slotName });
          }
        }
      },
    );
  });
};
