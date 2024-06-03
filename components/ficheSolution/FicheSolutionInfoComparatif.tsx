import React from "react";
import { getCoutFiche, getLabelCoutFourniture } from "@/helpers/cout/cout-fiche-solution";
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
  const cout = getCoutFiche(
    TypeFiche.solution,
    ficheSolution.cout_minimum,
    ficheSolution.cout_maximum,
    ficheSolution.cout_unite,
  );

  return (
    <div className={`${className}`}>
      {!!ficheSolution.baisse_temperature && (
        <div className="mb-2 mt-6 flex w-full flex-row justify-between">
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
        <div className="mb-2 mt-6 flex w-full flex-row justify-between">
          <div className="mr-4 mt-auto text-dsfr-text-mention-grey">{ficheSolution.libelle_avantage_solution}</div>
          <div className="float-right flex-none text-right">
            <Image
              className={temperatureFormat === "large" ? "h-12 w-12" : "h-10 w-10"}
              src={baisseICUIcon}
              alt="Baisse de l'ICU"
            />
          </div>
        </div>
      )}
      <div className={`${!delaiTravaux ? " invisible " : ""}`}>
        <hr className="mt-3 pb-2" />
        <div className="text-dsfr-text-mention-grey">Délai des travaux</div>
        <div className="inline-block w-full">
          <div className="float-left text-base">{delaiTravaux?.icons(TypeFiche.solution, "fr-icon--sm")}</div>
          <div className="float-right mt-1 text-dsfr-text-mention-grey">
            {`de ${ficheSolution.delai_travaux_minimum} à ${ficheSolution.delai_travaux_maximum} mois`}
          </div>
        </div>
      </div>
      <div>
        <hr className="mt-1 pb-2" />
        <div className="text-dsfr-text-mention-grey">Coût</div>
        <div className="inline-block w-full">
          <div className="float-left">
            <div className="float-left text-base">{cout?.icons(TypeFiche.solution, "fr-icon--sm")}</div>
          </div>
          <div className="float-right mt-1 text-dsfr-text-mention-grey">{getLabelCoutFourniture(ficheSolution)}</div>
        </div>
      </div>
    </div>
  );
}
