import * as htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";
import { ClimadiagIndicateursHeader } from "./climadiag-indicateurs-header";
import { ClimadiagViewerHeader } from "./climadiag-viewer-header";
import { Separator } from "../common/separator";
import { Climadiag } from "./types";
import { ClimadiagViewerItem } from "./climadiag-viewer-item";
import { useEffect, useRef } from "react";

type ClimadiagViewerProps = {
  data: Climadiag;
  close: () => void;
};

export const ClimadiagViewer = ({ data, close }: ClimadiagViewerProps) => {
  const filename = `${data.nom}-${data.code_postal}`;

  const ignore = useRef(false);

  useEffect(() => {
    !ignore.current && generatePdf(`Climadiag-${filename}`, "#climadiag-viewer", close);
    return () => {
      ignore.current = true;
    };
  }, [filename, close]);

  return (
    <div className="relative bg-white">
      <div className="fixed w-screen top-0 left-0 -z-[9] h-[2000px] bg-white"></div>
      <div id="climadiag-viewer" className="bg-white top-0 w-screen h-[2000px] -z-20 fixed left-0">
        <div>
          <div className="px-14 py-10">
            <ClimadiagViewerHeader />
            <Separator className="mt-6 mb-10" />
            <div className="mb-8">
              <ClimadiagIndicateursHeader city={`${data.nom} ${data.code_postal}`} viewer />
            </div>
            <ClimadiagViewerItem data={data} year={2030} />
            <ClimadiagViewerItem data={data} year={2050} />
            <ClimadiagViewerItem data={data} year={2100} />
          </div>
        </div>
      </div>
    </div>
  );
};

const generatePdf = async (filename: string = "export", nodeId: string, callback?: () => void) => {
  const node = document.querySelector<HTMLElement>(nodeId);
  const width = 1300;
  const height = 2000;

  if (node) {
    node.style.width = `${width}px`;
    node.style.height = `${height}px`;

    htmlToImage
      .toJpeg(node, { quality: 1 })
      .then((dataUrl) => {
        const pdf = new jsPDF({
          format: [width, height],
        });
        const img = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (img.height * pdfWidth) / img.width;
        pdf.addImage(dataUrl, "jpg", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${filename}.pdf`);
      })
      .then(() => {
        callback && callback();
      });
  }
};
