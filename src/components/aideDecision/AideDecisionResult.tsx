"use client";
import FicheSolutionCard from "@/src/components/ficheSolution/fiche-solution-card";
import AideDecisionSortFilter from "@/src/components/filters/AideDecisionSortFilter";
import { getAideDecisionSortFieldFromCode } from "@/src/helpers/aideDecisionSortFilter";
import RetourExperienceCard from "@/src/components/retourExperience/RetourExperienceCard";
import { notEmpty } from "@/src/helpers/listUtils";
import { AideDecisionEtape } from "@/src/lib/strapi/types/api/aide-decision-etape";
import { AideDecisionEtapeHistory } from "@/src/lib/strapi/queries/commonStrapiFilters";
import { useUserStore } from "@/src/stores/user/provider";
import { FilDArianeAvecBouton } from "@/src/components/common/fil-d-arianne-avec-bouton";

type Props = {
  aideDecisionEtapeAttributes: AideDecisionEtape["attributes"];
  aideDecisionEtapeHistory?: AideDecisionEtapeHistory[] | null;
};

export default function AideDecisionResult({ aideDecisionEtapeAttributes, aideDecisionEtapeHistory }: Props) {
  const navigationPreferences = useUserStore((state) => state.navigationPreferences);
  const setAideDecisionStep = useUserStore((state) => state.setChoixSolutionAideDecisionCurrentStep);
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
      <div>
        {aideDecisionEtapeHistory && (
          <FilDArianeAvecBouton
            currentPageLabel={aideDecisionEtapeAttributes.nom}
            segments={aideDecisionEtapeHistory.map((step) => ({
              label: step.label,
              onClick: () => setAideDecisionStep(step.slug),
            }))}
          />
        )}
        <div className="flex flex-row justify-items-center">
          <div className="grow overflow-x-auto md:pl-8">
            <h2 className="mb-6 text-xl">Découvrez les solutions proposées pour votre recherche</h2>
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
                <h2 className="mb-6 text-xl">Découvrez les projets réalisés pour les solutions proposées</h2>
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
        <h2 className="mb-6 text-center text-xl">Découvrez les solutions proposées pour votre recherche</h2>
        <h2 className={"mb-4 pt-10 text-center"}>Aucune Fiche Solution ne correspond à vos critères...</h2>
      </>
    );
  }
}
