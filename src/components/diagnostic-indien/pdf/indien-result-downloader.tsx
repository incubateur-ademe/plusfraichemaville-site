import { useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { Spinner } from "@/src/components/common/spinner";
import { ProjetIndiEnSimuation } from "@/src/lib/prisma/prismaCustomTypes";

type IndienResultDownloaderProps = {
  data: ProjetIndiEnSimuation;
};

const LazyIndienResultPage = dynamic(() => import("./indien-result-pdf-page").then((mod) => mod.IndienResultPdfPage));

export const IndienResultDownloader = ({ data }: IndienResultDownloaderProps) => {
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
      {viewer && <LazyIndienResultPage data={data} close={close} />}
      <button
        onClick={download}
        disabled={loading}
        className={clsx(
          "mt-4 flex items-center pl-2 text-base font-bold hover:!bg-pfmv-truelight-grey/0 hover:underline",
          "text-dsfr-text-label-blue-france disabled:pointer-events-none disabled:text-pfmv-navy",
        )}
      >
        Télécharger mon analyse
        {loading ? (
          <Spinner className="ml-3 !size-6" />
        ) : (
          <i className="fr-icon--sm ri-download-2-line ml-2 mt-[1px]"></i>
        )}
      </button>
    </>
  );
};
