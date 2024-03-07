import { useUserStore } from "@/stores/user";
import { FicheSolutionSmallCardContainer } from "../ficheSolution/fiche-solution-small-card-container";
import FicheSolutionEstimationCard from "../ficheSolution/FicheSolutionEstimationCard";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import Button from "@codegouvfr/react-dsfr/Button";
import { ChangeEvent, useRef } from "react";
import { ProjetWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { updateFichesSolutionsProjetAction } from "@/actions/projets/update-fiches-solutions-projet-action";

export const FichesSolutionProjetBookmarksAll = ({
  projetNom,
  projetsFichesSolutionsIds,
  updateStore,
  projetId,
}: {
  projetNom: string;
  projetsFichesSolutionsIds: number[];
  updateStore: (_projet: ProjetWithCollectivite) => void;
  projetId?: number;
}) => {
  const addedFichesSolutionsIds = useRef<number[]>([]);

  const bookmarkedFichesSolutionsIds = useUserStore((state) => state.bookmarkedFichesSolutions);
  const bookmarksIds = bookmarkedFichesSolutionsIds.map((bookmark) => bookmark.ficheSolutionIds).flat();
  const sanitizedBookmarksIds = bookmarksIds.filter((bookmarkId) => !projetsFichesSolutionsIds.includes(bookmarkId));

  if (!bookmarksIds) {
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
      title="Mes solutions mises en favoris"
      subtitle={`Cocher les solutions que vous souhaitez ajouter au projet ${projetNom}`}
      className="bg-dsfr-background-alt-blue-france rounded-xl mt-10"
    >
      <div className="flex flex-wrap gap-8 mb-8">
        {sanitizedBookmarksIds?.map((ficheSolutionId) => (
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
