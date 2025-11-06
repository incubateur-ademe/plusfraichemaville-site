"use client";
import clsx from "clsx";
import { AnnuaireEmpty } from "./annuaire-empty";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useIsLecteur } from "@/src/hooks/use-is-lecteur";
import { isEmpty } from "@/src/helpers/listUtils";
import { userProjetToAnnuaireContactWithProjet } from "@/src/components/annuaire/helpers";
import { AnnuaireContact, RexContactId } from "@/src/components/annuaire/types";
import { AnnuaireRexContactCardFetcher } from "@/src/components/annuaire/contacts/annuaire-rex-contact-card-fetcher";
import { AnnuaireProjetVisibility } from "./annuaire-projet-visibility";
import { AnnuaireContactsDownloader } from "./side-panel/annuaire-contacts-downloader";
import { useAnnuaireCardFilters } from "@/src/components/annuaire/use-annuaire-card-filters";
import { useEffect, useMemo, useState } from "react";
import { AnnuaireCardFilters } from "@/src/components/annuaire/annuaire-card-filters";
import { AnnuaireContactCard } from "@/src/components/annuaire/contacts/annuaire-contact-card";
import Button from "@codegouvfr/react-dsfr/Button";

export const AnnuaireSavedContacts = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const isLecteur = useIsLecteur(currentProjet?.id);
  const inProgressProjetContacts = currentProjet?.sourcing_user_projets;
  const rexContactIds = currentProjet?.sourcing_rex as RexContactId[] | undefined;
  const nbContacts = (inProgressProjetContacts?.length || 0) + (rexContactIds?.length || 0);
  const [showFilters, setShowFilters] = useState(false);

  const {
    contactTypeFilters,
    setFilter,
    setInProgressContacts,
    removeRexContacts,
    contactCountForFilter,
    addRexContact,
    contactIsVisible,
  } = useAnnuaireCardFilters();

  const shouldShowContact = (contact: AnnuaireContact) => (showFilters ? contactIsVisible(contact) : true);

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
    <div className="mt-8">
      <div className="mb-8 flex justify-between align-middle">
        <h2 className="!mb-0 text-[1.75rem]">Mes contacts sauvegardés</h2>

        {nbContacts > 0 && (
          <div className="flex gap-4">
            <AnnuaireContactsDownloader projetId={currentProjet?.id} />
            <Button
              title="Filtrer"
              className="rounded-3xl"
              iconPosition="left"
              priority={showFilters ? "primary" : "secondary"}
              iconId={showFilters ? "ri-filter-off-fill" : "ri-filter-fill"}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filtrer
            </Button>
          </div>
        )}
      </div>
      <AnnuaireCardFilters
        setFilter={setFilter}
        contactTypeFilters={contactTypeFilters}
        contactCountForFilter={contactCountForFilter}
        className={clsx(
          showFilters ? "mb-12 max-h-[20rem] opacity-100" : "max-h-0 opacity-0",
          "transition-all duration-300",
        )}
      />
      <div className="flex flex-wrap gap-6">
        {!isEmpty(inProgressAnnuaireContact) &&
          inProgressAnnuaireContact?.map(
            (contact) =>
              shouldShowContact(contact) && (
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
              contactIsVisible={shouldShowContact}
              rexContactId={rexContactId}
              key={`${rexContactId.rexId}-${rexContactId.contactId}`}
            />
          ))}
        {isEmpty(inProgressProjetContacts) && isEmpty(rexContactIds) && <AnnuaireEmpty />}
        {!isLecteur && (
          <Button
            onClick={(e: any) => {
              const element = document.getElementById("annuaire-map");
              if (element) {
                e.preventDefault();
                element.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
            className={clsx(
              "!h-32 !w-32 rounded-[10px] bg-dsfr-text-label-blue-france",
              "flex !flex-col items-center justify-center self-center",
            )}
          >
            <i className="ri-add-circle-fill mb-2 text-sm text-white"></i>
            <span className="text-center text-white">Ajouter des contacts</span>
          </Button>
        )}
      </div>
      <div className="mt-10">
        <AnnuaireProjetVisibility isLecteur={isLecteur} />
      </div>
    </div>
  );
};
