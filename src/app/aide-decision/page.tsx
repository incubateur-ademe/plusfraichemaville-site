import AideDecisionFirstStepEtapeCard from "@/src/components/aideDecision/AideDecisionFirstStepCard";
import AideDecisionBreadcrumbs from "@/src/components/aideDecision/AideDecisionBreadcrumbs";
import { getAideDecisionFirstSteps } from "@/src/lib/strapi/queries/aideDecisionQueries";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Explorez nos solutions");

export default async function Posts() {
  const aideDecisionFirstSteps = await getAideDecisionFirstSteps();
  return (
    <div className={"fr-container relative"}>
      <div className="flex flex-row justify-items-center">
        <AideDecisionBreadcrumbs currentPageLabel="Espace" historique={[]} className="hidden md:mt-60 md:block" />
        <div className="grow">
          <h1 className={"mb-12 pt-[4.5rem] text-center text-xl"}>Sur quel espace voulez-vous agir ?</h1>
          <div className="m-auto max-w-2xl">
            <ul className="flex list-none flex-wrap justify-center gap-6 ">
              {aideDecisionFirstSteps.map((aideDecision) => (
                <li key={aideDecision.id} className="flex justify-center p-0">
                  <AideDecisionFirstStepEtapeCard aideDecisionEtape={aideDecision.attributes} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
