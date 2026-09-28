import { ISlide, modify, ShapeModificationCallback } from "pptx-automizer";
import { AddTemplateSlide, PptxSlideInfo } from "./types";
import { PptxSlideElement, PptxTemplateTag } from "../types";
import { getPlainTextFromHtml, mergeTextRunsInElement } from "../helpers";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

// The source template's "template" alias, as loaded in generate-synthese-projet-pptx.ts.
const TEMPLATE_PRES_NAME = "template";

// Layout constants (EMU), read off the pristine template slide (8)'s own shapes: a fiche
// solution's title (zone_titre_fiche_solution) directly above its ressources content
// (zone_ressources_fiche_solution). Reused to flow every selected fiche solution's title +
// content one below another, as many as fit per slide (see buildSlidePlans below), the same
// read-off-the-template approach as estimation-recap.ts.
const TITLE_TOP_EMU = 1093598; // zone_titre_fiche_solution's own y
const TITLE_HEIGHT_EMU = 400110; // zone_titre_fiche_solution's cy (single line, sz 2000, bold)
const CONTENT_TOP_EMU = 1626616; // zone_ressources_fiche_solution's own y
// The template's own title-to-content gap; reused between two different fiches' blocks too.
const BLOCK_GAP_EMU = CONTENT_TOP_EMU - (TITLE_TOP_EMU + TITLE_HEIGHT_EMU);
const CONTENT_WIDTH_EMU = 9706988; // zone_ressources_fiche_solution's cx
// PowerPoint's default text box insets (top 45720 + bottom 45720 EMU), left unset by the
// template's bodyPr, and the resulting line height derived from the template's own
// single-line content box height (cy 276999, at the content's sz 1200 = 12pt).
const CONTENT_BOX_VERTICAL_INSETS_EMU = 91440;
const CONTENT_LINE_HEIGHT_EMU = 276999 - CONTENT_BOX_VERTICAL_INSETS_EMU;
// Average glyph width for Calibri at the content's font size, used to estimate line-wrapping
// since no actual text-layout engine runs at generation time — PowerPoint only lays out the
// real text once the file is opened. Deliberately narrower than a typical measured average
// (~0.5em) to avoid underestimating a block's height and overflowing past the next block.
const CONTENT_AVG_CHAR_WIDTH_EMU = 0.55 * 12 * 12700;
const CONTENT_CHARS_PER_LINE = Math.floor(CONTENT_WIDTH_EMU / CONTENT_AVG_CHAR_WIDTH_EMU);
// The footer divider's own y, minus a small safety margin, is the lowest a block may extend to.
const MAX_CONTENT_BOTTOM_EMU = 6512991 - 200000;

// Paragraph/line-break boundaries considered when estimating how many lines a fiche
// solution's en_savoir_plus HTML will wrap to (see estimateContentLineCount).
const BLOCK_BOUNDARY_REGEX = /<\/(?:p|li|h[1-6]|div|blockquote)>|<br\s*\/?>/gi;

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

/**
 * Converts a fiche solution's en_savoir_plus HTML (paragraphs, bullet lists, links) into the
 * ressources content shape's real pptx paragraphs — bullet lists and clickable hyperlinks
 * included — via pptx-automizer's own HTML-to-multitext conversion, which also takes care of
 * decoding HTML entities (e.g. `&amp;`) correctly. Falls back to plain text if the content
 * still doesn't parse (malformed markup), rather than failing the whole export.
 */
const applyRessourcesUtilesContent = (html: string): ShapeModificationCallback => {
  return (element, relation) => {
    try {
      modify.htmlToMultiText(
        `<body><div style="font-family: ${RESSOURCES_UTILES_FONT_FAMILY}">${sanitizeHtmlForMultiText(
          html,
        )}</div></body>`,
      )(element, relation);
    } catch (e) {
      customCaptureException("Error converting en_savoir_plus HTML to pptx multi-text, falling back to plain text", e);
      modify.setText(getPlainTextFromHtml(html))(element);
    }
  };
};

/**
 * Best-effort line-count estimate for a fiche solution's ressources content: no actual
 * text-layout engine runs at generation time, so wrapping is approximated per paragraph/list
 * item/heading boundary, from its plain-text length and the content box's own known width and
 * font size (see CONTENT_CHARS_PER_LINE above).
 */
const estimateContentLineCount = (html: string): number => {
  const segments = html
    .split(BLOCK_BOUNDARY_REGEX)
    .map((segment) => getPlainTextFromHtml(segment))
    .filter(Boolean);
  if (segments.length === 0) return 1;
  return segments.reduce(
    (total, segment) => total + Math.max(1, Math.ceil(segment.length / CONTENT_CHARS_PER_LINE)),
    0,
  );
};

