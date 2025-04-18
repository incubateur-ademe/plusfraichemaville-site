"use client";

import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { useProjetsStore } from "@/src/stores/projets/provider";
import clsx from "clsx";
import Image from "next/image";
import { TypeFiche } from "@/src/helpers/common";
import { useImmutableSwrWithFetcher } from "@/src/hooks/use-swr-with-fetcher";
import { makeFicheSolutionCompleteUrlApi } from "../ficheSolution/helpers";
import { FicheSolution } from "@/src/lib/strapi/types/api/fiche-solution";
import { getProjetFichesIdsByType } from "@/src/components/common/generic-save-fiche/helpers";

const IMAGE_SLICE_INDEX = 5;

export const TableauDeBordFichesSolutionImages = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const selectedFichesSolutionsIds = getProjetFichesIdsByType({ projet, typeFiche: TypeFiche.solution });

  return <TableauDeBordSFicheImages selectedFichesIds={selectedFichesSolutionsIds} />;
};

const TableauDeBordSFicheImages = ({ selectedFichesIds }: { selectedFichesIds?: number[] }) => {
  if (!selectedFichesIds) {
    return null;
  }

  return (
    <div className="flex">
      {selectedFichesIds.slice(0, IMAGE_SLICE_INDEX).map((ficheId, index) => (
        <TableauDeBordFicheSolutionImage ficheSolutionId={ficheId.toString()} key={index} />
      ))}
      {selectedFichesIds.length > IMAGE_SLICE_INDEX && (
        <div
          className={clsx(
            "mr-2 h-10 w-10 shrink-0 overflow-hidden rounded-[50%]",
            "flex items-center justify-center bg-dsfr-border-default-blue-france text-white",
          )}
        >
          +{selectedFichesIds.length - IMAGE_SLICE_INDEX}
        </div>
      )}
    </div>
  );
};

const TableauDeBordFicheSolutionImage = ({ ficheSolutionId }: { ficheSolutionId: string }) => {
  const { data } = useImmutableSwrWithFetcher<FicheSolution[]>(makeFicheSolutionCompleteUrlApi(ficheSolutionId));
  const ficheSolution = data && data[0];
  return (
    <div className="mr-2 h-10 w-10 shrink-0 overflow-hidden rounded-[50%]">
      <Image
        className="h-10 w-10 object-cover"
        alt="image"
        width={48}
        height={48}
        sizes="30vw md:5vw"
        src={getStrapiImageUrl(ficheSolution?.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.small)}
        unoptimized
      />
    </div>
  );
};
