import RetoursExperiences from "@/src/components/projet/projet-retour-experiences";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Trouvez de l'inspiration");

export default async function RetoursExperiencesPage(props: {
  searchParams: Promise<{ espaceFilter: string | undefined; regionFilter: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  return <RetoursExperiences searchParams={searchParams} />;
}
