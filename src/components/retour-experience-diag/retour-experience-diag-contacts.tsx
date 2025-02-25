import clsx from "clsx";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { CopyField } from "../common/copy-field";
import { Contact } from "@/src/lib/strapi/types/components/retour-experience/Contact";

type RetourExperienceDiagContactsProps = {
  contacts: Contact[];
};

export const RetourExperienceDiagContacts = ({ contacts }: RetourExperienceDiagContactsProps) => {
  const collectivites = contacts.filter((contact) => contact.type_de_contact === "collectivite");
  const prestataires = contacts.filter((contact) => contact.type_de_contact !== "collectivite");

  if (collectivites.length === 0 && prestataires.length === 0) {
    return null;
  }

  return (
    <div className="my-20">
      <h2 className="mb-5 text-[18px]">Contacts</h2>
      <RetourExperienceDiagContactBloc contacts={collectivites} label="Collectivité" className="mb-8" />
      <RetourExperienceDiagContactBloc contacts={prestataires} label="Prestataires" />
    </div>
  );
};

export const RetourExperienceDiagContactBlocBadge = ({ children }: PropsWithChildren) => {
  return (
    <div className="mb-3 border-b-[1px] border-b-dsfr-border-default-grey pb-2">
      <div
        className={clsx(
          "fr-badge fr-badge--info fr-badge--sm fr-badge--no-icon !max-w-[116px] !text-pfmv-navy",
          "!bg-dsfr-background-open-blue-france",
        )}
      >
        <Image src="/images/annuaire/annuaire-label-collectivite.svg" className="mr-1" width={16} height={16} alt="" />
        {children}
      </div>
    </div>
  );
};

export const RetourExperienceDiagContactBloc = ({
  contacts,
  label,
  className,
}: {
  contacts: Contact[];
  label: string;
  className?: string;
}) => {
  if (contacts.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <RetourExperienceDiagContactBlocBadge>{label}</RetourExperienceDiagContactBlocBadge>
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
