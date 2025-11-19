import RetoursExperiences from "@/src/components/projet/projet-retour-experiences";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Projets réalisés par les collectivités");

export default async function RetoursExperiencesPage(props: {
  searchParams: Promise<{ espaceFilter: string | undefined; regionFilter: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="fr-container">
      <h1 className="fr-h3 !mb-2 mt-8">Projets réalisés par les collectivités</h1>
      <RetoursExperiences searchParams={searchParams} />
    </div>
  );
}
