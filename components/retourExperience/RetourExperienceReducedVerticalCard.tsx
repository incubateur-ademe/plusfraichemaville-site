import { RetourExperience } from "@/lib/directus/directusModels";
import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";
import Image from "next/image";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { getRegionLabelFromCode } from "@/helpers/regions";
import Link from "next/link";
import React from "react";

export default function RetourExperienceReducedVerticalCard({
  retourExperience,
  className,
}: {
  retourExperience: RetourExperience;
  className?: string;
}) {
  return (
    <Link
      className={`flex w-72 flex-col pfmv-card min-h-[26rem] ${className}`}
      href={`/projet/${retourExperience.slug}`}
    >
      <div className="flex w-full h-40">
        <Image
          width={450}
          height={300}
          src={getDirectusImageUrl(retourExperience.image_principale, DIRECTUS_IMAGE_KEY_SIZE.retourExperienceCard)}
          alt={retourExperience.titre}
          className={"w-full object-cover rounded-t-2xl"}
        />
      </div>
      <div className="p-6 flex flex-col grow">
        <div className={"text-lg font-bold text-dsfr-text-title-grey text-blue-hover mb-3"}>
          {retourExperience.titre}
        </div>
        <Tag small={true} className={"mb-8"}>
          {getRegionLabelFromCode(retourExperience.region)}
        </Tag>
        <div className={"mt-auto text-dsfr-text-mention-grey text-xs"}>
          <div>
            Climat actuel : <b>{retourExperience.climat_actuel}</b>
          </div>
          <div>
            Climat futur : <b>{retourExperience.climat_futur}</b>
          </div>
        </div>
      </div>
    </Link>
  );
}
