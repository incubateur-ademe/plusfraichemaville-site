import { ClimadiagIndicateursHeader } from "./climadiag-indicateurs-header";
import { ClimadiagViewerHeader } from "./climadiag-viewer-header";
import { Separator } from "../common/separator";
import { Climadiag } from "./types";
import { ClimadiagViewerItem } from "./climadiag-viewer-item";
import { useEffect, useRef } from "react";
import { generatePdf } from "@/src/helpers/pdf-utils";

type ClimadiagViewerProps = {
  data: Climadiag;
  close: () => void;
};

export const ClimadiagViewer = ({ data, close }: ClimadiagViewerProps) => {
  const filename = `${data.nom}-${data.code_postal}`;

  const ignore = useRef(false);

  useEffect(() => {
    if (!ignore.current) {
      generatePdf(`Climadiag-${filename}`, "#climadiag-viewer", close);
    }
    return () => {
      ignore.current = true;
    };
  }, [filename, close]);

  return (
    <div className="relative bg-white">
      <div className="fixed left-0 top-0 -z-[9] h-[2000px] w-screen bg-white"></div>
      <div id="climadiag-viewer" className="fixed left-0 top-0 -z-20 h-[2000px] w-screen bg-white">
        <div>
          <div className="px-14 py-10">
            <ClimadiagViewerHeader />
            <Separator className="mb-10 mt-6" />
            <div className="mb-8">
              <ClimadiagIndicateursHeader city={`${data.nom} ${data.code_postal}`} isPDF />
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
