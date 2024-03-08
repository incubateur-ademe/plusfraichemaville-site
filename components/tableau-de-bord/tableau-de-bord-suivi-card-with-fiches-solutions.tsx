"use client";

import { getFicheSolutionById } from "@/lib/strapi/queries/fichesSolutionsQueries";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { useProjetsStore } from "@/stores/projets/provider";
import clsx from "clsx";
import Image from "next/image";
import { useParams } from "next/navigation";
import useSWR from "swr";

export const TableauDeBordSuiviWithFichesSolutions = () => {
  const { projetId } = useParams();
  const getProjetById = useProjetsStore((state) => state.getProjetById);
  const selectedFichesSolutions = getProjetById(+projetId)?.fiches_solutions_id;

  if (!selectedFichesSolutions) {
    return null;
  }

  return (
    <div className="flex">
      {selectedFichesSolutions.slice(0, 5).map((ficheSolutionid, index) => {
        return <TableauDeBordSuiviWithFichesSolutionsImage ficheSolutionId={ficheSolutionid.toString()} key={index} />;
      })}
      {selectedFichesSolutions.length > 5 && (
        <div
          className={clsx(
            "w-10 h-10 rounded-[50%] overflow-hidden mr-2 shrink-0",
            "flex justify-center items-center bg-dsfr-border-default-blue-france text-white",
          )}
        >
          +{selectedFichesSolutions.length - 5}
        </div>
      )}
    </div>
  );
};

export const TableauDeBordSuiviWithFichesSolutionsImage = ({ ficheSolutionId }: { ficheSolutionId: string }) => {
  const { data } = useSWR(ficheSolutionId, () => getFicheSolutionById(ficheSolutionId.toString()));

  return (
    <div className="w-10 h-10 rounded-[50%] overflow-hidden mr-2 shrink-0">
      <Image
        className="w-10 h-10"
        alt="image"
        width={48}
        height={48}
        sizes="3vw"
        src={getStrapiImageUrl(data?.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.large)}
      />
    </div>
  );
};
