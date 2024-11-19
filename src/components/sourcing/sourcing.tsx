"use client";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import clsx from "clsx";
import { SourcingEmpty } from "./sourcing-empty";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useIsLecteur } from "@/src/hooks/use-is-lecteur";
import { isEmpty } from "@/src/helpers/listUtils";
import { SourcingContactCard } from "@/src/components/sourcing/contacts/sourcing-contact-card";
import { userProjetToSourcingContactWithProjet } from "@/src/components/sourcing/helpers";
import { RexContactId } from "@/src/components/sourcing/types";
import { SourcingRexContactCardFetcher } from "@/src/components/sourcing/contacts/sourcing-rex-contact-card-fetcher";

export const Sourcing = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const isLecteur = useIsLecteur(currentProjet?.id);
  const inProgressProjetContacts = currentProjet?.sourcing_user_projets;
  const rexContactIds = currentProjet?.sourcing_cms as RexContactId[];

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-12">
      {!isEmpty(inProgressProjetContacts) &&
        inProgressProjetContacts?.map((inProgressProjetContact) => (
          <SourcingContactCard
            key={inProgressProjetContact.sourced_user_projet_id}
            contact={userProjetToSourcingContactWithProjet(inProgressProjetContact.sourced_user_projet)}
            sourcingProjetId={currentProjet?.id}
            className="w-[22rem]"
            showSourcedProjet
          />
        ))}
      {!isEmpty(rexContactIds) &&
        rexContactIds.map((rexContactId) => (
          <SourcingRexContactCardFetcher
            rexContactId={rexContactId}
            key={`${rexContactId.rexId}-${rexContactId.contactId}`}
          />
        ))}
      {isEmpty(inProgressProjetContacts) && isEmpty(rexContactIds) && <SourcingEmpty />}
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
