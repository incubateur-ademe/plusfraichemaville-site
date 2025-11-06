import Badge from "@codegouvfr/react-dsfr/Badge";
import { getRegionLabelFromCode } from "@/src/helpers/regions";
import clsx from "clsx";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { formatNumberWithSpaces } from "@/src/helpers/common";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import Button from "@codegouvfr/react-dsfr/Button";

export const AnnuaireRexCardContent = ({ data, onClick }: { data: RetourExperience; onClick?: () => void }) => {
  const retourExperienceAttributes = data.attributes;
  return (
    <>
      <div
        className={clsx(
          "flex w-full flex-col bg-dsfr-background-alt-blue-france text-dsfr-text-title-grey",
          "fr-enlarge-button group min-h-52 rounded-2xl px-5 pb-4 pt-6 hover:bg-dsfr-background-alt-blue-france-hover",
        )}
      >
        <div className="flex items-center justify-between">
          <Badge small noIcon className="!mb-0 !bg-dsfr-text-default-success !text-dsfr-text-inverted-success">
            Projet réalisé
          </Badge>
          <div className="flex flex-row items-center gap-1">
            <div className="text-sm">Budget</div>
            <div className="text-sm font-bold">
              {retourExperienceAttributes.cout_euro != null && retourExperienceAttributes.cout_euro >= 0
                ? `${formatNumberWithSpaces(retourExperienceAttributes.cout_euro)} €`
                : "Non communiqué"}
            </div>
          </div>
        </div>
        <Button
          priority="tertiary no outline"
          className="mb-8 mt-4 !px-0 text-left text-lg font-bold group-hover:!bg-dsfr-background-alt-blue-france-hover"
          onClick={onClick}
        >
          {retourExperienceAttributes.titre}
        </Button>
        <div className="flex items-center justify-between">
          <Tag small className="!mb-0 h-fit">
            {getRegionLabelFromCode(retourExperienceAttributes.region?.data.attributes.code)}
          </Tag>
          <div className="text-nowrap text-pfmv-navy group-hover:underline">
            Voir les contacts <i className="ri-arrow-right-line ml-2 before:mb-[3px] before:!size-4"></i>
          </div>
        </div>
      </div>
    </>
  );
};
