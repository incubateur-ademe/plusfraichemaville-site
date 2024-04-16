import Image from "next/image";
import { FicheDiagnosticResponse } from "./types";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { getDelaiTravauxFiche } from "@/helpers/delaiTravauxFiche";
import { getCoutFiche } from "@/helpers/coutFiche";
import { PictoEchelleSelector } from "../common/pictos/picto-echelle-selector";
import { PFMV_ROUTES } from "@/helpers/routes";
import { FicheDiagnosticLink } from "./fiche-diagnostic-link";
import clsx from "clsx";
import { getMethodeDiagnosticFromCode } from "@/components/fiches-diagnostic/filters/methode";
import { TypeFiche } from "@/helpers/common";
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
    <div className={clsx("pfmv-card w-72 relative h-auto", !vertical && "lg:w-[53rem] lg:h-fit")}>
      <GenericSaveFiche id={ficheDiagnostic.id} type="diagnostic" classNameButton="absolute top-3 right-4" />
      <FicheDiagnosticLink href={ficheUrl}>
        <div
          className={clsx(
            "bg-dsfr-background-alt-red-marianne rounded-[0.9375rem] flex flex-col pb-5 h-full",
            !vertical && "lg:h-fit lg:pb-0 lg:flex lg:flex-row",
          )}
        >
          <div className={clsx("w-72 relative overflow-hidden block h-52", !vertical && "lg:flex lg:h-auto")}>
            <Image
              fill
              sizes="(max-width: 768px) 80vw, 33vw"
              src={getStrapiImageUrl(ficheDiagnostic.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.medium)}
              alt={ficheDiagnostic.attributes.titre}
              className={clsx(
                "w-full h-full object-cover z-0 rounded-t-2xl",
                !vertical && "lg:rounded-t-none lg:rounded-l-2xl lg:rounded-tl-2xl",
              )}
            />
          </div>
          <div
            className={clsx(
              "pt-5 pb-2 h-fit px-6 flex flex-col grow justify-between",
              !vertical && "lg:justify-start lg:px-7",
            )}
          >
            <span className={clsx("text-xs", !vertical && "lg:text-sm")}>
              <i className="ri-bar-chart-fill before:!w-4 mr-1 text-dsfr-background-flat-warning"></i>
              Méthode de diagnostic{" "}
              <span className="text-dsfr-background-flat-warning font-bold capitalize inline-block">
                {getMethodeDiagnosticFromCode(ficheDiagnostic.attributes.methode)?.label}
              </span>
            </span>
            <h5 className="my-3 max-w-[350px]">{ficheDiagnostic.attributes.titre}</h5>
            <p className={clsx("text-sm max-w-[350px] leading-6 mb-11", !vertical && "lg:mb-3")}>
              {ficheDiagnostic.attributes.description_courte}
            </p>
            <div className={clsx("block", !vertical && "lg:flex lg:mb-4")}>
              <div className={clsx("block mb-3", !vertical && "lg:flex lg:mr-6 lg:mb-0")}>
                {vertical ? (
                  <small className="text-dsfr-text-disabled-grey">Coût</small>
                ) : (
                  <small className="text-dsfr-text-disabled-grey inline lg:hidden">Coût</small>
                )}
                <div className="flex items-center">
                  <div className="mr-2">{cout?.icons(TypeFiche.diagnostic, "fr-icon--sm")}</div>
                  {!vertical && (
                    <small className="text-dsfr-text-disabled-grey hidden lg:block">
                      de {coutMin} à {coutMax} euros HT
                    </small>
                  )}
                </div>
              </div>
              <div className={clsx("block", !vertical && "lg:flex")}>
                {vertical ? (
                  <small className="text-dsfr-text-disabled-grey">Temporalité</small>
                ) : (
                  <small className="text-dsfr-text-disabled-grey inline lg:hidden">Temporalité</small>
                )}
                <div className="flex items-center">
                  <div className="mr-2">{delai?.icons(TypeFiche.diagnostic, "fr-icon--sm")}</div>
                  {!vertical && (
                    <small className="text-dsfr-text-disabled-grey hidden lg:block">
                      {delaiMin} à {delaiMax} mois
                    </small>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={clsx("absolute right-6 bottom-[5.5rem]", !vertical && "lg:bottom-6")}>
            <PictoEchelleSelector pictoId={ficheDiagnostic.attributes.echelle!} className="w-12" />
          </div>
          <div
            className={clsx(
              "fr-btn fr-btn--tertiary !text-dsfr-background-flat-warning !mx-auto !block mt-3 rounded-3xl",
              !vertical && "lg:!hidden",
            )}
          >
            {"J'explore la méthode"}
          </div>
        </div>
      </FicheDiagnosticLink>
    </div>
  );
};
