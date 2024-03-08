import React from "react";
import Image from "next/image";
import CmsRichText from "@/components/common/CmsRichText";
import { getLabelCoutEntretien, getLabelCoutFourniture, getUniteCoutMateriauFromCode } from "@/helpers/coutMateriau";
import { GetValues } from "@/lib/strapi/types/types";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";

export default function EstimationMateriauForm({
  ficheSolution,
}: {
  ficheSolution: GetValues<"api::fiche-solution.fiche-solution">;
}) {
  return (
    <div>
      {ficheSolution.materiaux?.data && ficheSolution.materiaux.data.length > 0 ? (
        <>
          {ficheSolution.materiaux.data.map(({ attributes: mat }) => (
            <div key={mat.titre}>
              <hr className="p-0 h-[1px]" />
              <div className={"flex flex-col md:flex-row gap-1 md:gap-6 justify-between"}>
                <div className="w-28 h-28 relative flex flex-none mt-8">
                  <Image
                    fill
                    src={getStrapiImageUrl(mat.image, STRAPI_IMAGE_KEY_SIZE.small)}
                    alt={mat.titre}
                    className={"object-cover rounded-2xl"}
                  />
                </div>
                <div className="mb-0 md:mb-8 mt-8 text-dsfr-text-title-grey grow">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="text-2xl font-bold">{mat.titre}</div>
                  </div>
                  <CmsRichText label={mat.description} className="text-sm" />
                  <div className="text-dsfr-text-mention-grey text-sm">
                    <div>{`Coût d'investissement : ${getLabelCoutFourniture(mat)}`}</div>
                    <div>{`Coût d'entretien : ${getLabelCoutEntretien(mat)}`}</div>
                  </div>
                </div>
                <div className={"md:w-60 flex flex-col flex-none bg-dsfr-background-alt-grey p-6"}>
                  <div>{getUniteCoutMateriauFromCode(mat.cout_unite).estimationLabel}</div>
                </div>
              </div>
              <hr className="p-0 h-[1px] mb-4" />
            </div>
          ))}
        </>
      ) : (
        <div className="text-dsfr-text-title-grey mb-4">Auncun matériau n{"'"}a été renseigné pour cette fiche</div>
      )}
    </div>
  );
}
