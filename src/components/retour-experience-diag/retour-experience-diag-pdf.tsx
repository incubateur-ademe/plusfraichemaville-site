"use client";

import clsx from "clsx";
import React, { MouseEvent } from "react";
import Image from "next/image";

type RetourExperienceDiagPdfProps = {
  pdf?: string;
};

export const RetourExperienceDiagPdf = ({ pdf }: RetourExperienceDiagPdfProps) => {
  if (!pdf) return null;

  const download = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!pdf) return;
    try {
      const response = await fetch(`/api/download-pdf?url=${encodeURIComponent(pdf)}`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = pdf.split("/").pop() || "document.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
    }
  };

  return (
    <>
      <h2 className="mb-1 text-lg font-bold">Pour aller plus loin</h2>
      <p className="mb-4 text-sm">Télécharger la version complète de ce diagnostic.</p>
      <div className="rounded-lg bg-dsfr-contrast-grey p-4">
        <Image src="/images/rex-diagnostic/rex-diag-pdf.jpg" alt="" width={300} height={300} />
        <a
          href={pdf}
          onClick={download}
          className={clsx(
            "flex cursor-pointer items-center justify-start gap-2 font-bold text-pfmv-navy",
            "mt-3 bg-none after:content-none hover:underline",
          )}
        >
          <div className="flex size-8 items-center justify-center rounded-full bg-pfmv-navy">
            <i className="ri-download-2-line size-4 text-white before:!mb-2 before:!size-4"></i>
          </div>
          Télécharger
        </a>
      </div>
    </>
  );
};
