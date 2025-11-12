import Badge from "@codegouvfr/react-dsfr/Badge";
import { getRegionLabelFromCode } from "@/src/helpers/regions";
import { AnnuaireContactCard } from "../contacts/annuaire-contact-card";
import { Case, Conditional, Default } from "../../common/conditional-renderer";
import clsx from "clsx";
import { GeoJsonAdresse, StrapiAnnuaireContact } from "@/src/components/annuaire/types";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { strapiContactToAnnuaireContact } from "@/src/components/annuaire/helpers";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { AnnuaireRexContentSeeProject } from "./annuaire-rex-content-see-project";
import { formatNumberWithSpaces } from "@/src/helpers/common";
import { AnnuaireSidePanelTracking } from "./annuaire-side-panel-tracking";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import { selectEspaceLabelByCode } from "@/src/helpers/type-espace-filter";

export const AnnuaireRexContent = ({ data }: { data: RetourExperience }) => {
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);
  const retourExperienceAttributes = data.attributes;
  const contacts = (data.attributes.contacts as unknown as StrapiAnnuaireContact[]).map((contact) =>
    strapiContactToAnnuaireContact(contact, data),
  );
  const nomCollectivite = (retourExperienceAttributes.location as GeoJsonAdresse | null)?.properties?.city;

  return (
    <>
      <div
        className={clsx(
          "flex w-full flex-col bg-dsfr-background-alt-blue-france text-dsfr-text-title-grey",
          "min-h-52 px-5 pb-4 pt-2",
        )}
      >
        <AnnuaireSidePanelTracking type="rex" name={retourExperienceAttributes.titre} />
        <div className="flex items-center justify-between">
          <Badge small noIcon className="!mb-0 !bg-dsfr-text-default-success !text-dsfr-text-inverted-success">
            Projet réalisé
          </Badge>
          <div className="flex flex-row flex-wrap items-center gap-1">
            {retourExperienceAttributes.types_espaces?.map((typeEspace: string) => (
              <Tag key={typeEspace} small className="!m-0 h-fit">
                {selectEspaceLabelByCode(typeEspace)}
              </Tag>
            ))}
          </div>
        </div>
        <div className="mb-2 mt-2 text-lg font-bold">{retourExperienceAttributes.titre}</div>
        {nomCollectivite && (
          <section className="mb-1 text-sm">
            <i className="ri-map-pin-line fr-icon--sm mr-1" />
            {nomCollectivite}
          </section>
        )}
        <section className="mb-6">
          <i className="ri-money-euro-circle-line fr-icon--sm mr-1 " />
          <span className="text-sm">
            {retourExperienceAttributes.cout_euro != null && retourExperienceAttributes.cout_euro >= 0
              ? `${formatNumberWithSpaces(retourExperienceAttributes.cout_euro)} €`
              : "Budget non communiqué"}
          </span>
        </section>
        <div className="flex items-center justify-between">
          <Tag small className="!mb-0 h-fit">
            {getRegionLabelFromCode(retourExperienceAttributes.region?.data.attributes.code)}
          </Tag>
          <AnnuaireRexContentSeeProject slug={retourExperienceAttributes.slug} />
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold text-pfmv-navy">{contacts.length > 0 ? "Contacts" : "Contact"}</h2>
        <Conditional>
          <Case condition={contacts.length > 0}>
            {contacts?.map((contact) => (
              <AnnuaireContactCard
                contact={contact}
                key={contact.uniqueId}
                projetId={currentProjetId}
                className="mb-4"
                showContactProjet={false}
              />
            ))}
          </Case>
          <Default>
            <div
              className={clsx(
                "flex h-64 items-center justify-center overflow-hidden",
                "rounded-2xl border-[1px] border-dsfr-border-default-grey",
              )}
            >
              <div className="p-6">{"Aucun contact n'est associé à ce projet"}</div>
            </div>
          </Default>
        </Conditional>
      </div>
    </>
  );
};
