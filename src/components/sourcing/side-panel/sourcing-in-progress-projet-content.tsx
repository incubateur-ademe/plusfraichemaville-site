import clsx from "clsx";
import { ProjetWithPublicRelations } from "@/src/lib/prisma/prismaCustomTypes";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { getRegionLabelFromAdresseInfo } from "@/src/helpers/regions";
import { AddressProperties, SourcingContact } from "@/src/components/sourcing/types";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { Maturite } from "@/src/components/maturite/maturite";
import { getOldestAdmin } from "../../liste-projets/helpers";
import { SourcingContactCard } from "../contacts/sourcing-contact-card";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { selectEspaceByCode } from "@/src/components/filters/TypeEspaceFilter";
import { prettyUserName } from "@/src/helpers/user";

export const SourcingInProgressProjetContent = ({ data }: { data: ProjetWithPublicRelations }) => {
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);
  const regionLabel = getRegionLabelFromAdresseInfo(
    (data.adresse_info as AddressProperties | null) || (data.collectivite.adresse_info as AddressProperties | null),
  );
  const user = getOldestAdmin(data);
  const contact: SourcingContact | null = user
    ? {
        type: "in-progress",
        userProjetId: user?.id,
        typeContact: "collectivite",
        email: user?.user?.email,
        poste: user?.user?.poste,
        nomCollectivite: user?.user?.nom_etablissement,
        label: user.user ? prettyUserName(user.user) : "",
      }
    : null;

  return (
    <>
      <div
        className={clsx(
          "flex w-full flex-col bg-dsfr-background-alt-blue-france text-dsfr-text-title-grey" +
            "min-h-[11.5rem] px-5 pb-4 pt-6",
        )}
      >
        <div className="flex items-center justify-between">
          <Badge small noIcon className="!bg-pfmv-navy !text-dsfr-background-alt-blue-france">
            Projet en cours
          </Badge>
          <div className="text-sm font-bold">{selectEspaceByCode(data.type_espace)}</div>
        </div>
        <div className="mb-8 mt-4 text-lg font-bold">{data.nom}</div>
        <div className="mt-auto flex flex-row items-center justify-between gap-1">
          <Tag small className="h-fit">
            {regionLabel}
          </Tag>
          <div className="flex flex-row items-center gap-2">
            <div className="text-nowrap text-sm text-dsfr-text-mention-grey">Maturité du projet</div>
            <Maturite
              niveau={data.niveau_maturite}
              projetId={data.id}
              editable={false}
              buttonBgHoverColor="bg-dsfr-background-alt-blue-france"
            />
          </div>
        </div>
      </div>
      {contact && (
        <div className="p-5">
          <h2 className="text-xl font-bold text-pfmv-navy">Contact</h2>
          <SourcingContactCard contact={contact} projetId={currentProjetId} />
        </div>
      )}
    </>
  );
};
