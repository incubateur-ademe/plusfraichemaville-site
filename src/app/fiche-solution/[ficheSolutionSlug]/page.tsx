import { FicheSolution } from "@/src/components/ficheSolution/fiche-solution";
import { getAllFichesSolutions, getFicheSolutionBySlug } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { Metadata } from "next";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

type FicheSolutionPageProps = {
  params: Promise<{ ficheSolutionSlug: string; projetId: string }>;
  searchParams: Promise<{ etapeAideDecision: string | undefined }>;
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
  );
}

export default async function FicheSolutionPage(props: FicheSolutionPageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  return <FicheSolution params={params} searchParams={searchParams} />;
}
