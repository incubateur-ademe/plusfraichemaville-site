import Image from "next/image";
import { PropsWithChildren } from "react";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";

import { ShowMoreRichText } from "@/src/components/common/show-more-rich-text";
import clsx from "clsx";
import { getLabelCoutEntretien, getLabelCoutFourniture, materiauHasNoCost } from "@/src/helpers/cout/cout-materiau";
import { Materiau } from "@/src/lib/strapi/types/api/materiau";

type EstimationMateriauFieldProps = {
  materiau?: Materiau;
};

export default function EstimationMateriauField({
  materiau,
  children,
}: EstimationMateriauFieldProps & PropsWithChildren) {
  if (!materiau || materiauHasNoCost(materiau.attributes)) {
    return null;
  }

  return (
    <div key={materiau.id}>
      <hr className="h-[1px] p-0" />
      <div className={"flex flex-col justify-between gap-1 md:flex-row md:gap-6"}>
        <div className="relative mt-8 flex h-28 w-28 flex-none">
          <Image
            fill
            sizes="30vw md:5vw"
            src={getStrapiImageUrl(materiau.attributes.image, STRAPI_IMAGE_KEY_SIZE.small)}
            alt={materiau.attributes.titre}
            className={"rounded-2xl object-cover"}
            unoptimized
          />
        </div>
        <div className="mb-0 mt-8 grow text-dsfr-text-title-grey md:mb-8">
          <div className="mb-4 flex items-center gap-6">
            <div className="text-[1.375rem] font-bold">{materiau.attributes.titre}</div>
          </div>
          <ShowMoreRichText
            richText={materiau.attributes.description}
            className={clsx("text-sm", "[&>*:last-child]:m-0")}
          />
          <div className="text-sm text-dsfr-text-mention-grey">
            <div>{`Coût d'investissement : ${getLabelCoutFourniture(materiau.attributes)}`}</div>
            <div>{`Coût d'entretien : ${getLabelCoutEntretien(materiau.attributes)}`}</div>
          </div>
        </div>
        <div className={"flex flex-none flex-col bg-dsfr-contrast-grey p-6 md:w-60"}>{children}</div>
      </div>
      <hr className="mb-2 h-[1px] p-0" />
    </div>
  );
}
