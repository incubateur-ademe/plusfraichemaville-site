// Has to put force-dynamic while https://github.com/vercel/next.js/issues/56018 is not fixed
export const dynamic = "force-dynamic";
import { getAideDecisionFirstSteps } from "@/lib/directus/queries/aideDecisionQueries";
import AideDecisionEtapeCard from "@/components/aideDecision/aideDecisionEtapeCard";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";

export default async function Posts() {
  const aideDecisionFirstSteps = await getAideDecisionFirstSteps();
  return (
    <>
      <Breadcrumb currentPageLabel={"Choix de l'espace"} segments={[]} homeLinkProps={{ href: "/" }} />
      <h1 className={"mb-4 text-center"}>Sur quel espace voulez-vous agir ?</h1>
      <ul className="flex list-none flex-wrap justify-center p-0">
        {aideDecisionFirstSteps.map((aideDecision) => (
          <li key={aideDecision.id} className="m-2 w-80 flex">
            <AideDecisionEtapeCard aideDecisionEtape={aideDecision} />
          </li>
        ))}
      </ul>
    </>
  );
}
