"use client";
import "@splidejs/splide/css/core";
import { FicheDiagnosticBlocText } from "./fiche-diagnostic-bloc-text";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

export const FicheDiagnosticBlocBesoinEtIndicateurs = ({ ficheDiagnostic }: { ficheDiagnostic: FicheDiagnostic }) => {
  const { attributes } = ficheDiagnostic;

  return (
    <>
      <div className="flex flex-col justify-between gap-8 md:flex-row">
        <FicheDiagnosticBlocText title="Le besoin" text={attributes.besoin} />
        <FicheDiagnosticBlocText title="Les indicateurs étudiés" text={attributes.indicateurs} />
      </div>
    </>
  );
};
