import { FicheSolution } from "@/lib/directus/directusModels";
import Image from "next/image";
import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";
import Link from "next/link";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
import React from "react";
import { getDelaiTravauxFicheSolutionFromCode } from "@/helpers/delaiTravauxFicheSolution";
import { getCoutFicheSolutionFromCode } from "@/helpers/coutFicheSolution";

export default function FicheSolutionTabSynthese({ ficheSolution }: { ficheSolution: FicheSolution }) {
  const typeSolution = getTypeSolutionFromCode(ficheSolution.type_solution);
  const delaiTravaux = getDelaiTravauxFicheSolutionFromCode(ficheSolution.delai_travaux);
  const cout = getCoutFicheSolutionFromCode(ficheSolution.cout_minimum, ficheSolution.cout_maximum);
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div>
          {typeSolution && (
            <div className="flex flex-row mb-2 text-dsfr-text-mention-grey">
              {typeSolution.coloredIcon("fr-icon mr-4 mb-auto")}
              <span className="mt-[1px]">{typeSolution.label}</span>
            </div>
          )}
          <div className="text-dsfr-text-mention-grey font-bold text-[1.375rem]">
            {ficheSolution.description_courte}
          </div>
          <div className="text-dsfr-text-mention-grey font-bold text-[1.375rem]">
            {ficheSolution.description_courte}
          </div>
        </div>
        <div className="w-80 flex-none bg-dsfr-text-mention-grey">rezrez</div>
      </div>
    </div>
  );
}
