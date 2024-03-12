import { EstimationMateriauxFicheSolution } from "@/lib/prisma/prismaCustomTypes";
import { getFicheSolutionById } from "@/lib/strapi/queries/fichesSolutionsQueries";
import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { useCallback } from "react";
import { getLabelCoutEntretienByQuantite, getLabelCoutFournitureByQuantite } from "@/helpers/coutMateriau";
import useSWRImmutable from "swr/immutable";

type EstimationMateriauxFicheSolutionRecapProps = {
  ficheSolutionEstimation: EstimationMateriauxFicheSolution;
  goToFicheSolutionStep: (_: number) => void;
};

export function EstimationMateriauxFicheSolutionRecap({
  ficheSolutionEstimation,
  goToFicheSolutionStep,
}: EstimationMateriauxFicheSolutionRecapProps) {
  const { data: ficheSolution } = useSWRImmutable(`ficheSolution-${ficheSolutionEstimation.ficheSolutionId}`, () =>
    getFicheSolutionById(`${ficheSolutionEstimation.ficheSolutionId}`),
  );

  const getQuantiteByMateriauId = useCallback(
    (materiauId: number): number =>
      ficheSolutionEstimation.estimationMateriaux?.find((estMat) => +estMat.materiauId === +materiauId)?.quantite || 0,
    [ficheSolutionEstimation.estimationMateriaux],
  );
  if (!ficheSolution || !ficheSolution.attributes.materiaux || ficheSolution.attributes.materiaux.data.length === 0) {
    return null;
  }

  return (
    <div className="text-dsfr-text-title-grey">
      <hr className="p-0 h-[1px] mb-4" />
      <div className={"flex flex-row gap-6 justify-between items-center my-2 basis-full"}>
        <div className="text-[1.375rem] mb-6 font-bold">{ficheSolution.attributes.titre}</div>
        <span
          onClick={() => goToFicheSolutionStep(ficheSolution.id)}
          className="fr-icon-edit-box-fill fr-icon--lg dsfr-text-label-blue-france cursor-pointer"
          aria-hidden="true"
        ></span>
      </div>
      {ficheSolution.attributes.materiaux.data.map((materiau) => (
        <div key={materiau.id}>
          <div className={"flex flex-row gap-6 justify-between items-center my-2 basis-full"}>
            <div className="flex flex-row items-center">
              <div className="w-16 h-16 relative flex flex-none mr-6">
                <Image
                  fill
                  src={getStrapiImageUrl(materiau.attributes.image, STRAPI_IMAGE_KEY_SIZE.small)}
                  alt={materiau.attributes.titre}
                  className={"object-cover rounded-xl"}
                />
              </div>
              <div>{materiau.attributes.titre}</div>
            </div>
            <div>
              <div className="">
                Inv.
                <strong>{` ${getLabelCoutFournitureByQuantite(
                  materiau.attributes,
                  getQuantiteByMateriauId(materiau.id),
                )}`}</strong>
              </div>
              <div className="text-dsfr-text-mention-grey text-sm">
                Ent.
                <strong>{` ${getLabelCoutEntretienByQuantite(
                  materiau.attributes,
                  getQuantiteByMateriauId(materiau.id),
                )}`}</strong>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="bg-dsfr-contrast-grey p-4 mb-2 mt-6">
        <div className="flex flex-row justify-between">
          <div className="font-bold">Total Investissement</div>
          <div>
            <strong>
              {`${ficheSolutionEstimation.coutMinInvestissement}
                   - ${ficheSolutionEstimation.coutMaxInvestissement} € `}
            </strong>
            HT
          </div>
        </div>
        <div className="flex flex-row justify-between text-dsfr-text-mention-grey">
          <div className="font-bold">Total Entretien</div>
          <div className="text-sm">
            <strong>
              {`${ficheSolutionEstimation.coutMinEntretien} - ${ficheSolutionEstimation.coutMaxEntretien} € `}
            </strong>
            HT / an
          </div>
        </div>
      </div>
      <hr className="p-0 h-[1px] mb-2" />
    </div>
  );
}
