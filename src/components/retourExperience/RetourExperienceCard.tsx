"use client";

import Image from "next/image";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { getRegionLabelFromCode } from "@/src/helpers/regions";

import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { getClimatLabelFromCode } from "@/src/helpers/retourExperience/climatRetourExperience";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useParams } from "next/navigation";
import { RetourExperience } from "@/src/lib/strapi/types/api/retour-experience";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import clsx from "clsx";

export type RexInHome = Pick<
  RetourExperience["attributes"],
  "slug" | "climat_actuel" | "climat_futur" | "titre" | "region"
> & { image_principale: string };

export default function RetourExperienceCard({
  retourExperience,
  titleHeadingLevel = "h3",
  className,
}: {
  retourExperience: RetourExperience | RexInHome;
  titleHeadingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}) {
  const selectRex = "attributes" in retourExperience ? retourExperience.attributes : retourExperience;
  const { projetId } = useParams();
  let url = projetId
    ? PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_REX(+projetId, selectRex.slug)
    : `${PFMV_ROUTES.RETOUR_EXPERIENCE_PROJET(selectRex.slug)}`;

  const TitleHeadingTag = titleHeadingLevel;

  return (
    <div className={clsx("pfmv-card fr-enlarge-link flex min-h-[26rem] w-72 flex-col", className)}>
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
          unoptimized={!(typeof selectRex.image_principale === "string")}
        />
      </div>
      <div className="flex grow flex-col p-6">
        <TitleHeadingTag className={"text-blue-hover mb-3 text-lg font-bold text-dsfr-text-title-grey"}>
          <LinkWithoutPrefetch className="bg-none" href={url}>
            {selectRex.titre}
          </LinkWithoutPrefetch>
        </TitleHeadingTag>
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
    </div>
  );
}
