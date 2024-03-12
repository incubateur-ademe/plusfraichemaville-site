import { FicheSolutionSmallCardContainer } from "../ficheSolution/fiche-solution-small-card-container";

import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import Button from "@codegouvfr/react-dsfr/Button";
import { ChangeEvent, useRef } from "react";
import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { updateFichesSolutionsProjetAction } from "@/actions/projets/update-fiches-solutions-projet-action";
import { FicheSolutionSmallCard } from "../ficheSolution/fiche-solution-small-card";
import { notifications } from "../common/notifications";

export const FichesSolutionProjetBookmarksContainer = ({
  projetsFichesSolutionsIds,
  updateStore,
  projetId,
  title,
  subtitle,
  bookmarksIds,
}: {
  projetNom: string;
  projetsFichesSolutionsIds: number[];
  updateStore: (_projet: ProjetWithRelations) => void;
  projetId?: number;
  bookmarksIds: number[];
  projetTypeEspace?: string;
  title: string;
  subtitle: string;
}) => {
  const addedFichesSolutionsIds = useRef<number[]>([]);
  const checkbox = useRef<HTMLInputElement[] | null>([]);

  const updateAddedFichesSolutionsIds = (value: number) =>
    (addedFichesSolutionsIds.current = addedFichesSolutionsIds.current.includes(value)
      ? addedFichesSolutionsIds.current.filter((id) => id !== value)
      : [...addedFichesSolutionsIds.current, value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    updateAddedFichesSolutionsIds(value);
  };

  const update = async () => {
    if (projetId && addedFichesSolutionsIds.current.length > 0) {
      const merged = Array.from(new Set([...addedFichesSolutionsIds.current, ...projetsFichesSolutionsIds]));
      const updatedProjet = await updateFichesSolutionsProjetAction(projetId, merged);
      if (updatedProjet.projet) {
        updateStore(updatedProjet.projet);
        notifications(updatedProjet.type, updatedProjet.message);
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
        {bookmarksIds?.map((ficheSolutionId, index) => (
          <FicheSolutionSmallCard
            ficheSolutionId={ficheSolutionId}
            key={index}
            onClick={() => {
              if (checkbox.current) {
                checkbox.current[index].checked = !checkbox.current[index].checked;
                updateAddedFichesSolutionsIds(+ficheSolutionId);
              }
            }}
          >
            <Checkbox
              className="mx-auto"
              options={[
                {
                  label: null,
                  nativeInputProps: {
                    value: ficheSolutionId.toString(),
                    ref: (element) => {
                      if (checkbox.current && element) {
                        checkbox.current[index] = element;
                      }
                    },
                    onChange: handleChange,
                  },
                },
              ]}
            />
          </FicheSolutionSmallCard>
        ))}
      </div>
      <Button className="rounded-3xl" onClick={update}>
        Ajouter
      </Button>
    </FicheSolutionSmallCardContainer>
  );
};
