import Automizer, { ISlide, modify, ModifyImageHelper, ReplaceText, ShapeModificationCallback } from "pptx-automizer";
import { AddTemplateSlide, PptxSlideInfo } from "./types";
import { getImagePngFilename, loadImagePngBuffer } from "./shared-image";
import { mergeTextRunsInElement, stripSvgBlipExtension } from "../helpers";
import { PptxSlideElement, PptxTemplateTag } from "../types";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { Materiau } from "@/src/lib/strapi/types/api/materiau";
import { Media } from "@/src/lib/strapi/types/common/Media";
import { EstimationFicheSolution, EstimationMateriau } from "@/src/lib/prisma/prismaCustomTypes";
import {
  getLabelCoutEntretienByQuantite as getLabelCoutEntretienByQuantiteMateriau,
  getLabelCoutFournitureByQuantite as getLabelCoutFournitureByQuantiteMateriau,
} from "@/src/helpers/cout/cout-materiau";
import {
  getLabelCoutEntretienByQuantite as getLabelCoutEntretienByQuantiteFicheSolution,
  getLabelCoutFournitureByQuantite as getLabelCoutFournitureByQuantiteFicheSolution,
} from "@/src/helpers/cout/cout-fiche-solution";
import { getUniteCoutFromCode } from "@/src/helpers/cout/cout-common";
import { constructPluralString, formatNumberWithSpaces } from "@/src/helpers/common";
import { isSimpleMateriauFicheSolution } from "@/src/components/ficheSolution/helpers";
import {
  computePriceEstimationFicheSolution,
  computePriceEstimationSimpleFicheSolution,
} from "@/src/helpers/estimation";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

// The source template's "template" alias, as loaded in generate-synthese-projet-pptx.ts.
const TEMPLATE_PRES_NAME = "template";

// ---------------------------------------------------------------------------------------
// Layout geometry (all EMU), read off the template slide's own pristine shapes. Every block
// below (title / materiau row / fiche subtotal band / grand total) is placed as a whole at a
// computed absolute Y: shapes within a block keep their own offset from the block's anchor
// shape, so their relative layout (and size, and horizontal alignment) never changes —
// only the block's vertical position does. This is what lets fiche solutions flow one below
// another and wrap onto a new slide only when they no longer fit (see buildSlidePlans).
// ---------------------------------------------------------------------------------------

const TITLE_TOP_EMU = 1153414; // zone_titre_fs_recap_estimation
const ROW_TOP_EMU = 1529871; // zone_titre_materiau, the row group's anchor (its topmost shape)
const ROW_HEIGHT_EMU = 563896; // titre/image/quantite/couts row's own vertical extent
const ROW_IMAGE_OFFSET_EMU = 46112; // image_materiau vs. zone_titre_materiau
const ROW_QUANTITE_OFFSET_EMU = 295115; // zone_quantite_materiau vs. zone_titre_materiau
const ROW_COUTS_OFFSET_EMU = 102231; // zone_cout_materiau vs. zone_titre_materiau
const BAND_TOP_EMU = 2602517; // bg_recap_estimation_fs, the fiche subtotal band's anchor
const BAND_HEIGHT_EMU = 663816;
const BAND_LABELS_OFFSET_EMU = 116464; // zone_recap_fiche_solution vs. bg_recap_estimation_fs
const BAND_VALUES_OFFSET_EMU = 78080; // ZoneTexte 10 vs. bg_recap_estimation_fs
const GRAND_TOTAL_HEIGHT_EMU = 1022942; // recap_titre top to recap_total_libelles(_valeurs) bottom
const GRAND_TOTAL_LABELS_VALUES_OFFSET_EMU = 592055; // recap_total_libelles(_valeurs) vs. recap_titre

