import FicheSolutionCardWithUserInfo from "@/components/ficheSolution/FicheSolutionCardWithUserInfo";
import AideDecisionBreadcrumbs from "@/components/aideDecision/AideDecisionBreadcrumbs";
import AideDecisionSortFilter from "@/components/filters/AideDecisionSortFilter";
import { getAideDecisionSortFieldFromCode } from "@/helpers/aideDecisionSortFilter";
import RetourExperienceCard from "@/components/retourExperience/RetourExperienceCard";
import Link from "next/link";
import { GetValues } from "@/lib/strapi/types/types";
import { getAideDecisionHistoryBySlug } from "@/lib/strapi/queries/aideDecisionQueries";
import { notEmpty } from "@/helpers/listUtils";
import { PFMV_ROUTES } from "@/helpers/routes";

type Props = {
  aideDecisionEtape: GetValues<"api::aide-decision-etape.aide-decision-etape">;
  searchParams: { tri: string | undefined };
};

export default async function AideDecisionResult({ aideDecisionEtape, searchParams }: Props) {
  const historique = await getAideDecisionHistoryBySlug(aideDecisionEtape.slug);
  const previousStep = historique && historique[historique.length - 1] ? historique[historique.length - 1] : null;

  if (!!aideDecisionEtape.fiches_solutions?.data && aideDecisionEtape.fiches_solutions.data.length > 0) {
    const sortBy = getAideDecisionSortFieldFromCode(searchParams?.tri);
    const sortedFichesSolutions = aideDecisionEtape.fiches_solutions.data.sort(sortBy.sortFn).slice(0, sortBy.maxItem);

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
              currentPageLabel={aideDecisionEtape.nom}
              historique={historique}
              className="hidden md:mt-60 md:block"
            />
          )}
          <div className="grow overflow-x-auto">
            {previousStep && (
              <div className="mt-8 hidden text-center md:block md:text-left">
                <Link
                  className="fr-link fr-icon-arrow-left-line fr-link--icon-left"
                  href={`${PFMV_ROUTES.AIDE_DECISION}/${previousStep.slug}`}
                >
                  Retour
                </Link>
              </div>
            )}
            <h1 className={"fr-h4 mb-4 pt-10 text-center md:text-left"}>
              Découvrez les solutions proposées pour votre recherche
            </h1>
            <AideDecisionSortFilter className="mb-9" />
            <ul className="flex list-none flex-wrap justify-center gap-6 pl-2 md:justify-start">
              {sortedFichesSolutions.map((ficheSolution) => (
                <li key={ficheSolution.id} className="flex">
                  <FicheSolutionCardWithUserInfo
                    ficheSolution={ficheSolution}
                    projectName={(historique && historique[1]?.label) || ""}
                    extraUrlParams={[{ param: "etapeAideDecision", value: aideDecisionEtape.slug }]}
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
