import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getCoutFicheSolutionFromCode } from "@/helpers/coutFicheSolution";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { APIResponse } from "@/lib/strapi/types/types";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";

export default function FicheSolutionSmallHorizontalCard({
  ficheSolution,
  className,
}: {
  ficheSolution: APIResponse<"api::fiche-solution.fiche-solution">;
  className?: string;
}) {
  const cout = getCoutFicheSolutionFromCode(
    ficheSolution.data.attributes.cout_minimum,
    ficheSolution.data.attributes.cout_maximum,
  );
  return (
    <Link
      className={`flex max-w-[28rem] w-full md:w-[28rem] h-[7rem] flex-row
      items-center fiche-solution-small-vertical-card ${className}`}
      href={`/fiche-solution/${ficheSolution.data.attributes.slug}`}
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
        <Tag className="mt-4">{cout.shortLabel}</Tag>
      </div>
    </Link>
  );
}
