import { PFMV_ROUTES } from "@/helpers/routes";
import clsx from "clsx";
import { FicheDiagnosticLink } from "./fiche-diagnostic-link";

export const FicheDiagnosticProjetListeAddButton = () => (
  <FicheDiagnosticLink
    href={PFMV_ROUTES.ESPACE_PROJET_FICHES_DIAGNOSTIC_LISTE_ALL}
    className={clsx(
      "fr-btn !w-32 !h-32 rounded-3xl bg-dsfr-text-label-blue-france",
      "flex !flex-col items-center justify-center",
      "self-center",
    )}
  >
    <i className="ri-add-circle-fill text-white text-sm mb-2"></i>
    <span className="text-white text-center">Ajouter des méthodes</span>
  </FicheDiagnosticLink>
);
