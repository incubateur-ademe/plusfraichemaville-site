import { PFMV_ROUTES } from "@/helpers/routes";
import clsx from "clsx";
import { FicheDiagnosticLink } from "./fiche-diagnostic-link";

export const FicheDiagnosticProjetListeAddButton = () => (
  <FicheDiagnosticLink
    href={PFMV_ROUTES.ESPACE_PROJET_FICHES_DIAGNOSTIC_LISTE_ALL}
    className={clsx(
      "fr-btn !h-32 !w-32 rounded-3xl bg-dsfr-text-label-blue-france",
      "flex !flex-col items-center justify-center",
      "self-center",
    )}
  >
    <i className="ri-add-circle-fill mb-2 text-sm text-white"></i>
    <span className="text-center text-white">Ajouter des méthodes</span>
  </FicheDiagnosticLink>
);
