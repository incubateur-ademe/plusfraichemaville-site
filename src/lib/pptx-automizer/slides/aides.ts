import { modify, ReplaceText, ShapeModificationCallback, XmlElement } from "pptx-automizer";
import { AddTemplateSlide, PptxSlideInfo } from "./types";
import { mergeTextRunsInElement, replaceTagWithBulletList } from "../helpers";
import { PptxSlideElement, PptxTemplateTag } from "../types";
import { ProjetAideWithAide } from "@/src/lib/prisma/prismaCustomTypes";
import { TypeAidesTerritoiresAide } from "@/src/components/financement/types";
import { fetchAideFromAidesTerritoiresById } from "@/src/lib/aidesTerritoires/fetch";
import { dateToStringWithoutTime } from "@/src/helpers/dateUtils";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

// ---------------------------------------------------------------------------------------
// Layout geometry (EMU/points), read off the template slide's own single, pristine zone_aide
// text box — every field of one aide (type, nom, financiers, echeance, lien) lives in this one
// bulleted box, as a fixed 6-paragraph block: "{{aide_nom}}" (bold 14pt) + a line break +
// "{{aide_type}}" (11pt) in one bulleted paragraph, then "Porteur : {{aide_financiers}}",
// "Échéance : {{aide_echeance}}" and "{{aide_lien}}" as bulleted sub-items, then two blank
// bulleted lines that double as the gap before the next aide's block. Every aide's block is
// cloned from that pristine paragraph set and appended after the previous one, so they all flow
// in the same shared text box — as many as estimated to fit (see buildAideSlidePlans), spilling
// onto a fresh slide otherwise.
// ---------------------------------------------------------------------------------------

const CARD_TOP_EMU = 1359256; // zone_aide's own y
// The footer divider's own y, minus a small safety margin — same convention as
// estimation-recap.ts / ressources-utiles.ts.
const MAX_CONTENT_BOTTOM_EMU = 6512991 - 200000;
// zone_aide is resized to this height on every generated slide — regardless of how many aides
// it ends up holding — so its own normAutofit only ever has to correct for a misestimate,
// instead of routinely shrinking the text to fit the template's single-card height.
const AVAILABLE_HEIGHT_EMU = MAX_CONTENT_BOTTOM_EMU - CARD_TOP_EMU;

const EMU_PER_POINT = 12700;
// "{{aide_nom}}" + <br> + "{{aide_type}}": one paragraph, bullet level 0 (marL 285750), both
// lines set at the template's own exact 14pt line spacing regardless of the 14pt/11pt run sizes.
const LEVEL_0_MARGIN_EMU = 285750;
const LEVEL_0_LINE_HEIGHT_EMU = 14 * EMU_PER_POINT;
// "Porteur : ...", "Échéance : ...", "{{aide_lien}}": bullet level 1 (marL 628650), sz 1100 at
// 150% line spacing.
const LEVEL_1_MARGIN_EMU = 628650;
const LEVEL_1_LINE_HEIGHT_EMU = 11 * 1.5 * EMU_PER_POINT;
// The two blank bulleted lines the template ends the card on, at its own exact 14pt spacing.
const SPACER_LINE_COUNT = 2;
const SPACER_LINE_HEIGHT_EMU = 14 * EMU_PER_POINT;

// Average glyph width, used to estimate line-wrapping since no actual text-layout engine runs
// at generation time — PowerPoint only lays out the real text once the file is opened.
// Deliberately narrow (an underestimate of a typical ~0.5em average) so a block's height is
// never underestimated, same convention as ressources-utiles.ts's own CONTENT_AVG_CHAR_WIDTH_EMU.
const CHAR_WIDTH_FACTOR = 0.55;
const CONTENT_WIDTH_EMU = 10187280; // zone_aide's own cx
const CHARS_PER_LINE_NOM = Math.floor(
  (CONTENT_WIDTH_EMU - LEVEL_0_MARGIN_EMU) / (CHAR_WIDTH_FACTOR * 14 * EMU_PER_POINT),
);
const CHARS_PER_LINE_LEVEL_1 = Math.floor(
  (CONTENT_WIDTH_EMU - LEVEL_1_MARGIN_EMU) / (CHAR_WIDTH_FACTOR * 11 * EMU_PER_POINT),
);

/**
 * One aide's display data, resolved once for the whole export: the fields cached on the
 * projet's own aide row (name, type, financers, submission_deadline) plus the aide's live
 * origin_url, fetched from Aides Territoires since it isn't cached in our own database (see
 * buildAidesCardData). undefined when the aide has no origin_url — the "Lien vers l'aide" line
 * is then dropped instead of shown with a dead link.
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

// AIDE_LIEN is deliberately left out: it isn't a plain 1:1 substitution like the others (see
// buildAideBlockParagraphs below), so it must never be applied by a generic replaceText pass.
const getAideReplacements = (aide: AideCardData): ReplaceText[] => [
  { replace: PptxTemplateTag.AIDE_TYPE, by: { text: aide.type } },
  { replace: PptxTemplateTag.AIDE_NOM, by: { text: aide.nom } },
  { replace: PptxTemplateTag.AIDE_FINANCIERS, by: { text: aide.financiers } },
  { replace: PptxTemplateTag.AIDE_ECHEANCE, by: { text: aide.echeance } },
];

const estimateWrappedLineCount = (text: string, charsPerLine: number): number =>
  Math.max(1, Math.ceil(text.length / charsPerLine));

/**
 * Best-effort height estimate (EMU) for one aide's whole 6-paragraph block — see the module
 * comment for its fixed shape. Only "nom" and "financiers" are free text long enough to
 * plausibly wrap (type is one of two short fixed labels, echeance is a short formatted date,
 * lien is a fixed short label); the rest is a straight line count from the template's own
 * paragraph spacing.
 */
