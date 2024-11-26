import { getSourcingContactTypeLabel } from "../helpers";
import { SourcingContact } from "../types";

type SourcingContactsDownloaderProps = {
  contacts: SourcingContact[] | null;
};

export const SourcingContactsDownloader = ({ contacts }: SourcingContactsDownloaderProps) => {
  if (!contacts?.length) {
    return null;
  }

  const escapeCsvField = (field: string) => {
    if (field.includes(",") || field.includes('"')) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  };

  const makeCsv = () => {
    const headersFields = [
      "Type de contact",
      "Sous-type de contact",
      "Entreprise",
      "Email",
      "Téléphone",
      "Site internet",
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
        getSourcingContactTypeLabel(contact.typeContact) || "",
        contact.type === "rex" ? getSourcingContactTypeLabel(contact.sousTypeContact, true) || "" : "",
        contact.label || "",
        contact.email || "",
        contact.telephone || "",
        contact.siteInternet || "",
        ...specificFields,
      ];

      return fields.map(escapeCsvField).join(",");
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
    <button onClick={downloadCsv} className="text-sm text-pfmv-navy hover:!bg-white">
      <span className="hover:underline">Exporter les contacts en CSV</span>
      <i className="ri-download-line !no-underline before:!mb-1 before:!size-3"></i>
    </button>
  );
};