// Top-to-top distance from a title to the first row (or the band, for a fiche with none).
const TITLE_TO_ROW_DELTA_EMU = ROW_TOP_EMU - TITLE_TOP_EMU;
// The template's original gap between its single row and its band, before either the band
// was moved up (see BAND_TOP_EMU) or the row-to-row gap was tightened below — kept as a
// fixed reference so adjusting one doesn't retroactively change the other.
const ORIGINAL_ROW_TO_BAND_GAP_EMU = 671414;
// Gap between one row's bottom and the next row's top — ORIGINAL_ROW_TO_BAND_GAP_EMU divided
// by 3, tightened at the user's request.
const ROW_GAP_EMU = Math.round(ORIGINAL_ROW_TO_BAND_GAP_EMU / 3);
// Top-to-top distance between two consecutive materiau rows.
const ROW_DELTA_EMU = ROW_HEIGHT_EMU + ROW_GAP_EMU;
// Gap between a row's bottom and the fiche's own total band's top — reacts to wherever the
// band currently sits (see BAND_TOP_EMU): this separates a fiche's materiaux from its total,
// not two materiaux from each other, so it isn't tightened like ROW_GAP_EMU above.
const ROW_TO_BAND_GAP_EMU = BAND_TOP_EMU - (ROW_TOP_EMU + ROW_HEIGHT_EMU);
// Gap between one fiche's total band and the next fiche's title (or the grand total).
const BAND_TO_NEXT_BLOCK_GAP_EMU = ROW_TO_BAND_GAP_EMU;

// Bottom margin kept clear at the foot of the slide.
const MAX_CONTENT_BOTTOM_EMU = 6858000 - 300000;

// Moves a shape far below the visible slide instead of removing it: addTemplateSlide's own
// pass already queues a modifyElement for every text-bearing shape (to apply the tags shared
// by every slide), and a later slide.removeElement for that same shape then silently no-ops.
// modifyElement/setPosition keeps working reliably however many times it's called, though.
const HIDE_Y_EMU = 30000000;
const hideElements = (slide: ISlide, names: PptxSlideElement[]) =>
  names.forEach((name) => slide.modifyElement({ name }, [modify.setPosition({ y: HIDE_Y_EMU })]));

// A materiau line worth showing in a fiche solution's recap block, normalized so the same
// rendering code can show either an actual CMS materiau or, for a fiche solution with no
// materiaux breakdown (see isSimpleMateriauFicheSolution), the fiche solution itself as its
// own single row — same idea as the materiaux slide (4)'s MateriauRowData.
type RecapMateriauRow = {
  imageKey: string;
  image: Media | undefined;
  titre: string;
  quantiteLabel: string;
  coutInvestissementLabel: string;
  coutEntretienLabel: string;
};

type RecapFicheSolutionData = {
  ficheSolution: FicheSolution;
  // Empty for a fiche with no materiaux breakdown and a zero/empty quantite, or a fiche with
  // a breakdown where no materiau passes the display rule — the fiche still gets its own
  // block (title + subtotal), just with no materiau row.
  rows: RecapMateriauRow[];
  fournitureMin: number;
  fournitureMax: number;
  entretienMin: number;
  entretienMax: number;
};

const shouldDisplayEstimationMateriau = (estimationMateriau?: EstimationMateriau) =>
  Boolean(
    estimationMateriau &&
      (estimationMateriau.quantite > 0 ||
        estimationMateriau.cout_entretien_override != null ||
        estimationMateriau.cout_investissement_override != null),
  );

const getMateriauRow = (materiau: Materiau, estimationMateriau: EstimationMateriau): RecapMateriauRow => {
  const uniteCout = getUniteCoutFromCode(materiau.cout_unite);
  return {
    imageKey: `materiau-${materiau.documentId}`,
    image: materiau.image,
    titre: materiau.titre ?? "",
    quantiteLabel: constructPluralString(estimationMateriau.quantite, uniteCout.unitLabel, uniteCout.unitLabelPlural),
    coutInvestissementLabel:
      estimationMateriau.cout_investissement_override == null
        ? getLabelCoutFournitureByQuantiteMateriau(materiau, estimationMateriau.quantite || 0)
        : `${estimationMateriau.cout_investissement_override} €`,
    coutEntretienLabel:
      estimationMateriau.cout_entretien_override == null
        ? getLabelCoutEntretienByQuantiteMateriau(materiau, estimationMateriau.quantite || 0)
        : `${estimationMateriau.cout_entretien_override} € / an`,
  };
};

