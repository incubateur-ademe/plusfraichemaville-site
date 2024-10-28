import { PFMV_ROUTES } from "@/src/helpers/routes";
import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import clsx from "clsx";
import { SourcingEmpty } from "./sourcing-empty";

export const Sourcing = () => {
  return (
    <div className="flex gap-6 ">
      <SourcingEmpty />
      <GenericFicheLink
        href={PFMV_ROUTES.ESPACE_PROJET_SOURCING_MAP}
        className={clsx(
          "fr-btn !h-32 !w-32 rounded-[10px] bg-dsfr-text-label-blue-france",
          "flex !flex-col items-center justify-center",
          "self-center",
        )}
      >
        <i className="ri-add-circle-fill mb-2 text-sm text-white"></i>
        <span className="text-center text-white">Ajouter des contacts</span>
      </GenericFicheLink>
    </div>
  );
};
