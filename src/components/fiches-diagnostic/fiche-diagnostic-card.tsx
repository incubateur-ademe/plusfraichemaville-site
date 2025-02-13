"use client";
import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { getDelaiTravauxFiche } from "@/src/helpers/delaiTravauxFiche";
import { getCoutFiche } from "@/src/helpers/cout/cout-fiche-solution";
import clsx from "clsx";
import { formatNumberWithSpaces, ICON_COLOR_FICHE_DIAGNOSTIC, TypeFiche } from "@/src/helpers/common";
import { GenericSaveFiche } from "../common/generic-save-fiche";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { FicheDiagnosticUtilite } from "@/src/lib/strapi/types/strapi-custom-types";
import { getFicheDiagUtilite, getFicheDiagUtiliteProperties } from "@/src/components/fiches-diagnostic/helpers";
import { useModalStore } from "@/src/stores/modal/provider";

type FicheDiagnosticCardProps = {
  ficheDiagnostic: FicheDiagnostic;
  overrideUtiliteFiche?: FicheDiagnosticUtilite;
};

export const FicheDiagnosticCard = ({ ficheDiagnostic, overrideUtiliteFiche }: FicheDiagnosticCardProps) => {
  const coutMin = ficheDiagnostic.attributes.cout_min;
  const coutMax = ficheDiagnostic.attributes.cout_max;
  const delaiMin = ficheDiagnostic.attributes.delai_min;
  const delaiMax = ficheDiagnostic.attributes.delai_max;

  const utiliteFicheProperties = overrideUtiliteFiche
    ? getFicheDiagUtiliteProperties(overrideUtiliteFiche)
    : getFicheDiagUtilite(ficheDiagnostic);
  const setCurrentFicheDiagnostic = useModalStore((state) => state.setCurrentFicheDiagnostic);

  const delai = getDelaiTravauxFiche(TypeFiche.diagnostic, delaiMin, delaiMax);
  const cout = getCoutFiche(TypeFiche.diagnostic, coutMin, coutMax);

  return (
    <div className={clsx("pfmv-card relative h-auto w-72 cursor-pointer")}>
      <GenericSaveFiche id={ficheDiagnostic.id} type={TypeFiche.diagnostic} classNameButton="absolute top-3 right-4" />
      <div
        className="flex h-full flex-col"
        onClick={() => setCurrentFicheDiagnostic({ ficheDiagnostic, overrideUtiliteFiche })}
      >
        <div className={clsx("flex h-full flex-col rounded-[0.9375rem] pb-5", utiliteFicheProperties.colors.bgDark)}>
          <div className="relative block h-40 w-72 overflow-hidden">
            <Image
              fill
              sizes="(max-width: 768px) 80vw, 33vw"
              src={getStrapiImageUrl(ficheDiagnostic.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.medium)}
              alt={ficheDiagnostic.attributes.titre}
              className="z-0 h-full w-full rounded-t-2xl object-cover"
            />
          </div>
          <div className="flex h-fit grow flex-col justify-between px-6 pb-2 pt-5">
            <div className="text-xl font-bold leading-tight">{ficheDiagnostic.attributes.titre}</div>
            <div className={"mb-11 mt-4 text-sm italic"}>{ficheDiagnostic.attributes.nom_scientifique}</div>
            <div className="mb-3 block">
              <div className="flex items-center">
                <div className="mr-2">{cout?.icons(ICON_COLOR_FICHE_DIAGNOSTIC(utiliteFicheProperties))}</div>
                <small className="text-sm text-dsfr-text-mention-grey">
                  de {formatNumberWithSpaces(coutMin)} à {formatNumberWithSpaces(coutMax)} €
                </small>
              </div>
              <div className="block">
                <div className="flex items-center">
                  <div className="mr-2">{delai?.icons(ICON_COLOR_FICHE_DIAGNOSTIC(utiliteFicheProperties))}</div>
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
