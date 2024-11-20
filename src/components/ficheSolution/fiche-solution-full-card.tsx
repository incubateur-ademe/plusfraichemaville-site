"use client";

import Image from "next/image";
import Link from "next/link";
import { getTypeSolutionFromCode } from "@/src/helpers/typeSolution";

import FicheSolutionInfoComparatif from "@/src/components/ficheSolution/FicheSolutionInfoComparatif";
import { GetValues } from "@/src/lib/strapi/types/types";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { PFMV_ROUTES } from "@/src/helpers/routes";
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
    <Link className="pfmv-card flex w-72 flex-col md:ml-0" href={url}>
      <div className="flex h-52 w-full">
        <Image
          width={450}
          height={300}
          src={getStrapiImageUrl(ficheSolution.image_principale, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt={ficheSolution.titre}
          className={"h-full w-full rounded-t-2xl object-cover"}
        />
      </div>
      <div className="flex grow flex-col px-6 pb-4 pt-6">
        {typeSolution && (
          <>
            <div className="mb-2 flex flex-row text-xs text-dsfr-text-mention-grey">
              {typeSolution.icon("fr-icon--sm mr-2 mb-auto")}
              <span className="mt-[1px]">{typeSolution.label}</span>
            </div>
          </>
        )}
        <h2 className={"text-blue-hover m-0 text-xl font-bold text-dsfr-text-title-grey"}>{ficheSolution.titre}</h2>
        <div className={"mt-4 text-sm text-dsfr-text-title-grey"}>{ficheSolution.description_courte}</div>
        <div className={"mt-auto"}>
          <div>
            <FicheSolutionInfoComparatif
              temperatureFormat="small"
              ficheSolution={ficheSolution}
              className={"text-xs"}
            />
            <div className="mt-4 text-center">
              <div className={"fr-btn fr-btn--tertiary rounded-3xl px-9"}>{"J'explore la solution"}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
