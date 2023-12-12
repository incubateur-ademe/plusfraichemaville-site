import { FicheSolution } from "@/lib/directus/directusModels";
import Image from "next/image";
import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";
import Link from "next/link";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
import React from "react";
import { getDelaiTravauxFicheSolutionFromCode } from "@/helpers/delaiTravauxFicheSolution";
import { getCoutFicheSolutionFromCode } from "@/helpers/coutFicheSolution";
import CmsRichText from "@/components/common/CmsRichText";
import FicheSolutionInfoComparatif from "@/components/ficheSolution/FicheSolutionInfoComparatif";

export default function FicheSolutionTabSynthese({ ficheSolution }: { ficheSolution: FicheSolution }) {
  const typeSolution = getTypeSolutionFromCode(ficheSolution.type_solution);
  return (
    <div>
      <div className="flex flex-col md:flex-row ">
        <div className="md:pr-9">
          {typeSolution && (
            <div className="flex flex-row mb-2 text-dsfr-text-mention-grey">
              {typeSolution.coloredIcon("fr-icon mr-4 mb-auto")}
              <span className="mt-[1px]">{typeSolution.label}</span>
            </div>
          )}
          <div className="text-dsfr-text-mention-grey font-bold text-[1.375rem]">
            {ficheSolution.description_courte}
          </div>
          <CmsRichText label={ficheSolution.description} className="mt-4 text-dsfr-text-little-grey" />
        </div>
        <div className="w-72 flex-none md:border-l border-dsfr-border-default-grey md:pl-6 ">
          <FicheSolutionInfoComparatif
            temperatureClass="text-[3.125rem]"
            ficheSolution={ficheSolution}
            className={"text-sm"}
          />
          <hr className="pb-2 mt-1" />
        </div>
      </div>
    </div>
  );
}
