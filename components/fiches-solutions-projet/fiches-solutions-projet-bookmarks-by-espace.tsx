import { useUserStore } from "@/stores/user";
import { FicheSolutionSmallCardContainer } from "../ficheSolution/fiche-solution-small-card-container";
import FicheSolutionEstimationCard from "../ficheSolution/FicheSolutionEstimationCard";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import Button from "@codegouvfr/react-dsfr/Button";
import { ProjetWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { ChangeEvent, useRef } from "react";
import { updateFichesSolutionsProjetAction } from "@/actions/projets/update-fiches-solutions-projet-action";
const codeToLabelMap: { [code: string]: string } = {
  rondpoint: "Rond point",
  batiment: "Bâtiment",
  parking: "Parking",
  rue: "Rue",
  place: "Place",
  ecole: "Cour d'école",
  parc: "Espaces verts",
};

const getLabelFromCode = (code: string): string | undefined => {
  return codeToLabelMap[code];
};

export const FichesSolutionProjetBookmarksByEspace = ({
  projetNom,
  projetTypeEspace,
  projetsFichesSolutionsIds,
  updateStore,
  projetId,
}: {
  projetNom: string;
  projetTypeEspace: string;
  projetsFichesSolutionsIds: number[];
  updateStore: (_projet: ProjetWithCollectivite) => void;
  projetId?: number;
}) => {
  const addedFichesSolutionsIds = useRef<number[]>([]);

  const userFichesSolutions = useUserStore((state) => state.bookmarkedFichesSolutions);
  const label = getLabelFromCode(projetTypeEspace ?? "");
  const matchedFichesSolutions = userFichesSolutions.find((fiche) => fiche.projectName === label);
  const sanitizedFichesSolutions = matchedFichesSolutions?.ficheSolutionIds.filter(
    (ficheSolutionId) => !projetsFichesSolutionsIds.includes(ficheSolutionId),
  );

  if (!matchedFichesSolutions) {
    return null;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    addedFichesSolutionsIds.current = addedFichesSolutionsIds.current.includes(value)
      ? addedFichesSolutionsIds.current.filter((id) => id !== value)
      : [...addedFichesSolutionsIds.current, value];
  };

  const update = async () => {
    if (projetId && addedFichesSolutionsIds.current.length > 0) {
      const merged = Array.from(new Set([...addedFichesSolutionsIds.current, ...projetsFichesSolutionsIds]));
      const updatedProjet = await updateFichesSolutionsProjetAction(projetId, merged);
      if (updatedProjet.projet) {
        updateStore(updatedProjet.projet);
      }
    }
  };

  return (
    <FicheSolutionSmallCardContainer
      title={`Ma sélection pour ${matchedFichesSolutions?.projectName}`}
      subtitle={`Cocher les solutions que vous souhaitez ajouter au projet ${projetNom}`}
      className="bg-dsfr-background-alt-blue-france rounded-xl mt-20"
    >
      <div className="flex flex-wrap gap-8 mb-8">
        {sanitizedFichesSolutions?.map((ficheSolutionId) => (
          <FicheSolutionEstimationCard ficheSolutionId={ficheSolutionId} key={ficheSolutionId}>
            <Checkbox
              className="mx-auto"
              options={[
                {
                  label: null,
                  nativeInputProps: {
                    value: ficheSolutionId.toString(),
                    onChange: handleChange,
                  },
                },
              ]}
            />
          </FicheSolutionEstimationCard>
        ))}
      </div>
      <Button className="rounded-3xl" onClick={update}>
        Ajouter
      </Button>
    </FicheSolutionSmallCardContainer>
  );
};
