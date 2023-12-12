import { FicheSolution } from "@/lib/directus/directusModels";
import Image from "next/image";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
import React from "react";
import CmsRichText from "@/components/common/CmsRichText";
import FicheSolutionInfoComparatif from "@/components/ficheSolution/FicheSolutionInfoComparatif";

export default function FicheSolutionTabSynthese({ ficheSolution }: { ficheSolution: FicheSolution }) {
  const typeSolution = getTypeSolutionFromCode(ficheSolution.type_solution);
  return (
    <div>
      <div className="flex flex-col md:flex-row ">
        <div className="md:pr-9">
          {typeSolution && (
            <div className="flex flex-row mb-4 text-dsfr-text-mention-grey">
              {typeSolution.coloredIcon("fr-icon mr-4 mb-auto")}
              <span className="mt-[1px]">{typeSolution.label}</span>
            </div>
          )}
          <div className="text-dsfr-text-little-grey font-bold text-[1.375rem] mb-4">
            {ficheSolution.description_courte}
          </div>
          <CmsRichText label={ficheSolution.description} className="text-dsfr-text-little-grey" />
        </div>
        <div className="w-72 flex-none md:border-l border-dsfr-border-default-grey md:pl-6 ">
          <FicheSolutionInfoComparatif
            temperatureClass="text-[3.125rem]"
            ficheSolution={ficheSolution}
            className={"text-sm"}
          />
          <hr className="pb-2 mt-1" />
          {ficheSolution.cobenefices.map((cobenefice) => (
            <div key={cobenefice.cobenefice_id.id} className="flex flex-row mt-3">
              <Image
                width={50}
                height={50}
                src={`/images/cobenefices/${cobenefice.cobenefice_id.icone || "cobenefice-blank"}.svg`}
                className="mr-4"
                alt={cobenefice.cobenefice_id.description}
              />
              <div className="text-dsfr-text-mention-grey flex items-center">
                {cobenefice.cobenefice_id.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="pb-2 mt-6" />
      <div className="flex flex-col md:flex-row md:mt-8 gap-8">
        {ficheSolution.contexte_description && (
          <div>
            <div className="text-dsfr-text-little-grey font-bold text-[1.375rem] mb-4">
              {ficheSolution.contexte_titre}
            </div>
            <CmsRichText label={ficheSolution.contexte_description} className="text-dsfr-text-little-grey" />
          </div>
        )}
        {ficheSolution.rafraichissement_attendu_description && (
          <div>
            <div className="text-dsfr-text-little-grey font-bold text-[1.375rem] mb-4">Rafraîchissement attendu</div>
            <CmsRichText
              label={ficheSolution.rafraichissement_attendu_description}
              className="text-dsfr-text-little-grey"
            />
          </div>
        )}
      </div>
    </div>
  );
}
