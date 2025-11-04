import { AnnuaireContact, RexContactId, StrapiAnnuaireContact } from "@/src/components/annuaire/types";

import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { GET_REX_WITH_CONTACTS_BY_ID } from "@/src/helpers/routes";
import { AnnuaireRexContactCardSkeleton } from "@/src/components/annuaire/contacts/annuaire-rex-concact-card-skeleton";
import { strapiContactToAnnuaireContact } from "@/src/components/annuaire/helpers";
import { AnnuaireContactCard } from "@/src/components/annuaire/contacts/annuaire-contact-card";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useEffect, useState } from "react";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";

type AnnuaireRexContactCardFetcherProps = {
  rexContactId: RexContactId;
  contactIsVisible: (_: AnnuaireContact) => boolean;
  addRexContact: (_: AnnuaireContact) => void;
};

export const AnnuaireRexContactCardFetcher = ({
  rexContactId,
  contactIsVisible,
  addRexContact,
}: AnnuaireRexContactCardFetcherProps) => {
  const [annuaireContact, setAnnuaireContact] = useState<AnnuaireContact | null>();
  const { data, isLoading } = useImmutableSwrWithFetcher<RetourExperience>(
    GET_REX_WITH_CONTACTS_BY_ID(rexContactId.rexId),
  );
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());

  useEffect(() => {
    const loadedStrapiContact = data
      ? (data?.attributes.contacts as unknown as StrapiAnnuaireContact[])?.find(
          (contact) => contact.id === rexContactId.contactId,
        )
      : null;
    const loadedContact =
      data && loadedStrapiContact ? strapiContactToAnnuaireContact(loadedStrapiContact, data) : null;
    if (loadedContact) {
      addRexContact(loadedContact);
      setAnnuaireContact(loadedContact);
    }
  }, [addRexContact, data, rexContactId.contactId]);

  return !data && isLoading ? (
    <AnnuaireRexContactCardSkeleton />
  ) : (
    annuaireContact && contactIsVisible(annuaireContact) && (
      <AnnuaireContactCard contact={annuaireContact} showContactProjet projetId={currentProjet?.id} className="w-96" />
    )
  );
};
