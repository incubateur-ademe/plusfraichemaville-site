import FicheSolutionCardWithUserInfo from "@/src/components/ficheSolution/FicheSolutionCardWithUserInfo";
import AideDecisionBreadcrumbs from "@/src/components/aideDecision/AideDecisionBreadcrumbs";
import AideDecisionSortFilter from "@/src/components/filters/AideDecisionSortFilter";
import { getAideDecisionSortFieldFromCode } from "@/src/helpers/aideDecisionSortFilter";
import RetourExperienceCard from "@/src/components/retourExperience/RetourExperienceCard";
import { getAideDecisionHistoryBySlug } from "@/src/lib/strapi/queries/aideDecisionQueries";
import { notEmpty } from "@/src/helpers/listUtils";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { AideDecisionEtape } from "@/src/lib/strapi/types/api/aide-decision-etape";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

type Props = {
  aideDecisionEtapeAttributes: AideDecisionEtape["attributes"];
  searchParams: { tri: string | undefined };
};

export default async function AideDecisionResult({ aideDecisionEtapeAttributes, searchParams }: Props) {
  const historique = await getAideDecisionHistoryBySlug(aideDecisionEtapeAttributes.slug);
  const previousStep = historique && historique[historique.length - 1] ? historique[historique.length - 1] : null;

  if (
    !!aideDecisionEtapeAttributes.fiches_solutions?.data &&
    aideDecisionEtapeAttributes.fiches_solutions.data.length > 0
  ) {
    const sortBy = getAideDecisionSortFieldFromCode(searchParams?.tri);
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
          {historique && (
            <AideDecisionBreadcrumbs
              currentPageLabel={aideDecisionEtapeAttributes.nom}
              historique={historique}
              className="hidden md:mt-60 md:block"
            />
          )}
          <div className="grow overflow-x-auto">
            {previousStep && (
              <div className="mt-8 hidden text-center md:block md:text-left">
                <LinkWithoutPrefetch
                  className="fr-link fr-icon-arrow-left-line fr-link--icon-left"
                  href={`${PFMV_ROUTES.AIDE_DECISION}/${previousStep.slug}`}
                >
                  Retour
                </LinkWithoutPrefetch>
              </div>
            )}
            <h1 className={"fr-h4 mb-4 pt-10 text-center md:text-left"}>
              Découvrez les solutions proposées pour votre recherche
            </h1>
            <AideDecisionSortFilter className="mb-9" />
            <ul className="mb-14 flex list-none flex-wrap justify-center gap-6 pl-2 md:justify-start">
              {sortedFichesSolutions.map((ficheSolution) => (
                <li key={ficheSolution.id} className="flex">
                  <FicheSolutionCardWithUserInfo
                    ficheSolution={ficheSolution}
                    projectName={(historique && historique[1]?.label) || ""}
                    extraUrlParams={[{ param: "etapeAideDecision", value: aideDecisionEtapeAttributes.slug }]}
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
                      <RetourExperienceCard retourExperience={rex?.data} />
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
