import { modify, ShapeModificationCallback, XmlElement } from "pptx-automizer";
import { AddTemplateSlide, PptxSlideInfo } from "./types";
import { PptxSlideElement, PptxTemplateTag } from "../types";
import { getPlainTextFromHtml } from "../helpers";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

// ---------------------------------------------------------------------------------------
// Every fiche solution shown on a slide flows in the template's single
// zone_ressources_fiche_solution text box: for each fiche, a bold title paragraph followed by
// its en_savoir_plus content paragraphs. PowerPoint itself lays the text out, so the spacing
// between two fiches is a real paragraph spacing (spcBef) and stays exact whatever the
// platform's font rendering — unlike absolutely positioned boxes, which relied on an estimate
// of each block's rendered height and could end up touching or overlapping (seen on PowerPoint
// for Mac). The template's zone_titre_fiche_solution shape is only kept as a visual reference
// in the template and removed from every generated slide.
//
// Only pagination (how many fiches fit on one slide) still relies on an estimate (see
// buildSlidePlans): a misestimate can at worst make the last fiche run slightly past the
// bottom of the slide, never overlap another fiche.
// ---------------------------------------------------------------------------------------

const EMU_PER_POINT = 12700;

// Geometry read off the pristine template slide's own shapes: the title box
// (zone_titre_fiche_solution, x 576262 / y 1093598) and the content box
// (zone_ressources_fiche_solution, x 839464 / cx 9706988), indented relative to the title.
// The shared box starts where the title box was and ends where the content box ended; content
// paragraphs are indented by the template's own title-to-content x offset.
const TITLE_X_EMU = 576262;
const TITLE_Y_EMU = 1093598;
const CONTENT_X_EMU = 839464;
const CONTENT_RIGHT_EMU = CONTENT_X_EMU + 9706988;
const BOX_WIDTH_EMU = CONTENT_RIGHT_EMU - TITLE_X_EMU;
const CONTENT_INDENT_EMU = CONTENT_X_EMU - TITLE_X_EMU;
// PowerPoint's default text box insets (top/bottom 45720, left/right 91440 EMU), left unset by
// the template's bodyPr.
const BOX_VERTICAL_INSETS_EMU = 2 * 45720;
const BOX_HORIZONTAL_INSETS_EMU = 2 * 91440;
// The footer divider's own y, minus a small safety margin, is the lowest the text may extend to.
const MAX_CONTENT_BOTTOM_EMU = 6512991 - 200000;
const BOX_HEIGHT_EMU = MAX_CONTENT_BOTTOM_EMU - TITLE_Y_EMU;
const AVAILABLE_TEXT_HEIGHT_EMU = BOX_HEIGHT_EMU - BOX_VERTICAL_INSETS_EMU;

// Text sizes, as on the template's own title (sz 2000, bold) and content (sz 1200) shapes.
const TITLE_FONT_SIZE_PT = 20;
// Line heights derived from the template's own single-line box heights (title cy 400110,
// content cy 276999), minus the box insets.
const TITLE_LINE_HEIGHT_EMU = 400110 - BOX_VERTICAL_INSETS_EMU;
const CONTENT_LINE_HEIGHT_EMU = 276999 - BOX_VERTICAL_INSETS_EMU;

// Space above a fiche's first content paragraph: the gap the template shows between the title
// box's text and the content box's text (≈ 17.7pt).
const TITLE_TO_CONTENT_SPACING_PT = 18;
// Space above every fiche's title but the slide's first one — what separates two fiches.
const BETWEEN_FICHES_SPACING_PT = 24;

// Average glyph width (as a fraction of the font size), used to estimate line-wrapping for
// pagination only, since no actual text-layout engine runs at generation time.
const AVG_CHAR_WIDTH_FACTOR = 0.55;
const TITLE_CHARS_PER_LINE = Math.floor(
  (BOX_WIDTH_EMU - BOX_HORIZONTAL_INSETS_EMU) / (AVG_CHAR_WIDTH_FACTOR * TITLE_FONT_SIZE_PT * EMU_PER_POINT),
);
const CONTENT_CHARS_PER_LINE = Math.floor(
  (BOX_WIDTH_EMU - BOX_HORIZONTAL_INSETS_EMU - CONTENT_INDENT_EMU) / (AVG_CHAR_WIDTH_FACTOR * 12 * EMU_PER_POINT),
);

