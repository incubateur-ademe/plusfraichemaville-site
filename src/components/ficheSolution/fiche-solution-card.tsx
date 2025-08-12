"use client";

import { GenericSaveFiche } from "../common/generic-save-fiche";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { TypeFiche } from "@/src/helpers/common";
import { useParams } from "next/navigation";
import { getTypeSolutionFromCode } from "@/src/helpers/type-fiche-solution";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import FicheSolutionInfoComparatif from "@/src/components/ficheSolution/FicheSolutionInfoComparatif";
import clsx from "clsx";

export type FicheSolutionCardProps = {
  ficheSolution: FicheSolution;
  projectName: string;
  extraUrlParams?: { param: string; value: string }[];
  className?: string;
  withoutModal?: boolean;
};

export default function FicheSolutionCard({
  ficheSolution,
  extraUrlParams,
  className = "",
  projectName,
  withoutModal,
}: FicheSolutionCardProps) {
  const { projetId } = useParams();
  const isEspaceProjet = projetId;
  const ficheAttributes = ficheSolution.attributes;

  const typeSolution = getTypeSolutionFromCode(ficheAttributes.type_solution);
  let url = isEspaceProjet
    ? PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE_FICHE_SOLUTION(+projetId, ficheAttributes.slug)
    : `${PFMV_ROUTES.FICHES_SOLUTIONS}/${ficheAttributes.slug}`;

  url = extraUrlParams ? url + "?" + extraUrlParams?.map((param) => `${param.param}=${param.value}`).join("&") : url;

  return (
    <div className={clsx("pfmv-card fr-enlarge-link flex w-72 flex-col md:ml-0", className)}>
      <div className="flex h-52 w-full">
        <Image
          width={450}
          height={300}
          src={getStrapiImageUrl(ficheAttributes.image_principale, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt={ficheAttributes.titre}
          className={"h-full w-full rounded-t-2xl object-cover"}
          unoptimized
        />
      </div>
      <div className="flex grow flex-col px-6 pb-4 pt-6">
        {typeSolution && (
          <>
            <div className="mb-2 flex flex-row text-xs text-dsfr-text-mention-grey">
              {typeSolution.coloredIcon("fr-icon--sm mr-2 mb-auto")}
              <span className="mt-[1px]">{typeSolution.label}</span>
            </div>
          </>
        )}

        <h2 className={"text-blue-hover m-0 text-xl font-bold text-dsfr-text-title-grey"}>
          <LinkWithoutPrefetch className="bg-none" href={url}>
            {ficheAttributes.titre}
          </LinkWithoutPrefetch>
        </h2>

        <div className={"mt-4 text-sm text-dsfr-text-title-grey"}>{ficheAttributes.description_courte}</div>
        <div className={"mt-auto"}>
          <div>
            <FicheSolutionInfoComparatif
              temperatureFormat="small"
              ficheAttributes={ficheAttributes}
              className={"text-xs"}
            />
            <GenericSaveFiche
              id={ficheSolution.id}
              type={TypeFiche.solution}
              projectName={projectName}
              withoutModal={withoutModal}
              classNameButton="mt-4 text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
