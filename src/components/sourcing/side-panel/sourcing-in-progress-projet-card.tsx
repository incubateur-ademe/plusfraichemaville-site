import clsx from "clsx";
import Image from "next/image";
import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { getRegionLabelFromAdresseInfo } from "@/src/helpers/regions";
import { AddressProperties } from "@/src/components/sourcing/types";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { Maturite } from "@/src/components/maturite/maturite";

export const SourcingInProgressProjetCard = ({ data }: { data: ProjetWithPublicRelations }) => {
  const regionLabel = getRegionLabelFromAdresseInfo(
    (data.adresse_info as AddressProperties | null) || (data.collectivite.adresse_info as AddressProperties | null),
  );
  return (
    <div>
      <div className="mb-4 text-xl font-bold text-pfmv-navy">Le projet</div>

      <div
        className={clsx(
          "flex min-h-[17rem] w-full flex-col rounded-2xl border-[1px] border-dsfr-border-default-grey",
          "overflow-hidden",
        )}
      >
        <div className="flex h-full grow flex-col">
          <div
            className={clsx(
              "flex h-24 w-full shrink-0 flex-row items-center justify-center",
              "gap-6 rounded-t-xl bg-dsfr-background-alt-blue-france",
            )}
          >
            <Image src={"/images/sourcing/side-panel/projet-in-progress.svg"} alt="" width={59} height={46} />
            <div className="text-pfmv-navy">Projet en cours</div>
          </div>
          <div className="flex grow flex-col px-4 py-4">
            <Badge small noIcon className="mb-3 !bg-dsfr-background-action-low-blue-france !text-pfmv-navy">
              Projet en cours
            </Badge>
            <div className="text-lg font-bold">{data.nom}</div>

            <div className="mt-auto flex flex-row items-center justify-between">
              <Tag small className="h-fit">
                {regionLabel}
              </Tag>
              <div className="flex flex-row items-center gap-1">
                <div className="text-sm text-dsfr-text-mention-grey">Maturité du projet :</div>
                <Maturite niveau={data.niveau_maturite} projetId={data.id} editable={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
