import { XmlElement } from "pptx-automizer";
import { stripHtmlTags } from "@/src/helpers/common";

/**
 * A run's own visual style, as a comparable string: its size, bold/italic/underline, font and
 * color. Ignores attributes that don't affect rendering (`err`, the spellcheck flag PowerPoint
 * toggles independently per run, and `dirty`), so runs PowerPoint split only for spellchecking
 * still compare equal.
 */
const getRunStyleKey = (run: XmlElement): string => {
  const rPr = run.getElementsByTagName("a:rPr")[0];
  if (!rPr) return "";

  const latin = rPr.getElementsByTagName("a:latin")[0]?.getAttribute("typeface") || "";
  const srgbClr = rPr.getElementsByTagName("a:srgbClr")[0]?.getAttribute("val") || "";
  const schemeClr = rPr.getElementsByTagName("a:schemeClr")[0]?.getAttribute("val") || "";

  return [
    rPr.getAttribute("sz") || "",
    rPr.getAttribute("b") || "",
    rPr.getAttribute("i") || "",
    rPr.getAttribute("u") || "",
    latin,
    srgbClr,
    schemeClr,
  ].join("|");
};

/**
 * Merges one run of consecutive, identically-styled <a:r> siblings into the first, dropping
 * the rest — only when their combined text still needs it (contains "{{").
 */
const mergeRunGroup = (paragraph: XmlElement, group: XmlElement[]) => {
  if (group.length <= 1) return;

  let fullText = "";
  group.forEach((run) => {
    const tNode = run.getElementsByTagName("a:t")[0];
    if (tNode) fullText += tNode.textContent || "";
  });
  if (!fullText.includes("{{")) return;

  const firstT = group[0].getElementsByTagName("a:t")[0];
  if (!firstT) return;
  firstT.textContent = fullText;

  for (let i = 1; i < group.length; i++) {
    paragraph.removeChild(group[i]);
  }
};

/**
 * Normalizes text runs inside paragraph (<a:p>) elements so that split template tags (such as
 * `{{` in one run, `nom-projet` in another, `}}` in another) are merged into a single text run
 * before `modify.replaceText` runs. Runs are grouped by their own visual style first (see
 * getRunStyleKey) before merging within each group, so a paragraph mixing several
 * differently-styled lines — joined by <a:br> rather than split into their own <a:p>, as on the
 * aides card's zone_aide_details (a bold name line, then a smaller grey porteur/échéance line)
 * — doesn't have the second line's formatting overwritten by the first's.
 */
export const mergeTextRunsInElement = (element: XmlElement) => {
  const paragraphs = element.getElementsByTagName("a:p");
  for (let p = 0; p < paragraphs.length; p++) {
    const paragraph = paragraphs[p];
    const runList = paragraph.getElementsByTagName("a:r");
    if (runList.length <= 1) continue;

    const runs: XmlElement[] = [];
    for (let r = 0; r < runList.length; r++) runs.push(runList[r]);

    let groupStart = 0;
    for (let r = 1; r <= runs.length; r++) {
      const isGroupBoundary = r === runs.length || getRunStyleKey(runs[r]) !== getRunStyleKey(runs[groupStart]);
      if (!isGroupBoundary) continue;

      mergeRunGroup(paragraph, runs.slice(groupStart, r));
      groupStart = r;
    }
  }
};

/**
 * Replaces a tag found inside a paragraph (<a:p>) by duplicating that paragraph once
 * per item in `items`, preserving its bullet/list formatting (pPr, run styles, etc.).
 * Used for dynamic-length lists (e.g. the titles of the selected fiches solutions),
 * as opposed to `modify.replaceText` which only substitutes a fixed single value.
 * If `items` is empty, the paragraph carrying the tag is removed entirely.
 */
export const replaceTagWithBulletList = (element: XmlElement, tag: string, items: string[]) => {
  const fullTag = `{{${tag}}}`;
  const paragraphs = Array.from(element.getElementsByTagName("a:p"));

  for (const paragraph of paragraphs) {
    if (!(paragraph.textContent || "").includes(fullTag)) continue;

    const parent = paragraph.parentNode;
    if (!parent) continue;

    items.forEach((itemText) => {
      const clonedParagraph = paragraph.cloneNode(true) as XmlElement;
      const runs = clonedParagraph.getElementsByTagName("a:r");
      const firstT = runs[0]?.getElementsByTagName("a:t")[0];
      if (firstT) {
        firstT.textContent = (firstT.textContent || "").replace(fullTag, itemText);
      }
      // Drop any extra runs so only the (now renamed) first run's text remains.
      while (runs.length > 1) {
        clonedParagraph.removeChild(runs[1]);
      }
      parent.insertBefore(clonedParagraph, paragraph);
    });

    parent.removeChild(paragraph);
  }
};

/**
 * Removes the SVG extension (`<asvg:svgBlip>`) from an image element's `<a:blip>`.
 *
 * A picture inserted in PowerPoint from an SVG file keeps two linked images: a PNG
 * fallback on `<a:blip r:embed>` (the one `ModifyImageHelper.setRelationTarget` swaps)
 * and the original SVG referenced through this extension, which PowerPoint still
 * prefers to render when present. Without stripping it, swapping the relation target
 * only changes the fallback and the shape keeps showing its original template SVG.
 */
export const stripSvgBlipExtension = (element: XmlElement) => {
  const blips = Array.from(element.getElementsByTagName("a:blip"));
  blips.forEach((blip) => {
    Array.from(blip.getElementsByTagName("a:extLst")).forEach((extLst) => blip.removeChild(extLst));
  });
};

/**
 * Converts an HTML rich-text field to plain text: tags stripped, whitespace collapsed to
 * single spaces. Used for rich-text fields displayed as-is on the pptx export, such as the
 * ressources utiles slide's en_savoir_plus content.
 */
export const getPlainTextFromHtml = (html?: string | null): string => {
  if (!html) return "";
  return stripHtmlTags(html).replace(/\s+/g, " ").trim();
};

/**
 * Extracts the first sentence of an HTML rich-text field as plain text. Used for the
 * materiau description on the pptx export, which only has room for a short excerpt. Falls
 * back to the full plain text if no sentence-ending punctuation is found.
 */
export const getFirstSentenceFromHtml = (html?: string | null): string => {
  const plainText = getPlainTextFromHtml(html);
  if (!plainText) return "";
  const firstSentenceMatch = plainText.match(/^.+?[.!?](?:\s|$)/);
  return (firstSentenceMatch ? firstSentenceMatch[0] : plainText).trim();
};
