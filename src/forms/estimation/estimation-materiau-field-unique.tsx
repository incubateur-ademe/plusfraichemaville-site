import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import Image from "next/image";
import { PropsWithChildren } from "react";
import CmsRichText from "@/src/components/common/CmsRichText";
import { FicheSolution } from "@/src/components/ficheSolution/type";
import { getLabelCoutEntretien, getLabelCoutFourniture } from "@/src/helpers/cout/cout-fiche-solution";
import { formatNumberWithSpaces } from "@/src/helpers/common";

type EstimationMateriauFieldUniqueProps = {
  ficheSolution: FicheSolution;
} & PropsWithChildren;

export const EstimationMateriauFieldUnique = ({ ficheSolution, children }: EstimationMateriauFieldUniqueProps) => {
  return (
    <div>
      <hr className="h-[1px] p-0" />

      <div className={"flex flex-col justify-between gap-1 md:flex-row md:gap-6"}>
        <div className="relative mt-8 flex h-28 w-28 flex-none">
          <Image
            fill
            sizes="30vw md:5vw"
            src={getStrapiImageUrl(ficheSolution.image_principale, STRAPI_IMAGE_KEY_SIZE.small)}
            alt={""}
            className={"rounded-2xl object-cover"}
          />
        </div>
        <div className="mb-0 mt-8 grow text-dsfr-text-title-grey md:mb-8">
          <CmsRichText label={ficheSolution.description_estimation ?? ""} className={"text-sm"} />
          <div className="text-sm text-dsfr-text-mention-grey">
            <div>{`Coût d'investissement : ${formatNumberWithSpaces(getLabelCoutFourniture(ficheSolution))}`}</div>
            <div>{`Coût d'entretien : ${formatNumberWithSpaces(getLabelCoutEntretien(ficheSolution))}`}</div>
          </div>
        </div>
        <div className={"flex flex-none flex-col bg-dsfr-contrast-grey p-6 md:w-60"}>{children}</div>
      </div>
      <hr className="mb-2 h-[1px] p-0" />
    </div>
  );
};
