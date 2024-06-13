import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { PictoEchelleSelector } from "../common/pictos/picto-echelle-selector";
import { FicheDiagnosticResponseAttributes } from "./types";
import Image from "next/image";
import { getMethodeDiagnosticFromCode } from "@/components/fiches-diagnostic/filters/methode";

export const FicheDiagnosticHeader = ({ attributes }: { attributes: FicheDiagnosticResponseAttributes }) => {
  return (
    <div className="bg-dsfr-background-alt-red-marianne" id="fiche-diag-header">
      <div className="fr-container">
        <div className="relative grid grid-cols-12 gap-4 bg-dsfr-background-alt-red-marianne pb-11 pt-8 md:gap-10">
          <div className="relative col-span-3  h-20 w-20 md:col-span-3 md:h-full md:w-full">
            <Image
              src={getStrapiImageUrl(attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.medium)}
              alt={attributes.titre}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 80vw, 33vw"
            />
          </div>
          <div className=" col-span-9 max-w-xl md:col-span-6">
            <small className="mb-6 hidden text-base text-dsfr-text-mention-grey md:block">
              <i className="ri-bar-chart-fill mr-1 text-dsfr-border-action-high-error before:!w-4"></i>
              Méthode de diagnostic{" "}
              <span className="font-bold capitalize text-dsfr-border-action-high-error">
                {getMethodeDiagnosticFromCode(attributes.methode)?.label}
              </span>
            </small>
            <h1 className="mb-2 text-lg md:text-4xl md:leading-[50px]">{attributes.titre}</h1>
            <h2 className="hidden text-xl leading-8 md:block">{attributes.description_courte}</h2>
          </div>
          <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 md:block">
            <PictoEchelleSelector pictoId={attributes.echelle!} className="h-16 w-16" large />
          </div>
        </div>
      </div>
    </div>
  );
};
