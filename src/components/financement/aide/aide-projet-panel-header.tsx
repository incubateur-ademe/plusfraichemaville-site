import { AideProjetCardLabelFicheSolution } from "./aide-projet-card-label-fiche-solution";
import { getRegionByDepartment } from "@/src/lib/departements";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { Separator, SeparatorY } from "@/src/components/common/separator";
import { TypeEspace } from "@/src/helpers/type-espace-filter";
import { selectEspaceLabelByCode } from "@/src/helpers/type-espace-filter";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";
import { TypeFiche } from "@/src/helpers/common";
import isEmpty from "lodash/isEmpty";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { PFMV_ROUTES } from "@/src/helpers/routes";

export const AideProjetPanelHeader = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const espace = projet?.type_espace as TypeEspace["code"];
  const collectivite = projet?.collectivite;
  const commune = `${collectivite?.code_postal} ${collectivite?.nom}`;
  const region = getRegionByDepartment(collectivite?.code_postal);
  const ficheSolutionIds = getProjetFichesIdsByType({ projet, typeFiche: TypeFiche.solution }) ?? [];

  if (!projet) return null;

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-4 text-xl font-bold text-pfmv-navy">
        <div>Région {region}</div>
        <SeparatorY />
        <div>{commune}</div>
        <SeparatorY />
        <div>{selectEspaceLabelByCode(espace)}</div>
      </div>
      <div className="mb-6 flex min-h-7 flex-wrap gap-4">
        {!isEmpty(ficheSolutionIds) ? (
          <>
            {ficheSolutionIds.map((ficheId) => (
              <AideProjetCardLabelFicheSolution ficheId={ficheId} key={ficheId} />
            ))}
          </>
        ) : (
          <div className="flex items-center gap-4 ">
            <p className="text-dsfr-text-default-info m-0 text-base">
              Pour voir des aides plus pertinentes, sélectionnez des solutions dans votre projet
            </p>
            <LinkWithoutPrefetch
              href={PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS(projet.id)}
              className="fr-btn fr-btn--secondary shrink-0 rounded-3xl fr-btn--sm"
            >
              Ajouter des solutions
            </LinkWithoutPrefetch>
          </div>
          )}
      </div>
      <Separator className="mb-6 h-px !opacity-100" />
    </>
  );
};
