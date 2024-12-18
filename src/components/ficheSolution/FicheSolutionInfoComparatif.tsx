import { getCoutFiche, getLabelCoutFourniture } from "@/src/helpers/cout/cout-fiche-solution";
import { getDelaiTravauxFiche } from "@/src/helpers/delaiTravauxFiche";
import { getPorteeBaisseTemperatureLabelFromCode } from "@/src/helpers/porteeBaisseTemperatureFicheSolution";
import baisseICUIcon from "../../../public/images/fiches-solutions/picto-thermometre.svg";
import Image from "next/image";
import { TypeFiche } from "@/src/helpers/common";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

export default function FicheSolutionInfoComparatif({
  ficheAttributes,
  className,
  temperatureFormat,
}: {
  ficheAttributes: FicheSolution["attributes"];
  className?: string;
  temperatureFormat: "large" | "small";
}) {
  const delaiTravaux = getDelaiTravauxFiche(
    TypeFiche.solution,
    ficheAttributes.delai_travaux_minimum,
    ficheAttributes.delai_travaux_maximum,
  );
  const cout = getCoutFiche(
    TypeFiche.solution,
    ficheAttributes.cout_minimum,
    ficheAttributes.cout_maximum,
    ficheAttributes.cout_unite,
  );

  return (
    <div className={`${className}`}>
      {!!ficheAttributes.baisse_temperature && (
        <div className="mb-2 mt-6 flex w-full flex-row justify-between">
          <div className="mr-4 mt-auto text-dsfr-text-mention-grey">
            {getPorteeBaisseTemperatureLabelFromCode(ficheAttributes.portee_baisse_temperature)}
          </div>
          <div className="float-right text-right">
            <div
              className={`fr-text--bold text-dsfr-text-label-blue-france ${
                temperatureFormat === "large" ? "text-[2.5rem] leading-[2.5rem] " : "text-[2rem] leading-8"
              }`}
            >
              {`-${ficheAttributes.baisse_temperature?.toLocaleString("fr")}°C`}
            </div>
          </div>
        </div>
      )}
      {!ficheAttributes.baisse_temperature && (
        <div className="mb-2 mt-6 flex w-full flex-row justify-between">
          <div className="mr-4 mt-auto text-dsfr-text-mention-grey">{ficheAttributes.libelle_avantage_solution}</div>
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
            {`de ${ficheAttributes.delai_travaux_minimum} à ${ficheAttributes.delai_travaux_maximum} mois`}
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
          <div className="float-right mt-1 text-dsfr-text-mention-grey">{getLabelCoutFourniture(ficheAttributes)}</div>
        </div>
      </div>
    </div>
  );
}
