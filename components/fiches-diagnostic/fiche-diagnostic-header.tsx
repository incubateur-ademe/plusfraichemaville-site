import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { PictoEchelleSelector } from "../common/pictos/picto-echelle-selector";
import { FicheDiagnosticResponseAttributes } from "./types";
import Image from "next/image";

export const FicheDiagnosticHeader = ({ attributes }: { attributes: FicheDiagnosticResponseAttributes }) => {
  return (
    <div className="bg-dsfr-background-alt-red-marianne" id="fiche-diag-header">
      <div className="fr-container">
        <div className="grid grid-cols-12 gap-10 pt-8 pb-11 relative bg-dsfr-background-alt-red-marianne">
          <div className="col-span-3 w-full h-full relative">
            <Image
              src={getStrapiImageUrl(attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.medium)}
              alt={attributes.image_principale?.data.attributes.alternativeText ?? "Header image"}
              className="object-cover shrink-0"
              fill
            />
          </div>
          <div className=" col-span-6 max-w-xl">
            <small className="block text-base text-dsfr-text-mention-grey mb-6">
              <i className="ri-bar-chart-fill before:!w-4 mr-1 text-dsfr-background-flat-warning"></i>
              Méthode de diagnostic{" "}
              <span className="font-bold capitalize text-dsfr-background-flat-warning">{attributes.methode}</span>
            </small>
            <h1 className="text-4xl leading-[50px] mb-2">{attributes.titre}</h1>
            <h2 className="text-xl leading-8">{attributes.description_courte}</h2>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <PictoEchelleSelector pictoId={attributes.echelle!} className="w-16 h-16" large />
          </div>
        </div>
      </div>
    </div>
  );
};
