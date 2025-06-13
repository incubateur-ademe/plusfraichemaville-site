import { FicheSolution } from "@/src/components/ficheSolution/fiche-solution";
// eslint-disable-next-line max-len
import { BREADCRUMB_SOLUTION_FICHE_SOLUTION } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-solution";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import React from "react";

export default async function FicheSolutionPage(props: {
  params: Promise<{ ficheSolutionSlug: string; projetId: string }>;
  searchParams: Promise<{ etapeAideDecision: string | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_SOLUTION_FICHE_SOLUTION} />
      <FicheSolution params={params} searchParams={searchParams} />
    </>
  );
}
