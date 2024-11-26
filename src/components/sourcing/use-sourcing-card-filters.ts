import { useCallback, useState } from "react";
import { contactsTypeMap, ContactTypeKeys } from "@/src/components/sourcing/helpers";
import { RexContactId, SourcingContact } from "@/src/components/sourcing/types";

export type SourcingContactFiltersState = {
  filterKey: ContactTypeKeys;
  selected: boolean;
}[];

export const useSourcingCardFilters = () => {
  const [contactTypeFilters, setContactTypeFilters] = useState<SourcingContactFiltersState>(
    contactsTypeMap.map((contactType) => ({ filterKey: contactType.code, selected: false })),
  );

  const setFilter = (key: ContactTypeKeys, selected: boolean) => {
    setContactTypeFilters(contactTypeFilters.map((f) => (f.filterKey != key ? f : { filterKey: key, selected })));
  };
  const [sourcingContacts, setSourcingContacts] = useState<SourcingContact[]>([]);

  const addRexContact = useCallback((newContact: SourcingContact) => {
    if (newContact.type === "rex") {
      setSourcingContacts((oldArray) => [
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

  const setInProgressContacts = useCallback((inProgressProjetContacts: SourcingContact[]) => {
    setSourcingContacts((oldArray) => [
      ...oldArray.filter((oldContact) => oldContact.type !== "in-progress"),
      ...inProgressProjetContacts,
    ]);
  }, []);

  const removeRexContacts = useCallback((newRexContactIds: RexContactId[]) => {
    setSourcingContacts((oldArray) => [
      ...oldArray.filter(
        (oldContact) =>
          oldContact.type !== "rex" ||
          newRexContactIds.find((c) => c.rexId === oldContact.id.rexId && c.contactId === oldContact.id.contactId),
      ),
    ]);
  }, []);

  const contactCountForFilter = useCallback(
    (filterKey: ContactTypeKeys) => sourcingContacts.filter((c) => c.typeContact === filterKey).length ?? 0,
    [sourcingContacts],
  );

  const contactIsVisible = useCallback(
    (contact: SourcingContact): boolean =>
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
