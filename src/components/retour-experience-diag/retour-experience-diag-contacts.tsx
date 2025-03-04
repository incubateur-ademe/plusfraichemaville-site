import clsx from "clsx";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { CopyField } from "../common/copy-field";
import { Contact, TypeDeContact } from "@/src/lib/strapi/types/components/retour-experience/Contact";
import { getContactType } from "../annuaire/helpers";
import groupBy from "lodash/groupBy";

type RetourExperienceDiagContactsProps = {
  contacts: Contact[];
};

export const RetourExperienceDiagContacts = ({ contacts }: RetourExperienceDiagContactsProps) => {
  const collectivites = contacts.filter((contact) => contact.type_de_contact === TypeDeContact.Collectivite);

  const prestataires = contacts.filter((contact) => contact.type_de_contact !== TypeDeContact.Collectivite);
  const groupedPrestataires = Object.entries(groupBy(prestataires, "type_de_contact")).map(([type, prestas]) => ({
    type,
    prestas,
  }));

  if (collectivites.length === 0 && prestataires.length === 0) {
    return null;
  }

  return (
    <div className="my-20">
      <h2 className="mb-5 text-[18px]">Contacts</h2>
      <RetourExperienceDiagContactBloc contacts={collectivites} typeDeContact={TypeDeContact.Collectivite} />
      {groupedPrestataires.map((presta) => (
        <RetourExperienceDiagContactBloc
          key={presta.type}
          contacts={presta.prestas}
          typeDeContact={presta.type as TypeDeContact}
        />
      ))}
    </div>
  );
};

export const RetourExperienceDiagContactBlocBadge = ({
  children,
  withBadge,
}: PropsWithChildren<{ withBadge?: boolean }>) => {
  return (
    <div className="mb-3 h-[2.25rem] border-b-[1px] border-b-dsfr-border-default-grey pb-2 leading-none">
      <div
        className={clsx(
          "fr-badge fr-badge--info fr-badge--sm fr-badge--no-icon !max-w-[13.125rem] !text-pfmv-navy",
          "!bg-dsfr-background-open-blue-france",
        )}
      >
        {withBadge && (
          <Image
            src="/images/annuaire/annuaire-label-collectivite.svg"
            className="mr-1"
            width={16}
            height={16}
            alt="Badge type de contact"
          />
        )}
        {children}
      </div>
    </div>
  );
};

export const RetourExperienceDiagContactBloc = ({
  contacts,
  typeDeContact,
  className,
}: {
  contacts: Contact[];
  typeDeContact: TypeDeContact;
  className?: string;
}) => {
  if (contacts.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <RetourExperienceDiagContactBlocBadge withBadge={typeDeContact === TypeDeContact.Collectivite}>
        {getContactType(typeDeContact)?.label}
      </RetourExperienceDiagContactBlocBadge>
      {contacts.map((contact, index) => (
        <div className="mb-4 flex flex-col border-b-[1px] border-b-dsfr-border-default-grey text-sm" key={index}>
          <span className="block">
            <strong>{contact.nom} - </strong> {contact.label}
          </span>
          <CopyField className="!mb-2 text-pfmv-navy hover:underline" label="Email" value={contact.email} noIcon />
        </div>
      ))}
    </div>
  );
};
