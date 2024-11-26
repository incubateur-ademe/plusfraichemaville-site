import { SourcingContact } from "../types";

type SourcingContactsDownloaderProps = {
  contacts: SourcingContact[] | null;
};

export const SourcingContactsDownloader = ({ contacts }: SourcingContactsDownloaderProps) => {
  if (!contacts?.length) {
    return null;
  }

  const makeCsv = () => {
    const headersFields = [
      "Type de contact",
      "Sous-type",
      "Label",
      "Email",
      "Téléphone",
      "Site Internet",
      "Nom du projet",
      "Région",
      "Poste",
    ].join(",");

    const csvRows = contacts.map((contact) => {
      const specificFields =
        contact.type === "rex"
          ? [contact.rex?.nom || "", contact.rex?.region || ""]
          : [contact.projet?.nom || "", contact.projet?.region || "", contact.poste || ""];

      const fields = [
        contact.typeContact || "",
        contact.type === "rex" ? contact.sousTypeContact || "" : "",
        contact.label || "",
        contact.email || "",
        contact.telephone || "",
        contact.siteInternet || "",
        ...specificFields,
      ];

      return fields.join(",");
    });

    return [headersFields, ...csvRows].join("\n");
  };

  const downloadCsv = () => {
    const csvData = new Blob([makeCsv()], { type: "text/csv" });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `contacts.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={downloadCsv} className="text-sm text-pfmv-navy underline hover:!bg-white">
      Exporter les contacts en CSV <i className="ri-download-line"></i>
    </button>
  );
};
