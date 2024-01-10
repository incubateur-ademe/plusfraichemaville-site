import Image from "next/image";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { getRegionLabelFromCode } from "@/helpers/regions";
import Link from "next/link";
import React from "react";
import { APIResponseData } from "@/lib/strapi/types/types";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { getClimatLabelFromCode } from "@/helpers/retourExperience/climatRetourExperience";

export default function RetourExperienceCard({
  retourExperience,
  className,
}: {
  retourExperience: APIResponseData<"api::retour-experience.retour-experience">;
  className?: string;
}) {
  return (
    <Link
      className={`flex w-72 flex-col pfmv-card min-h-[26rem] ${className}`}
      href={`/projet/${retourExperience.attributes.slug}`}
    >
      <div className="flex w-full h-40">
        <Image
          width={450}
          height={300}
          src={getStrapiImageUrl(retourExperience.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt={retourExperience.attributes.titre}
          className={"w-full object-cover rounded-t-2xl"}
        />
      </div>
      <div className="p-6 flex flex-col grow">
        <div className={"text-lg font-bold text-dsfr-text-title-grey text-blue-hover mb-3"}>
          {retourExperience.attributes.titre}
        </div>
        <Tag small={true} className={"mb-8"}>
          {getRegionLabelFromCode(retourExperience.attributes.region?.data?.attributes.code)}
        </Tag>
        <div className={"mt-auto text-dsfr-text-mention-grey text-xs"}>
          <div>
            Climat actuel : <b>{getClimatLabelFromCode(retourExperience.attributes.climat_actuel)}</b>
          </div>
          <div>
            Climat futur : <b>{getClimatLabelFromCode(retourExperience.attributes.climat_futur)}</b>
          </div>
        </div>
      </div>
    </Link>
  );
}
