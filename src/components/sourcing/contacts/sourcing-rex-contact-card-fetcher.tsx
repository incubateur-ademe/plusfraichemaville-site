import { RexContactId, StrapiSourcingContact } from "@/src/components/sourcing/types";
import React from "react";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { RetourExperienceResponse } from "@/src/components/ficheSolution/type";
import { GET_REX_WITH_CONTACTS_BY_ID } from "@/src/helpers/routes";
import { SourcingRexContactCardSkeleton } from "@/src/components/sourcing/contacts/sourcing-rex-concact-card-skeleton";
import { strapiContactToSourcingContact } from "@/src/components/sourcing/helpers";
import { SourcingContactCard } from "@/src/components/sourcing/contacts/sourcing-contact-card";
import { useProjetsStore } from "@/src/stores/projets/provider";

export const SourcingRexContactCardFetcher = ({ rexContactId }: { rexContactId: RexContactId }) => {
  const { data, isLoading } = useImmutableSwrWithFetcher<RetourExperienceResponse>(
    GET_REX_WITH_CONTACTS_BY_ID(rexContactId.rexId),
  );
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());

  const contact = data
    ? (data?.attributes.contacts as unknown as StrapiSourcingContact[])?.find(
        (contact) => contact.id === rexContactId.contactId,
      )
    : null;
  const sourcingContact = data && contact ? strapiContactToSourcingContact(contact, data) : null;

  return !data && isLoading ? (
    <SourcingRexContactCardSkeleton />
  ) : (
    sourcingContact && (
      <SourcingContactCard
        contact={sourcingContact}
        showSourcedProjet
        sourcingProjetId={currentProjet?.id}
        className="w-[22rem]"
      />
    )
  );
};
