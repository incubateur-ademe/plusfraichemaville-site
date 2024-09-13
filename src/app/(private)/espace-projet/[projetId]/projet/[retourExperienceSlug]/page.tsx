import { RetourExperience } from "@/src/components/projet/projet-retour-experience";

export default async function RetourExperiencePage({
  params,
}: {
  params: { retourExperienceSlug: string; projetId: string };
}) {
  return <RetourExperience params={params} />;
}
