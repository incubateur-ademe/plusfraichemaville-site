import { useState } from "react";
import { Climadiag } from "./types";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { Spinner } from "../common/spinner";

type ClimadiagDownloaderProps = {
  data: Climadiag;
};

const LazyClimadiagViewer = dynamic(() => import("./climadiag-viewer").then((mod) => mod.ClimadiagViewer));

export const ClimadiagDownloader = ({ data }: ClimadiagDownloaderProps) => {
  const [viewer, setViewer] = useState(false);
  const [loading, setLoading] = useState(false);
  const download = () => {
    setViewer(true);
    setLoading(true);
  };
  const close = () => {
    setViewer(false);
    setLoading(false);
  };
  return (
    <>
      <button
        onClick={download}
        disabled={loading}
        className={clsx(
          "flex items-center text-base font-bold pl-2 mt-4 hover:!bg-pfmv-truelight-grey/0 hover:underline",
          "disabled:pointer-events-none disabled:text-pfmv-navy",
        )}
      >
        Télécharger la synthèse
        {loading ? (
          <Spinner className="size-3 ml-3" />
        ) : (
          <i className="fr-icon--sm ml-2 mt-[1px] ri-download-2-line"></i>
        )}
      </button>
      {viewer && <LazyClimadiagViewer data={data} close={close} />}
    </>
  );
};
