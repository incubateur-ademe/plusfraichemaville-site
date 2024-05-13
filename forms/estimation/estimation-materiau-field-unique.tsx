import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import Image from "next/image";
import { PropsWithChildren } from "react";
import CmsRichText from "@/components/common/CmsRichText";
import { FicheSolution } from "@/components/ficheSolution/type";
import { getLabelCoutEntretien, getLabelCoutFourniture } from "@/helpers/cout/cout-fiche-solution";

type EstimationMateriauFieldUniqueProps = {
  ficheSolution: FicheSolution;
} & PropsWithChildren;

export const EstimationMateriauFieldUnique = ({ ficheSolution, children }: EstimationMateriauFieldUniqueProps) => {
  return (
    <div>
      <hr className="p-0 h-[1px]" />

      <div className={"flex flex-col md:flex-row gap-1 md:gap-6 justify-between"}>
        <div className="w-28 h-28 relative flex flex-none mt-8">
          <Image
            fill
            sizes="30vw md:5vw"
            src={getStrapiImageUrl(ficheSolution.image_principale, STRAPI_IMAGE_KEY_SIZE.small)}
            alt={""}
            className={"object-cover rounded-2xl"}
          />
        </div>
        <div className="mb-0 md:mb-8 mt-8 text-dsfr-text-title-grey grow">
          <CmsRichText label={ficheSolution.description_estimation ?? ""} className={"text-sm"} />
          <div className="text-dsfr-text-mention-grey text-sm">
            <div>{`Coût d'investissement : ${getLabelCoutFourniture(ficheSolution)}`}</div>
            <div>{`Coût d'entretien : ${getLabelCoutEntretien(ficheSolution)}`}</div>
          </div>
        </div>
        <div className={"md:w-60 flex flex-col flex-none bg-dsfr-contrast-grey p-6"}>{children}</div>
      </div>
      <hr className="p-0 h-[1px] mb-2" />
    </div>
  );
};