// Paragraph/line-break boundaries considered when estimating how many lines a fiche
// solution's en_savoir_plus HTML will wrap to (see estimateContentLineCount).
const BLOCK_BOUNDARY_REGEX = /<\/(?:p|li|h[1-6]|div|blockquote)>|<br\s*\/?>/gi;
// Blocks htmlToMultiText separates from their neighbours by a one-line spaceBefore (the
// projection of the browser's default `margin: 1em 0`); lists get one on both edges.
const MARGIN_BLOCK_OPENING_REGEX = /<(?:p|h[1-6]|blockquote)[\s>]/gi;
const LIST_OPENING_REGEX = /<(?:ul|ol)[\s>]/gi;

// HTML void elements that WYSIWYG editors commonly leave unclosed (`<br>` instead of
// `<br/>`), which the strict-ish XML parser behind modify.htmlToMultiText cannot read.
const VOID_ELEMENTS = ["br", "hr", "img"];

// modify.htmlToMultiText rebuilds every paragraph/run from scratch, only carrying over the
// template shape's font size and color (see pptx-automizer's MultiTextHelper.extractDefaultStyle)
// — never its font. Left unset, the generated runs fall back to the theme's font (Aptos in this
// template) instead of the template's own "Marianne" (DSFR) typeface used on every other slide.
// Wrapping the content in a styled block lets the HTML→multitext walk pick it up as the base
// style for every paragraph it emits, same as an inline `style="font-family"` from the CMS would.
const RESSOURCES_UTILES_FONT_FAMILY = "Marianne";

/**
 * The selected fiches solutions that actually have ressources utiles content, in their
 * selection order. Exported so the orchestrator can reuse the same filtering to decide
 * whether slides 7 and 8 are needed at all.
 */
export const getFichesSolutionsAvecRessourcesUtiles = (fichesSolutions: FicheSolution[]): FicheSolution[] =>
  fichesSolutions.filter((ficheSolution) => Boolean(getPlainTextFromHtml(ficheSolution.en_savoir_plus)));

const escapeXmlText = (text: string): string => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Best-effort normalization of a fiche solution's en_savoir_plus HTML before handing it to
 * modify.htmlToMultiText, whose XML-based parser expects closed tags: self-closes void
 * elements left open by WYSIWYG editors, and escapes any stray `&` not already part of a
 * valid entity (named, decimal or hex) so it doesn't break parsing.
 */
