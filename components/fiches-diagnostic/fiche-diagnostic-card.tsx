import Image from "next/image";
import { FicheDiagnosticResponse } from "./types";
import { STRAPI_IMAGE_KEY_SIZE, getStrapiImageUrl } from "@/lib/strapi/strapiClient";
import { getDelaiTravauxFicheSolution } from "@/helpers/delaiTravauxFicheSolution";
import { getCoutFicheSolution } from "@/helpers/coutFicheSolution";
import { PictoEchelleSelector } from "../common/pictos/picto-echelle-selector";

type FicheDiagnosticCardProps = {
  vertical?: boolean;
  ficheDiagnostic: FicheDiagnosticResponse;
};

export const FicheDiagnosticCard = ({ ficheDiagnostic }: FicheDiagnosticCardProps) => {
  const coutMin = ficheDiagnostic.attributes.cout_min;
  const coutMax = ficheDiagnostic.attributes.cout_max;
  const delaiMin = ficheDiagnostic.attributes.delai_min;
  const delaiMax = ficheDiagnostic.attributes.delai_max;

  const delai = getDelaiTravauxFicheSolution(delaiMin, delaiMax);
  const cout = getCoutFicheSolution(coutMin, coutMax);

  return (
    <div className="pfmv-card min-w-[900px] h-fit relative">
      <div className="bg-dsfr-background-alt-red-marianne rounded-[0.9375rem] flex">
        <div className="flex w-72 relative overflow-hidden">
          <Image
            fill
            src={getStrapiImageUrl(ficheDiagnostic.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.small)}
            alt={ficheDiagnostic.attributes.titre}
            className={"w-full h-full object-cover rounded-l-2xl z-0"}
          />
        </div>
        <div className="px-7 pt-5 pb-2 h-fit">
          <span className="text-sm">
            Méthode de diagnostic{" "}
            <span className="text-dsfr-background-flat-warning font-bold capitalize inline-block">
              {ficheDiagnostic.attributes.methode}
            </span>
          </span>
          <h5 className="my-3 max-w-[350px]">{ficheDiagnostic.attributes.titre}</h5>
          <p className="text-sm mb-3 max-w-[350px] leading-6">{ficheDiagnostic.attributes.description_courte}</p>
          <div className="flex">
            <div className="flex mr-6">
              <div className="h-4 mr-2">{cout?.icons("!text-dsfr-background-flat-warning before:!w-4")}</div>
              <small className="text-dsfr-text-disabled-grey">
                de {coutMin} à {coutMax} euros HT
              </small>
            </div>
            <div className="flex">
              <div className="h-4 mr-2 mb-4">{delai?.icons("!text-dsfr-background-flat-warning before:!w-4")}</div>
              <small className="text-dsfr-text-disabled-grey">
                {delaiMin} à {delaiMax} mois
              </small>
            </div>
          </div>
        </div>
        {/* <div className="absolute right-2 top-2">
          <ButtonSaveFicheSolution />
        </div> */}
        <div className="absolute right-6 bottom-6">
          <PictoEchelleSelector pictoId={ficheDiagnostic.attributes.echelle!} className="w-12" />
        </div>
      </div>
    </div>
  );
};
