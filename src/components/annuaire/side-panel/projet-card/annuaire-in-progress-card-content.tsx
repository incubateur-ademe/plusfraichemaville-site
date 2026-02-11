import clsx from "clsx";
import { ProjetWithPublicRelationsDto } from "@/src/types/dto";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { getRegionLabelForProjet } from "@/src/helpers/regions";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { selectEspaceLabelByCode } from "@/src/helpers/type-espace-filter";
import Button from "@codegouvfr/react-dsfr/Button";

export const AnnuaireInProgressCardContent = ({
  data,
  onClick,
}: {
  data: ProjetWithPublicRelationsDto;
  onClick?: () => void;
}) => {
  const regionLabel = getRegionLabelForProjet(data);

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
          <Badge small noIcon className="!mb-0 !bg-pfmv-navy !text-dsfr-background-alt-blue-france">
            Projet en cours
          </Badge>
          <Tag small className="!m-0 h-fit">
            {selectEspaceLabelByCode(data.typeEspace)}
          </Tag>
        </div>
        <Button priority="tertiary no outline" className="mt-2 !px-0 text-left text-lg font-bold" onClick={onClick}>
          {data.nom}
        </Button>
        <section className="mb-10 flex flex-row gap-1 text-sm">
          <i className="ri-map-pin-line fr-icon--sm mr-1" />
          {data.collectivite.nom}
        </section>
        <div className="mt-auto flex flex-row items-center justify-between gap-1">
          <Tag small className="!m-0 h-fit">
            {regionLabel}
          </Tag>
          <div className="text-nowrap font-bold text-pfmv-navy group-hover:underline">
            Voir les contacts <i className="ri-arrow-right-line ml-1"></i>
          </div>
        </div>
      </div>
    </>
  );
};
