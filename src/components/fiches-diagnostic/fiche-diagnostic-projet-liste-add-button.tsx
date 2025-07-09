"use client";

import { PFMV_ROUTES } from "@/src/helpers/routes";
import clsx from "clsx";
import { useProjetsStore } from "@/src/stores/projets/provider";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export const FicheDiagnosticProjetListeAddButton = () => {
  const projetId = useProjetsStore((state) => state.currentProjetId);
  if (!projetId) {
    return null;
  }

  return (
    <LinkWithoutPrefetch
      href={PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_PRESTATION_LISTE(projetId)}
      className={clsx(
        "fr-btn !h-32 !w-40 rounded-[10px] bg-dsfr-text-label-blue-france",
        "flex !flex-col items-center justify-center self-center",
      )}
    >
      <i className="ri-add-circle-fill mb-2 text-sm text-white"></i>
      <span className="text-center text-white">{"Ajouter d'autres méthodes"}</span>
    </LinkWithoutPrefetch>
  );
};
