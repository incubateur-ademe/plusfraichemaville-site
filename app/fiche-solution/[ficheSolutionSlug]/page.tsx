import { FicheSolution } from "@/components/ficheSolution/fiche-solution";
import { getAllFichesSolutions } from "@/lib/strapi/queries/fichesSolutionsQueries";

export async function generateStaticParams() {
  const allFichesSolutions = await getAllFichesSolutions();
  return allFichesSolutions.map((ficheSolution) => ({
    ficheSolutionSlug: ficheSolution.attributes.slug || "",
  }));
}

export default async function FicheSolutionPage({
  params,
  searchParams,
}: {
  params: { ficheSolutionSlug: string; projetId: string };
  searchParams: { etapeAideDecision: string | undefined };
}) {
  return <FicheSolution params={params} searchParams={searchParams} />;
}
