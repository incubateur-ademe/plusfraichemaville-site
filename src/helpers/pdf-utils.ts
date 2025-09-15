import * as htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";

export const generatePdf = async (filename: string = "export", nodeId: string, callback?: () => void) => {
  const node = document.querySelector<HTMLElement>(nodeId);
  const width = 1300;
  const height = 2000;

  if (node) {
    node.style.width = `${width}px`;
    node.style.height = `${height}px`;

    htmlToImage
      .toJpeg(node, { quality: 1, canvasHeight: 1850, includeQueryParams: true })
      .then((dataUrl) => {
        const pdf = new jsPDF();
        const img = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (img.height * pdfWidth) / img.width;
        pdf.addImage(dataUrl, "jpg", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${filename}.pdf`);
      })
      .then(() => {
        if (callback) {
          callback();
        }
      });
  }
};
