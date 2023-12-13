import { FicheSolution } from "@/lib/directus/directusModels";
import React from "react";
import { getCoutFicheSolutionFromCode } from "@/helpers/coutFicheSolution";
import { getDelaiTravauxFicheSolutionFromCode } from "@/helpers/delaiTravauxFicheSolution";

export default function FicheSolutionInfoComparatif({
  ficheSolution,
  className,
  temperatureClass,
}: {
  ficheSolution: FicheSolution;
  className?: string;
  temperatureClass?: string;
}) {
  const delaiTravaux = getDelaiTravauxFicheSolutionFromCode(ficheSolution.delai_travaux);
  const cout = getCoutFicheSolutionFromCode(ficheSolution.cout_minimum, ficheSolution.cout_maximum);
  return (
    <div className={`${className}`}>
      <div className="flex flex-row justify-between w-full mt-6 mb-2">
        <div className="mr-4 mt-auto text-dsfr-text-mention-grey">Baisse maximale de la température de l{"'"}air</div>
        <div className="float-right text-right">
          <div className={`fr-text--bold text-dsfr-text-label-blue-france ${temperatureClass}`}>
            {`-${ficheSolution.baisse_temperature}°C`}
          </div>
        </div>
      </div>
      {delaiTravaux && (
        <>
          <hr className="pb-2 mt-3" />
          <div className="text-dsfr-text-mention-grey">Délai des travaux</div>
          <div className="inline-block w-full">
            <div className="float-left text-base">{delaiTravaux.icons("fr-icon--sm")}</div>
            <div className="float-right text-dsfr-text-mention-grey mt-1">{delaiTravaux.label}</div>
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
