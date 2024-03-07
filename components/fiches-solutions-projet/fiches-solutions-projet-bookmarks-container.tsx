import { FicheSolutionSmallCardContainer } from "../ficheSolution/fiche-solution-small-card-container";
import FicheSolutionEstimationCard from "../ficheSolution/FicheSolutionEstimationCard";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import Button from "@codegouvfr/react-dsfr/Button";
import { ChangeEvent, useRef } from "react";
import { ProjetWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { updateFichesSolutionsProjetAction } from "@/actions/projets/update-fiches-solutions-projet-action";

export const FichesSolutionProjetBookmarksConatiner = ({
  projetsFichesSolutionsIds,
  updateStore,
  projetId,
  title,
  subtitle,
  bookmarksIds,
}: {
  projetNom: string;
  projetsFichesSolutionsIds: number[];
  updateStore: (_projet: ProjetWithCollectivite) => void;
  projetId?: number;
  bookmarksIds: number[];
  projetTypeEspace?: string;
  title: string;
  subtitle: string;
}) => {
  const addedFichesSolutionsIds = useRef<number[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    addedFichesSolutionsIds.current = addedFichesSolutionsIds.current.includes(value)
      ? addedFichesSolutionsIds.current.filter((id) => id !== value)
      : [...addedFichesSolutionsIds.current, value];
  };

  const update = async () => {
    console.log(addedFichesSolutionsIds);
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
      title={title}
      subtitle={subtitle}
      className="bg-dsfr-background-alt-blue-france rounded-xl mt-10"
    >
      <div className="flex flex-wrap gap-8 mb-8">
        {bookmarksIds?.map((ficheSolutionId) => (
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
