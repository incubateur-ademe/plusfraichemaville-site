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
