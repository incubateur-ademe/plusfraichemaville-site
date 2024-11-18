import { getSourcingContactTypeLabel } from "../helpers";
import Image from "next/image";
import { CopyField } from "../../common/copy-field";
import { SourcingContact } from "@/src/components/sourcing/types";
import { SourcingContactSaveButton } from "@/src/components/sourcing/contacts/sourcing-contact-save-button";
import { useIsLecteur } from "@/src/hooks/use-is-lecteur";
import clsx from "clsx";

type SourcingContactCardProps = {
  contact: SourcingContact;
  projetId?: number | null;
};

export const SourcingContactCard = ({ contact, projetId }: SourcingContactCardProps) => {
  const type = getSourcingContactTypeLabel(contact.typeContact, false);
  const ligne1 =
    contact.type === "rex" ? getSourcingContactTypeLabel(contact.sousTypeContact, true) : contact.nomCollectivite;
  const ligne3 = contact.type === "rex" ? null : contact.poste;

  const shoudDisplaySaveButton = !useIsLecteur(projetId);

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border-[1px] border-dsfr-border-default-grey p-6">
      <div className="mb-6 flex flex-row items-center justify-between">
        <div
          className={clsx(
            "fr-badge fr-badge--info fr-badge--sm fr-badge--no-icon !max-w-[116px] !text-pfmv-navy",
            "!bg-dsfr-background-open-blue-france",
          )}
        >
          {contact.typeContact === "collectivite" && (
            <Image
              src="/images/sourcing/sourcing-label-collectivite.svg"
              className="mr-1"
              width={16}
              height={16}
              alt=""
            />
          )}
          {type}
        </div>
        {projetId && shoudDisplaySaveButton && <SourcingContactSaveButton contact={contact} projetId={projetId} />}
      </div>
      <div>
        <h3 className="mb-1 text-lg font-bold">{ligne1}</h3>
        <h4 className="mb-0 text-[16px]">{contact.label}</h4>
        <h5 className="mb-0 text-[16px]">{ligne3}</h5>
        <div>
          {contact.email && <CopyField className="text-pfmv-navy underline" label="Email" value={contact.email} />}
          {contact.telephone && <CopyField label="Téléphone" value={contact.telephone} />}
        </div>
      </div>
    </div>
  );
};
