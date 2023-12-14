import { FicheSolution } from "@/lib/directus/directusModels";
import React from "react";
import Image from "next/image";
import CmsRichText from "@/components/common/CmsRichText";
import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";

export default function FicheSolutionTabMateriaux({ ficheSolution }: { ficheSolution: FicheSolution }) {
  return (
    <div>
      <div className="text-dsfr-text-little-grey font-bold text-[1.75rem] mb-8">Matériaux et coûts</div>
      {ficheSolution.materiaux.length > 0 ? (
        <>
          <hr className="p-0 h-[1px]" />
          {ficheSolution.materiaux.map(({ materiau_id: mat }) => (
            <div>
              <div key={mat.id} className={"flex flex-row gap-6"}>
                <div className="w-28 h-28 relative flex flex-none mt-8">
                  <Image
                    fill
                    src={getDirectusImageUrl(mat.image, DIRECTUS_IMAGE_KEY_SIZE.ficheSolutionCard)}
                    alt={mat.titre}
                    className={"object-cover rounded-2xl"}
                  />
                </div>
                <div className="mb-8 mt-8">
                  <div className="text-2xl font-bold text-dsfr-text-little-grey mb-2">{mat.titre}</div>
                  <CmsRichText label={mat.description} className="text-sm text-dsfr-text-little-grey" />
                </div>
                <div className="w-56 flex flex-none bg-dsfr-background-alt-grey m-0 p-0"></div>
              </div>
              <hr className="p-0 h-[1px]" />
            </div>
          ))}
        </>
      ) : (
        <div className="text-dsfr-text-little-grey   mb-4">Auncun matériau n{"'"}a été renseigné pour cette fiche</div>
      )}
    </div>
  );
}
