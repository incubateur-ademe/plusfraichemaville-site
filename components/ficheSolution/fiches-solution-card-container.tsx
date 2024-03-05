"use client";

import FicheSolutionCardWithUserInfo from "./FicheSolutionCardWithUserInfo";
import { useParams } from "next/navigation";
import { useProjetsStore } from "@/stores/projets/provider";
import ButtonSaveFicheSolution from "./ButtonSaveFicheSolution";
import { ButtonSaveFicheSolutionInProjet } from "./button-save-fiche-solution-in-projet";
import { FicheSolutionResponse } from "./type";

export const FichesSolutionsCardsContainer = ({ fichesSolutions }: { fichesSolutions: FicheSolutionResponse[] }) => {
  const { projetId } = useParams();
  const projet = useProjetsStore((state) => state.getProjetById(+projetId));

  return (
    <div className="grow list-none p-0">
      <ul className="flex flex-wrap gap-6 justify-center md:justify-normal">
        {fichesSolutions.map((ficheSolution) => (
          <li key={ficheSolution.id} className="flex">
            <FicheSolutionCardWithUserInfo projectName={projet?.nom!} ficheSolution={ficheSolution}>
              {projetId ? (
                <ButtonSaveFicheSolutionInProjet ficheSolutionId={ficheSolution.id} />
              ) : (
                <ButtonSaveFicheSolution
                  ficheSolutionId={ficheSolution.id}
                  label={false}
                  projectName={projet?.nom ?? ""}
                  className={"flex justify-center items-center absolute top-2 right-2"}
                />
              )}
            </FicheSolutionCardWithUserInfo>
          </li>
        ))}
      </ul>
    </div>
  );
};
