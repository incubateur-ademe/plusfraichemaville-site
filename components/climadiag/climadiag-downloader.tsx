import { useState } from "react";
import { Climadiag } from "./types";
import dynamic from "next/dynamic";

type ClimadiagDownloaderProps = {
  data: Climadiag;
};

const LazyClimadiagViewer = dynamic(() => import("./climadiag-viewer").then((mod) => mod.ClimadiagViewer));

export const ClimadiagDownloader = ({ data }: ClimadiagDownloaderProps) => {
  const [viewer, setViewer] = useState(false);
  const download = () => setViewer(true);
  const close = () => setViewer(false);
  return (
    <>
      <button
        onClick={download}
        className="flex items-center text-base font-bold pl-2 mt-4 hover:!bg-pfmv-truelight-grey/0 hover:underline"
      >
        Télécharger la synthèse
        <i className="fr-icon--sm ml-2 mt-[1px] ri-download-2-line"></i>
      </button>
      {viewer && <LazyClimadiagViewer data={data} close={close} />}
    </>
  );
};
