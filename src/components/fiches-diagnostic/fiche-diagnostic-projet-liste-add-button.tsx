import { PFMV_ROUTES } from "@/src/helpers/routes";
import clsx from "clsx";
import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";

export const FicheDiagnosticProjetListeAddButton = () => (
  <GenericFicheLink
    href={PFMV_ROUTES.ESPACE_PROJET_FICHES_DIAGNOSTIC_LISTE_ALL}
    className={clsx(
      "fr-btn !h-32 !w-32 rounded-[10px] bg-dsfr-text-label-blue-france",
      "flex !flex-col items-center justify-center",
      "self-center",
    )}
  >
    <i className="ri-add-circle-fill mb-2 text-sm text-white"></i>
    <span className="text-center text-white">Ajouter des méthodes</span>
  </GenericFicheLink>
);
