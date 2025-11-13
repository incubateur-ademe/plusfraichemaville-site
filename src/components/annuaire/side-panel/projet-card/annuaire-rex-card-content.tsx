import Badge from "@codegouvfr/react-dsfr/Badge";
import { getRegionLabelFromCode } from "@/src/helpers/regions";
import clsx from "clsx";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { formatNumberWithSpaces } from "@/src/helpers/common";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import Button from "@codegouvfr/react-dsfr/Button";
import { selectEspaceLabelByCode } from "@/src/helpers/type-espace-filter";
import { GeoJsonAdresse } from "@/src/components/annuaire/types";

export const AnnuaireRexCardContent = ({ data, onClick }: { data: RetourExperience; onClick?: () => void }) => {
  const retourExperienceAttributes = data.attributes;
  const nomCollectivite = (retourExperienceAttributes.location as GeoJsonAdresse | null)?.properties?.city;
  return (
    <>
      <div
        className={clsx(
          "flex w-full flex-col bg-dsfr-background-alt-blue-france text-dsfr-text-title-grey",
          "fr-enlarge-button group min-h-52 rounded-2xl px-5 pb-4 pt-6 hover:bg-dsfr-background-alt-blue-france",
          "outline-bg-dsfr-background-alt-blue-france-hover outline-1 outline-offset-0 hover:outline",
        )}
      >
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
        <Button priority="tertiary no outline" className="mt-2 !px-0 text-left text-lg font-bold" onClick={onClick}>
          {retourExperienceAttributes.titre}
        </Button>
        {nomCollectivite && (
          <section className="mb-1 text-sm">
            <i className="ri-map-pin-line fr-icon--sm mr-1" />
            {nomCollectivite}
          </section>
        )}
        <section className="mb-8">
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
          <div className="text-nowrap font-bold text-pfmv-navy group-hover:underline">
            Voir les contacts <i className="ri-arrow-right-line ml-1" />
          </div>
        </div>
      </div>
    </>
  );
};
