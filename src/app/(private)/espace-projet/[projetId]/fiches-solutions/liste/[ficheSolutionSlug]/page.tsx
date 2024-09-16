import { FicheSolution } from "@/src/components/ficheSolution/fiche-solution";

export default async function FicheSolutionPage({
  params,
  searchParams,
}: {
  params: { ficheSolutionSlug: string; projetId: string };
  searchParams: { etapeAideDecision: string | undefined };
}) {
  return <FicheSolution params={params} searchParams={searchParams} />;
}