// A fiche solution with no materiaux breakdown is estimated as a single quantity on the
// fiche itself (see EstimationMateriauSimpleFieldForm) — shown as its own single row here
// too, using the fiche's own image, same as on the materiaux slide (4).
const getSimpleFicheSolutionRow = (
  ficheSolution: FicheSolution,
  estimationFicheSolution: EstimationFicheSolution,
): RecapMateriauRow => {
  const uniteCout = getUniteCoutFromCode(ficheSolution.cout_unite);
  const quantite = estimationFicheSolution.quantite || 0;
  return {
    imageKey: `fiche-solution-${ficheSolution.documentId}`,
    image: ficheSolution.image_principale,
    titre: ficheSolution.titre ?? "",
    quantiteLabel: constructPluralString(quantite, uniteCout.unitLabel, uniteCout.unitLabelPlural),
    coutInvestissementLabel:
      estimationFicheSolution.cout_investissement_override == null
        ? getLabelCoutFournitureByQuantiteFicheSolution(ficheSolution, quantite)
        : `${estimationFicheSolution.cout_investissement_override} €`,
    coutEntretienLabel:
      estimationFicheSolution.cout_entretien_override == null
        ? getLabelCoutEntretienByQuantiteFicheSolution(ficheSolution, quantite)
        : `${estimationFicheSolution.cout_entretien_override} € / an`,
  };
};

/**
 * One fiche solution's recap data: same computation as useEstimationFSGlobalPrice for a
 * single fiche, plus its materiau rows — its own single row for a fiche with no materiaux
 * breakdown (see isSimpleMateriauFicheSolution) and a non-empty, non-zero quantite, or one
 * row per materiau passing the display rule otherwise.
 */
const getRecapFicheSolutionData = (
  ficheSolution: FicheSolution,
  estimationFicheSolution: EstimationFicheSolution,
): RecapFicheSolutionData => {
  const isSimple = isSimpleMateriauFicheSolution(ficheSolution);
  const price = isSimple
    ? computePriceEstimationSimpleFicheSolution(ficheSolution, estimationFicheSolution)
    : computePriceEstimationFicheSolution(ficheSolution, estimationFicheSolution.estimation_materiaux);

  const rows: RecapMateriauRow[] = isSimple
    ? estimationFicheSolution.quantite
      ? [getSimpleFicheSolutionRow(ficheSolution, estimationFicheSolution)]
      : []
    : (ficheSolution.materiaux ?? []).reduce<RecapMateriauRow[]>((acc, materiau) => {
        const estimationMateriau = estimationFicheSolution.estimation_materiaux.find(
          (em) => em.materiau_id === materiau.documentId,
        );
        if (shouldDisplayEstimationMateriau(estimationMateriau)) {
          acc.push(getMateriauRow(materiau, estimationMateriau as EstimationMateriau));
        }
        return acc;
      }, []);

  return {
    ficheSolution,
    rows,
    fournitureMin: price?.fourniture.min ?? 0,
    fournitureMax: price?.fourniture.max ?? 0,
    entretienMin: price?.entretien.min ?? 0,
    entretienMax: price?.entretien.max ?? 0,
  };
};

const formatTotalLabel = (min: number, max: number, suffix: string) =>
  `${formatNumberWithSpaces(min)} - ${formatNumberWithSpaces(max)} € HT${suffix}`;

