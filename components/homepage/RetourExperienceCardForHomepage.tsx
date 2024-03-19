import Image from "next/image";
import Tag from "@codegouvfr/react-dsfr/Tag";
import Link from "next/link";
import React from "react";
import { HomepageRetourExperience } from "@/components/homepage/HomepageRetourExperienceList";
import { PFMV_ROUTES } from "@/helpers/routes";

export default function RetourExperienceCardForHomepage({
  retourExperience,
  className,
}: {
  retourExperience: HomepageRetourExperience;
  className?: string;
}) {
  return (
    <Link
      className={`flex w-72 flex-col pfmv-card min-h-[26rem] ${className}`}
      href={`${PFMV_ROUTES.RETOURS_EXPERIENCE}/${retourExperience.slug}`}
    >
      <div className="flex w-full h-40">
        <Image
          width={450}
          height={300}
          src={retourExperience.image}
          alt={retourExperience.description}
          className={"w-full h-full object-cover rounded-t-2xl"}
        />
      </div>
      <div className="p-6 flex flex-col grow">
        <div className={"text-lg font-bold text-dsfr-text-title-grey text-blue-hover mb-3"}>
          {retourExperience.description}
        </div>
        <Tag small={true} className={"mb-8"}>
          {retourExperience.region}
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
