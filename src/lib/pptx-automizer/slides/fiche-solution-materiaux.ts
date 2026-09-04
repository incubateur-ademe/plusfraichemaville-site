import Automizer, { ISlide, modify, ModifyImageHelper, ReplaceText, ShapeModificationCallback } from "pptx-automizer";
import sharp from "sharp";
import { AddTemplateSlide, PptxSlideInfo } from "./types";
import { getFirstSentenceFromHtml, mergeTextRunsInElement, stripSvgBlipExtension } from "../helpers";
import { MATERIAU_ROW_DELTA_EMU, MAX_MATERIAUX_PAR_SLIDE, PptxSlideElement, PptxTemplateTag } from "../types";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { Materiau } from "@/src/lib/strapi/types/api/materiau";
import { EstimationFicheSolution } from "@/src/lib/prisma/prismaCustomTypes";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { getUniteCoutFromCode } from "@/src/helpers/cout/cout-common";
import { getLabelCoutEntretien, getLabelCoutFourniture } from "@/src/helpers/cout/cout-materiau";
import { constructPluralString } from "@/src/helpers/common";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

// The source template's "template" alias, as loaded in generate-synthese-projet-pptx.ts.
const TEMPLATE_PRES_NAME = "template";

type MateriauADisplay = { materiau: Materiau; quantite: number };

const chunk = <T>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

/**
 * A fiche solution's materiaux worth displaying: those with a non-empty, non-zero quantite
 * in the estimation, in the fiche's own materiaux order (same rule as the site's own
 * estimation recap, see EstimationMateriauxFicheSolutionRecap).
 */
const getMateriauxADisplay = (
  ficheSolution: FicheSolution,
  estimationFicheSolution: EstimationFicheSolution | undefined,
): MateriauADisplay[] => {
  if (!estimationFicheSolution) return [];
  return (ficheSolution.materiaux ?? []).reduce<MateriauADisplay[]>((acc, materiau) => {
    const estimationMateriau = estimationFicheSolution.estimation_materiaux.find(
      (em) => em.materiau_id === materiau.documentId,
    );
    if (estimationMateriau?.quantite) {
      acc.push({ materiau, quantite: estimationMateriau.quantite });
    }
    return acc;
  }, []);
};

const getMateriauImagePngFilename = (materiauId: string) => `materiau-${materiauId}.png`;

