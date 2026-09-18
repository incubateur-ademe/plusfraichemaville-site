import { ISlide, modify, ReplaceText, ShapeModificationCallback } from "pptx-automizer";
import { AddTemplateSlide, PptxSlideInfo } from "./types";
import { chunk } from "./fiche-solution-materiaux";
import { mergeTextRunsInElement } from "../helpers";
import { PptxSlideElement, PptxTemplateTag } from "../types";
import { ProjetAideWithAide } from "@/src/lib/prisma/prismaCustomTypes";
import { TypeAidesTerritoiresAide } from "@/src/components/financement/types";
import { fetchAideFromAidesTerritoiresById } from "@/src/lib/aidesTerritoires/fetch";
import { dateToStringWithoutTime } from "@/src/helpers/dateUtils";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

// The source template's "template" alias, as loaded in generate-synthese-projet-pptx.ts.
const TEMPLATE_PRES_NAME = "template";

export const MAX_AIDES_PAR_SLIDE = 3;

// ---------------------------------------------------------------------------------------
// Layout geometry (EMU), read off the template slide's own single, pristine contour_aide
// card. Every card is placed as a whole at a computed absolute Y offset from that pristine
// card, same technique as the materiau row (fiche-solution-materiaux.ts): each shape within a
// card keeps its own offset from the card's anchor shape (contour_aide), so only the card's
// vertical position ever changes.
// ---------------------------------------------------------------------------------------

const CARD_TOP_EMU = 1436010; // contour_aide's own y
const CARD_HEIGHT_EMU = 1319489; // contour_aide's own cy
// The footer divider's own y, minus a small safety margin — same convention as
// estimation-recap.ts / ressources-utiles.ts.
const MAX_CONTENT_BOTTOM_EMU = 6512991 - 200000;

// Moves the "Lien vers l'aide" zone far below the visible slide when an aide has no
// origin_url, instead of removing it: addTemplateSlide's own pass already queues a
// modifyElement for every text-bearing shape (to apply the tags shared by every slide), and a
// later slide.removeElement for that same shape would silently no-op — same reasoning as
// estimation-recap.ts's own hideElements.
const HIDE_Y_EMU = 30000000;

// MAX_AIDES_PAR_SLIDE cards, evenly spread between the template's own card position and the
// footer, so the last card's bottom lands exactly on MAX_CONTENT_BOTTOM_EMU.
const AVAILABLE_HEIGHT_EMU = MAX_CONTENT_BOTTOM_EMU - CARD_TOP_EMU;
const CARD_GAP_EMU = (AVAILABLE_HEIGHT_EMU - MAX_AIDES_PAR_SLIDE * CARD_HEIGHT_EMU) / (MAX_AIDES_PAR_SLIDE - 1);
const CARD_DELTA_EMU = CARD_HEIGHT_EMU + CARD_GAP_EMU;

/**
 * One aide's display data, resolved once for the whole export: the fields cached on the
 * projet's own aide row (name, type, financers, submission_deadline) plus the aide's live
 * origin_url, fetched from Aides Territoires since it isn't cached in our own database (see
 * buildAidesCardData). undefined when the aide has no origin_url — the "Lien vers l'aide" line
 * is then hidden instead of shown with a dead link.
 */
export type AideCardData = {
  type: string;
  nom: string;
  financiers: string;
  echeance: string;
  originUrl: string | undefined;
};

const getAideTypeLabel = (type: string): string =>
  type === TypeAidesTerritoiresAide.financement ? "Financement" : "Soutien à l'ingénierie";

/**
 * Resolves the display data for every selected aide, in the given order. Everything but
 * origin_url is already cached on the projet's own aide row; origin_url is fetched live from
 * Aides Territoires (best-effort — a failed fetch just leaves that aide's card without a link
 * instead of failing the whole export).
 */
