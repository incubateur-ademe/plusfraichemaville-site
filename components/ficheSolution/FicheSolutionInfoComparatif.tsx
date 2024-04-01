import React from "react";
import { getCoutFiche } from "@/helpers/coutFiche";
import { getDelaiTravauxFiche } from "@/helpers/delaiTravauxFiche";
import { GetValues } from "@/lib/strapi/types/types";
import { getPorteeBaisseTemperatureLabelFromCode } from "@/helpers/porteeBaisseTemperatureFicheSolution";
import baisseICUIcon from "../../public/images/fiches-solutions/picto-thermometre.svg";
import Image from "next/image";
import { TypeFiche } from "@/helpers/common";

export default function FicheSolutionInfoComparatif({
  ficheSolution,
  className,
  temperatureFormat,
}: {
  ficheSolution: GetValues<"api::fiche-solution.fiche-solution">;
  className?: string;
  temperatureFormat: "large" | "small";
}) {
  const delaiTravaux = getDelaiTravauxFiche(
    TypeFiche.solution,
    ficheSolution.delai_travaux_minimum,
    ficheSolution.delai_travaux_maximum,
  );
  const cout = getCoutFiche(TypeFiche.solution, ficheSolution.cout_minimum, ficheSolution.cout_maximum);
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
          <div className="mr-4 mt-auto text-dsfr-text-mention-grey">{ficheSolution.libelle_avantage_solution}</div>
          <div className="float-right text-right flex-none">
            <Image
              className={temperatureFormat === "large" ? "w-12 h-12" : "w-10 h-10"}
              src={baisseICUIcon}
              alt="Baisse de l'ICU"
            />
          </div>
        </div>
      )}
      <div className={`${!delaiTravaux ? " invisible " : ""}`}>
        <hr className="pb-2 mt-3" />
        <div className="text-dsfr-text-mention-grey">Délai des travaux</div>
        <div className="inline-block w-full">
          <div className="float-left text-base">{delaiTravaux?.icons(TypeFiche.solution, "fr-icon--sm")}</div>
          <div className="float-right text-dsfr-text-mention-grey mt-1">
            {`de ${ficheSolution.delai_travaux_minimum} à ${ficheSolution.delai_travaux_maximum} mois`}
          </div>
        </div>
      </div>
      <div className={`${!cout ? " invisible " : ""}`}>
        <hr className="pb-2 mt-1" />
        <div className="text-dsfr-text-mention-grey">Coût</div>
        <div className="inline-block w-full">
          <div className="float-left">
            <div className="float-left text-base">{cout?.icons(TypeFiche.solution, "fr-icon--sm")}</div>
          </div>
          <div className="float-right text-dsfr-text-mention-grey mt-1">
            {`de ${ficheSolution.cout_minimum} à ${ficheSolution.cout_maximum} € / m²`}
          </div>
        </div>
      </div>
    </div>
  );
}
