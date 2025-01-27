import { useCallback, useState } from "react";
import { contactsTypeMap, ContactTypeKeys } from "@/src/components/annuaire/helpers";
import { RexContactId, AnnuaireContact } from "@/src/components/annuaire/types";

export type AnnuaireContactFiltersState = {
  filterKey: ContactTypeKeys;
  selected: boolean;
}[];

export const useAnnuaireCardFilters = () => {
  const [contactTypeFilters, setContactTypeFilters] = useState<AnnuaireContactFiltersState>(
    contactsTypeMap.map((contactType) => ({ filterKey: contactType.code, selected: false })),
  );

  const setFilter = (key: ContactTypeKeys, selected: boolean) => {
    setContactTypeFilters(contactTypeFilters.map((f) => (f.filterKey != key ? f : { filterKey: key, selected })));
  };
  const [annuaireContacts, setAnnuaireContacts] = useState<AnnuaireContact[]>([]);

  const addRexContact = useCallback((newContact: AnnuaireContact) => {
    if (newContact.type === "rex") {
      setAnnuaireContacts((oldArray) => [
        ...oldArray.filter(
          (contact) =>
            contact.type !== "rex" ||
            contact.id.rexId !== newContact.id.rexId ||
            contact.id.contactId !== newContact.id.contactId,
        ),
        newContact,
      ]);
    }
  }, []);

  const setInProgressContacts = useCallback((inProgressProjetContacts: AnnuaireContact[]) => {
    setAnnuaireContacts((oldArray) => [
      ...oldArray.filter((oldContact) => oldContact.type !== "in-progress"),
      ...inProgressProjetContacts,
    ]);
  }, []);

  const removeRexContacts = useCallback((newRexContactIds: RexContactId[]) => {
    setAnnuaireContacts((oldArray) => [
      ...oldArray.filter(
        (oldContact) =>
          oldContact.type !== "rex" ||
          newRexContactIds.find((c) => c.rexId === oldContact.id.rexId && c.contactId === oldContact.id.contactId),
      ),
    ]);
  }, []);

  const contactCountForFilter = useCallback(
    (filterKey: ContactTypeKeys) => annuaireContacts.filter((c) => c.typeContact === filterKey).length ?? 0,
    [annuaireContacts],
  );

  const contactIsVisible = useCallback(
    (contact: AnnuaireContact): boolean =>
      contactTypeFilters.every((f) => !f.selected) ||
      contactTypeFilters.find((f) => f.filterKey === contact.typeContact)?.selected ||
      false,
    [contactTypeFilters],
  );

  return {
    contactTypeFilters,
    setFilter,
    contactCountForFilter,
    addRexContact,
    setInProgressContacts,
    contactIsVisible,
    removeRexContacts,
  };
};
