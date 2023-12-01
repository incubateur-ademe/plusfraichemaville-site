import { FicheSolution } from "@/lib/directus/directusModels";
import Image from "next/image";
import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";
import Link from "next/link";
import React from "react";
import { getCoutFicheSolutionFromCode } from "@/helpers/coutFicheSolution";
import Tag from "@codegouvfr/react-dsfr/Tag";

export default function FicheSolutionSmallVerticalCard({
  ficheSolution,
  className,
}: {
  ficheSolution: FicheSolution;
  className?: string;
}) {
  const cout = getCoutFicheSolutionFromCode(ficheSolution.cout);
  return (
    <Link
      className={`flex max-w-[28rem] w-full md:w-[28rem] h-[7rem] flex-row
      items-center fiche-solution-small-vertical-card ${className}`}
      href={`/fiche-solution/${ficheSolution.slug}`}
    >
      <div className="flex w-40 h-full">
        <Image
          width={450}
          height={300}
          src={getDirectusImageUrl(ficheSolution.image_principale, DIRECTUS_IMAGE_KEY_SIZE.aideDecisionCard)}
          alt={ficheSolution.titre}
          className={"w-full object-cover rounded-l-2xl"}
        />
      </div>
      <div className="m-4 max-w-[18rem]">
        <div className={"font-bold text-blue-hover"}>{ficheSolution.titre}</div>
        <Tag className="mt-4">{cout?.shortLabel}</Tag>
      </div>
    </Link>
  );
}