const estimateBlockHeightEmu = (html: string): number => {
  const contentHeightEmu = CONTENT_BOX_VERTICAL_INSETS_EMU + estimateContentLineCount(html) * CONTENT_LINE_HEIGHT_EMU;
  return TITLE_HEIGHT_EMU + BLOCK_GAP_EMU + contentHeightEmu;
};

type RessourceBlock = {
  ficheSolution: FicheSolution;
  html: string;
  estimatedHeightEmu: number;
};

type RessourceBlockPlacement = {
  ficheSolution: FicheSolution;
  html: string;
  titleY: number;
  contentY: number;
};

/**
 * Groups fiche solutions' title+content blocks into slide pages: a block is never split
 * across two slides (its title is never separated from its content) — if it doesn't fit in
 * what's left of the current slide, the whole block moves to a fresh one, which always fits
 * at least one block even if that block's own estimated height alone exceeds the page.
 */
const buildSlidePlans = (blocks: RessourceBlock[]): RessourceBlockPlacement[][] => {
  const slidePlans: RessourceBlockPlacement[][] = [];
  let currentPlan: RessourceBlockPlacement[] = [];
  let cursorY = TITLE_TOP_EMU;

  blocks.forEach((block) => {
    const wouldOverflow = currentPlan.length > 0 && cursorY + block.estimatedHeightEmu > MAX_CONTENT_BOTTOM_EMU;
    if (wouldOverflow) {
      slidePlans.push(currentPlan);
      currentPlan = [];
      cursorY = TITLE_TOP_EMU;
    }

    const titleY = cursorY;
    const contentY = titleY + TITLE_HEIGHT_EMU + BLOCK_GAP_EMU;
    currentPlan.push({ ficheSolution: block.ficheSolution, html: block.html, titleY, contentY });
    cursorY += block.estimatedHeightEmu + BLOCK_GAP_EMU;
  });

  if (currentPlan.length > 0) slidePlans.push(currentPlan);
  return slidePlans;
};

/**
 * Places one fiche solution's title+content block at its computed absolute Y. The first block
 * on a slide reuses the template's own pristine shapes (useTemplateShape); every subsequent
 * one is cloned from the pristine template slide, same pattern as estimation-recap.ts.
 */
const placeBlock = (
  slide: ISlide,
  slideNumber: number,
  placement: RessourceBlockPlacement,
  useTemplateShape: boolean,
) => {
  const titleCallbacks: ShapeModificationCallback[] = [
    mergeTextRunsInElement,
    modify.replaceText([
      { replace: PptxTemplateTag.TITRE_FICHE_SOLUTION, by: { text: placement.ficheSolution.titre ?? "" } },
    ]),
    modify.setPosition({ y: placement.titleY }),
  ];
  const contentCallbacks: ShapeModificationCallback[] = [
    applyRessourcesUtilesContent(placement.html),
    modify.setPosition({ y: placement.contentY }),
  ];

  if (useTemplateShape) {
    slide.modifyElement({ name: PptxSlideElement.ZONE_TITRE_FICHE_SOLUTION_RESSOURCES_UTILES }, titleCallbacks);
    slide.modifyElement({ name: PptxSlideElement.ZONE_RESSOURCES_UTILES_FICHE_SOLUTION }, contentCallbacks);
  } else {
    slide.addElement(
      TEMPLATE_PRES_NAME,
      slideNumber,
      { name: PptxSlideElement.ZONE_TITRE_FICHE_SOLUTION_RESSOURCES_UTILES },
      titleCallbacks,
    );
    slide.addElement(
      TEMPLATE_PRES_NAME,
      slideNumber,
      { name: PptxSlideElement.ZONE_RESSOURCES_UTILES_FICHE_SOLUTION },
      contentCallbacks,
    );
  }
};

/**
 * Slide 8: every selected fiche solution's ressources utiles (its en_savoir_plus field),
 * flowing one title+content block below another — as many as fit per slide (see
 * buildSlidePlans). The pagination tag shows "i/N" once more than one slide was needed, and
 * is left empty otherwise.
 */
export const addRessourcesUtilesSlides = (
  addTemplateSlide: AddTemplateSlide,
  slideInfo: PptxSlideInfo,
  fichesSolutionsAvecRessourcesUtiles: FicheSolution[],
) => {
  const blocks: RessourceBlock[] = fichesSolutionsAvecRessourcesUtiles.map((ficheSolution) => {
    const html = getPlainTextFromHtml(ficheSolution.en_savoir_plus) ? (ficheSolution.en_savoir_plus as string) : "";
    return { ficheSolution, html, estimatedHeightEmu: estimateBlockHeightEmu(html) };
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
        slidePlan.forEach((placement, index) => placeBlock(slide, slideInfo.number, placement, index === 0));
      },
    );
  });
};
