import { useTransition } from "react";
import { generateSourcingContactsCsvAction } from "@/src/actions/projets/generate-sourcing-contacts-csv-action";
import { downloadCsv } from "@/src/helpers/csv-utils";

type SourcingContactsDownloaderProps = {
  projetId?: number;
};

export const SourcingContactsDownloader = ({ projetId }: SourcingContactsDownloaderProps) => {
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
    <button onClick={handleDownload} disabled={isPending} className="text-sm text-pfmv-navy hover:!bg-white">
      <span className="hover:underline">Exporter les contacts en CSV</span>
      <i className="ri-download-line !no-underline before:!mb-1 before:!size-3"></i>
    </button>
  );
};
