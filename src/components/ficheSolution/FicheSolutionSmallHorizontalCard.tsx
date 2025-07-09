"use client";
import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { getTypeSolutionFromCode } from "@/src/helpers/type-fiche-solution";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export default function FicheSolutionSmallHorizontalCard({
  ficheSolution,
  className,
}: {
  ficheSolution: FicheSolution;
  className?: string;
}) {
  const typeSolution = getTypeSolutionFromCode(ficheSolution.attributes.type_solution);

  const { projetId } = useParams();

  const url = projetId
    ? PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE_FICHE_SOLUTION(+projetId, ficheSolution.attributes.slug)
    : `${PFMV_ROUTES.FICHES_SOLUTIONS}/${ficheSolution.attributes.slug}`;

  return (
    <LinkWithoutPrefetch
      className={clsx(
        "flex h-[7rem] w-full max-w-[28rem] flex-row md:w-[28rem]",
        "fiche-solution-small-vertical-card items-center",
        className,
      )}
      href={url}
    >
      <div className="flex h-full w-40">
        <Image
          width={450}
          height={300}
          src={getStrapiImageUrl(ficheSolution.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.small)}
          alt={ficheSolution.attributes.titre}
          className={"w-full rounded-l-2xl object-cover"}
          unoptimized
        />
      </div>
      <div className="m-4 max-w-[18rem]">
        <div className={"text-blue-hover font-bold"}>{ficheSolution.attributes.titre}</div>
        {typeSolution && (
          <div className="mt-4 flex flex-row text-dsfr-text-mention-grey">
            {typeSolution.icon("fr-icon--sm mr-2 mb-auto")}
            <span className="mt-[2px] text-sm">{typeSolution.label}</span>
          </div>
        )}
      </div>
    </LinkWithoutPrefetch>
  );
}
