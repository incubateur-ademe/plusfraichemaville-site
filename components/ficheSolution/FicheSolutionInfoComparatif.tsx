import React from "react";
import { getCoutFicheSolutionFromCode } from "@/helpers/coutFicheSolution";
import { getDelaiTravauxFicheSolutionFromCode } from "@/helpers/delaiTravauxFicheSolution";
import { GetValues } from "@/lib/strapi/types/types";
import { getPorteeBaisseTemperatureLabelFromCode } from "@/helpers/porteeBaisseTemperatureFicheSolution";
import baisseICUIcon from "../../public/images/fiches-solutions/baisse-icu-nuit-icone.svg";
import Image from "next/image";

export default function FicheSolutionInfoComparatif({
  ficheSolution,
  className,
  temperatureFormat,
}: {
  ficheSolution: GetValues<"api::fiche-solution.fiche-solution">;
  className?: string;
  temperatureFormat: "large" | "small";
}) {
  const delaiTravaux = getDelaiTravauxFicheSolutionFromCode(
    ficheSolution.delai_travaux_minimum,
    ficheSolution.delai_travaux_maximum,
  );
  const cout = getCoutFicheSolutionFromCode(ficheSolution.cout_minimum, ficheSolution.cout_maximum);
  return (
    <div className={`${className}`}>
      {!!ficheSolution.baisse_temperature && (
        <div className="flex flex-row justify-between w-full mt-6 mb-2">
          <div className="mr-4 mt-auto text-dsfr-text-mention-grey">
            {getPorteeBaisseTemperatureLabelFromCode(ficheSolution.portee_baisse_temperature)}
          </div>
          <div className="float-right text-right">
            <div
              className={`fr-text--bold text-dsfr-text-label-blue-france ${
                temperatureFormat === "large" ? "text-[2.5rem] leading-[2.5rem] " : "text-[2rem] leading-8"
              }`}
            >
              {`-${ficheSolution.baisse_temperature?.toLocaleString("fr")}°C`}
            </div>
          </div>
        </div>
      )}
      {!ficheSolution.baisse_temperature && (
        <div className="flex flex-row justify-between w-full mt-6 mb-2">
          <div className="mr-4 mt-auto text-dsfr-text-mention-grey">{"Contribue à réduire l'effet d'ICU"}</div>
          <div className="float-right text-right">
            <Image
              className={temperatureFormat === "large" ? "w-12 h-12" : "w-10 h-10"}
              src={baisseICUIcon}
              alt="Baisse de l'ICU"
            />
          </div>
        </div>
      )}
      {delaiTravaux && (
        <>
          <hr className="pb-2 mt-3" />
          <div className="text-dsfr-text-mention-grey">Délai des travaux</div>
          <div className="inline-block w-full">
            <div className="float-left text-base">{delaiTravaux.icons("fr-icon--sm")}</div>
            <div className="float-right text-dsfr-text-mention-grey mt-1">
              {`de ${ficheSolution.delai_travaux_minimum} à ${ficheSolution.delai_travaux_maximum} mois`}
            </div>
          </div>
        </>
      )}
      {cout && (
        <>
          <hr className="pb-2 mt-1" />
          <div className="text-dsfr-text-mention-grey">Coût</div>
          <div className="inline-block w-full">
            <div className="float-left">
              <div className="float-left text-base">{cout.icons("fr-icon--sm")}</div>
            </div>
            <div className="float-right text-dsfr-text-mention-grey mt-1">
              {`de ${ficheSolution.cout_minimum} à ${ficheSolution.cout_maximum} € / m²`}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
