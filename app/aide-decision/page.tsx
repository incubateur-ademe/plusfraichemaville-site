import AideDecisionFirstStepEtapeCard from "@/components/aideDecision/AideDecisionFirstStepCard";
import { getAideDecisionFirstSteps } from "@/lib/directus/queries/aideDecisionQueries";
import AideDecisionBreadcrumbs from "@/components/aideDecision/AideDecisionBreadcrumbs";

export default async function Posts() {
  const aideDecisionFirstSteps = await getAideDecisionFirstSteps();
  return (
    <div className={"fr-container relative"}>
      <div className="flex flex-row justify-items-center">
        <AideDecisionBreadcrumbs currentPageLabel="Espace" historique={[]} className="hidden md:block md:mt-60" />
        <div className="grow">
          <h1 className={"mb-12 pt-[4.5rem] text-center text-xl"}>Sur quel espace voulez-vous agir ?</h1>
          <div className="max-w-2xl m-auto">
            <ul className="flex list-none flex-wrap justify-center gap-6 ">
              {aideDecisionFirstSteps.map((aideDecision) => (
                <li key={aideDecision.id} className="p-0 flex justify-center">
                  <AideDecisionFirstStepEtapeCard aideDecisionEtape={aideDecision} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
