import { RetourExperienceServer } from "@/src/components/projet/projet-retour-experience-server";

export default async function RetourExperiencePage({
  params,
}: {
  params: { retourExperienceSlug: string; projetId: string };
}) {
  return <RetourExperienceServer params={params} />;
}