const sanitizeHtmlForMultiText = (html: string): string => {
  const withEscapedAmpersands = html.replace(/&(?!#\d+;|#x[0-9a-fA-F]+;|[a-zA-Z][a-zA-Z0-9]*;)/g, "&amp;");
  return VOID_ELEMENTS.reduce(
    (result, tag) =>
      result.replace(new RegExp(`<${tag}\\b([^>]*?)\\s*/?>`, "gi"), (_match, attrs: string) => `<${tag}${attrs}/>`),
    withEscapedAmpersands,
  );
};

const wrapForMultiText = (html: string): string =>
  `<body><div style="font-family: ${RESSOURCES_UTILES_FONT_FAMILY}">${html}</div></body>`;

/**
 * Runs pptx-automizer's own HTML-to-multitext conversion (bullet lists, clickable hyperlinks,
 * entity decoding) on a detached clone of the template text box, and returns the generated
 * paragraphs, still detached, ready to be appended to the real text body. The clone carries the
 * template's own placeholder run, so the generated runs inherit its size and color. Hyperlink
 * relationships are added to the slide's real relations, so they stay valid once moved.
 */
const convertHtmlToParagraphs = (
  templateElement: XmlElement,
  relation: XmlElement | undefined,
  html: string,
): XmlElement[] => {
  const scratch = templateElement.cloneNode(true) as XmlElement;
  modify.htmlToMultiText(wrapForMultiText(html))(scratch, relation);
  return Array.from(scratch.getElementsByTagName("a:p"));
};

/**
 * A fiche solution's en_savoir_plus content as paragraphs. Falls back to plain text if the
 * content still doesn't parse (malformed markup), rather than failing the whole export.
 */
const convertContentToParagraphs = (
  templateElement: XmlElement,
  relation: XmlElement | undefined,
  html: string,
): XmlElement[] => {
  try {
    return convertHtmlToParagraphs(templateElement, relation, sanitizeHtmlForMultiText(html));
  } catch (e) {
    customCaptureException("Error converting en_savoir_plus HTML to pptx multi-text, falling back to plain text", e);
    return convertHtmlToParagraphs(templateElement, relation, `<p>${escapeXmlText(getPlainTextFromHtml(html))}</p>`);
  }
};

const getParagraphProperties = (paragraph: XmlElement): XmlElement | undefined => {
  const pPr = paragraph.getElementsByTagName("a:pPr")[0];
  if (pPr) return pPr;
  const ownerDocument = paragraph.ownerDocument;
  if (!ownerDocument) return undefined;
  const created = ownerDocument.createElement("a:pPr");
  paragraph.insertBefore(created, paragraph.firstChild);
  return created;
};

/** Sets a paragraph's space before to a fixed number of points, replacing any existing one. */
const setParagraphSpaceBefore = (paragraph: XmlElement, points: number) => {
  const pPr = getParagraphProperties(paragraph);
  const ownerDocument = paragraph.ownerDocument;
  if (!pPr || !ownerDocument) return;

  Array.from(pPr.getElementsByTagName("a:spcBef")).forEach((existing) => pPr.removeChild(existing));
  const spcBef = ownerDocument.createElement("a:spcBef");
  const spcPts = ownerDocument.createElement("a:spcPts");
  spcPts.setAttribute("val", String(Math.round(points * 100)));
  spcBef.appendChild(spcPts);

  // a:spcBef must directly follow a:lnSpc when present (CT_TextParagraphProperties order).
  const lnSpc = pPr.getElementsByTagName("a:lnSpc")[0];
  pPr.insertBefore(spcBef, lnSpc ? lnSpc.nextSibling : pPr.firstChild);
};

/** Shifts a paragraph's left margin (bullet lists included) by `offsetEmu`. */
const indentParagraph = (paragraph: XmlElement, offsetEmu: number) => {
  const pPr = getParagraphProperties(paragraph);
  if (!pPr) return;
  const currentMarL = parseInt(pPr.getAttribute("marL") || "0", 10) || 0;
  pPr.setAttribute("marL", String(currentMarL + offsetEmu));
};

/**
 * Best-effort line-count estimate for a fiche solution's ressources content, approximated per
 * paragraph/list item/heading boundary from its plain-text length (see CONTENT_CHARS_PER_LINE),
 * plus the one-line gaps htmlToMultiText puts between paragraphs and around lists.
 */
const estimateContentLineCount = (html: string): number => {
  const segments = html
    .split(BLOCK_BOUNDARY_REGEX)
    .map((segment) => getPlainTextFromHtml(segment))
    .filter(Boolean);
  const textLines =
    segments.length === 0
      ? 1
      : segments.reduce((total, segment) => total + Math.max(1, Math.ceil(segment.length / CONTENT_CHARS_PER_LINE)), 0);
  const marginBlockCount = (html.match(MARGIN_BLOCK_OPENING_REGEX) ?? []).length;
  const listCount = (html.match(LIST_OPENING_REGEX) ?? []).length;
  const marginLines = Math.max(0, marginBlockCount + 2 * listCount - 1);
  return textLines + marginLines;
};

/** Estimated height of one fiche's title + content, without the spacing above its title. */
const estimateBlockHeightEmu = (ficheSolution: FicheSolution, html: string): number => {
  const titleLines = Math.max(1, Math.ceil((ficheSolution.titre ?? "").length / TITLE_CHARS_PER_LINE));
  return (
    titleLines * TITLE_LINE_HEIGHT_EMU +
    TITLE_TO_CONTENT_SPACING_PT * EMU_PER_POINT +
    estimateContentLineCount(html) * CONTENT_LINE_HEIGHT_EMU
  );
};

type RessourceBlock = {
  ficheSolution: FicheSolution;
  html: string;
  estimatedHeightEmu: number;
};

/**
 * Groups fiche solutions' title+content blocks into slide pages: a block is never split
 * across two slides (its title is never separated from its content) — if it doesn't fit in
 * what's left of the current slide, the whole block moves to a fresh one, which always fits
 * at least one block even if that block's own estimated height alone exceeds the page.
 */
const buildSlidePlans = (blocks: RessourceBlock[]): RessourceBlock[][] => {
  const slidePlans: RessourceBlock[][] = [];
  let currentPlan: RessourceBlock[] = [];
  let usedHeightEmu = 0;

  blocks.forEach((block) => {
    const spacingAboveEmu = currentPlan.length > 0 ? BETWEEN_FICHES_SPACING_PT * EMU_PER_POINT : 0;
    const wouldOverflow =
      currentPlan.length > 0 && usedHeightEmu + spacingAboveEmu + block.estimatedHeightEmu > AVAILABLE_TEXT_HEIGHT_EMU;
    if (wouldOverflow) {
      slidePlans.push(currentPlan);
      currentPlan = [];
      usedHeightEmu = 0;
    } else {
      usedHeightEmu += spacingAboveEmu;
    }

    currentPlan.push(block);
    usedHeightEmu += block.estimatedHeightEmu;
  });

  if (currentPlan.length > 0) slidePlans.push(currentPlan);
  return slidePlans;
};

/**
 * Fills the template's zone_ressources_fiche_solution box with every fiche of the slide, one
 * title paragraph + its content paragraphs after another, then drops the template's own
 * placeholder paragraph. The box is moved to where the template's title box was, and stretched
 * to the full available height.
 */
const applyRessourcesUtilesBlocks = (blocks: RessourceBlock[]): ShapeModificationCallback => {
  return (element, relation) => {
    const txBody = element.getElementsByTagName("p:txBody")[0];
    if (!txBody) return;
    const placeholderParagraphs = Array.from(txBody.getElementsByTagName("a:p"));

    blocks.forEach((block, index) => {
      const titleHtml = `<p style="font-size: ${TITLE_FONT_SIZE_PT}pt"><b>${escapeXmlText(
        block.ficheSolution.titre ?? "",
      )}</b></p>`;
      const titleParagraphs = convertHtmlToParagraphs(element, relation, titleHtml);
      const contentParagraphs = convertContentToParagraphs(element, relation, block.html);

      titleParagraphs.forEach((paragraph, paragraphIndex) => {
        if (paragraphIndex === 0) setParagraphSpaceBefore(paragraph, index === 0 ? 0 : BETWEEN_FICHES_SPACING_PT);
        txBody.appendChild(paragraph);
      });
      contentParagraphs.forEach((paragraph, paragraphIndex) => {
        indentParagraph(paragraph, CONTENT_INDENT_EMU);
        if (paragraphIndex === 0) setParagraphSpaceBefore(paragraph, TITLE_TO_CONTENT_SPACING_PT);
        txBody.appendChild(paragraph);
      });
    });

    placeholderParagraphs.forEach((paragraph) => paragraph.parentNode?.removeChild(paragraph));
    modify.setPosition({ x: TITLE_X_EMU, y: TITLE_Y_EMU, w: BOX_WIDTH_EMU, h: BOX_HEIGHT_EMU })(element);
  };
};

/**
 * Slide 8: every selected fiche solution's ressources utiles (its en_savoir_plus field),
 * flowing one title+content block below another in a single text box — as many as estimated
 * to fit per slide (see buildSlidePlans). The pagination tag shows "i/N" once more than one
 * slide was needed, and is left empty otherwise.
 */
export const addRessourcesUtilesSlides = (
  addTemplateSlide: AddTemplateSlide,
  slideInfo: PptxSlideInfo,
  fichesSolutionsAvecRessourcesUtiles: FicheSolution[],
) => {
  const blocks: RessourceBlock[] = fichesSolutionsAvecRessourcesUtiles.map((ficheSolution) => {
    const html = getPlainTextFromHtml(ficheSolution.en_savoir_plus) ? (ficheSolution.en_savoir_plus as string) : "";
    return { ficheSolution, html, estimatedHeightEmu: estimateBlockHeightEmu(ficheSolution, html) };
  });

  const slidePlans = buildSlidePlans(blocks);

  slidePlans.forEach((slidePlan, planIndex) => {
    addTemplateSlide(
      slideInfo,
      [
        {
          replace: PptxTemplateTag.PAGINATION_RESSOURCES_UTILES,
          by: { text: slidePlans.length > 1 ? `${planIndex + 1}/${slidePlans.length}` : "" },
        },
      ],
      (slide) => {
        slide.modifyElement(
          { name: PptxSlideElement.ZONE_RESSOURCES_UTILES_FICHE_SOLUTION },
          applyRessourcesUtilesBlocks(slidePlan),
        );
      },
      [PptxSlideElement.ZONE_TITRE_FICHE_SOLUTION_RESSOURCES_UTILES],
    );
  });
};
