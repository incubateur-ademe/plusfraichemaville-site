import Image from "next/image";
import { AidesTerritoiresAide, TypeAidesTerritoiresAide } from "../types";
import CmsRichText from "@/src/components/common/CmsRichText";
import { AideFichePanelLine } from "./aide-fiche-panel-line";
import Button from "@codegouvfr/react-dsfr/Button";
import { AideCardSaveButton } from "./aide-card-save-button";
import { resolveAidType } from "@/src/components/financement/helpers";
import clsx from "clsx";
import { AidesTerritoiresFullDetailedLines } from "@/src/components/financement/aide/aide-info-lines";
import { useParams } from "next/navigation";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useCanEditProjet } from "@/src/hooks/use-can-edit-projet";

type AideFicheProps = {
  aide: AidesTerritoiresAide;
};

export const AideFiche = ({ aide }: AideFicheProps) => {
  const isAideFinanciere = resolveAidType(aide.aid_types_full) === TypeAidesTerritoiresAide.financement;
  const estimationId = useParams().estimationId;
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const canEditProjet = useCanEditProjet(projet?.id);

  return (
    <div className="flex gap-6 rounded-[20px]">
      <div
        className={clsx(
          "relative w-full max-w-96 rounded-2xl px-6 pb-6 pt-14",
          isAideFinanciere ? "bg-dsfr-background-alt-blue-france" : "bg-dsfr-background-alt-brown-cafe-creme",
        )}
        id="financement-panel"
      >
        {!!estimationId && canEditProjet && (
          <AideCardSaveButton estimationId={+estimationId} aideTerritoireId={aide.id} className="right-4 top-4" />
        )}
        <div className="mb-6 flex items-center gap-4">
          <Image
            src={`/images/financement/${isAideFinanciere ? "financement" : "ingenierie"}.svg`}
            className="mb-2"
            width={64}
            height={64}
            alt=""
          />
          <h2
            className={clsx(
              "mb-0 text-[22px]",
              isAideFinanciere ? "text-dsfr-background-flat-info" : "text-dsfr-background-flat-orange-terre-battue",
            )}
          >
            {isAideFinanciere ? "Financement" : "Soutien à l'ingénierie"}
          </h2>
        </div>
        <div>
          {AidesTerritoiresFullDetailedLines(aide).map((line, index) => (
            <AideFichePanelLine
              line={line}
              showMore={line.showMore}
              pictoClassname={
                isAideFinanciere ? "text-dsfr-background-flat-info" : "text-dsfr-background-flat-orange-terre-battue"
              }
              classname="mb-8"
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="mb-11">
          <h1 className="mb-10 text-[40px] text-dsfr-background-flat-info">{aide.name}</h1>
          {aide.name_initial && (
            <hgroup className="mb-2 max-w-xl text-xl text-dsfr-background-flat-info">
              <h2 className="mb-0 text-xl text-dsfr-background-flat-info">{"Nom initial de l'aide"}</h2>
              <p>{aide.name_initial}</p>
            </hgroup>
          )}
        </div>
        <div className="mb-8">{aide.description && <CmsRichText label={aide.description} />}</div>
        {aide.eligibility && (
          <hgroup className="mb-8">
            <h2 className="mb-2 text-xl text-dsfr-background-flat-info">{"Critères d'éligibilité"}</h2>
            <CmsRichText label={aide.eligibility.replace(/href/g, "target='_blank' href")} />
          </hgroup>
        )}
        {aide.contact && (
          <hgroup className="mb-8">
            <h2 className="mb-2 text-xl text-dsfr-background-flat-info">Contact</h2>
            <CmsRichText label={aide.contact.replace(/href/g, "target='_blank' href")} />
          </hgroup>
        )}
        <div className="flex justify-end gap-8">
          {aide.origin_url && (
            <Button
              className="rounded-3xl"
              size="small"
              linkProps={{ target: "_blank", href: aide.origin_url }}
              priority="secondary"
            >
              Plus d'informations
            </Button>
          )}
          {aide.application_url && (
            <Button className="rounded-3xl" size="small" linkProps={{ target: "_blank", href: aide.application_url }}>
              Candidater
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
