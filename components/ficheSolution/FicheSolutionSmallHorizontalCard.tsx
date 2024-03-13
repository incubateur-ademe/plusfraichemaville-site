"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { APIResponse } from "@/lib/strapi/types/types";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
import { PFMV_ROUTES } from "@/helpers/routes";
import clsx from "clsx";
import { useParams } from "next/navigation";

export default function FicheSolutionSmallHorizontalCard({
  ficheSolution,
  className,
}: {
  ficheSolution: APIResponse<"api::fiche-solution.fiche-solution">;
  className?: string;
}) {
  const typeSolution = getTypeSolutionFromCode(ficheSolution.data.attributes.type_solution);

  const { projetId } = useParams();

  const url = projetId
    ? PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE_FICHE_SOLUTION(+projetId, ficheSolution.data.attributes.slug)
    : `${PFMV_ROUTES.FICHES_SOLUTIONS}/${ficheSolution.data.attributes.slug}`;

  return (
    <Link
      className={clsx(
        "flex max-w-[28rem] w-full md:w-[28rem] h-[7rem] flex-row",
        "items-center fiche-solution-small-vertical-card",
        className,
      )}
      href={url}
    >
      <div className="flex w-40 h-full">
        <Image
          width={450}
          height={300}
          src={getStrapiImageUrl(ficheSolution.data.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.small)}
          alt={ficheSolution.data.attributes.titre}
          className={"w-full object-cover rounded-l-2xl"}
        />
      </div>
      <div className="m-4 max-w-[18rem]">
        <div className={"font-bold text-blue-hover"}>{ficheSolution.data.attributes.titre}</div>
        {typeSolution && (
          <div className="flex flex-row text-dsfr-text-mention-grey mt-4">
            {typeSolution.icon("fr-icon--sm mr-2 mb-auto")}
            <span className="mt-[2px] text-sm">{typeSolution.label}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
