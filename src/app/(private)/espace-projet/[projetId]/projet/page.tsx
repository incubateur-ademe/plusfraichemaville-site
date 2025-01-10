import RetoursExperiences from "@/src/components/projet/projet-retour-experiences";

export default async function RetoursExperiencesPage(
  props: {
    searchParams: Promise<{ espaceFilter: string | undefined; regionFilter: string | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  return <RetoursExperiences searchParams={searchParams} />;
}
