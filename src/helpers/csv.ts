import { notifications } from "../components/common/notifications";

export const escapeCsvField = (field: string) => {
  if (field.includes(",") || field.includes('"')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
};

export const downloadCsv = (csv: string, name: string) => {
  const csvData = new Blob([csv], { type: "text/csv" });
  const csvURL = URL.createObjectURL(csvData);
  const link = document.createElement("a");
  link.href = csvURL;
  link.download = `${name}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  notifications("success", "CSV_GENERATED");
};
