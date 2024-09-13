"use client";

import Image from "next/image";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { getRegionLabelFromCode } from "@/helpers/regions";
import Link from "next/link";
import React from "react";
import { APIResponseData } from "@/lib/strapi/types/types";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { getClimatLabelFromCode } from "@/helpers/retourExperience/climatRetourExperience";
import { PFMV_ROUTES } from "@/helpers/routes";
import { useParams } from "next/navigation";

export type RexInHome = Pick<
  APIResponseData<"api::retour-experience.retour-experience">["attributes"],
  "slug" | "climat_actuel" | "climat_futur" | "image_principale" | "titre" | "region"
>;

export default function RetourExperienceCard({
  retourExperience,
  className,
}: {
  retourExperience: APIResponseData<"api::retour-experience.retour-experience"> | RexInHome;
  className?: string;
}) {
  const selectRex = "attributes" in retourExperience ? retourExperience.attributes : retourExperience;
  const { projetId } = useParams();
  let url = projetId
    ? PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_REX(+projetId, selectRex.slug)
    : `${PFMV_ROUTES.RETOURS_EXPERIENCE}/${selectRex.slug}`;

  return (
    <Link className={`pfmv-card flex min-h-[26rem] w-72 flex-col ${className}`} href={url}>
      <div className="flex h-40 w-full">
        <Image
          width={450}
          height={300}
          src={
            "attributes" in retourExperience
              ? getStrapiImageUrl(selectRex.image_principale, STRAPI_IMAGE_KEY_SIZE.medium)
              : selectRex.image_principale
          }
          alt={selectRex.titre}
          className={"w-full rounded-t-2xl object-cover"}
        />
      </div>
      <div className="flex grow flex-col p-6">
        <h3 className={"text-blue-hover mb-3 text-lg font-bold text-dsfr-text-title-grey"}>{selectRex.titre}</h3>
        <Tag small={true} className={"mb-8"}>
          {getRegionLabelFromCode(selectRex.region?.data?.attributes.code)}
        </Tag>
        <div className={"mt-auto text-xs text-dsfr-text-mention-grey"}>
          <div>
            Climat actuel : <b>{getClimatLabelFromCode(selectRex.climat_actuel)}</b>
          </div>
          <div>
            Climat futur : <b>{getClimatLabelFromCode(selectRex.climat_futur)}</b>
          </div>
        </div>
      </div>
    </Link>
  );
}
