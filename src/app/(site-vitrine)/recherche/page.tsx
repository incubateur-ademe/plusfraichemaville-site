import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { RechercheBarre } from "@/src/components/recherche/recherche-barre";

export const metadata: Metadata = computeMetadata("Recherche sur le site");

export default async function RecherchePage(props: { searchParams: Promise<{ q: string | undefined }> }) {
  const searchParams = await props.searchParams;
  const displaySearch = process.env.NEXT_PUBLIC_FEATURE_SEARCH === "true" || false;

  return (
    <div className="fr-container">
      <h1 className="mt-8 text-[1.75rem] font-bold text-dsfr-text-title-grey">Rechercher sur le site</h1>
      {displaySearch ? <RechercheBarre query={searchParams.q} /> : <div>Bientôt disponible</div>}
    </div>
  );
}
