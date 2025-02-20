import clsx from "clsx";
import Link from "next/link";

type FicheDiagnosticRexPdfProps = {
  pdf?: string;
};

export const FicheDiagnosticRexPdf = ({ pdf }: FicheDiagnosticRexPdfProps) => {
  if (!pdf) return null;
  return (
    <>
      <h2 className="mb-1 text-lg font-bold">Pour aller plus loin</h2>
      <p className="mb-4 text-sm">Télécharger la version complète de ce diagnostic.</p>
      <Link
        href={pdf}
        target="_blank"
        className={clsx("flex items-center justify-start gap-2 font-bold text-pfmv-navy", "bg-none after:content-none")}
      >
        <div className="flex size-8 items-center justify-center rounded-full bg-pfmv-navy">
          <i className="ri-download-2-line size-4 text-white before:!mb-2 before:!size-4"></i>
        </div>
        Télécharger le guide
      </Link>
    </>
  );
};
