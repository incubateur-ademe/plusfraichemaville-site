import { FicheSolution } from "@/lib/directus/directusModels";
import Image from "next/image";
import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";
import Link from "next/link";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
import React from "react";
import FicheSolutionInfoComparatif from "@/components/ficheSolution/FicheSolutionInfoComparatif";

export default function FicheSolutionFullCard({
  ficheSolution,
  extraUrlParams,
}: {
  ficheSolution: FicheSolution;
  extraUrlParams?: { param: string; value: string }[];
}) {
  const typeSolution = getTypeSolutionFromCode(ficheSolution.type_solution);
  let url = `/fiche-solution/${ficheSolution.slug}`;
  url = extraUrlParams ? url + "?" + extraUrlParams?.map((param) => `${param.param}=${param.value}`).join("&") : url;
  return (
    <Link className="flex w-72 flex-col pfmv-card md:ml-0" href={url}>
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
        <div className={"text-xl font-bold text-dsfr-text-title-grey text-blue-hover"}>{ficheSolution.titre}</div>
        <div className={"text-sm text-dsfr-text-title-grey mt-4"}>{ficheSolution.description_courte}</div>
        <div className={"mt-auto"}>
          <div>
            <FicheSolutionInfoComparatif
              temperatureClass="text-[2rem] leading-8"
              ficheSolution={ficheSolution}
              className={"text-xs"}
            />
            <div className="text-center mt-4">
              <div className={`fr-btn fr-btn--tertiary rounded-3xl px-9`}>{"J'explore la solution"}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
