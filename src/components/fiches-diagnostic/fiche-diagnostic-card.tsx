import Image from "next/image";
import { FicheDiagnosticResponse } from "./types";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { getDelaiTravauxFiche } from "@/src/helpers/delaiTravauxFiche";
import { getCoutFiche } from "@/src/helpers/cout/cout-fiche-solution";
import { PictoEchelleSelector } from "../common/pictos/picto-echelle-selector";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { GenericFicheLink } from "../common/generic-save-fiche/generic-fiche-link";
import clsx from "clsx";
import { getMethodeDiagnosticFromCode } from "@/src/components/fiches-diagnostic/filters/methode";
import { formatNumberWithSpaces, TypeFiche } from "@/src/helpers/common";
import { GenericSaveFiche } from "../common/generic-save-fiche";

type FicheDiagnosticCardProps = {
  vertical?: boolean;
  ficheDiagnostic: FicheDiagnosticResponse;
};

export const FicheDiagnosticCard = ({ ficheDiagnostic, vertical }: FicheDiagnosticCardProps) => {
  const coutMin = ficheDiagnostic.attributes.cout_min;
  const coutMax = ficheDiagnostic.attributes.cout_max;
  const delaiMin = ficheDiagnostic.attributes.delai_min;
  const delaiMax = ficheDiagnostic.attributes.delai_max;

  const delai = getDelaiTravauxFiche(TypeFiche.diagnostic, delaiMin, delaiMax);
  const cout = getCoutFiche(TypeFiche.diagnostic, coutMin, coutMax);

  const ficheUrl = PFMV_ROUTES.FICHE_DIAGNOSTIC(ficheDiagnostic.attributes.slug);

  return (
    <div className={clsx("pfmv-card relative h-auto w-72", !vertical && "lg:h-fit lg:w-full lg:max-w-[53rem]")}>
      <GenericSaveFiche id={ficheDiagnostic.id} type="diagnostic" classNameButton="absolute top-3 right-4" />
      <GenericFicheLink href={ficheUrl}>
        <div
          className={clsx(
            "flex h-full flex-col rounded-[0.9375rem] bg-dsfr-background-alt-red-marianne pb-5",
            !vertical && "lg:flex lg:h-fit lg:flex-row lg:pb-0",
          )}
        >
          <div className={clsx("relative block h-52 w-72 overflow-hidden", !vertical && "lg:flex lg:h-auto")}>
            <Image
              fill
              sizes="(max-width: 768px) 80vw, 33vw"
              src={getStrapiImageUrl(ficheDiagnostic.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.medium)}
              alt={ficheDiagnostic.attributes.titre}
              className={clsx(
                "z-0 h-full w-full rounded-t-2xl object-cover",
                !vertical && "lg:rounded-l-2xl lg:rounded-t-none lg:rounded-tl-2xl",
              )}
            />
          </div>
          <div
            className={clsx(
              "flex h-fit grow flex-col justify-between px-6 pb-2 pt-5",
              !vertical && "lg:justify-start lg:px-7",
            )}
          >
            <h3 className={clsx("m-0 text-xs font-normal", !vertical && "lg:text-sm")}>
              <i className="ri-bar-chart-fill mr-1 text-dsfr-border-action-high-error before:!w-4"></i>
              Méthode de diagnostic{" "}
              <span className="inline-block font-bold capitalize text-dsfr-border-action-high-error">
                {getMethodeDiagnosticFromCode(ficheDiagnostic.attributes.methode)?.label}
              </span>
            </h3>
            <h2 className={clsx("my-3 max-w-[350px]", vertical ? "text-xl" : "text-[22px] leading-tight")}>
              {ficheDiagnostic.attributes.titre}
            </h2>
            <p className={clsx("mb-11 max-w-[350px] text-sm", !vertical && "leading-6 lg:mb-3")}>
              {ficheDiagnostic.attributes.description_courte}
            </p>
            <div className={clsx("block", !vertical && "lg:mb-4 lg:flex")}>
              <div className={clsx("mb-3 block", !vertical && "lg:mb-0 lg:mr-6 lg:flex")}>
                {vertical ? (
                  <small className="text-text-pfmv-grey">Coût</small>
                ) : (
                  <small className="text-text-pfmv-grey inline lg:hidden">Coût</small>
                )}
                <div className="flex items-center">
                  <div className="mr-2">{cout?.icons(TypeFiche.diagnostic, "fr-icon--sm")}</div>
                  {!vertical && (
                    <small className="hidden text-pfmv-grey lg:block">
                      de {formatNumberWithSpaces(coutMin)} à {formatNumberWithSpaces(coutMax)} euros HT
                    </small>
                  )}
                </div>
              </div>
              <div className={clsx("block", !vertical && "lg:flex")}>
                {vertical ? (
                  <small className="text-text-pfmv-grey">Temporalité</small>
                ) : (
                  <small className="text-text-pfmv-grey inline lg:hidden">Temporalité</small>
                )}
                <div className="flex items-center">
                  <div className="mr-2">{delai?.icons(TypeFiche.diagnostic, "fr-icon--sm")}</div>
                  {!vertical && (
                    <small className="hidden text-pfmv-grey lg:block">
                      {delaiMin} à {delaiMax} mois
                    </small>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={clsx("absolute bottom-[5.5rem] right-6", !vertical && "lg:bottom-6")}>
            <PictoEchelleSelector pictoId={ficheDiagnostic.attributes.echelle!} className="w-12" />
          </div>
          <div
            className={clsx(
              "fr-btn fr-btn--tertiary !mx-auto mt-3 !block rounded-3xl !text-dsfr-background-flat-warning",
              !vertical && "lg:!hidden",
            )}
          >
            {"J'explore la méthode"}
          </div>
        </div>
      </GenericFicheLink>
    </div>
  );
};
