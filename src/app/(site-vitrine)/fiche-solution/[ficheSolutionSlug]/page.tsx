import { FicheSolution } from "@/src/components/ficheSolution/fiche-solution";
import { getAllFichesSolutions, getFicheSolutionBySlug } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { Metadata } from "next";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";

type FicheSolutionPageProps = {
  params: Promise<{ ficheSolutionSlug: string; projetId: string }>;
};

export async function generateStaticParams() {
  const allFichesSolutions = await getAllFichesSolutions();
  return allFichesSolutions.map((ficheSolution) => ({
    ficheSolutionSlug: ficheSolution.attributes.slug || "",
  }));
}

export async function generateMetadata(props: FicheSolutionPageProps): Promise<Metadata> {
  const params = await props.params;
  const ficheSolution = await getFicheSolutionBySlug(params.ficheSolutionSlug);
  return computeMetadata(
    ficheSolution?.attributes.titre || "Fiche solution",
    ficheSolution?.attributes.description_courte,
    getStrapiImageUrl(ficheSolution?.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.medium),
    getFullUrl(PFMV_ROUTES.FICHE_SOLUTION(params.ficheSolutionSlug)),
  );
}

export default async function FicheSolutionPage(props: FicheSolutionPageProps) {
  const params = await props.params;
  return <FicheSolution params={params} />;
}
