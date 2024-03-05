"use client";

import Image from "next/image";
import Link from "next/link";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
import React from "react";
import FicheSolutionInfoComparatif from "@/components/ficheSolution/FicheSolutionInfoComparatif";
import { GetValues } from "@/lib/strapi/types/types";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { PFMV_ROUTES } from "@/helpers/routes";
import { useParams } from "next/navigation";

export default function FicheSolutionFullCard({
  ficheSolution,
  extraUrlParams,
}: {
  ficheSolution: GetValues<"api::fiche-solution.fiche-solution">;
  extraUrlParams?: { param: string; value: string }[];
}) {
  const { projetId } = useParams();
  const isEspaceProjet = projetId;

  const typeSolution = getTypeSolutionFromCode(ficheSolution.type_solution);
  let url = isEspaceProjet
    ? PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE_FICHE_SOLUTION(+projetId, ficheSolution.slug)
    : `${PFMV_ROUTES.FICHES_SOLUTIONS}/${ficheSolution.slug}`;

  url = extraUrlParams ? url + "?" + extraUrlParams?.map((param) => `${param.param}=${param.value}`).join("&") : url;
  return (
    <Link className="flex w-72 flex-col pfmv-card md:ml-0" href={url}>
      <div className="flex w-full h-52">
        <Image
          width={450}
          height={300}
          src={getStrapiImageUrl(ficheSolution.image_principale, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt={ficheSolution.titre}
          className={"w-full h-full object-cover rounded-t-2xl"}
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
              temperatureFormat="small"
              ficheSolution={ficheSolution}
              className={"text-xs"}
            />
            <div className="text-center mt-4">
              <div className={"fr-btn fr-btn--tertiary rounded-3xl px-9"}>{"J'explore la solution"}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
