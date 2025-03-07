import { RetourExperienceDiagnostic } from "@/src/lib/strapi/types/api/retour-experience-diagnostic";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { RetourExperienceDiagLabel } from "./retour-experience-diag";
import { Contact, TypeDeContact } from "@/src/lib/strapi/types/components/retour-experience/Contact";
import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import clsx from "clsx";
import { RetourExperienceDiagCardPicto } from "./retour-experience-diag-card-picto";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import Image from "next/image";
import { CopyField } from "@/src/components/common/copy-field";

type RetourExperienceDiagCardProps = {
  rex?: RetourExperienceDiagnostic;
  className?: string;
  onClickButton?: () => void;
};

export const RetourExperienceDiagCard = ({ rex, className, onClickButton }: RetourExperienceDiagCardProps) => {
  if (!rex) return null;

  const { titre, image_principale, contacts, slug, lieu } = rex.attributes;

  const collectivite = contacts.filter((contact) => contact.type_de_contact === TypeDeContact.Collectivite)[0];
  const prestataire = contacts.filter((contact) => contact.type_de_contact !== TypeDeContact.Collectivite)[0];

  return (
    <div className={clsx(className, "pfmv-flat-card flex max-w-[28.75rem] flex-col rounded-2xl bg-white !bg-none")}>
      <div className="relative mb-5 h-[12rem] ">
        <Image
          width={462}
          height={267}
          className="h-full w-full rounded-t-2xl object-cover"
          src={getStrapiImageUrl(image_principale, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt={titre || "image titre"}
        />
        <div className="fr-container absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2 text-white">
          <RetourExperienceDiagLabel>
            <i className="ri-map-pin-line mr-2 before:!mb-1 before:!size-4"></i>
            {lieu}
          </RetourExperienceDiagLabel>
        </div>
      </div>

      <div className="px-8">
        <h2 className="mb-5 text-[1.375rem] leading-7">{titre}</h2>
        {rex.attributes.lien_rex_diagnostics && (
          <div className="mb-7 flex items-center gap-2">
            {rex.attributes.lien_rex_diagnostics.data.map(
              (lienRex) =>
                lienRex.attributes.fiche_diagnostic && (
                  <RetourExperienceDiagCardPicto
                    ficheDiagnostic={lienRex.attributes.fiche_diagnostic.data}
                    key={lienRex.attributes.fiche_diagnostic.data.id}
                  />
                ),
            )}
          </div>
        )}
        <ContactSection title="Contact de la collectivité" contact={collectivite} />
        <ContactSection title="Contact du prestataire" contact={prestataire} />
      </div>
      <div className="mt-auto">
        <GenericFicheLink
          onClick={onClickButton}
          href={PFMV_ROUTES.ESPACE_PROJET_REX_DIAGNOSTIC(slug)}
          className={clsx("fr-btn fr-btn--tertiary mb-4 ml-4 rounded-3xl !text-dsfr-text-title-grey ")}
        >
          {"Lire le retour d’expérience"}
        </GenericFicheLink>
      </div>
    </div>
  );
};

type RetourExperienceDiagCardContactProps = {
  title: string;
  contact: Contact;
};

const ContactSection = ({ title, contact }: RetourExperienceDiagCardContactProps) => {
  if (!contact) return null;

  return (
    <div className="mb-5">
      <h3 className="mb-0 text-sm">{title}</h3>
      <div className="text-sm text-dsfr-text-mention-grey">
        {contact.nom && (
          <span className="font-bold">
            {contact.nom}
            {contact.label && " - "}
          </span>
        )}
        {contact.label}
        {contact.email && (
          <CopyField
            className="!mb-2 text-dsfr-text-mention-grey hover:underline"
            label="Email"
            value={contact.email}
            noIcon
          />
        )}
      </div>
    </div>
  );
};
