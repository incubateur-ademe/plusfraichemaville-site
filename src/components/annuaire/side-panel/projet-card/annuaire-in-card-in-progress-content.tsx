import clsx from "clsx";
import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { getRegionLabelForProjet } from "@/src/helpers/regions";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { selectEspaceLabelByCode } from "@/src/helpers/type-espace-filter";
import Button from "@codegouvfr/react-dsfr/Button";

export const AnnuaireInCardInProgressContent = ({
  data,
  onClick,
}: {
  data: ProjetWithPublicRelations;
  onClick?: () => void;
}) => {
  const regionLabel = getRegionLabelForProjet(data);

  return (
    <>
      <div
        className={clsx(
          "flex w-full flex-col bg-dsfr-background-alt-blue-france text-dsfr-text-title-grey",
          "fr-enlarge-button group min-h-52 rounded-2xl px-5 pb-4 pt-6 hover:bg-dsfr-background-alt-blue-france",
          "hover:outline outline-1 outline-offset-0 outline-bg-dsfr-background-alt-blue-france-hover"
        )}
      >
        <div className="flex items-center justify-between">
          <Badge small noIcon className="!mb-0 !bg-pfmv-navy !text-dsfr-background-alt-blue-france">
            Projet en cours
          </Badge>
          <div className="text-sm font-bold">{selectEspaceLabelByCode(data.type_espace)}</div>
        </div>
        <Button
          priority="tertiary no outline"
          className="mb-8 mt-4 !px-0 text-left text-lg font-bold"
          onClick={onClick}
        >
          {data.nom}
        </Button>
        <div className="mt-auto flex flex-row items-center justify-between gap-1">
          <Tag small className="!m-0 h-fit">
            {regionLabel}
          </Tag>
          <div className="text-nowrap text-pfmv-navy group-hover:underline">
            Voir les contacts <i className="ri-arrow-right-line ml-2 before:mb-[3px] before:!size-4"></i>
          </div>
        </div>
      </div>
    </>
  );
};
