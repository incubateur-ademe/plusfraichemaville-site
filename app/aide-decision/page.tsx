import Link from "next/link";
import { getAideDecisionFirstSteps } from "@/lib/directus/queries/aideDecisionQueries";

export default async function Posts() {
  const aideDecisionFirstSteps = await getAideDecisionFirstSteps();
  return (
    <>
      <h1>Sur quel espace voulez-vous agir ?</h1>
      {aideDecisionFirstSteps.map((aideDecision) => (
        <div key={aideDecision.id}>
          <Link href={`/aide-decision/${aideDecision.slug}`}>{aideDecision.nom}</Link>
        </div>
      ))}
    </>
  );
}
