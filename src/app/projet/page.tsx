import RetoursExperiences from "@/components/projet/projet-retour-experiences";
import { Metadata } from "next";
import { computeMetadata } from "@/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Trouvez de l'inspiration");

export default async function RetoursExperiencesPage({
  searchParams,
}: {
  searchParams: { espaceFilter: string | undefined; regionFilter: string | undefined };
}) {
  return <RetoursExperiences searchParams={searchParams} />;
}
