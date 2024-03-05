"use client";

import { useProjetsStore } from "@/stores/projets/provider";
import { useParams } from "next/navigation";

export const TableauDeBordSuiviWithFichesSolutions = () => {
  const { projetId } = useParams();
  const getProjetById = useProjetsStore((state) => state.getProjetById);
  const selectedFichesSolutions = getProjetById(+projetId)?.fiches_solutions_id;

  if (!selectedFichesSolutions) {
    return null;
  }

  return (
    <div className="absolute bottom-0 left-0 w-10 h-10 rounded-[50%] overflow-hidden">
      {/* {selectedFIchesSolutions.map((solution, index) => {
        return (
          <Image
            className="w-10 h-10"
            alt="image"
            width={48}
            height={48}
            src={getStrapiImageUrl(solution.image_principale, STRAPI_IMAGE_KEY_SIZE.large)}
            key={index}
          />
        );
      })} */}
    </div>
  );
};
