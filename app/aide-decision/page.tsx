// Has to put force-dynamic while https://github.com/vercel/next.js/issues/56018 is not fixed
import AideDecisionFirstStepEtapeCard from "@/components/aideDecision/AideDecisionFirstStepCard";
import { getAideDecisionFirstSteps } from "@/lib/directus/queries/aideDecisionQueries";

export const dynamic = "force-dynamic";

export default async function Posts() {
  const aideDecisionFirstSteps = await getAideDecisionFirstSteps();
  return (
    <div className={"fr-container"}>
      <h1 className={"mb-12 pt-14 text-center fr-h4"}>Sur quel espace voulez-vous agir ?</h1>
      <div className="max-w-2xl m-auto">
        <ul className="flex list-none flex-wrap justify-center pb-36">
          {aideDecisionFirstSteps.map((aideDecision) => (
            <li key={aideDecision.id} className="m-2 w-36 flex">
              <AideDecisionFirstStepEtapeCard aideDecisionEtape={aideDecision} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