const estimateAideBlockHeightEmu = (aide: AideCardData): number => {
  const nomLines = estimateWrappedLineCount(aide.nom, CHARS_PER_LINE_NOM);
  const typeLines = 1;
  const financiersLines = estimateWrappedLineCount(`Porteur : ${aide.financiers}`, CHARS_PER_LINE_LEVEL_1);
  const echeanceLines = 1;
  const lienLines = aide.originUrl ? 1 : 0;

  return (
    (nomLines + typeLines) * LEVEL_0_LINE_HEIGHT_EMU +
    (financiersLines + echeanceLines + lienLines) * LEVEL_1_LINE_HEIGHT_EMU +
    SPACER_LINE_COUNT * SPACER_LINE_HEIGHT_EMU
  );
};

/**
 * Groups aides into slide pages: an aide's block is never split across two slides — if it
 * doesn't fit in what's left of the current slide's zone_aide box, the whole block moves to a
 * fresh slide, which always fits at least one block even if that block's own estimated height
 * alone exceeds the box.
 */
const buildAideSlidePlans = (aides: AideCardData[]): AideCardData[][] => {
  const slidePlans: AideCardData[][] = [];
  let currentPlan: AideCardData[] = [];
  let cursorHeightEmu = 0;

  aides.forEach((aide) => {
    const blockHeightEmu = estimateAideBlockHeightEmu(aide);
    const wouldOverflow = currentPlan.length > 0 && cursorHeightEmu + blockHeightEmu > AVAILABLE_HEIGHT_EMU;
    if (wouldOverflow) {
      slidePlans.push(currentPlan);
      currentPlan = [];
      cursorHeightEmu = 0;
    }

    currentPlan.push(aide);
    cursorHeightEmu += blockHeightEmu;
  });

  if (currentPlan.length > 0) slidePlans.push(currentPlan);
  return slidePlans;
};

/**
 * Clones the template's 6 pristine paragraphs (already merged into single-run tags by the
 * caller) into a detached scratch element, substitutes this aide's own tags into the clone —
 * isolated from every other aide's block, so runs of the shared "{{aide_nom}}" etc. tags never
 * collide across aides — and returns the resulting paragraphs, still detached, ready to be
 * appended to the real zone_aide text body.
 */
const buildAideBlockParagraphs = async (
  templateParagraphs: XmlElement[],
  aide: AideCardData,
  zoneAideElement: XmlElement,
  relation: XmlElement | undefined,
): Promise<XmlElement[]> => {
  const ownerDocument = zoneAideElement.ownerDocument;
  if (!ownerDocument) return [];
  const scratch = ownerDocument.createElement("scratch");
  templateParagraphs.forEach((paragraph) => scratch.appendChild(paragraph.cloneNode(true) as XmlElement));

  modify.replaceText(getAideReplacements(aide))(scratch);
  // The "Lien vers l'aide" bullet carries the template's own hyperlink (already pointing at a
  // placeholder target). With no live origin_url, the whole bullet paragraph is dropped instead
  // of left as a dead link; otherwise its tag is swapped for the visible label and the
  // template's hyperlink is repointed at the real URL.
  replaceTagWithBulletList(scratch, PptxTemplateTag.AIDE_LIEN, aide.originUrl ? ["Lien vers l'aide"] : []);
  if (aide.originUrl && relation) {
    await modify.setHyperlinkTarget(aide.originUrl)(scratch, relation);
  }

  return Array.from(scratch.getElementsByTagName("a:p"));
};

/**
 * Builds every aide's block in order and appends them one after another into zone_aide's own
 * text body, then drops the original pristine paragraphs. Also grows the box to the full
 * available height (see AVAILABLE_HEIGHT_EMU) so its normAutofit has real room to work with,
 * instead of shrinking text to fit the template's single-card height as soon as a second aide
 * is appended.
 */
const applyAidesToZoneAide = (aidesForSlide: AideCardData[]): ShapeModificationCallback => {
  return async (element, relation) => {
    modify.setPosition({ h: AVAILABLE_HEIGHT_EMU })(element);
    mergeTextRunsInElement(element);

    const txBody = element.getElementsByTagName("p:txBody")[0];
    if (!txBody) return;

    const templateParagraphs = Array.from(txBody.getElementsByTagName("a:p"));

    for (const aide of aidesForSlide) {
      const blockParagraphs = await buildAideBlockParagraphs(templateParagraphs, aide, element, relation);
      blockParagraphs.forEach((paragraph) => txBody.appendChild(paragraph));
    }

    templateParagraphs.forEach((paragraph) => paragraph.parentNode?.removeChild(paragraph));
  };
};

/**
 * Slide 8: every selected aide's block, flowing one below another in the slide's single
 * zone_aide text box — as many as estimated to fit (see buildAideSlidePlans). Creates as many
 * slides as needed to show every selected aide, and only runs at all when at least one aide was
 * passed to the export (see generate-synthese-projet-pptx.ts).
 */
export const addAidesSlides = (addTemplateSlide: AddTemplateSlide, slideInfo: PptxSlideInfo, aides: AideCardData[]) => {
  const slidePlans = buildAideSlidePlans(aides);

  slidePlans.forEach((slidePlan, planIndex) => {
    addTemplateSlide(
      slideInfo,
      [
        {
          replace: PptxTemplateTag.PAGINATION_AIDES,
          by: { text: slidePlans.length > 1 ? `${planIndex + 1}/${slidePlans.length}` : "" },
        },
      ],
      (slide) => {
        slide.modifyElement({ name: PptxSlideElement.ZONE_AIDE }, applyAidesToZoneAide(slidePlan));
      },
    );
  });
};
