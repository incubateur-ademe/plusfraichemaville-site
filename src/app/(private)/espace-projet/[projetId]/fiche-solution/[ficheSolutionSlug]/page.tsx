import { FicheSolution } from "@/src/components/ficheSolution/fiche-solution";

export default async function FicheSolutionPage(
  props: {
    params: Promise<{ ficheSolutionSlug: string; projetId: string }>;
    searchParams: Promise<{ etapeAideDecision: string | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  return <FicheSolution params={params} searchParams={searchParams} />;
}
