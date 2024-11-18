import { getSourcingContactTypeLabel } from "../helpers";
import Image from "next/image";
import { CopyField } from "../../common/copy-field";
import { SourcingContact } from "@/src/components/sourcing/types";
import { SourcingContactSaveButton } from "@/src/components/sourcing/contacts/sourcing-contact-save-button";
import { useIsLecteur } from "@/src/hooks/use-is-lecteur";
import clsx from "clsx";
import React from "react";
import SourcingCardAccordion from "@/src/components/common/sourcing-card-accordion";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { generateRandomId } from "@/src/helpers/common";

type SourcingContactCardProps = {
  contact: SourcingContact;
  showSourcedProjet: boolean;
  sourcingProjetId?: number | null;
  className?: string;
};

export const SourcingContactCard = ({
  contact,
  sourcingProjetId,
  className,
  showSourcedProjet,
}: SourcingContactCardProps) => {
  const isTypeRex = contact.type === "rex";
  const type = getSourcingContactTypeLabel(contact.typeContact, false);
  const ligne1 = isTypeRex ? getSourcingContactTypeLabel(contact.sousTypeContact, true) : contact.nomCollectivite;
  const ligne3 = isTypeRex ? null : contact.poste;

  const shoudDisplaySaveButton = !useIsLecteur(sourcingProjetId);

  return (
    <div
      className={clsx(
        "flex flex-col justify-between overflow-y-hidden rounded-2xl border-[1px] border-dsfr-border-default-grey",
        className,
      )}
    >
      <div className="p-6">
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
          {sourcingProjetId && shoudDisplaySaveButton && (
            <SourcingContactSaveButton contact={contact} projetId={sourcingProjetId} />
          )}
        </div>
        <div>
          <h3 className="mb-1 text-lg font-bold">{ligne1}</h3>
          <h4 className="mb-0 !text-base">{contact.label}</h4>
          <h5 className="mb-0 !text-base">{ligne3}</h5>
          <div>
            {contact.email && <CopyField className="text-pfmv-navy underline" label="Email" value={contact.email} />}
            {contact.telephone && <CopyField label="Téléphone" value={contact.telephone} />}
          </div>
        </div>
      </div>
      {showSourcedProjet && (
        <div className="flex w-full flex-col">
          <SourcingCardAccordion ariaId={`accordion-diag${!isTypeRex ? contact.userProjetId : generateRandomId()}`}>
            {!isTypeRex ? (
              <>
                <div className="mb-4 font-bold">{contact.projet?.nom}</div>
                <Tag small className="h-fit">
                  {contact.projet?.region}
                </Tag>
              </>
            ) : (
              <div>REX</div>
            )}
          </SourcingCardAccordion>
        </div>
      )}
    </div>
  );
};
