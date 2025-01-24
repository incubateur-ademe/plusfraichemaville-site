import { RexContactId, SourcingContact, StrapiSourcingContact } from "@/src/components/annuaire/types";

import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { GET_REX_WITH_CONTACTS_BY_ID } from "@/src/helpers/routes";
import { AnnuaireRexContactCardSkeleton } from "@/src/components/annuaire/contacts/annuaire-rex-concact-card-skeleton";
import { strapiContactToSourcingContact } from "@/src/components/annuaire/helpers";
import { AnnuaireContactCard } from "@/src/components/annuaire/contacts/annuaire-contact-card";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useEffect, useState } from "react";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";

type AnnuaireRexContactCardFetcherProps = {
  rexContactId: RexContactId;
  contactIsVisible: (_: SourcingContact) => boolean;
  addRexContact: (_: SourcingContact) => void;
};

export const AnnuaireRexContactCardFetcher = ({
  rexContactId,
  contactIsVisible,
  addRexContact,
}: AnnuaireRexContactCardFetcherProps) => {
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
    <AnnuaireRexContactCardSkeleton />
  ) : (
    sourcingContact && contactIsVisible(sourcingContact) && (
      <AnnuaireContactCard
        contact={sourcingContact}
        showSourcedProjet
        sourcingProjetId={currentProjet?.id}
        className="w-96"
      />
    )
  );
};
