import { getAideDecisionHistoryBySlug } from "@/lib/directus/queries/aideDecisionQueries";
import { AideDecisionEtape, FicheSolution } from "@/lib/directus/directusModels";
import FicheSolutionCardWithUserInfo from "@/components/ficheSolution/FicheSolutionCardWithUserInfo";
import FicheSolutionFullCard from "@/components/ficheSolution/FicheSolutionFullCard";
import AideDecisionBreadcrumbs from "@/components/aideDecision/AideDecisionBreadcrumbs";
import AideDecisionSortFilter from "@/components/filters/AideDecisionSortFilter";
import { getAideDecisionSortFieldFromCode } from "@/helpers/aideDecisionSortFilter";

type Props = {
  aideDecisionEtape: AideDecisionEtape;
  searchParams: { tri: string | undefined };
};

export default async function AideDecisionResult({ aideDecisionEtape, searchParams }: Props) {
  const historique = await getAideDecisionHistoryBySlug(aideDecisionEtape.slug);

  if (aideDecisionEtape.fiches_solutions.length > 0) {
    const sortBy = getAideDecisionSortFieldFromCode(searchParams?.tri);
    const sortedFichesSolutions: FicheSolution[] = aideDecisionEtape.fiches_solutions
      .map((fs) => fs.fiche_solution_id)
      .sort(sortBy.sortFn)
      .slice(0, sortBy.maxItem);

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
              {sortedFichesSolutions.map((ficheSolution) => (
                <li key={ficheSolution.id} className="m-2 flex">
                  <FicheSolutionCardWithUserInfo
                    ficheSolution={ficheSolution}
                    aideDecisionFirstStepName={(historique && historique[1].label) || ""}
                  >
                    <FicheSolutionFullCard ficheSolution={ficheSolution} />
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
