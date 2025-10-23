import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { RechercheBarre } from "@/src/components/recherche/recherche-barre";

export const metadata: Metadata = computeMetadata("Recherche sur le site");

export default async function RecherchePage(props: { searchParams: Promise<{ q: string | undefined }> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="fr-container mb-[30rem]">
      <h1 className="mt-8 text-[1.75rem] font-bold text-dsfr-text-title-grey">Rechercher sur le site</h1>
      <RechercheBarre query={searchParams.q} />
    </div>
  );
}
