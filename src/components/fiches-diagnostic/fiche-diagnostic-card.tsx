"use client";
import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { getDelaiTravauxFiche } from "@/src/helpers/delaiTravauxFiche";
import { getCoutFiche } from "@/src/helpers/cout/cout-fiche-solution";
import clsx from "clsx";
import { formatNumberWithSpaces, ICON_COLOR_FICHE_DIAGNOSTIC, TypeFiche } from "@/src/helpers/common";
import { GenericSaveFiche } from "../common/generic-save-fiche";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { useModalStore } from "@/src/stores/modal/provider";
import { getEchellesSpatialesByFicheDiagnostic } from "@/src/helpers/ficheDiagnostic/echelle-spatiale-diagnostic";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { getEchellesThermiquesByFicheDiagnostic } from "@/src/helpers/ficheDiagnostic/echelle-thermique-diagnostic";

type FicheDiagnosticCardProps = {
  ficheDiagnostic: FicheDiagnostic;
};

export const FicheDiagnosticCard = ({ ficheDiagnostic }: FicheDiagnosticCardProps) => {
  const coutMin = ficheDiagnostic.attributes.cout_min;
  const coutMax = ficheDiagnostic.attributes.cout_max;
  const delaiMin = ficheDiagnostic.attributes.delai_min;
  const delaiMax = ficheDiagnostic.attributes.delai_max;

  const setCurrentFicheDiagnostic = useModalStore((state) => state.setCurrentFicheDiagnostic);

  const delai = getDelaiTravauxFiche(TypeFiche.diagnostic, delaiMin, delaiMax);
  const cout = getCoutFiche(TypeFiche.diagnostic, coutMin, coutMax);

  return (
    <div className={clsx("pfmv-card relative h-auto w-72 cursor-pointer")}>
      <GenericSaveFiche id={ficheDiagnostic.id} type={TypeFiche.diagnostic} classNameButton="absolute top-3 right-4" />
      <div className="flex h-full flex-col" onClick={() => setCurrentFicheDiagnostic(ficheDiagnostic)}>
        <div className={clsx("flex h-full flex-col rounded-[0.9375rem]")}>
          <div
            className={clsx(
              "fiche-diagnostic-icone",
              "mx-auto mt-6 flex size-[8.5rem] items-center justify-center ",
            )}
          >
            <Image
              src={getStrapiImageUrl(ficheDiagnostic.attributes.image_icone, STRAPI_IMAGE_KEY_SIZE.medium)}
              alt={ficheDiagnostic.attributes.titre}
              width={110}
              height={110}
              unoptimized
            />
          </div>

          <div className="flex h-fit grow flex-col justify-between px-6 pb-2 pt-5">
            <div className="text-lg font-bold leading-tight">{ficheDiagnostic.attributes.titre}</div>
            <div className={"mb-7 text-sm"}>{ficheDiagnostic.attributes.nom_scientifique}</div>
            <div className="mb-4 mt-4 flex flex-wrap gap-2 uppercase">
              {getEchellesThermiquesByFicheDiagnostic(ficheDiagnostic).map((effet) => (
                <Tag key={effet.label} small className="!mb-0 !rounded-sm font-bold !text-dsfr-text-mention-grey">
                  {effet.label}
                </Tag>
              ))}
              {getEchellesSpatialesByFicheDiagnostic(ficheDiagnostic).map((echelle) => (
                <Tag key={echelle.label} small className="!mb-0 !rounded-sm font-bold !text-dsfr-text-mention-grey">
                  {echelle.label}
                </Tag>
              ))}
            </div>
            <div className="mb-3 block">
              <div className="flex items-center">
                <div className="mr-2">{cout?.icons(ICON_COLOR_FICHE_DIAGNOSTIC)}</div>
                <small className="text-sm text-dsfr-text-mention-grey">
                  de {formatNumberWithSpaces(coutMin)} à {formatNumberWithSpaces(coutMax)} €
                </small>
              </div>
              <div className="block">
                <div className="flex items-center">
                  <div className="mr-2">{delai?.icons(ICON_COLOR_FICHE_DIAGNOSTIC)}</div>
                  <small className="text-sm text-dsfr-text-mention-grey">
                    de {delaiMin} à {delaiMax} mois
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
