import FicheSolutionCard from "@/src/components/ficheSolution/fiche-solution-card";
import AideDecisionBreadcrumbs from "@/src/components/aideDecision/AideDecisionBreadcrumbs";
import AideDecisionSortFilter from "@/src/components/filters/AideDecisionSortFilter";
import { getAideDecisionSortFieldFromCode } from "@/src/helpers/aideDecisionSortFilter";
import RetourExperienceCard from "@/src/components/retourExperience/RetourExperienceCard";
import { notEmpty } from "@/src/helpers/listUtils";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { AideDecisionEtape } from "@/src/lib/strapi/types/api/aide-decision-etape";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { AideDecisionEtapeHistory } from "@/src/lib/strapi/queries/commonStrapiFilters";
import { useUserStore } from "@/src/stores/user/provider";

type Props = {
  aideDecisionEtapeAttributes: AideDecisionEtape["attributes"];
  aideDecisionEtapeHistory?: AideDecisionEtapeHistory[] | null;
};

export default function AideDecisionResult({
  aideDecisionEtapeAttributes,
  aideDecisionEtapeHistory,
}: Props) {
  const navigationPreferences = useUserStore((state) => state.navigationPreferences);
  if (
    !!aideDecisionEtapeAttributes.fiches_solutions?.data &&
    aideDecisionEtapeAttributes.fiches_solutions.data.length > 0
  ) {
    const sortBy = getAideDecisionSortFieldFromCode(navigationPreferences.choixSolutionAideDecisionTri);
    const sortedFichesSolutions = aideDecisionEtapeAttributes.fiches_solutions.data
      .sort(sortBy.sortFn)
      .slice(0, sortBy.maxItem);

    const relatedRetourExperiences = sortedFichesSolutions
      .flatMap((fs) => fs.attributes.solution_retour_experiences?.data.map((sol) => sol.attributes.retour_experience))
      .filter((v) => v?.data)
      .filter(notEmpty)
      .filter((v, i, a) => a.findIndex((v2) => v2.data?.id === v?.data?.id) === i)
      .slice(0, 3);

    return (
      <div className={"fr-container"}>
        <div className="flex flex-row justify-items-center">
          {aideDecisionEtapeHistory && (
            <AideDecisionBreadcrumbs
              currentPageLabel={aideDecisionEtapeAttributes.nom}
              historique={aideDecisionEtapeHistory}
              className="hidden md:mt-60 md:block"
            />
          )}
          <div className="grow overflow-x-auto">
            <h1 className={"fr-h4 mb-4 pt-10 text-center md:text-left"}>
              Découvrez les solutions proposées pour votre recherche
            </h1>
            <AideDecisionSortFilter className="mb-9" />
            <ul className="mb-14 flex list-none flex-wrap justify-center gap-6 pl-2 md:justify-start">
              {sortedFichesSolutions.map((ficheSolution) => (
                <li key={ficheSolution.id} className="flex">
                  <FicheSolutionCard
                    ficheSolution={ficheSolution}
                    extraUrlParams={[{ param: "etapeAideDecision", value: aideDecisionEtapeAttributes.slug }]}
                    titleHeadingLevel="h2"
                  />
                </li>
              ))}
            </ul>
            {relatedRetourExperiences.length > 0 && (
              <>
                <h1 className={"fr-h4 mb-6 mt-16 text-center md:text-left"}>
                  Découvrez les projets réalisés pour les solutions proposées
                </h1>
                <ul className="flex list-none gap-6 overflow-x-auto pl-2 pt-2 md:justify-start">
                  {relatedRetourExperiences.map((rex) => (
                    <li key={rex?.data.id} className="flex">
                      <RetourExperienceCard retourExperience={rex?.data} titleHeadingLevel="h2" />
                    </li>
                  ))}
                </ul>
              </>
            )}
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
