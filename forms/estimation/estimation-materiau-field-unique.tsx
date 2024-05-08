import { ShowMoreRichText } from "@/components/common/show-more-rich-text";
import { STRAPI_IMAGE_KEY_SIZE, getStrapiImageUrl } from "@/lib/strapi/strapiClient";
import { APIResponse } from "@/lib/strapi/types/types";
import clsx from "clsx";
import Image from "next/image";
import { PropsWithChildren } from "react";

type EstimationMateriauFieldUniqueProps = {
  description?: string;
  image?: APIResponse<"plugin::upload.file"> | null;
} & PropsWithChildren;

export const EstimationMateriauFieldUnique = ({ image, description, children }: EstimationMateriauFieldUniqueProps) => {
  return (
    <div>
      <hr className="p-0 h-[1px]" />

      <div className={"flex flex-col md:flex-row gap-1 md:gap-6 justify-between"}>
        <div className="w-28 h-28 relative flex flex-none mt-8">
          <Image
            fill
            sizes="30vw md:5vw"
            src={getStrapiImageUrl(image, STRAPI_IMAGE_KEY_SIZE.small)}
            alt={""}
            className={"object-cover rounded-2xl"}
          />
        </div>
        <div className="mb-0 md:mb-8 mt-8 text-dsfr-text-title-grey grow">
          <ShowMoreRichText richText={description ?? ""} className={clsx("text-sm", "[&>*:last-child]:m-0")} />
        </div>

        <div className={"md:w-60 flex flex-col flex-none bg-dsfr-contrast-grey p-6"}>{children}</div>
      </div>
      <hr className="p-0 h-[1px] mb-2" />
    </div>
  );
};