/**
 * Preloads (once, deduplicated by row image key) the PNG buffer of every image actually
 * shown as a row on the recap slides — either a materiau's own image or, for a fiche with no
 * materiaux breakdown, the fiche's own image. A row with no image keeps the template's
 * placeholder picture.
 */
export const loadEstimationRecapImages = async (pres: Automizer, recapDataList: RecapFicheSolutionData[]) => {
  const imagesByKey = new Map<string, Media>();
  recapDataList.forEach((data) => {
    data.rows.forEach((row) => {
      if (row.image) {
        imagesByKey.set(row.imageKey, row.image);
      }
    });
  });

  for (const [imageKey, image] of Array.from(imagesByKey.entries())) {
    try {
      const pngBuffer = await loadImagePngBuffer(image);
      pres.loadMediaBuffer(getImagePngFilename(imageKey), pngBuffer);
    } catch (e) {
      customCaptureException("Error loading materiau row image for estimation recap pptx slide", e);
    }
  }
};

// ---------------------------------------------------------------------------------------
// Layout: a greedy flow of fiche solution blocks (title, materiau rows, subtotal band) plus
// the grand total, packed one below another and wrapped onto a new slide whenever a piece no
// longer fits within MAX_CONTENT_BOTTOM_EMU.
// ---------------------------------------------------------------------------------------

type TitlePlacement = { ficheSolution: FicheSolution; y: number };
type RowPlacement = { row: RecapMateriauRow; y: number };
type BandPlacement = { data: RecapFicheSolutionData; y: number };
type GrandTotalTotals = { fournitureMin: number; fournitureMax: number; entretienMin: number; entretienMax: number };

type SlidePlan = {
  titles: TitlePlacement[];
  rows: RowPlacement[];
  bands: BandPlacement[];
  grandTotal?: { y: number };
};

const buildSlidePlans = (recapDataList: RecapFicheSolutionData[]): SlidePlan[] => {
  const slidePlans: SlidePlan[] = [];
  let currentSlide: SlidePlan | undefined;
  let cursorY = 0;

  const newSlide = () => {
    currentSlide = { titles: [], rows: [], bands: [] };
    slidePlans.push(currentSlide);
    cursorY = TITLE_TOP_EMU;
    return currentSlide;
  };

  recapDataList.forEach((data) => {
    let slide = currentSlide ?? newSlide();

    // Start this fiche's title on the current slide, unless there isn't even room for it
    // plus its first row (or its band, if it has none) — then start a fresh slide instead.
    const firstContentHeight = data.rows.length > 0 ? ROW_HEIGHT_EMU : BAND_HEIGHT_EMU;
    if (cursorY + TITLE_TO_ROW_DELTA_EMU + firstContentHeight > MAX_CONTENT_BOTTOM_EMU) {
      slide = newSlide();
    }
    slide.titles.push({ ficheSolution: data.ficheSolution, y: cursorY });
    cursorY += TITLE_TO_ROW_DELTA_EMU;

    let placedAnyRow = false;
    data.rows.forEach((row) => {
      if (cursorY + ROW_HEIGHT_EMU > MAX_CONTENT_BOTTOM_EMU) {
        slide = newSlide();
        slide.titles.push({ ficheSolution: data.ficheSolution, y: cursorY }); // repeat title
        cursorY += TITLE_TO_ROW_DELTA_EMU;
      }
      slide.rows.push({ row, y: cursorY });
      cursorY += ROW_DELTA_EMU;
      placedAnyRow = true;
    });

    // The band sits right after the last row's bottom (or right after the title, if no row
    // was placed for this fiche on this slide) — not at the generic row-to-row cursor.
    const bandY = placedAnyRow ? cursorY - ROW_DELTA_EMU + ROW_HEIGHT_EMU + ROW_TO_BAND_GAP_EMU : cursorY;
    if (bandY + BAND_HEIGHT_EMU > MAX_CONTENT_BOTTOM_EMU) {
      slide = newSlide();
      slide.titles.push({ ficheSolution: data.ficheSolution, y: cursorY }); // repeat title
      cursorY += TITLE_TO_ROW_DELTA_EMU;
      slide.bands.push({ data, y: cursorY });
      cursorY += BAND_HEIGHT_EMU + BAND_TO_NEXT_BLOCK_GAP_EMU;
    } else {
      slide.bands.push({ data, y: bandY });
      cursorY = bandY + BAND_HEIGHT_EMU + BAND_TO_NEXT_BLOCK_GAP_EMU;
    }
  });

  let slide = currentSlide ?? newSlide();
  if (cursorY + GRAND_TOTAL_HEIGHT_EMU > MAX_CONTENT_BOTTOM_EMU) {
    slide = newSlide();
  }
  slide.grandTotal = { y: cursorY };

  return slidePlans;
};

