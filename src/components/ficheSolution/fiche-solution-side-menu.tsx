import AideDecisionBreadcrumbs from "@/src/components/aideDecision/AideDecisionBreadcrumbs";
import { getAideDecisionHistoryBySlug } from "@/src/lib/strapi/queries/aideDecisionQueries";
import ButtonShareUrl from "@/src/components/common/button-share-url";
import { GenericSaveFiche } from "../common/generic-save-fiche";
import { TypeFiche } from "@/src/helpers/common";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

export async function FicheSolutionSideMenu({
  etapeAideDecision,
  ficheSolution,
  className,
}: {
  ficheSolution: FicheSolution;
  className?: string;
  etapeAideDecision: string | undefined;
}) {
  const historique = await getAideDecisionHistoryBySlug(etapeAideDecision, true);

  return (
    <div className={className}>
      {historique && (
        <AideDecisionBreadcrumbs
          historique={historique}
          className="-mt-2 mb-16 hidden md:block"
          currentPageLabel={ficheSolution.attributes.titre}
        />
      )}
      <ButtonShareUrl url={getFullUrl(PFMV_ROUTES.FICHE_SOLUTION(ficheSolution.attributes.slug))} className={"mb-2"} />
      <GenericSaveFiche
        id={ficheSolution.id}
        type={TypeFiche.solution}
        classNameButton="right-4 top-[68px] md:mt-4 md:top-0 md:right-0"
      />
    </div>
  );
}
