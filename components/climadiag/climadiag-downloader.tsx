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
          "mt-4 flex items-center pl-2 text-base font-bold hover:!bg-pfmv-truelight-grey/0 hover:underline",
          "text-dsfr-text-label-blue-france disabled:pointer-events-none disabled:text-pfmv-navy",
        )}
      >
        Télécharger la synthèse
        {loading ? (
          <Spinner className="ml-3 !size-6" />
        ) : (
          <i className="fr-icon--sm ri-download-2-line ml-2 mt-[1px]"></i>
        )}
      </button>
      {viewer && <LazyClimadiagViewer data={data} close={close} />}
    </>
  );
};