// ---------------------------------------------------------------------------------------
// Rendering: for each slide plan, the first title/row/band placed on it reuses the
// template's own pristine shapes (modifyElement); any further one is a fresh clone
// (addElement) — same technique as slide 4's materiau rows. A block type absent from a
// slide's plan is hidden (see hideElements) rather than left with unfilled {{tags}}.
// ---------------------------------------------------------------------------------------

const getRecapRowReplacements = (row: RecapMateriauRow): ReplaceText[] => [
  { replace: PptxTemplateTag.TITRE_MATERIAU, by: { text: row.titre } },
  { replace: PptxTemplateTag.QUANTITE_MATERIAU, by: { text: row.quantiteLabel } },
  { replace: PptxTemplateTag.COUT_INVESTISSEMENT_MATERIAU, by: { text: row.coutInvestissementLabel } },
  { replace: PptxTemplateTag.COUT_ENTRETIEN_MATERIAU, by: { text: row.coutEntretienLabel } },
];

const getRecapRowImageCallbacks = (row: RecapMateriauRow): ShapeModificationCallback[] => {
  if (!row.image) return [];
  const setImageRelationTarget = ModifyImageHelper.setRelationTarget(
    getImagePngFilename(row.imageKey),
  ) as ShapeModificationCallback;
  return [setImageRelationTarget, stripSvgBlipExtension];
};

const placeOrClone = (
  slide: ISlide,
  slideNumber: number,
  name: PptxSlideElement,
  callbacks: ShapeModificationCallback[],
  useTemplateShape: boolean,
) => {
  if (useTemplateShape) {
    slide.modifyElement({ name }, callbacks);
  } else {
    slide.addElement(TEMPLATE_PRES_NAME, slideNumber, { name }, callbacks);
  }
};

const placeTitle = (slide: ISlide, slideNumber: number, placement: TitlePlacement, useTemplateShape: boolean) => {
  placeOrClone(
    slide,
    slideNumber,
    PptxSlideElement.ZONE_TITRE_FICHE_SOLUTION_RECAP,
    [
      mergeTextRunsInElement,
      modify.replaceText([
        { replace: PptxTemplateTag.TITRE_FICHE_SOLUTION, by: { text: placement.ficheSolution.titre ?? "" } },
      ]),
      modify.setPosition({ y: placement.y }),
    ],
    useTemplateShape,
  );
};

