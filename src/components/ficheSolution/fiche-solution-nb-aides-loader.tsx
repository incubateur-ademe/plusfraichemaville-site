import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { getNbAidesFromAidesTerritoires } from "@/src/lib/aidesTerritoires/fetch";
import FicheSolutionFinancementsIncentive from "@/src/components/ficheSolution/fiche-solution-financements-incentive";
import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";

const TIMEOUT_MS = 5000;

export default async function FicheSolutionNbAidesLoader({
  ficheId,
  ficheAttributes,
}: {
  ficheId: number;
  ficheAttributes: FicheSolution["attributes"];
}) {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`getNbAidesFromAidesTerritoires timed out after ${TIMEOUT_MS}ms`)), TIMEOUT_MS),
  );

  let nbAides = 0;
  try {
    nbAides = await Promise.race([getNbAidesFromAidesTerritoires([ficheAttributes]), timeoutPromise]);
  } catch (error) {
    customCaptureException(`Timeout fetching nbAides from Aides Territoires for fiche ${ficheAttributes.slug}`, error);
  }

  return <FicheSolutionFinancementsIncentive ficheId={ficheId} nbAides={nbAides} />;
}
