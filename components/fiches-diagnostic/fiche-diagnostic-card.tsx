import Image from "next/image";
import { FicheDiagnosticResponse } from "./types";
import { STRAPI_IMAGE_KEY_SIZE, getStrapiImageUrl } from "@/lib/strapi/strapiClient";
import { getDelaiTravauxFicheSolution } from "@/helpers/delaiTravauxFicheSolution";
import { getCoutFicheSolution } from "@/helpers/coutFicheSolution";
import { PictoEchelleSelector } from "../common/pictos/picto-echelle-selector";

import { PFMV_ROUTES } from "@/helpers/routes";
import { FicheDiagnosticLink } from "./fiche-diagnostic-link";
import { FicheDiagnosticSaveButton } from "./fiche-diagnostic-save-button";
import clsx from "clsx";
import Link from "next/link";
import { getMethodeDiagnosticFromCode } from "@/components/fiches-diagnostic/filters/methode";

type FicheDiagnosticCardProps = {
  horizontal?: boolean;
  ficheDiagnostic: FicheDiagnosticResponse;
};

export const FicheDiagnosticCard = ({ ficheDiagnostic, horizontal }: FicheDiagnosticCardProps) => {
  const coutMin = ficheDiagnostic.attributes.cout_min;
  const coutMax = ficheDiagnostic.attributes.cout_max;
  const delaiMin = ficheDiagnostic.attributes.delai_min;
  const delaiMax = ficheDiagnostic.attributes.delai_max;

  const delai = getDelaiTravauxFicheSolution(delaiMin, delaiMax);
  const cout = getCoutFicheSolution(coutMin, coutMax);

  const ficheUrl = PFMV_ROUTES.FICHE_DIAGNOSTIC(ficheDiagnostic.attributes.slug);

  return (
    <div className={clsx("pfmv-card h-fit relative", horizontal ? "w-72" : "min-w-[900px]")}>
      <FicheDiagnosticLink href={ficheUrl}>
        <div
          className={clsx(
            "bg-dsfr-background-alt-red-marianne rounded-[0.9375rem]",
            horizontal ? "block pb-5" : "flex",
          )}
        >
          <div className={clsx("w-72 relative overflow-hidden", horizontal ? "block h-52" : "flex")}>
            <Image
              fill
              src={getStrapiImageUrl(ficheDiagnostic.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.small)}
              alt={ficheDiagnostic.attributes.titre}
              className={clsx("w-full h-full object-cover z-0", horizontal ? "rounded-t-2xl" : "rounded-l-2xl")}
            />
          </div>
          <div className={clsx("pt-5 pb-2 h-fit", horizontal ? "px-6" : "px-7")}>
            <span className={clsx(horizontal ? "text-xs" : "text-sm")}>
              <i className="ri-bar-chart-fill before:!w-4 mr-1 text-dsfr-background-flat-warning"></i>
              Méthode de diagnostic{" "}
              <span className="text-dsfr-background-flat-warning font-bold capitalize inline-block">
                {getMethodeDiagnosticFromCode(ficheDiagnostic.attributes.methode)?.label}
              </span>
            </span>
            <h5 className="my-3 max-w-[350px]">{ficheDiagnostic.attributes.titre}</h5>
            <p className={clsx("text-sm max-w-[350px] leading-6", horizontal ? "mb-11" : "mb-3")}>
              {ficheDiagnostic.attributes.description_courte}
            </p>
            <div className={clsx(horizontal ? "block" : "flex")}>
              <div className={clsx(horizontal ? "block mb-3" : "flex mr-6")}>
                {horizontal && <small>Coût</small>}
                <div className="h-4 mr-2">{cout?.icons("!text-dsfr-background-flat-warning before:!w-4")}</div>
                {!horizontal && (
                  <small className="text-dsfr-text-disabled-grey">
                    de {coutMin} à {coutMax} euros HT
                  </small>
                )}
              </div>
              <div className={clsx(horizontal ? "block" : "flex")}>
                {horizontal && <small>Temporalité</small>}
                <div className="h-4 mr-2 mb-4">{delai?.icons("!text-dsfr-background-flat-warning before:!w-4")}</div>
                {!horizontal && (
                  <small className="text-dsfr-text-disabled-grey">
                    {delaiMin} à {delaiMax} mois
                  </small>
                )}
              </div>
            </div>
          </div>
          <div className={clsx(horizontal ? "absolute right-6 bottom-[5.5rem]" : "absolute right-6 bottom-6")}>
            <PictoEchelleSelector pictoId={ficheDiagnostic.attributes.echelle!} className="w-12" />
          </div>
          {horizontal && (
            <Link
              href={ficheUrl}
              className={
                "fr-btn fr-btn--tertiary !text-dsfr-background-flat-warning !mx-auto !block mt-3 pb-5 rounded-3xl px-9"
              }
            >
              {"J'explore la méthode"}
            </Link>
          )}
        </div>
      </FicheDiagnosticLink>

      <FicheDiagnosticSaveButton ficheDiagnosticId={ficheDiagnostic.id} className="absolute top-3 right-4"/>
    </div>
  );
};
