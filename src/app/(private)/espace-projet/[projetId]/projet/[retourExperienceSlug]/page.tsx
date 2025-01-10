import { RetourExperienceServer } from "@/src/components/projet/projet-retour-experience-server";

export default async function RetourExperiencePage(
  props: {
    params: Promise<{ retourExperienceSlug: string; projetId: string }>;
  }
) {
  const params = await props.params;
  return <RetourExperienceServer params={params} />;
}