export const buildAidesCardData = async (projetAides: ProjetAideWithAide[]): Promise<AideCardData[]> => {
  return Promise.all(
    projetAides.map(async ({ aide }) => {
      let originUrl: string | undefined;
      try {
        const aideTerritoire = await fetchAideFromAidesTerritoiresById(aide.aideTerritoireId);
        originUrl = aideTerritoire?.origin_url ?? undefined;
      } catch (e) {
        customCaptureException("Error fetching aide territoire origin_url for synthese projet pptx", e);
      }

      return {
        type: getAideTypeLabel(aide.type),
        nom: aide.name ?? "",
        financiers: aide.financers.length > 0 ? aide.financers.join(", ") : "Non communiqué",
        echeance: dateToStringWithoutTime(aide.submission_deadline) ?? "Non indiquée",
        originUrl,
      };
    }),
  );
};

const getAideReplacements = (aide: AideCardData): ReplaceText[] => [
  { replace: PptxTemplateTag.AIDE_TYPE, by: { text: aide.type } },
  { replace: PptxTemplateTag.AIDE_NOM, by: { text: aide.nom } },
  { replace: PptxTemplateTag.AIDE_FINANCIERS, by: { text: aide.financiers } },
  { replace: PptxTemplateTag.AIDE_ECHEANCE, by: { text: aide.echeance } },
  { replace: PptxTemplateTag.AIDE_LIEN, by: { text: "Lien vers l'aide" } },
];

const getAideLienCallbacks = (aide: AideCardData): ShapeModificationCallback[] =>
  aide.originUrl
    ? [modify.setHyperlinkTarget(aide.originUrl)]
    : [modify.removeHyperlink(), modify.setPosition({ y: HIDE_Y_EMU })];

// Every shape making up one aide card: the contour, its texts, and the "Lien vers l'aide"
// hyperlink zone.
const AIDE_CARD_ELEMENT_NAMES = [
  PptxSlideElement.CONTOUR_AIDE,
  PptxSlideElement.ZONE_TYPE_AIDE,
  PptxSlideElement.ZONE_TITRE_AIDE,
  PptxSlideElement.ZONE_DETAILS_AIDE,
  PptxSlideElement.ZONE_LIEN_AIDE,
];

/**
 * Duplicates the whole aide card (contour_aide + its texts and hyperlink) from the pristine
 * template slide onto the slide being built, shifted down by `cardIndex` cards. Used for the
 * 2nd and 3rd aide of a slide — the 1st reuses the card already present on the template slide.
 */
const addAideCard = (slide: ISlide, slideNumber: number, aide: AideCardData, cardIndex: number) => {
  const cardPositionCallback = modify.updatePosition({ y: cardIndex * CARD_DELTA_EMU });
  const replacements = getAideReplacements(aide);

  AIDE_CARD_ELEMENT_NAMES.forEach((name) => {
    const isLienZone = name === PptxSlideElement.ZONE_LIEN_AIDE;
    const callbacks: ShapeModificationCallback[] = [
      mergeTextRunsInElement,
      modify.replaceText(replacements),
      cardPositionCallback,
      ...(isLienZone ? getAideLienCallbacks(aide) : []),
    ];
    slide.addElement(TEMPLATE_PRES_NAME, slideNumber, { name }, callbacks);
  });
};

/**
 * Slide 8: up to MAX_AIDES_PAR_SLIDE aide cards per slide, using the template slide's single
 * card as a blueprint. Creates as many slides as needed to show every selected aide, and only
 * runs at all when at least one aide was passed to the export (see
 * generate-synthese-projet-pptx.ts).
 */
export const addAidesSlides = (addTemplateSlide: AddTemplateSlide, slideInfo: PptxSlideInfo, aides: AideCardData[]) => {
  const aidesChunks = chunk(aides, MAX_AIDES_PAR_SLIDE);

  aidesChunks.forEach((aidesChunk, chunkIndex) => {
    const [firstAide, ...otherAides] = aidesChunk;

    addTemplateSlide(
      slideInfo,
      [
        {
          replace: PptxTemplateTag.PAGINATION_AIDES,
          by: { text: aidesChunks.length > 1 ? `${chunkIndex + 1}/${aidesChunks.length}` : "" },
        },
        ...getAideReplacements(firstAide),
      ],
      (slide) => {
        slide.modifyElement({ name: PptxSlideElement.ZONE_LIEN_AIDE }, getAideLienCallbacks(firstAide));

        otherAides.forEach((aide, otherIndex) => addAideCard(slide, slideInfo.number, aide, otherIndex + 1));
      },
    );
  });
};
