import { FicheSolution } from "@/lib/directus/directusModels";
import Image from "next/image";
import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";
import Link from "next/link";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
import React from "react";
import { getDelaiTravauxFicheSolutionFromCode } from "@/helpers/delaiTravauxFicheSolution";
import { getCoutFicheSolutionFromCode } from "@/helpers/coutFicheSolution";
import FicheSolutionInfoComparatif from "@/components/ficheSolution/FicheSolutionInfoComparatif";

export default function FicheSolutionFullCard({ ficheSolution }: { ficheSolution: FicheSolution }) {
  const typeSolution = getTypeSolutionFromCode(ficheSolution.type_solution);
  const delaiTravaux = getDelaiTravauxFicheSolutionFromCode(ficheSolution.delai_travaux);
  const cout = getCoutFicheSolutionFromCode(ficheSolution.cout_minimum, ficheSolution.cout_maximum);
  return (
    <Link
      className="flex w-[17.5rem] flex-col pfmv-card mr-4 ml-4 md:ml-0"
      href={`/fiche-solution/${ficheSolution.slug}`}
    >
      <div className="flex w-full h-52">
        <Image
          width={450}
          height={300}
          src={getDirectusImageUrl(ficheSolution.image_principale, DIRECTUS_IMAGE_KEY_SIZE.ficheSolutionCard)}
          alt={ficheSolution.titre}
          className={"w-full object-cover rounded-t-2xl"}
        />
      </div>
      <div className="px-6 pt-6 pb-4 flex flex-col grow">
        {typeSolution && (
          <>
            <div className="flex flex-row text-xs mb-2 text-dsfr-text-mention-grey">
              {typeSolution.icon("fr-icon--sm mr-2 mb-auto")}
              <span className="mt-[1px]">{typeSolution.label}</span>
            </div>
          </>
        )}
        <div className={"text-xl font-bold text-dsfr-text-little-grey text-blue-hover"}>{ficheSolution.titre}</div>
        <div className={"text-sm text-dsfr-text-little-grey mt-4"}>{ficheSolution.description_courte}</div>
        <div className={"mt-auto"}>
          <div>
            <FicheSolutionInfoComparatif temperatureClass="text-4xl" ficheSolution={ficheSolution} className={"text-xs"}/>
            <div className="text-center mt-4">
              <div className={`fr-btn fr-btn--tertiary rounded-3xl px-9`}>{"J'explore la solution"}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
