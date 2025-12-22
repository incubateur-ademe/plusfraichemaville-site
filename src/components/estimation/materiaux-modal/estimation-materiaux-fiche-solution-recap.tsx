import { EstimationFicheSolution, EstimationMateriau } from "@/src/lib/prisma/prismaCustomTypes";
import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { useCallback } from "react";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { makeFicheSolutionCompleteUrlApi } from "@/src/components/ficheSolution/helpers";
import { getLabelCoutEntretienByQuantite, getLabelCoutFournitureByQuantite } from "@/src/helpers/cout/cout-materiau";
import { formatNumberWithSpaces } from "@/src/helpers/common";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { useEstimationFSGlobalPrice } from "@/src/hooks/use-estimation-fs-global-price";

type EstimationMateriauxFicheSolutionRecapProps = {
  ficheSolutionEstimation: EstimationFicheSolution;
  goToFicheSolutionStep: (_: number) => void;
};

export function EstimationMateriauxFicheSolutionRecap({
  ficheSolutionEstimation,
  goToFicheSolutionStep,
}: EstimationMateriauxFicheSolutionRecapProps) {
  const { data } = useImmutableSwrWithFetcher<FicheSolution[]>(
    makeFicheSolutionCompleteUrlApi(ficheSolutionEstimation.fiche_solution_id),
  );
  const { fournitureMin, fournitureMax, entretienMin, entretienMax } = useEstimationFSGlobalPrice([
    ficheSolutionEstimation,
  ]);

  const getEstimationMateriauByMateriauId = useCallback(
    (materiauId: number): EstimationMateriau | undefined =>
      ficheSolutionEstimation.estimation_materiaux?.find((estMat) => +estMat.materiau_id === +materiauId),
    [ficheSolutionEstimation.estimation_materiaux],
  );

  const shouldDisplayEstimationMateriau = (estMat?: EstimationMateriau) =>
    estMat &&
    (estMat.quantite > 0 || estMat.cout_entretien_override != null || estMat.cout_investissement_override != null);

  if (!data) {
    return null;
  }

  const ficheSolution = data[0];

  if (!ficheSolution || !ficheSolution.attributes.materiaux || ficheSolution.attributes.materiaux.data.length === 0) {
    return null;
  }

  return (
    <div className="text-dsfr-text-title-grey">
      <hr className="mb-4 h-[1px] p-0" />
      <div className={"mb-6 flex flex-row items-center justify-between gap-6"}>
        <h2 className="!mb-0 text-[1.375rem]">{ficheSolution.attributes.titre}</h2>
        <span
          onClick={() => goToFicheSolutionStep(ficheSolution.id)}
          className="fr-icon-edit-box-line cursor-pointer text-dsfr-text-label-blue-france"
          aria-hidden="true"
        ></span>
      </div>
      {ficheSolution.attributes.materiaux.data.map(
        (materiau) =>
          shouldDisplayEstimationMateriau(getEstimationMateriauByMateriauId(materiau.id)) && (
            <div key={materiau.id}>
              <div className={"my-2 flex basis-full flex-row items-center justify-between gap-6"}>
                <div className="flex flex-row items-center">
                  <div className="relative mr-6 flex h-16 w-16 flex-none">
                    <Image
                      fill
                      sizes="(max-width: 768px) 80vw, 20vw"
                      src={getStrapiImageUrl(materiau.attributes.image, STRAPI_IMAGE_KEY_SIZE.small)}
                      alt={materiau.attributes.titre}
                      className={"rounded-xl object-cover"}
                      unoptimized
                    />
                  </div>
                  <h3>{materiau.attributes.titre}</h3>
                </div>
                <div>
                  <div>
                    Inv.
                    <strong>
                      {getEstimationMateriauByMateriauId(materiau.id)?.cout_investissement_override == null
                        ? ` ${getLabelCoutFournitureByQuantite(
                            materiau.attributes,
                            getEstimationMateriauByMateriauId(materiau.id)?.quantite || 0,
                          )}`
                        : ` ${getEstimationMateriauByMateriauId(materiau.id)?.cout_investissement_override} €`}
                    </strong>
                  </div>
                  <div className="text-sm text-dsfr-text-mention-grey">
                    Ent.
                    <strong>
                      {getEstimationMateriauByMateriauId(materiau.id)?.cout_entretien_override == null
                        ? ` ${getLabelCoutEntretienByQuantite(
                            materiau.attributes,
                            getEstimationMateriauByMateriauId(materiau.id)?.quantite || 0,
                          )}`
                        : ` ${getEstimationMateriauByMateriauId(materiau.id)?.cout_entretien_override} € / an`}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          ),
      )}
      <div className="mb-2 mt-6 bg-dsfr-contrast-grey p-4">
        <div className="flex flex-row justify-between">
          <div className="font-bold">Total Investissement</div>
          <div>
            <strong>
              {`${formatNumberWithSpaces(fournitureMin)}
                   - ${formatNumberWithSpaces(fournitureMax)} € `}
            </strong>
            HT
          </div>
        </div>
        <div className="flex flex-row justify-between text-dsfr-text-mention-grey">
          <div className="font-bold">Total Entretien</div>
          <div className="text-sm">
            <strong>{`${formatNumberWithSpaces(entretienMin)} - ${formatNumberWithSpaces(entretienMax)} € `}</strong>
            HT / an
          </div>
        </div>
      </div>
    </div>
  );
}
