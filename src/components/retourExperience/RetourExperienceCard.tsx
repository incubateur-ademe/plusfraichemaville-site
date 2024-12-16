"use client";

import Image from "next/image";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { getRegionLabelFromCode } from "@/src/helpers/regions";
import Link from "next/link";

import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { getClimatLabelFromCode } from "@/src/helpers/retourExperience/climatRetourExperience";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useParams } from "next/navigation";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";

export type RexInHome = Pick<
  RetourExperience["attributes"],
  "slug" | "climat_actuel" | "climat_futur" | "titre" | "region"
> & { image_principale: string };

export default function RetourExperienceCard({
  retourExperience,
  className,
}: {
  retourExperience: RetourExperience | RexInHome;
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
            typeof selectRex.image_principale === "string"
              ? selectRex.image_principale
              : getStrapiImageUrl(selectRex.image_principale, STRAPI_IMAGE_KEY_SIZE.medium)
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
