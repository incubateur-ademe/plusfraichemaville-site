"use client";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import clsx from "clsx";
import { SourcingEmpty } from "./sourcing-empty";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useIsLecteur } from "@/src/hooks/use-is-lecteur";
import { isEmpty } from "@/src/helpers/listUtils";
import { SourcingContactCard } from "@/src/components/sourcing/contacts/sourcing-contact-card";
import { userProjetToSourcingContact } from "@/src/components/sourcing/helpers";

export const Sourcing = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const isLecteur = useIsLecteur(currentProjet?.id);
  const inProgressProjetContacts = currentProjet?.sourcing_user_projets;
  const rexContacts = currentProjet?.sourcing_cms;

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-12">
      {!isEmpty(inProgressProjetContacts) &&
        inProgressProjetContacts?.map((inProgressProjetContact) => (
          <SourcingContactCard
            contact={userProjetToSourcingContact(inProgressProjetContact.sourced_user_projet, true)}
            sourcingProjetId={currentProjet?.id}
            className="w-[22rem]"
            showSourcedProjet
          />
        ))}
      {!isEmpty(rexContacts) && <></>}
      {isEmpty(inProgressProjetContacts) && isEmpty(rexContacts) && <SourcingEmpty />}
      {!isLecteur && (
        <GenericFicheLink
          href={PFMV_ROUTES.ESPACE_PROJET_SOURCING_MAP}
          className={clsx(
            "fr-btn !h-32 !w-32 rounded-[10px] bg-dsfr-text-label-blue-france",
            "flex !flex-col items-center justify-center self-center",
          )}
        >
          <i className="ri-add-circle-fill mb-2 text-sm text-white"></i>
          <span className="text-center text-white">Ajouter des contacts</span>
        </GenericFicheLink>
      )}
    </div>
  );
};
