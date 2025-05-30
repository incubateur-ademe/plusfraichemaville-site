import { useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { Spinner } from "@/src/components/common/spinner";
import { ProjetIndiEnSimuation, ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { DIAGNOSTIC_DOWNLOAD_RESULT } from "@/src/helpers/matomo/matomo-tags";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";

type IndienResultDownloaderProps = {
  data: ProjetIndiEnSimuation;
  projet: ProjetWithRelations;
};

const LazyIndienResultPage = dynamic(() => import("./indien-result-pdf-page").then((mod) => mod.IndienResultPdfPage));

export const IndienResultDownloader = ({ data, projet }: IndienResultDownloaderProps) => {
  const [viewer, setViewer] = useState(false);
  const [loading, setLoading] = useState(false);
  const download = () => {
    setViewer(true);
    setLoading(true);
    trackEvent(DIAGNOSTIC_DOWNLOAD_RESULT);
  };
  const close = () => {
    setViewer(false);
    setLoading(false);
  };
  return (
    <>
      {viewer && <LazyIndienResultPage data={data} projet={projet} close={close} />}
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
