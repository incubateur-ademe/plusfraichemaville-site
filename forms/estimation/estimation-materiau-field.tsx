import { MateriauResponse } from "@/components/ficheSolution/type";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";

import { getLabelCoutEntretien, getLabelCoutFourniture } from "@/helpers/coutMateriau";
import { ShowMoreRichText } from "@/components/common/show-more-rich-text";
import clsx from "clsx";

type EstimationMateriauFieldProps = {
  materiau?: MateriauResponse;
};

export default function EstimationMateriauField({
  materiau,
  children,
}: EstimationMateriauFieldProps & PropsWithChildren) {
  if (!materiau) {
    return null;
  }
  return (
    <div key={materiau.id}>
      <hr className="p-0 h-[1px]" />
      <div className={"flex flex-col md:flex-row gap-1 md:gap-6 justify-between"}>
        <div className="w-28 h-28 relative flex flex-none mt-8">
          <Image
            fill
            src={getStrapiImageUrl(materiau.attributes.image, STRAPI_IMAGE_KEY_SIZE.small)}
            alt={materiau.attributes.titre}
            className={"object-cover rounded-2xl"}
          />
        </div>
        <div className="mb-0 md:mb-8 mt-8 text-dsfr-text-title-grey grow">
          <div className="flex items-center gap-6 mb-4">
            <div className="text-[1.375rem] font-bold">{materiau.attributes.titre}</div>
          </div>
          <ShowMoreRichText
            richText={materiau.attributes.description}
            lines={4}
            className={clsx("text-sm", "[&>*:last-child]:m-0")}
          />
          <div className="text-dsfr-text-mention-grey text-sm">
            <div>{`Coût d'investissement : ${getLabelCoutFourniture(materiau.attributes)}`}</div>
            <div>{`Coût d'entretien : ${getLabelCoutEntretien(materiau.attributes)}`}</div>
          </div>
        </div>
        <div className={"md:w-60 flex flex-col flex-none bg-dsfr-contrast-grey p-6"}>{children}</div>
      </div>
      <hr className="p-0 h-[1px] mb-2" />
    </div>
  );
}
