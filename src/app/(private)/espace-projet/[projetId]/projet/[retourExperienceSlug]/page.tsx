import { getRetourExperienceBySlug } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { notFound } from "next/navigation";
import { RetourExperienceContent } from "@/src/components/projet/projet-retour-experience-content";
// eslint-disable-next-line max-len
import { BREADCRUMB_SOLUTION_RETOUR_EXPERIENCE } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-solution";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import React from "react";

export default async function RetourExperiencePage(props: {
  params: Promise<{ retourExperienceSlug: string; projetId: string }>;
}) {
  const params = await props.params;
  const retourExperience = await getRetourExperienceBySlug(params.retourExperienceSlug);

  if (!retourExperience) {
    notFound();
  }

  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_SOLUTION_RETOUR_EXPERIENCE} />
      <RetourExperienceContent retourExperience={retourExperience} />
    </>
  );
}
