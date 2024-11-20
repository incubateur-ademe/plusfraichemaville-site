import { notFound } from "next/navigation";
import { getRetourExperienceBySlug } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { RetourExperienceContent } from "./projet-retour-experience-content";

type RetourExperienceProps = {
  params: { retourExperienceSlug: string };
};

export async function RetourExperienceServer({ params }: RetourExperienceProps) {
  const retourExperience = await getRetourExperienceBySlug(params.retourExperienceSlug);

  if (!retourExperience) {
    notFound();
  }

  return <RetourExperienceContent retourExperience={retourExperience} />;
}
