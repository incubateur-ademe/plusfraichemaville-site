import { getSourcingContactTypeLabel } from "../helpers";
import Image from "next/image";
import { CopyField } from "../../common/copy-field";
import { SourcingContact } from "@/src/components/sourcing/types";

type SourcingContactCardProps = {
  contact: SourcingContact;
};

export const SourcingContactCard = ({ contact }: SourcingContactCardProps) => {
  const type = getSourcingContactTypeLabel(contact.type_de_contact, false);
  const sousType = getSourcingContactTypeLabel(contact.sous_type_de_contact, true);

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border-[1px] border-dsfr-border-default-grey p-6">
      <div className="mb-6">
        <p className="fr-badge fr-badge--info fr-badge--sm fr-badge--no-icon mb-2 !text-pfmv-navy">
          {contact.type_de_contact === "collectivite" && (
            <Image
              src="/images/sourcing/sourcing-label-collectivite.svg"
              className="mr-1"
              width={16}
              height={16}
              alt=""
            />
          )}
          {type}
        </p>
      </div>
      <div>
        <h3 className="mb-1 text-lg font-bold">{sousType}</h3>
        <h4 className="mb-0 text-[16px]">{contact.label}</h4>
        <div>
          {contact.email && <CopyField className="text-pfmv-navy underline" label="Email" value={contact.email} />}
          {contact.telephone && <CopyField label="Téléphone" value={contact.telephone} />}
        </div>
      </div>
    </div>
  );
};
