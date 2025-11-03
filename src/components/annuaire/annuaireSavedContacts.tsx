"use client";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import clsx from "clsx";
import { AnnuaireEmpty } from "./annuaire-empty";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useIsLecteur } from "@/src/hooks/use-is-lecteur";
import { isEmpty } from "@/src/helpers/listUtils";
import { userProjetToAnnuaireContactWithProjet } from "@/src/components/annuaire/helpers";
import { RexContactId } from "@/src/components/annuaire/types";
import { AnnuaireRexContactCardFetcher } from "@/src/components/annuaire/contacts/annuaire-rex-contact-card-fetcher";
import { AnnuaireProjetVisibility } from "./annuaire-projet-visibility";
import { AnnuaireContactsDownloader } from "./side-panel/annuaire-contacts-downloader";
import { useAnnuaireCardFilters } from "@/src/components/annuaire/use-annuaire-card-filters";
import { useEffect, useMemo } from "react";
import { AnnuaireCardFilters } from "@/src/components/annuaire/annuaire-card-filters";
import { AnnuaireContactCard } from "@/src/components/annuaire/contacts/annuaire-contact-card";

export const AnnuaireSavedContacts = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const isLecteur = useIsLecteur(currentProjet?.id);
  const inProgressProjetContacts = currentProjet?.sourcing_user_projets;
  const rexContactIds = currentProjet?.sourcing_rex as RexContactId[] | undefined;

  const {
    contactTypeFilters,
    setFilter,
    setInProgressContacts,
    removeRexContacts,
    contactCountForFilter,
    addRexContact,
    contactIsVisible,
  } = useAnnuaireCardFilters();

  const inProgressAnnuaireContact = useMemo(
    () => inProgressProjetContacts?.map((c) => userProjetToAnnuaireContactWithProjet(c.sourced_user_projet)) || [],
    [inProgressProjetContacts],
  );

  useEffect(() => {
    setInProgressContacts(inProgressAnnuaireContact);
  }, [inProgressAnnuaireContact, setInProgressContacts]);

  useEffect(() => {
    if (rexContactIds) {
      removeRexContacts(rexContactIds);
    }
  }, [removeRexContacts, rexContactIds]);

  return (
    <div className="fr-container mt-8">
      <div className="mb-8 flex justify-between align-middle">
        <h2 className="!mb-0 text-[1.75rem]">Mes contacts sauvegardés</h2>
        {(!isEmpty(inProgressProjetContacts) || !isEmpty(rexContactIds)) && (
          <AnnuaireContactsDownloader projetId={currentProjet?.id} />
        )}
      </div>
      <AnnuaireCardFilters
        setFilter={setFilter}
        contactTypeFilters={contactTypeFilters}
        contactCountForFilter={contactCountForFilter}
      />
      <div className="flex flex-wrap gap-6">
        {!isEmpty(inProgressAnnuaireContact) &&
          inProgressAnnuaireContact?.map(
            (contact) =>
              contactIsVisible(contact) && (
                <AnnuaireContactCard
                  key={contact.uniqueId}
                  contact={contact}
                  projetId={currentProjet?.id}
                  className="w-96"
                  showContactProjet
                />
              ),
          )}
        {!isEmpty(rexContactIds) &&
          rexContactIds?.map((rexContactId) => (
            <AnnuaireRexContactCardFetcher
              addRexContact={addRexContact}
              contactIsVisible={contactIsVisible}
              rexContactId={rexContactId}
              key={`${rexContactId.rexId}-${rexContactId.contactId}`}
            />
          ))}
        {isEmpty(inProgressProjetContacts) && isEmpty(rexContactIds) && <AnnuaireEmpty />}
        {!isLecteur && (
          <GenericFicheLink
            href={PFMV_ROUTES.ESPACE_PROJET_ANNUAIRE_MAP}
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
      <div className="mt-10">
        <AnnuaireProjetVisibility isLecteur={isLecteur} />
      </div>
    </div>
  );
};
