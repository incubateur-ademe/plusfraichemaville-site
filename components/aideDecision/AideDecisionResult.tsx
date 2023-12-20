import { getAideDecisionHistoryBySlug } from "@/lib/directus/queries/aideDecisionQueries";
import { AideDecisionEtape, FicheSolution, RetourExperience } from "@/lib/directus/directusModels";
import FicheSolutionCardWithUserInfo from "@/components/ficheSolution/FicheSolutionCardWithUserInfo";
import AideDecisionBreadcrumbs from "@/components/aideDecision/AideDecisionBreadcrumbs";
import AideDecisionSortFilter from "@/components/filters/AideDecisionSortFilter";
import { getAideDecisionSortFieldFromCode } from "@/helpers/aideDecisionSortFilter";
import RetourExperienceReducedVerticalCard from "@/components/retourExperience/RetourExperienceReducedVerticalCard";
import Link from "next/link";

type Props = {
  aideDecisionEtape: AideDecisionEtape;
  searchParams: { tri: string | undefined };
};

export default async function AideDecisionResult({ aideDecisionEtape, searchParams }: Props) {
  const historique = await getAideDecisionHistoryBySlug(aideDecisionEtape.slug);
  const previousStep = historique && historique[historique.length - 1] ? historique[historique.length - 1] : null;

  if (aideDecisionEtape.fiches_solutions.length > 0) {
    const sortBy = getAideDecisionSortFieldFromCode(searchParams?.tri);
    const sortedFichesSolutions: FicheSolution[] = aideDecisionEtape.fiches_solutions
      .map((fs) => fs.fiche_solution_id)
      .sort(sortBy.sortFn)
      .slice(0, sortBy.maxItem);

    const relatedRetourExperiences: RetourExperience[] = sortedFichesSolutions
      .flatMap((fs) => fs.solution_retour_experience?.map((sol) => sol.retour_experience))
      .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
      .slice(0, 3);

    return (
      <div className={"fr-container"}>
        <div className="flex flex-row justify-items-center">
          {historique && (
            <AideDecisionBreadcrumbs
              currentPageLabel={aideDecisionEtape.nom}
              historique={historique}
              className="hidden md:block md:mt-60"
            />
          )}
          <div className="grow overflow-x-auto">
            {previousStep && (
              <div className="mt-8 text-center md:text-left hidden md:block">
                <Link
                  className="fr-link fr-icon-arrow-left-line fr-link--icon-left"
                  href={`/aide-decision/${previousStep.slug}`}
                >
                  Retour
                </Link>
              </div>
            )}
            <h1 className={"mb-4 pt-10 fr-h4 text-center md:text-left"}>
              Découvrez les solutions proposées pour votre recherche
            </h1>
            <AideDecisionSortFilter className="mb-9" />
            <ul className="flex list-none flex-wrap justify-center md:justify-start gap-6 pl-2">
              {sortedFichesSolutions.map((ficheSolution) => (
                <li key={ficheSolution.id} className="flex">
                  <FicheSolutionCardWithUserInfo
                    ficheSolution={ficheSolution}
                    projectName={(historique && historique[1].label) || ""}
                    extraUrlParams={[{ param: "etapeAideDecision", value: aideDecisionEtape.slug }]}
                  />
                </li>
              ))}
            </ul>
            {relatedRetourExperiences.length > 0 && (
              <>
                <h1 className={"mb-6 mt-16 fr-h4 text-center md:text-left"}>
                  Découvrez les projets réalisés pour les solutions proposées
                </h1>
                <ul className="flex list-none overflow-x-auto md:justify-start pt-2 gap-6 pl-2">
                  {relatedRetourExperiences.map((rex) => (
                    <li key={rex.id} className="flex">
                      <RetourExperienceReducedVerticalCard retourExperience={rex} />
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
