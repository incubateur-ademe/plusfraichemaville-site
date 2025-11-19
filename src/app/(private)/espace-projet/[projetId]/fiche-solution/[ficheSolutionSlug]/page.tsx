import { FicheSolution } from "@/src/components/ficheSolution/fiche-solution";
import { BREADCRUMB_SOLUTION_FICHE_SOLUTION } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-solution";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";

import { getFicheSolutionBySlug } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { Metadata } from "next";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export async function generateMetadata(props: {
  params: Promise<{ ficheSolutionSlug: string; projetId: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const ficheSolution = await getFicheSolutionBySlug(params.ficheSolutionSlug);
  return computeMetadata(
    ficheSolution?.attributes.titre || "Fiche solution",
    ficheSolution?.attributes.description_courte,
    getStrapiImageUrl(ficheSolution?.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.medium),
  );
}

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
