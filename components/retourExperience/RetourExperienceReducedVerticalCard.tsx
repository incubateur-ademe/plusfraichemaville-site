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
      className={`flex w-52 flex-col pfmv-card mr-4 ml-4 md:ml-1 ${className}`}
      href={`/projet/${retourExperience.slug}`}
    >
      <div className="flex w-full h-36">
        <Image
          width={450}
          height={300}
          src={getDirectusImageUrl(retourExperience.image_principale, DIRECTUS_IMAGE_KEY_SIZE.retourExperienceCard)}
          alt={retourExperience.titre}
          className={"w-full object-cover rounded-t-2xl"}
        />
      </div>
      <div className="px-3 pt-6 pb-4 flex flex-col grow">
        <div className={"text-sm font-bold text-dsfr-text-little-grey text-blue-hover mb-4"}>
          {retourExperience.titre}
        </div>
        <div className={"mt-auto"}>
          <Tag small={true} className={"mb-8"}>
            {getRegionLabelFromCode(retourExperience.region)}
          </Tag>
          <div className="text-dsfr-text-mention-grey text-[0.625rem]">
            Climat actuel : <b>{retourExperience.climat_actuel}</b>
          </div>
          <div className="text-dsfr-text-mention-grey text-[0.625rem]">
            Climat futur : <b>{retourExperience.climat_futur}</b>
          </div>
        </div>
      </div>
    </Link>
  );
}
