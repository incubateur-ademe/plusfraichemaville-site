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
import OtherUsagesMateriau from "@/src/components/estimation/materiaux-modal/other-usages-materiau";

type EstimationMateriauxFicheSolutionRecapProps = {
  currentFicheSolutionEstimation: EstimationFicheSolution;
  allEstimationsFicheSolution: EstimationFicheSolution[];
  goToFicheSolutionStep: (_: string) => void;
};

export function EstimationMateriauxFicheSolutionRecap({
  currentFicheSolutionEstimation,
  goToFicheSolutionStep,
  allEstimationsFicheSolution,
}: EstimationMateriauxFicheSolutionRecapProps) {
  const { data } = useImmutableSwrWithFetcher<FicheSolution[]>(
    makeFicheSolutionCompleteUrlApi([currentFicheSolutionEstimation.fiche_solution_id]),
  );
  const { fournitureMin, fournitureMax, entretienMin, entretienMax } = useEstimationFSGlobalPrice([
    currentFicheSolutionEstimation,
  ]);

  const getEstimationMateriauByMateriauId = useCallback(
    (materiauId: string): EstimationMateriau | undefined =>
      currentFicheSolutionEstimation.estimation_materiaux?.find((estMat) => estMat.materiau_id === materiauId),
    [currentFicheSolutionEstimation.estimation_materiaux],
  );

  const shouldDisplayEstimationMateriau = (estMat?: EstimationMateriau) =>
    estMat &&
    (estMat.quantite > 0 || estMat.cout_entretien_override != null || estMat.cout_investissement_override != null);

  if (!data) {
    return null;
  }

  const ficheSolution = data[0];

  if (!ficheSolution || !ficheSolution.materiaux || ficheSolution.materiaux.length === 0) {
    return null;
  }

  return (
    <div className="text-dsfr-text-title-grey">
      <hr className="mb-4 h-[1px] p-0" />
      <div className={"mb-6 flex flex-row items-center justify-between gap-6"}>
        <h2 className="!mb-0 text-[1.375rem]">{ficheSolution.titre}</h2>
        <span
          onClick={() => goToFicheSolutionStep(ficheSolution.documentId)}
          className="fr-icon-edit-box-line cursor-pointer text-dsfr-text-label-blue-france"
          aria-hidden="true"
        ></span>
      </div>
      {ficheSolution.materiaux.map(
        (materiau) =>
          shouldDisplayEstimationMateriau(getEstimationMateriauByMateriauId(materiau.documentId)) && (
            <div key={materiau.documentId}>
              <div className={"my-2 flex basis-full flex-row items-center justify-between gap-6"}>
                <div className="flex flex-row items-center">
                  <div className="relative mr-6 flex h-16 w-16 flex-none">
                    <Image
                      fill
                      sizes="(max-width: 768px) 80vw, 20vw"
                      src={getStrapiImageUrl(materiau.image, STRAPI_IMAGE_KEY_SIZE.small)}
                      alt={materiau.titre}
                      className={"rounded-xl object-cover"}
                      unoptimized
                    />
                  </div>
                  <section>
                    <h3 className="mb-0">{materiau.titre}</h3>
                    <OtherUsagesMateriau
                      materiauId={materiau.documentId}
                      ficheSolutionId={ficheSolution.documentId}
                      materiau={materiau}
                      allEstimationsFichesSolutions={allEstimationsFicheSolution}
                      showQuantity={false}
                    />
                  </section>
                </div>
                <div>
                  <div>
                    Inv.
                    <strong>
                      {getEstimationMateriauByMateriauId(materiau.documentId)?.cout_investissement_override == null
                        ? ` ${getLabelCoutFournitureByQuantite(
                            materiau,
                            getEstimationMateriauByMateriauId(materiau.documentId)?.quantite || 0,
                          )}`
                        : ` ${getEstimationMateriauByMateriauId(materiau.documentId)?.cout_investissement_override} €`}
                    </strong>
                  </div>
                  <div className="text-sm text-dsfr-text-mention-grey">
                    Ent.
                    <strong>
                      {getEstimationMateriauByMateriauId(materiau.documentId)?.cout_entretien_override == null
                        ? ` ${getLabelCoutEntretienByQuantite(
                            materiau,
                            getEstimationMateriauByMateriauId(materiau.documentId)?.quantite || 0,
                          )}`
                        : ` ${getEstimationMateriauByMateriauId(materiau.documentId)?.cout_entretien_override} € / an`}
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