const placeRow = (slide: ISlide, slideNumber: number, placement: RowPlacement, useTemplateShape: boolean) => {
  const replacements = getRecapRowReplacements(placement.row);
  placeOrClone(
    slide,
    slideNumber,
    PptxSlideElement.ZONE_TITRE_MATERIAU,
    [mergeTextRunsInElement, modify.replaceText(replacements), modify.setPosition({ y: placement.y })],
    useTemplateShape,
  );
  placeOrClone(
    slide,
    slideNumber,
    PptxSlideElement.ZONE_QUANTITE_MATERIAU,
    [
      mergeTextRunsInElement,
      modify.replaceText(replacements),
      modify.setPosition({ y: placement.y + ROW_QUANTITE_OFFSET_EMU }),
    ],
    useTemplateShape,
  );
  placeOrClone(
    slide,
    slideNumber,
    PptxSlideElement.ZONE_COUTS_MATERIAU,
    [
      mergeTextRunsInElement,
      modify.replaceText(replacements),
      modify.setPosition({ y: placement.y + ROW_COUTS_OFFSET_EMU }),
    ],
    useTemplateShape,
  );
  placeOrClone(
    slide,
    slideNumber,
    PptxSlideElement.IMAGE_MATERIAU,
    [...getRecapRowImageCallbacks(placement.row), modify.setPosition({ y: placement.y + ROW_IMAGE_OFFSET_EMU })],
    useTemplateShape,
  );
};

const placeBand = (slide: ISlide, slideNumber: number, placement: BandPlacement, useTemplateShape: boolean) => {
  const { data, y } = placement;
  placeOrClone(
    slide,
    slideNumber,
    PptxSlideElement.RECAP_FICHE_SOLUTION_TOTAL_BACKGROUND,
    [modify.setPosition({ y })],
    useTemplateShape,
  );
  placeOrClone(
    slide,
    slideNumber,
    PptxSlideElement.RECAP_FICHE_SOLUTION_TOTAL_LABELS,
    [modify.setPosition({ y: y + BAND_LABELS_OFFSET_EMU })],
    useTemplateShape,
  );
  placeOrClone(
    slide,
    slideNumber,
    PptxSlideElement.RECAP_FICHE_SOLUTION_TOTAL_VALUES,
    [
      mergeTextRunsInElement,
      modify.replaceText([
        {
          replace: PptxTemplateTag.COUT_INVESTISSEMENT_FICHE_SOLUTION,
          by: { text: formatTotalLabel(data.fournitureMin, data.fournitureMax, "") },
        },
        {
          replace: PptxTemplateTag.COUT_ENTRETIEN_FICHE_SOLUTION,
          by: { text: formatTotalLabel(data.entretienMin, data.entretienMax, " / an") },
        },
      ]),
      modify.setPosition({ y: y + BAND_VALUES_OFFSET_EMU }),
    ],
    useTemplateShape,
  );
};

// The grand total appears at most once across the whole export, always as the template's
// own pristine shapes (never cloned).
const placeGrandTotal = (slide: ISlide, y: number, grandTotal: GrandTotalTotals) => {
  slide.modifyElement({ name: PptxSlideElement.RECAP_GRAND_TOTAL_TITLE }, [modify.setPosition({ y })]);
  slide.modifyElement({ name: PptxSlideElement.RECAP_GRAND_TOTAL_LABELS }, [
    modify.setPosition({ y: y + GRAND_TOTAL_LABELS_VALUES_OFFSET_EMU }),
  ]);
  slide.modifyElement({ name: PptxSlideElement.RECAP_GRAND_TOTAL_VALUES }, [
    mergeTextRunsInElement,
    modify.replaceText([
      {
        replace: PptxTemplateTag.COUT_INVESTISSEMENT_ESTIMATION,
        by: { text: formatTotalLabel(grandTotal.fournitureMin, grandTotal.fournitureMax, "") },
      },
      {
        replace: PptxTemplateTag.COUT_ENTRETIEN_ESTIMATION,
        by: { text: formatTotalLabel(grandTotal.entretienMin, grandTotal.entretienMax, " / an") },
      },
    ]),
    modify.setPosition({ y: y + GRAND_TOTAL_LABELS_VALUES_OFFSET_EMU }),
  ]);
};