const loadMateriauImagePngBuffer = async (materiau: Materiau) => {
  const imageUrl = getStrapiImageUrl(materiau.image, STRAPI_IMAGE_KEY_SIZE.small);
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch materiau image ${imageUrl} (${response.status})`);
  }
  const arrayBuffer = await response.arrayBuffer();
  // Strapi may serve jpg/png/webp: normalize to PNG, the only bitmap format the pptx media
  // registry is guaranteed to map to a valid OOXML content type (see cobenefice icons above).
  return sharp(Buffer.from(arrayBuffer)).png().toBuffer();
};

/**
 * Preloads (once, deduplicated by materiau documentId) the PNG buffer of every distinct
 * materiau image actually displayed across the selected fiches solutions, so each materiau
 * row can later just point to its filename via ModifyImageHelper.setRelationTarget. A
 * materiau with no image keeps the template's placeholder picture.
 */
export const loadMateriauxImages = async (
  pres: Automizer,
  fichesSolutions: FicheSolution[],
  estimationFichesSolutions: EstimationFicheSolution[],
) => {
  const materiauxById = new Map<string, Materiau>();
  fichesSolutions.forEach((ficheSolution) => {
    const estimationFicheSolution = estimationFichesSolutions.find(
      (efs) => efs.fiche_solution_id === ficheSolution.documentId,
    );
    getMateriauxADisplay(ficheSolution, estimationFicheSolution).forEach(({ materiau }) => {
      if (materiau.image) {
        materiauxById.set(materiau.documentId, materiau);
      }
    });
  });

  for (const materiau of Array.from(materiauxById.values())) {
    try {
      const pngBuffer = await loadMateriauImagePngBuffer(materiau);
      pres.loadMediaBuffer(getMateriauImagePngFilename(materiau.documentId), pngBuffer);
    } catch (e) {
      customCaptureException("Error loading materiau image for synthese projet pptx", e);
    }
  }
};

const getMateriauReplacements = (materiau: Materiau, quantite: number): ReplaceText[] => {
  const uniteCout = getUniteCoutFromCode(materiau.cout_unite);
  return [
    { replace: PptxTemplateTag.TITRE_MATERIAU, by: { text: materiau.titre ?? "" } },
    { replace: PptxTemplateTag.DESCRIPTION_MATERIAU, by: { text: getFirstSentenceFromHtml(materiau.description) } },
    {
      replace: PptxTemplateTag.QUANTITE_MATERIAU,
      by: { text: constructPluralString(quantite, uniteCout.unitLabel, uniteCout.unitLabelPlural) },
    },
    { replace: PptxTemplateTag.COUT_INVESTISSEMENT_MATERIAU, by: { text: getLabelCoutFourniture(materiau) } },
    { replace: PptxTemplateTag.COUT_ENTRETIEN_MATERIAU, by: { text: getLabelCoutEntretien(materiau) } },
  ];
};

const getMateriauImageCallbacks = (materiau: Materiau): ShapeModificationCallback[] => {
  if (!materiau.image) return [];
  const setImageRelationTarget = ModifyImageHelper.setRelationTarget(
    getMateriauImagePngFilename(materiau.documentId),
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
const addMateriauRow = (slide: ISlide, slideNumber: number, materiau: Materiau, quantite: number, rowIndex: number) => {
  const rowPositionCallback = modify.updatePosition({ y: rowIndex * MATERIAU_ROW_DELTA_EMU });
  const replacements = getMateriauReplacements(materiau, quantite);

  MATERIAU_ROW_ELEMENT_NAMES.forEach((name) => {
    const callbacks: ShapeModificationCallback[] =
      name === PptxSlideElement.IMAGE_MATERIAU
        ? [...getMateriauImageCallbacks(materiau), rowPositionCallback]
        : [mergeTextRunsInElement, modify.replaceText(replacements), rowPositionCallback];

    slide.addElement(TEMPLATE_PRES_NAME, slideNumber, { name }, callbacks);
  });
};

/**
 * Slide 4: up to MAX_MATERIAUX_PAR_SLIDE materiaux for one fiche solution, using the
 * template slide's single materiau row as a blueprint. Creates as many slides as needed to
 * show every materiau with a non-empty, non-zero quantite in the estimation — none if the
 * fiche solution has no such materiau.
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
  const materiauxADisplay = getMateriauxADisplay(ficheSolution, estimationFicheSolution);
  if (materiauxADisplay.length === 0) return;

  const materiauxChunks = chunk(materiauxADisplay, MAX_MATERIAUX_PAR_SLIDE);

  materiauxChunks.forEach((materiauxChunk, chunkIndex) => {
    const [firstMateriau, ...otherMateriaux] = materiauxChunk;

    addTemplateSlide(
      slideInfo,
      [
        { replace: PptxTemplateTag.NUMERO_FICHE_SOLUTION, by: { text: `${ficheSolutionIndex + 1}` } },
        { replace: PptxTemplateTag.TITRE_FICHE_SOLUTION, by: { text: ficheSolution.titre ?? "" } },
        {
          replace: PptxTemplateTag.PAGINATION_SOLUTION_MATERIAUX,
          by: { text: materiauxChunks.length > 1 ? `${chunkIndex + 1}/${materiauxChunks.length}` : "" },
        },
        ...getMateriauReplacements(firstMateriau.materiau, firstMateriau.quantite),
      ],
      (slide) => {
        const imageCallbacks = getMateriauImageCallbacks(firstMateriau.materiau);
        if (imageCallbacks.length > 0) {
          slide.modifyElement({ name: PptxSlideElement.IMAGE_MATERIAU }, imageCallbacks);
        }

        otherMateriaux.forEach(({ materiau, quantite }, otherIndex) => {
          addMateriauRow(slide, slideInfo.number, materiau, quantite, otherIndex + 1);
        });
      },
    );
  });
};
