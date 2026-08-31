"use client";
import Image from "next/image";
import { getTypeSolutionFromCode } from "@/src/helpers/type-fiche-solution";
import { PropsWithChildren } from "react";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { makeFicheSolutionUrlApi } from "./helpers";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";

export function FicheSolutionSmallCard({
  ficheSolutionId,
  children,
  onClick,
  className = " pfmv-card cursor-pointer ",
}: {
  ficheSolutionId: string;
  onClick?: () => void;
  className?: string;
} & PropsWithChildren) {
  const { data } = useImmutableSwrWithFetcher<FicheSolution[]>(makeFicheSolutionUrlApi([ficheSolutionId]));

  const ficheSolution = data && data[0];

  if (!ficheSolution) {
    return null;
  }
  const typeSolution = getTypeSolutionFromCode(ficheSolution.type_solution);
  return (
    <div className={`relative flex w-60 flex-col md:ml-0 ${className}`} onClick={onClick}>
      <div className="flex h-32 w-full">
        <Image
          width={450}
          height={300}
          src={getStrapiImageUrl(ficheSolution.image_principale, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt={ficheSolution.titre}
          className={"h-full w-full rounded-t-2xl object-cover"}
          unoptimized
        />
      </div>
      <div className="flex grow flex-col px-4 pb-4 pt-6">
        {typeSolution && (
          <>
            <div className="mb-2 flex flex-row text-xs text-dsfr-text-mention-grey">
              {typeSolution.coloredIcon("fr-icon--sm mr-2 mb-auto")}
              <span className="mt-[1px]">{typeSolution.label}</span>
            </div>
          </>
        )}
        <div className={"text-blue-hover text-lg font-bold text-dsfr-text-title-grey"}>{ficheSolution.titre}</div>
        <div className={"mt-4 text-sm text-dsfr-text-title-grey"}>{ficheSolution.description_courte}</div>
        <div className={"mt-auto"}>
          <div className="mt-4 flex place-content-center">{children}</div>
        </div>
      </div>
    </div>
  );
}
