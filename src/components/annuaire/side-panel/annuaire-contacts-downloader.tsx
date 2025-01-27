import { useTransition } from "react";
import { generateAnnuaireContactsCsvAction } from "@/src/actions/projets/generate-annuaire-contacts-csv-action";
import { downloadCsv } from "@/src/helpers/csv-utils";
import clsx from "clsx";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { ANNUAIRE_DOWNLOAD_CSV } from "@/src/helpers/matomo/matomo-tags";

type AnnuaireContactsDownloaderProps = {
  projetId?: number;
  className?: string;
};

export const AnnuaireContactsDownloader = ({ projetId, className }: AnnuaireContactsDownloaderProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDownload = () => {
    trackEvent(ANNUAIRE_DOWNLOAD_CSV);
    startTransition(async () => {
      if (projetId) {
        const result = await generateAnnuaireContactsCsvAction(projetId);
        if (result.type === "success" && result.csv) {
          downloadCsv(result.csv, "contacts-plusfraichemaville");
        }
      }
    });
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isPending}
      className={clsx("text-sm text-pfmv-navy hover:!bg-white", className)}
    >
      <span
        className={clsx("underline underline-offset-4 hover:decoration-2", "fr-link--icon-right ri-download-2-line")}
      >
        Exporter les contacts en CSV
      </span>
    </button>
  );
};
