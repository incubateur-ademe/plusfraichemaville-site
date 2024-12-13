import { RexContactId, SourcingContact, StrapiSourcingContact } from "@/src/components/sourcing/types";

import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { GET_REX_WITH_CONTACTS_BY_ID } from "@/src/helpers/routes";
import { SourcingRexContactCardSkeleton } from "@/src/components/sourcing/contacts/sourcing-rex-concact-card-skeleton";
import { strapiContactToSourcingContact } from "@/src/components/sourcing/helpers";
import { SourcingContactCard } from "@/src/components/sourcing/contacts/sourcing-contact-card";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useEffect, useState } from "react";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";

type SourcingRexContactCardFetcherProps = {
  rexContactId: RexContactId;
  contactIsVisible: (_: SourcingContact) => boolean;
  addRexContact: (_: SourcingContact) => void;
};

export const SourcingRexContactCardFetcher = ({
  rexContactId,
  contactIsVisible,
  addRexContact,
}: SourcingRexContactCardFetcherProps) => {
  const [sourcingContact, setSourcingContact] = useState<SourcingContact | null>();
  const { data, isLoading } = useImmutableSwrWithFetcher<RetourExperience>(
    GET_REX_WITH_CONTACTS_BY_ID(rexContactId.rexId),
  );
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());

  useEffect(() => {
    const loadedStrapiContact = data
      ? (data?.attributes.contacts as unknown as StrapiSourcingContact[])?.find(
          (contact) => contact.id === rexContactId.contactId,
        )
      : null;
    const loadedContact =
      data && loadedStrapiContact ? strapiContactToSourcingContact(loadedStrapiContact, data) : null;
    if (loadedContact) {
      addRexContact(loadedContact);
      setSourcingContact(loadedContact);
    }
  }, [addRexContact, contactIsVisible, data, rexContactId.contactId]);

  return !data && isLoading ? (
    <SourcingRexContactCardSkeleton />
  ) : (
    sourcingContact && contactIsVisible(sourcingContact) && (
      <SourcingContactCard
        contact={sourcingContact}
        showSourcedProjet
        sourcingProjetId={currentProjet?.id}
        className="w-96"
      />
    )
  );
};
