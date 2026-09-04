import Automizer, { ISlide, modify, ModifyImageHelper, ReplaceText, ShapeModificationCallback } from "pptx-automizer";
import { AddTemplateSlide, PptxSlideInfo } from "./types";
import { getImagePngFilename, loadImagePngBuffer } from "./shared-image";
import { getFirstSentenceFromHtml, mergeTextRunsInElement, stripSvgBlipExtension } from "../helpers";
import { MATERIAU_ROW_DELTA_EMU, MAX_MATERIAUX_PAR_SLIDE, PptxSlideElement, PptxTemplateTag } from "../types";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { Materiau } from "@/src/lib/strapi/types/api/materiau";
import { Media } from "@/src/lib/strapi/types/common/Media";
import { EstimationFicheSolution } from "@/src/lib/prisma/prismaCustomTypes";
import { getUniteCoutFromCode } from "@/src/helpers/cout/cout-common";
import {
  getLabelCoutEntretien as getLabelCoutEntretienMateriau,
  getLabelCoutFourniture as getLabelCoutFournitureMateriau,
} from "@/src/helpers/cout/cout-materiau";
import {
  getLabelCoutEntretien as getLabelCoutEntretienFicheSolution,
  getLabelCoutFourniture as getLabelCoutFournitureFicheSolution,
} from "@/src/helpers/cout/cout-fiche-solution";
import { isSimpleMateriauFicheSolution } from "@/src/components/ficheSolution/helpers";
import { constructPluralString } from "@/src/helpers/common";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

// The source template's "template" alias, as loaded in generate-synthese-projet-pptx.ts.
const TEMPLATE_PRES_NAME = "template";

// A materiau row's content, normalized so the same rendering code can show either an actual
// CMS materiau or, for a fiche solution with no materiaux breakdown (see
// isSimpleMateriauFicheSolution), the fiche solution itself as its own single row.
type MateriauRowData = {
  imageKey: string;
  image: Media | undefined;
  titre: string;
  descriptionHtml: string | undefined;
  quantiteLabel: string;
  coutInvestissementLabel: string;
  coutEntretienLabel: string;
};

export const chunk = <T>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

const getMateriauRowData = (materiau: Materiau, quantite: number): MateriauRowData => {
  const uniteCout = getUniteCoutFromCode(materiau.cout_unite);
  return {
    imageKey: `materiau-${materiau.documentId}`,
    image: materiau.image,
    titre: materiau.titre ?? "",
    descriptionHtml: materiau.description,
    quantiteLabel: constructPluralString(quantite, uniteCout.unitLabel, uniteCout.unitLabelPlural),
    coutInvestissementLabel: getLabelCoutFournitureMateriau(materiau),
    coutEntretienLabel: getLabelCoutEntretienMateriau(materiau),
  };
};

// A fiche solution with no materiaux breakdown is estimated as a single quantity on the
// fiche itself (see EstimationMateriauSimpleFieldForm / EstimationMateriauFieldUnique) — it
// is shown as its own single row, using the fiche's own image, description and cost range.
const getSimpleFicheSolutionRowData = (ficheSolution: FicheSolution, quantite: number): MateriauRowData => {
  const uniteCout = getUniteCoutFromCode(ficheSolution.cout_unite);
  return {
    imageKey: `fiche-solution-${ficheSolution.documentId}`,
    image: ficheSolution.image_principale,
    titre: ficheSolution.titre ?? "",
    descriptionHtml: ficheSolution.description_estimation,
    quantiteLabel: constructPluralString(quantite, uniteCout.unitLabel, uniteCout.unitLabelPlural),
    coutInvestissementLabel: getLabelCoutFournitureFicheSolution(ficheSolution),
    coutEntretienLabel: getLabelCoutEntretienFicheSolution(ficheSolution),
  };
};

/**
 * A fiche solution's materiau rows worth displaying: for a fiche with a materiaux
 * breakdown, those with a non-empty, non-zero quantite in the estimation, in the fiche's own
 * materiaux order (same rule as the site's own estimation recap, see
 * EstimationMateriauxFicheSolutionRecap); for a fiche with no breakdown
 * (isSimpleMateriauFicheSolution), a single row for the fiche itself, if its own quantite in
 * the estimation is non-empty and non-zero.
 */
const getMateriauRowsADisplay = (
  ficheSolution: FicheSolution,
  estimationFicheSolution: EstimationFicheSolution | undefined,
): MateriauRowData[] => {
  if (!estimationFicheSolution) return [];

  if (isSimpleMateriauFicheSolution(ficheSolution)) {
    return estimationFicheSolution.quantite
      ? [getSimpleFicheSolutionRowData(ficheSolution, estimationFicheSolution.quantite)]
      : [];
  }

  return (ficheSolution.materiaux ?? []).reduce<MateriauRowData[]>((acc, materiau) => {
    const estimationMateriau = estimationFicheSolution.estimation_materiaux.find(
      (em) => em.materiau_id === materiau.documentId,
    );
    if (estimationMateriau?.quantite) {
      acc.push(getMateriauRowData(materiau, estimationMateriau.quantite));
    }
    return acc;
  }, []);
};

/**
 * Preloads (once, deduplicated by row image key) the PNG buffer of every distinct image
 * actually displayed across the selected fiches solutions' materiau rows — either a
 * materiau's own image or, for a fiche with no materiaux breakdown, the fiche's own image —
 * so each row can later just point to its filename via ModifyImageHelper.setRelationTarget.
 * A row with no image keeps the template's placeholder picture.
 */
