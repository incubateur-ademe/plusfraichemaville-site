import RetoursExperiences from "@/src/components/projet/projet-retour-experiences";
import { BREADCRUMB_SOLUTION_RETOUR_EXPERIENCE_LISTE } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-solution";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import React from "react";

export default async function RetoursExperiencesPage(props: {
  searchParams: Promise<{ espaceFilter: string | undefined; regionFilter: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_SOLUTION_RETOUR_EXPERIENCE_LISTE} />
      <RetoursExperiences searchParams={searchParams} />
    </>
  );
}
