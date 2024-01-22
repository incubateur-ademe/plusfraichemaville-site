import React from "react";
import Image from "next/image";
import CmsRichText from "@/components/common/CmsRichText";
import { getUniteCoutMateriauFromCode } from "@/helpers/coutMateriau";
import entretienIcon from "../../public/images/fiches-solutions/entretien.svg";
import { GetValues } from "@/lib/strapi/types/types";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";

export default function FicheSolutionTabMateriaux({
  ficheSolution,
}: {
  ficheSolution: GetValues<"api::fiche-solution.fiche-solution">;
}) {
  return (
    <div>
      <div className="text-dsfr-text-title-grey font-bold text-[1.75rem] mb-8">Matériaux et coûts</div>
      {ficheSolution.materiaux?.data && ficheSolution.materiaux.data.length > 0 ? (
        <>
          <hr className="p-0 h-[1px]" />
          {ficheSolution.materiaux.data.map(({ attributes: mat }) => (
            <div key={mat.titre}>
              <div className={"flex flex-col md:flex-row gap-1 md:gap-6"}>
                <div className="w-28 h-28 relative hidden md:flex flex-none mt-8">
                  <Image
                    fill
                    src={getStrapiImageUrl(mat.image, STRAPI_IMAGE_KEY_SIZE.small)}
                    alt={mat.titre}
                    className={"object-cover rounded-2xl"}
                  />
                </div>
                <div className="mb-0 md:mb-8 mt-8 text-dsfr-text-title-grey">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="w-28 h-28 relative flex md:hidden flex-none">
                      <Image
                        fill
                        src={getStrapiImageUrl(mat.image, STRAPI_IMAGE_KEY_SIZE.small)}
                        alt={mat.titre}
                        className={"object-cover rounded-2xl"}
                      />
                    </div>
                    <div className="text-2xl font-bold">{mat.titre}</div>
                  </div>
                  <CmsRichText label={mat.description} className="text-sm" />
                </div>
                <div
                  className={
                    "md:w-60 flex flex-col flex-none bg-dsfr-background-alt-grey text-dsfr-text-mention-grey p-6"
                  }
                >
                  <div>
                    <b>{`${mat.cout_minimum_fourniture} - ${mat.cout_maximum_fourniture} € `}</b>HT /{" "}
                    {getUniteCoutMateriauFromCode(mat.cout_unite).unitLabel}
                  </div>
                  <div className="text-sm ">(fourniture et pose)</div>
                </div>
              </div>
              <hr className="p-0 h-[1px]" />
            </div>
          ))}
        </>
      ) : (
        <div className="text-dsfr-text-title-grey   mb-4">Auncun matériau n{"'"}a été renseigné pour cette fiche</div>
      )}
      {ficheSolution.cout_minimum_entretien && ficheSolution.cout_maximum_entretien && (
        <>
          <hr className="p-0 h-[1px] mt-16" />
          <div className={"flex flex-col md:flex-row gap-1 md:gap-6"}>
            <div className="w-28 h-28 relative hidden md:flex flex-none mt-8 mb-8">
              <Image fill src={entretienIcon} alt="Coût d'entretien" />
            </div>
            <div className="mb-0 md:mb-8 mt-8 text-dsfr-text-title-grey flex flex-col grow">
              <div className="flex items-center gap-6 mb-4">
                <div className="w-28 h-28 relative flex md:hidden flex-none">
                  <Image fill src={entretienIcon} alt="Coût d'entretien" />
                </div>
                <div className="text-2xl font-bold mb-2">{"Coût d'entretien"}</div>
              </div>
              {ficheSolution.cout_entretien_description && (
                <div className="text-sm flex grow">
                  <CmsRichText label={ficheSolution.cout_entretien_description} />
                </div>
              )}
            </div>
            <div
              className={
                "md:w-60 flex flex-col flex-none bg-dsfr-background-action-low-blue-france " +
                " text-dsfr-text-mention-grey p-6"
              }
            >
              <div>
                <b>{`${ficheSolution.cout_minimum_entretien} - 
                ${ficheSolution.cout_maximum_entretien} € `}</b>
                HT / {getUniteCoutMateriauFromCode(ficheSolution.cout_entretien_unite).unitLabel}{" "}
              </div>
              <div className="text-sm ">par an</div>
            </div>
          </div>
          <hr className="p-0 h-[1px]" />
        </>
      )}
    </div>
  );
}
