import { Select } from "@codegouvfr/react-dsfr/Select";
import { useProjetsStore } from "@/src/stores/projets/provider";
import Button from "@codegouvfr/react-dsfr/Button";
import { ChangeEvent, useState } from "react";

import { GenericSaveModalCommonProps } from "./generic-save-modal";
import { Hidden } from "../hidden";
import { updateFichesProjetAction } from "@/src/actions/projets/update-fiches-projet-action";
import { notifications } from "@/src/components/common/notifications";
import { TypeUpdate } from "@/src/helpers/common";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useRouter } from "next/navigation";
import { isEmpty } from "@/src/helpers/listUtils";

export const ModalSaveModalAuthenticatedOutsideProjet = ({
  modal,
  type,
  id: ficheId,
}: GenericSaveModalCommonProps & { id: number }) => {
  const [selectedProjetId, setSelectedProjetId] = useState(-1);
  const [enableTdbButton, setEnableTdbButton] = useState(false);
  const projets = useProjetsStore((state) => state.projets);
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const router = useRouter();

  const validate = async () => {
    if (selectedProjetId > 0) {
      const update = await updateFichesProjetAction({
        projetId: selectedProjetId,
        ficheId: +ficheId,
        typeFiche: type,
        typeUpdate: TypeUpdate.add,
      });
      if (update.projet) {
        addOrUpdateProjet(update.projet);
      }
      notifications(update.type, update.message);
      setEnableTdbButton(true);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProjetId(+event.target.value);
  };

  return (
    <modal.Component title="Sélection du projet" size="large">
      {isEmpty(projets) ? (
        <>
          <div className="mb-12">Vous devez créer un projet pour pouvoir sauvegarder des solutions.</div>
          <Button
            priority="primary"
            className="mb-4 mr-4 rounded-3xl md:mb-0"
            onClick={() => {
              modal.close();
              router.push(PFMV_ROUTES.CREATE_PROJET);
            }}
          >
            Créer un projet
          </Button>
          <Button onClick={modal.close} priority="secondary" className="rounded-3xl">
            Continuer ma lecture
          </Button>
        </>
      ) : (
        <>
          <span>Dans quel projet souhaitez-vous rajouter cette solution ?</span>
          <div className="my-10 flex flex-col gap-0 md:flex-row md:items-center md:gap-5">
            <Select
              label={<Hidden accessible>Selectionnez un projet</Hidden>}
              className="w-96"
              nativeSelectProps={{
                onChange: handleChange,
                value: selectedProjetId,
              }}
            >
              <option value={0}>Selectionnez un projet</option>
              {projets.map((projet, index) => {
                return (
                  <option value={projet.id} key={index}>
                    {projet.nom}
                  </option>
                );
              })}
            </Select>
            <Button
              className="!mb-3 !h-fit !min-h-fit rounded-3xl !text-sm"
              disabled={selectedProjetId < 1}
              onClick={validate}
            >
              Ajouter au projet
            </Button>
          </div>
          <Button
            priority="primary"
            className="mb-4 mr-4 rounded-3xl !text-sm md:mb-0"
            onClick={modal.close}
            disabled={selectedProjetId < 1 || !enableTdbButton}
          >
            Continuer ma lecture
          </Button>
          <Button
            onClick={() => {
              modal.close();
              router.push(PFMV_ROUTES.TABLEAU_DE_BORD(selectedProjetId));
            }}
            disabled={selectedProjetId < 1 || !enableTdbButton}
            priority="secondary"
            className="rounded-3xl !text-sm"
          >
            Aller au tableau de bord du projet
          </Button>
        </>
      )}
    </modal.Component>
  );
};
