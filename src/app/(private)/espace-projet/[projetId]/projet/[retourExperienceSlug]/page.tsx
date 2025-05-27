import { getRetourExperienceBySlug } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { notFound } from "next/navigation";
import { RetourExperienceContent } from "@/src/components/projet/projet-retour-experience-content";

export default async function RetourExperiencePage(props: {
  params: Promise<{ retourExperienceSlug: string; projetId: string }>;
}) {
  const params = await props.params;
  const retourExperience = await getRetourExperienceBySlug(params.retourExperienceSlug);

  if (!retourExperience) {
    notFound();
  }

  return <RetourExperienceContent retourExperience={retourExperience} />;
}
