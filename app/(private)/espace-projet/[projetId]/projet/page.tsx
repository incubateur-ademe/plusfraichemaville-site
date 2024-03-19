import RetoursExperiences from "@/components/projet/projet-retour-experiences";

export default async function RetoursExperiencesPage({
  searchParams,
}: {
  searchParams: { espaceFilter: string | undefined; regionFilter: string | undefined };
}) {
  return <RetoursExperiences searchParams={searchParams} />;
}