export const loadMateriauxImages = async (
  pres: Automizer,
  fichesSolutions: FicheSolution[],
  estimationFichesSolutions: EstimationFicheSolution[],
) => {
  const imagesByKey = new Map<string, Media>();
  fichesSolutions.forEach((ficheSolution) => {
    const estimationFicheSolution = estimationFichesSolutions.find(
      (efs) => efs.fiche_solution_id === ficheSolution.documentId,
    );
    getMateriauRowsADisplay(ficheSolution, estimationFicheSolution).forEach((row) => {
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
      customCaptureException("Error loading materiau row image for synthese projet pptx", e);
    }
  }
};

const getRowReplacements = (row: MateriauRowData): ReplaceText[] => [
  { replace: PptxTemplateTag.TITRE_MATERIAU, by: { text: row.titre } },
  { replace: PptxTemplateTag.DESCRIPTION_MATERIAU, by: { text: getFirstSentenceFromHtml(row.descriptionHtml) } },
  { replace: PptxTemplateTag.QUANTITE_MATERIAU, by: { text: row.quantiteLabel } },
  { replace: PptxTemplateTag.COUT_INVESTISSEMENT_MATERIAU, by: { text: row.coutInvestissementLabel } },
  { replace: PptxTemplateTag.COUT_ENTRETIEN_MATERIAU, by: { text: row.coutEntretienLabel } },
];

const getRowImageCallbacks = (row: MateriauRowData): ShapeModificationCallback[] => {
  if (!row.image) return [];
  const setImageRelationTarget = ModifyImageHelper.setRelationTarget(
    getImagePngFilename(row.imageKey),
  ) as ShapeModificationCallback;
  return [setImageRelationTarget, stripSvgBlipExtension];
};

// Every shape making up one materiau row: the contour plus its texts and image.
const MATERIAU_ROW_ELEMENT_NAMES = [
  PptxSlideElement.CONTOUR_MATERIAU,
  PptxSlideElement.ZONE_TITRE_MATERIAU,
  PptxSlideElement.ZONE_QUANTITE_MATERIAU,
  PptxSlideElement.ZONE_DESCRIPTION_MATERIAU,
  PptxSlideElement.ZONE_COUTS_MATERIAU,
  PptxSlideElement.IMAGE_MATERIAU,
];

/**
 * Duplicates the whole materiau row (contour_materiau + its texts and image) from the
 * pristine template slide onto the slide being built, shifted down by `rowIndex` rows kept
 * at the same size and horizontal alignment as the first row. Used for the 2nd and 3rd
 * materiau of a slide — the 1st reuses the row already present on the template slide.
 */
const addMateriauRow = (slide: ISlide, slideNumber: number, row: MateriauRowData, rowIndex: number) => {
  const rowPositionCallback = modify.updatePosition({ y: rowIndex * MATERIAU_ROW_DELTA_EMU });
  const replacements = getRowReplacements(row);

  MATERIAU_ROW_ELEMENT_NAMES.forEach((name) => {
    const callbacks: ShapeModificationCallback[] =
      name === PptxSlideElement.IMAGE_MATERIAU
        ? [...getRowImageCallbacks(row), rowPositionCallback]
        : [mergeTextRunsInElement, modify.replaceText(replacements), rowPositionCallback];

    slide.addElement(TEMPLATE_PRES_NAME, slideNumber, { name }, callbacks);
  });
};

/**
 * Slide 4: up to MAX_MATERIAUX_PAR_SLIDE materiau rows for one fiche solution, using the
 * template slide's single materiau row as a blueprint. Creates as many slides as needed to
 * show every row worth displaying (see getMateriauRowsADisplay) — none if the fiche solution
 * has none.
 */
export const addFicheSolutionMateriauxSlides = ({
  addTemplateSlide,
  slideInfo,
  ficheSolution,
  ficheSolutionIndex,
  estimationFicheSolution,
}: {
  addTemplateSlide: AddTemplateSlide;
  slideInfo: PptxSlideInfo;
  ficheSolution: FicheSolution;
  ficheSolutionIndex: number;
  estimationFicheSolution: EstimationFicheSolution | undefined;
}) => {
  const rowsADisplay = getMateriauRowsADisplay(ficheSolution, estimationFicheSolution);
  if (rowsADisplay.length === 0) return;

  const rowsChunks = chunk(rowsADisplay, MAX_MATERIAUX_PAR_SLIDE);

  rowsChunks.forEach((rowsChunk, chunkIndex) => {
    const [firstRow, ...otherRows] = rowsChunk;

    addTemplateSlide(
      slideInfo,
      [
        { replace: PptxTemplateTag.NUMERO_FICHE_SOLUTION, by: { text: `${ficheSolutionIndex + 1}` } },
        { replace: PptxTemplateTag.TITRE_FICHE_SOLUTION, by: { text: ficheSolution.titre ?? "" } },
        {
          replace: PptxTemplateTag.PAGINATION_SOLUTION_MATERIAUX,
          by: { text: rowsChunks.length > 1 ? `${chunkIndex + 1}/${rowsChunks.length}` : "" },
        },
        ...getRowReplacements(firstRow),
      ],
      (slide) => {
        const imageCallbacks = getRowImageCallbacks(firstRow);
        if (imageCallbacks.length > 0) {
          slide.modifyElement({ name: PptxSlideElement.IMAGE_MATERIAU }, imageCallbacks);
        }

        otherRows.forEach((row, otherIndex) => {
          addMateriauRow(slide, slideInfo.number, row, otherIndex + 1);
        });
      },
    );
  });
};
