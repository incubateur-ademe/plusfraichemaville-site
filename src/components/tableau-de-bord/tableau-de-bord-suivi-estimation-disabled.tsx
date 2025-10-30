import { GenericFicheLink } from "@/src/components/common/generic-save-fiche/generic-fiche-link";
import { PFMV_ROUTES } from "@/src/helpers/routes";

export const TableauDeBordSuiviEstimationDisabled = () => {
  return (
    <div className="text-sm text-pfmv-navy">
      Vous devez{" "}
      <GenericFicheLink href={PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTION_LISTE_ALL}>
        choisir au moins une solution
      </GenericFicheLink>{" "}
      pour estimer le budget du projet
    </div>
  );
};
