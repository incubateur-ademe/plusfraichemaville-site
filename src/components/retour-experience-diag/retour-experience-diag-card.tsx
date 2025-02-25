import { RetourExperienceDiagnostic } from "@/src/lib/strapi/types/api/retour-experience-diagnostic";
import { ImageLoader } from "../common/image-loader";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { RetourExperienceDiagLabel } from "./retour-experience-diag";
import { Contact } from "@/src/lib/strapi/types/components/retour-experience/Contact";
import { CopyField } from "../common/copy-field";
import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";

type RetourExperienceDiagCardProps = {
  rex?: RetourExperienceDiagnostic;
};

export const RetourExperienceDiagCard = ({ rex }: RetourExperienceDiagCardProps) => {
  if (!rex) return null;

  const { titre, image_principale, contacts, slug, lieu } = rex.attributes;

  const collectivite = contacts.filter((contact) => contact.type_de_contact === "collectivite")[0];
  const prestataire = contacts.filter((contact) => contact.type_de_contact !== "collectivite")[0];

  return (
    <GenericFicheLink href={`/fiches-diagnostic/retour-experience/${slug}`} className="!bg-none">
      <div className="pfmv-card max-w-[28.875rem] overflow-hidden rounded-2xl bg-white">
        <div className="relative mb-7">
          <ImageLoader
            width={462}
            height={267}
            className="h-[267px] w-[462px]"
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
        <div className="px-5">
          <h2 className="mb-7 text-[22px] leading-7">{titre}</h2>
          <ContactSection title="Contact de la collectivité" contact={collectivite} />
          <ContactSection title="Contact du prestataire" contact={prestataire} />
        </div>
      </div>
    </GenericFicheLink>
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
