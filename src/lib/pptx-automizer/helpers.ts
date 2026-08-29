import { XmlElement } from "pptx-automizer";

/**
 * Normalizes text runs inside paragraph (<a:p>) elements so that split template tags
 * (such as `{{` in one run, `nom-projet` in another, `}}` in another) are merged
 * into a single text run before `modify.replaceText` runs.
 */
export const mergeTextRunsInElement = (element: XmlElement) => {
  const paragraphs = element.getElementsByTagName("a:p");
  for (let p = 0; p < paragraphs.length; p++) {
    const paragraph = paragraphs[p];
    const runs = paragraph.getElementsByTagName("a:r");
    if (runs.length <= 1) continue;

    let fullText = "";
    for (let r = 0; r < runs.length; r++) {
      const tNode = runs[r].getElementsByTagName("a:t")[0];
      if (tNode) {
        fullText += tNode.textContent || "";
      }
    }

    if (fullText.includes("{{")) {
      const firstRun = runs[0];
      const firstT = firstRun.getElementsByTagName("a:t")[0];
      if (firstT) {
        firstT.textContent = fullText;
        while (runs.length > 1) {
          paragraph.removeChild(runs[1]);
        }
      }
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
