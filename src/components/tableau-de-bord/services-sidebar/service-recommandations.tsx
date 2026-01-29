"use client";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import Image from "next/image";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";
import { isEmpty } from "@/src/helpers/listUtils";
import { AideEstimationsCardLabelFicheSolution } from "@/src/components/financement/aide/aide-estimations-card-label-fiche-solution";
import { useRecommandationsForCurrentProjet } from "@/src/hooks/use-recommandations-for-current-projet";
import { AideEstimationsCardLabel } from "@/src/components/financement/aide/aide-estimations-card-label";

export const ServiceRecommandations = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const ficheSolutionsIds = getProjetFichesIdsByType({ projet: currentProjet, typeFiche: TypeFiche.solution }) || [];

  const { recommandations, isLoading } = useRecommandationsForCurrentProjet();

  if (!currentProjet) {
    return null;
  }
  const getLinkUrl = () => {
    if (!isLoading && !isEmpty(ficheSolutionsIds)) {
      return !isEmpty(recommandations)
        ? PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_RECOMMANDATIONS(currentProjet.id)
        : PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(currentProjet.id);
    }
    return PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE(currentProjet.id);
  };

  return (
    <div className="pfmv-card fr-enlarge-link group max-w-[21rem] p-6">
      <div className="flex items-start gap-4">
        <Image
          src="/images/espace-projet/services/recommandations.svg"
          width={32}
          height={32}
          alt=""
          className="size-8"
        />
        <div>
          <h3>
            <LinkWithoutPrefetch className="text-pfmv-navy" href={getLinkUrl()}>
              {`Recommandations${!isEmpty(recommandations) ? ` (${recommandations.length})` : ""} `}
            </LinkWithoutPrefetch>
          </h3>
          {isLoading && (
            <>
              <div className="mb-2 h-6 w-full animate-pulse rounded-sm bg-dsfr-contrast-grey"></div>
              <div className="mb-2 h-6 w-full animate-pulse rounded-sm bg-dsfr-contrast-grey"></div>
              <div className="mb-2 h-6 w-full animate-pulse rounded-sm bg-dsfr-contrast-grey"></div>
            </>
          )}
          {!isLoading && !isEmpty(ficheSolutionsIds) && (
            <>
              {!isEmpty(recommandations) ? (
                <>
                  <p className="text-dsfr-text-default-grey">Solutions complémentaires à votre projet.</p>
                  <ul className="mb-3 flex flex-wrap gap-2 !pl-0">
                    {recommandations.slice(0, 2).map((recommandations) => (
                      <li key={recommandations.id} className="!mr-0">
                        <AideEstimationsCardLabelFicheSolution ficheId={recommandations.id} />
                      </li>
                    ))}
                    {recommandations.length > 2 && <AideEstimationsCardLabel>...</AideEstimationsCardLabel>}
                  </ul>
                  <div className="flex justify-between text-sm text-dsfr-text-default-grey group-hover:underline">
                    <span>Voir le détail</span>
                    <i className="ri-arrow-right-line fr-icon--sm"></i>
                  </div>
                </>
              ) : (
                <>
                  <p>Votre choix de solutions est complet, nous n'avons plus de recommandations.</p>
                  <div className="flex justify-between text-sm text-dsfr-text-default-grey group-hover:underline">
                    <span>Voir mes solutions</span>
                    <i className="ri-arrow-right-line fr-icon--sm"></i>
                  </div>
                </>
              )}
            </>
          )}
          {!isLoading && isEmpty(ficheSolutionsIds) && (
            <>
              <p className="text-dsfr-text-default-grey">
                Sélectionnez d'abord des solutions de rafraîchissement pour accéder à nos recommandations.
              </p>
              <div className="flex justify-between text-sm text-dsfr-text-default-grey group-hover:underline">
                <span>Choisir des solutions</span>
                <i className="ri-arrow-right-line fr-icon--sm"></i>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
