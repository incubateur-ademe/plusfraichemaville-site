import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { RechercheBarre } from "@/src/components/recherche/recherche-barre";

export const metadata: Metadata = computeMetadata("Recherche sur le site");

export default async function RecherchePage() {
  return (
    <div className="fr-container">
      <h1 className="mt-8 text-[1.75rem] font-bold text-dsfr-text-title-grey">Rechercher sur le site</h1>
      <RechercheBarre />
    </div>
  );
}
