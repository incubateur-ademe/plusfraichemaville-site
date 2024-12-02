import { useTransition } from "react";
import { generateSourcingContactsCsvAction } from "@/src/actions/projets/generate-sourcing-contacts-csv-action";
import { downloadCsv } from "@/src/helpers/csv-utils";
import clsx from "clsx";

type SourcingContactsDownloaderProps = {
  projetId?: number;
  className?: string;
};

export const SourcingContactsDownloader = ({ projetId, className }: SourcingContactsDownloaderProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDownload = () => {
    startTransition(async () => {
      if (projetId) {
        const result = await generateSourcingContactsCsvAction(projetId);
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