const ROW_ELEMENT_NAMES = [
  PptxSlideElement.ZONE_TITRE_MATERIAU,
  PptxSlideElement.IMAGE_MATERIAU,
  PptxSlideElement.ZONE_QUANTITE_MATERIAU,
  PptxSlideElement.ZONE_COUTS_MATERIAU,
];
const BAND_ELEMENT_NAMES = [
  PptxSlideElement.RECAP_FICHE_SOLUTION_TOTAL_BACKGROUND,
  PptxSlideElement.RECAP_FICHE_SOLUTION_TOTAL_LABELS,
  PptxSlideElement.RECAP_FICHE_SOLUTION_TOTAL_VALUES,
];
const GRAND_TOTAL_ELEMENT_NAMES = [
  PptxSlideElement.RECAP_GRAND_TOTAL_TITLE,
  PptxSlideElement.RECAP_GRAND_TOTAL_LABELS,
  PptxSlideElement.RECAP_GRAND_TOTAL_VALUES,
];

/**
 * Slide 6: budget recap, mirroring EstimationMateriauxFicheSolutionRecap /
 * EstimationMateriauxValidation — one block per fiche solution (title, materiau rows if any,
 * then that fiche's own investissement/entretien subtotal), followed by the grand total
 * across every selected fiche solution. Fiche solutions flow one below another on the same
 * slide and only wrap onto a new slide once they no longer fit; a fiche solution with more
 * materiau rows than fit on one slide continues on the next (repeating its title and, once
 * done, its subtotal). The grand total appears only once, on the very last slide.
 */
export const addEstimationRecapSlides = async ({
  pres,
  addTemplateSlide,
  slideInfo,
  fichesSolutions,
  estimationFichesSolutions,
}: {
  pres: Automizer;
  addTemplateSlide: AddTemplateSlide;
  slideInfo: PptxSlideInfo;
  fichesSolutions: FicheSolution[];
  estimationFichesSolutions: EstimationFicheSolution[];
}) => {
  const recapDataList = fichesSolutions.reduce<RecapFicheSolutionData[]>((acc, ficheSolution) => {
    const estimationFicheSolution = estimationFichesSolutions.find(
      (efs) => efs.fiche_solution_id === ficheSolution.documentId,
    );
    if (estimationFicheSolution) {
      acc.push(getRecapFicheSolutionData(ficheSolution, estimationFicheSolution));
    }
    return acc;
  }, []);
  if (recapDataList.length === 0) return;

  await loadEstimationRecapImages(pres, recapDataList);

  const grandTotal = recapDataList.reduce<GrandTotalTotals>(
    (acc, data) => ({
      fournitureMin: acc.fournitureMin + data.fournitureMin,
      fournitureMax: acc.fournitureMax + data.fournitureMax,
      entretienMin: acc.entretienMin + data.entretienMin,
      entretienMax: acc.entretienMax + data.entretienMax,
    }),
    { fournitureMin: 0, fournitureMax: 0, entretienMin: 0, entretienMax: 0 },
  );

  const slidePlans = buildSlidePlans(recapDataList);

  slidePlans.forEach((slidePlan) => {
    addTemplateSlide(slideInfo, [], (slide) => {
      if (slidePlan.titles.length > 0) {
        slidePlan.titles.forEach((placement, i) => placeTitle(slide, slideInfo.number, placement, i === 0));
      } else {
        hideElements(slide, [PptxSlideElement.ZONE_TITRE_FICHE_SOLUTION_RECAP]);
      }

      if (slidePlan.rows.length > 0) {
        slidePlan.rows.forEach((placement, i) => placeRow(slide, slideInfo.number, placement, i === 0));
      } else {
        hideElements(slide, ROW_ELEMENT_NAMES);
      }

      if (slidePlan.bands.length > 0) {
        slidePlan.bands.forEach((placement, i) => placeBand(slide, slideInfo.number, placement, i === 0));
      } else {
        hideElements(slide, BAND_ELEMENT_NAMES);
      }

      if (slidePlan.grandTotal) {
        placeGrandTotal(slide, slidePlan.grandTotal.y, grandTotal);
      } else {
        hideElements(slide, GRAND_TOTAL_ELEMENT_NAMES);
      }
    });
  });
};
