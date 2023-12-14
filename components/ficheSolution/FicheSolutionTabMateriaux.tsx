import { FicheSolution } from "@/lib/directus/directusModels";
import React from "react";
import Image from "next/image";
import CmsRichText from "@/components/common/CmsRichText";
import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";
import { getUniteCoutMateriauFromCode } from "@/helpers/coutMateriau";
import entretienIcon from "../../public/images/fiches-solutions/entretien.svg";

export default function FicheSolutionTabMateriaux({ ficheSolution }: { ficheSolution: FicheSolution }) {
  return (
    <div>
      <div className="text-dsfr-text-little-grey font-bold text-[1.75rem] mb-8">Matériaux et coûts</div>
      {ficheSolution.materiaux.length > 0 ? (
        <>
          <hr className="p-0 h-[1px]" />
          {ficheSolution.materiaux.map(({ materiau_id: mat }) => (
            <div key={mat.id}>
              <div className={"flex flex-row gap-6"}>
                <div className="w-28 h-28 relative flex flex-none mt-8">
                  <Image
                    fill
                    src={getDirectusImageUrl(mat.image, DIRECTUS_IMAGE_KEY_SIZE.ficheSolutionCard)}
                    alt={mat.titre}
                    className={"object-cover rounded-2xl"}
                  />
                </div>
                <div className="mb-8 mt-8 text-dsfr-text-little-grey">
                  <div className="text-2xl font-bold  mb-2">{mat.titre}</div>
                  <CmsRichText label={mat.description} className="text-sm" />
                </div>
                <div
                  className={"w-60 flex flex-col flex-none bg-dsfr-background-alt-grey text-dsfr-text-mention-grey p-6"}
                >
                  <div>
                    <b>{`${mat.cout_minimum_fourniture} - ${mat.cout_maximum_fourniture} € `}</b>HT /{" "}
                    {getUniteCoutMateriauFromCode(mat.cout_unite)?.unitLabel}
                  </div>
                  <div className="text-sm ">(fourniture et pose)</div>
                </div>
              </div>
              <hr className="p-0 h-[1px]" />
            </div>
          ))}
        </>
      ) : (
        <div className="text-dsfr-text-little-grey   mb-4">Auncun matériau n{"'"}a été renseigné pour cette fiche</div>
      )}
      {ficheSolution.cout_minimum_entretien && ficheSolution.cout_maximum_entretien && (
        <>
          <hr className="p-0 h-[1px] mt-16" />
          <div className={"flex flex-row gap-6"}>
            <div className="w-28 h-28 relative flex flex-none mt-8 mb-8">
              <Image fill src={entretienIcon} alt="Coût d'entretien" />
            </div>
            <div className="mb-8 mt-8 text-dsfr-text-little-grey flex flex-col grow">
              <div className="text-2xl font-bold mb-2">{"Coût d'entretien"}</div>
              <div className="text-sm flex grow">
                {"Main - d’œuvre ou sous-traitance, hors consommations d’eau et d’électricité"}
              </div>
            </div>
            <div
              className={
                "w-60 flex flex-col flex-none bg-dsfr-background-alt-blue-france text-dsfr-text-mention-grey p-6"
              }
            >
              <div>
                <b>{`${ficheSolution.cout_minimum_entretien} - 
                ${ficheSolution.cout_maximum_entretien} € `}</b>
                HT / m²{" "}
              </div>
              <div className="text-sm ">par an</div>
            </div>
          </div>
          <hr className="p-0 h-[1px]" />
        </>
      )}
    </div>
  );
}
