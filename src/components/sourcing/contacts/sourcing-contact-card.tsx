import { getSourcingContactTypeLabel } from "../helpers";
import Image from "next/image";
import { CopyField } from "../../common/copy-field";
import { SourcingContact } from "@/src/components/sourcing/types";
import { SourcingContactSaveButton } from "@/src/components/sourcing/contacts/sourcing-contact-save-button";
import { useIsLecteur } from "@/src/hooks/use-is-lecteur";
import clsx from "clsx";

import SourcingCardAccordion from "@/src/components/common/sourcing-card-accordion";
import Tag from "@codegouvfr/react-dsfr/Tag";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Link from "next/link";
import { SourcingRexContentSeeProject } from "@/src/components/sourcing/side-panel/sourcing-rex-content-see-project";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { COPY_EMAIL, COPY_TELEPHONE } from "@/src/helpers/matomo/matomo-tags";

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
  const isProjetTypeRex = contact.type === "rex";
  const type = getSourcingContactTypeLabel(contact.typeContact, false);
  const ligne1 = isProjetTypeRex ? getSourcingContactTypeLabel(contact.sousTypeContact, true) : contact.nomCollectivite;
  const ligne3 = isProjetTypeRex ? null : contact.poste;
  const contactUniqueId = isProjetTypeRex ? `${contact.id.rexId}-${contact.id.contactId}` : `${contact.userProjetId}`;

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
          <h3 className={clsx("mb-1 font-bold", isProjetTypeRex ? "text-xl" : "text-lg")}>{ligne1}</h3>
          <h4 className="mb-0 !text-base">{contact.label}</h4>
          <h5 className="mb-2 !text-base">{ligne3}</h5>
          <div>
            {contact.email && (
              <CopyField
                className="text-pfmv-navy underline"
                label="Email"
                value={contact.email}
                onClick={() => trackEvent(COPY_EMAIL)}
              />
            )}
            {contact.telephone && (
              <CopyField label="Téléphone" value={contact.telephone} onClick={() => trackEvent(COPY_TELEPHONE)} />
            )}
            {contact.siteInternet && (
              <div className="fr-icon-global-line text-pfmv-navy before:mb-[1px] before:mr-1 before:!h-5 before:!w-5">
                <Link href={contact.siteInternet} prefetch={false} target="_blank">
                  Accéder au site internet
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {showSourcedProjet && (
        <div className="flex w-full flex-col">
          <SourcingCardAccordion
            ariaId={`accordion-diag-${contactUniqueId}`}
            title={
              isProjetTypeRex ? (
                <div className="flex w-full flex-row justify-between">
                  <Badge small noIcon className="!mb-0 !bg-dsfr-text-default-success !text-dsfr-text-inverted-success">
                    Projet réalisé
                  </Badge>
                  <div className="text-right text-sm font-medium">
                    <strong>Budget</strong> {contact.rex?.cout}
                  </div>
                </div>
              ) : (
                <Badge small noIcon className="!mb-0 !bg-pfmv-navy !text-dsfr-background-alt-blue-france">
                  Projet en cours
                </Badge>
              )
            }
          >
            {!isProjetTypeRex ? (
              <>
                <div className="mb-4 font-bold">{contact.projet?.nom}</div>
                <Tag small className="h-fit">
                  {contact.projet?.region}
                </Tag>
              </>
            ) : (
              <>
                <div className="mb-4 font-bold">{contact.rex?.nom}</div>
                <div className="flex items-center justify-between">
                  <Tag small className="h-fit">
                    {contact.rex?.region}
                  </Tag>
                  {contact?.rex?.slug && <SourcingRexContentSeeProject slug={contact.rex.slug} />}
                </div>
              </>
            )}
          </SourcingCardAccordion>
        </div>
      )}
    </div>
  );
};
