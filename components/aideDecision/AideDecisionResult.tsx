import { getAideDecisionHistoryBySlug } from "@/lib/directus/queries/aideDecisionQueries";
import { AideDecisionEtape } from "@/lib/directus/directusModels";
import FicheSolutionCardWithUserInfo from "@/components/ficheSolution/FicheSolutionCardWithUserInfo";
import FicheSolutionFullCard from "@/components/ficheSolution/FicheSolutionFullCard";
import AideDecisionBreadcrumbs from "@/components/aideDecision/AideDecisionBreadcrumbs";
import AideDecisionSortFilter from "@/components/filters/AideDecisionSortFilter";

type Props = {
  aideDecisionEtape: AideDecisionEtape;
};

export default async function AideDecisionResult({ aideDecisionEtape }: Props) {
  const historique = await getAideDecisionHistoryBySlug(aideDecisionEtape.slug);
  if (aideDecisionEtape.fiches_solutions.length > 0) {
    return (
      <div className={"fr-container"}>
        <div className="flex flex-row justify-items-center">
          {historique && (
            <AideDecisionBreadcrumbs
              currentPageLabel={aideDecisionEtape.nom}
              historique={historique}
              className="hidden md:block"
            />
          )}
          <div className="grow">
            <h1 className={"mb-4 pt-10 fr-h4 text-center md:text-left"}>
              Découvrez les solutions proposées pour votre recherche
            </h1>
            <AideDecisionSortFilter />
            <ul className="flex list-none flex-wrap justify-center md:justify-start p-0">
              {aideDecisionEtape.fiches_solutions.map((ficheSolution) => (
                <li key={ficheSolution.fiche_solution_id.id} className="m-2 flex">
                  <FicheSolutionCardWithUserInfo
                    ficheSolution={ficheSolution.fiche_solution_id}
                    aideDecisionFirstStepName={(historique && historique[1].label) || ""}
                  >
                    <FicheSolutionFullCard ficheSolution={ficheSolution.fiche_solution_id} />
                  </FicheSolutionCardWithUserInfo>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <h1 className={"mb-4 pt-10 text-center"}>Aucune Fiche Solution ne correspond à vos critères...</h1>
      </>
    );
  }
}
