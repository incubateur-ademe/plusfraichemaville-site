"use client";

import { getFicheSolutionById } from "@/lib/strapi/queries/fichesSolutionsQueries";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { useProjetsStore } from "@/stores/projets/provider";
import clsx from "clsx";
import Image from "next/image";
import useSWRImmutable from "swr/immutable";

const IMAGE_SLICE_INDEX = 5;

export const TableauDeBordSuiviWithImages = () => {
  const projet = useProjetsStore((state) => state.getCurrentProjet());
  const selectedFichesSolutions = projet?.fiches_solutions_id;

  if (!selectedFichesSolutions) {
    return null;
  }

  return (
    <div className="flex">
      {selectedFichesSolutions.slice(0, IMAGE_SLICE_INDEX).map((ficheSolutionid, index) => {
        return <TableauDeBordSuiviWithFichesSolutionsImage ficheSolutionId={ficheSolutionid.toString()} key={index} />;
      })}
      {selectedFichesSolutions.length > IMAGE_SLICE_INDEX && (
        <div
          className={clsx(
            "w-10 h-10 rounded-[50%] overflow-hidden mr-2 shrink-0",
            "flex justify-center items-center bg-dsfr-border-default-blue-france text-white",
          )}
        >
          +{selectedFichesSolutions.length - IMAGE_SLICE_INDEX}
        </div>
      )}
    </div>
  );
};

export const TableauDeBordSuiviWithFichesSolutionsImage = ({ ficheSolutionId }: { ficheSolutionId: string }) => {
  const { data } = useSWRImmutable(`ficheSolution-${ficheSolutionId}`, () =>
    getFicheSolutionById(ficheSolutionId.toString()),
  );

  return (
    <div className="w-10 h-10 rounded-[50%] overflow-hidden mr-2 shrink-0">
      <Image
        className="w-10 h-10"
        alt="image"
        width={48}
        height={48}
        sizes="3vw"
        src={getStrapiImageUrl(data?.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.small)}
      />
    </div>
  );
};
