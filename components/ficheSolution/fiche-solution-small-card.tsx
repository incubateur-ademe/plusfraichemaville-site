"use client";
import Image from "next/image";
import { getTypeSolutionFromCode } from "@/helpers/typeSolution";
import React, { PropsWithChildren } from "react";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { makeFicheSolutionUrlApi } from "./helpers";
import { FicheSolutionResponse } from "./type";
import { useImmutableSwrWithFetcher } from "@/hooks/use-swr-with-fetcher";

export function FicheSolutionSmallCard({
  ficheSolutionId,
  children,
  onClick,
  className = " pfmv-card cursor-pointer ",
}: {
  ficheSolutionId: number;
  onClick?: () => void;
  className?: string;
} & PropsWithChildren) {
  const { data } = useImmutableSwrWithFetcher<FicheSolutionResponse[]>(makeFicheSolutionUrlApi(ficheSolutionId));

  const ficheSolution = data && data[0];

  if (!ficheSolution) {
    return null;
  }
  const typeSolution = getTypeSolutionFromCode(ficheSolution.attributes.type_solution);
  return (
    <div className={`flex w-60 flex-col md:ml-0 relative ${className}`} onClick={onClick}>
      <div className="flex w-full h-32">
        <Image
          width={450}
          height={300}
          src={getStrapiImageUrl(ficheSolution.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt={ficheSolution.attributes.titre}
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
        <div className={"text-lg font-bold text-dsfr-text-title-grey text-blue-hover"}>
          {ficheSolution.attributes.titre}
        </div>
        <div className={"text-sm text-dsfr-text-title-grey mt-4"}>{ficheSolution.attributes.description_courte}</div>
        <div className={"mt-auto"}>
          <div className="mt-4 flex place-content-center">{children}</div>
        </div>
      </div>
    </div>
  );
}
