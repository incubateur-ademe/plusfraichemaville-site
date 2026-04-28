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

export const ModalSaveFinancementAuthenticatedOutsideProjet = ({
  modal,
  type,
  id: ficheId,
}: GenericSaveModalCommonProps & { id: number }) => {
  const [selectedProjetId, setSelectedProjetId] = useState(-1);
  const projets = useProjetsStore((state) => state.projets);
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = async () => {
    if (selectedProjetId > 0) {
      setIsSubmitting(true);
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
      setIsSubmitting(false);
      modal.close();
      router.push(PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT_SELECTIONNER_AIDES(selectedProjetId));
    }
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProjetId(+event.target.value);
  };

  return (
    <modal.Component title="Sélection du projet" size="large">
      {isEmpty(projets) ? (
        <>
          <div className="mb-12">Vous devez créer un projet pour découvrir les aides mobilisables.</div>
          <Button
            priority="primary"
            className="mb-4 mr-4 rounded-3xl md:mb-0"
            onClick={() => {
              modal.close();
              router.push(
                PFMV_ROUTES.CREATE_PROJET_WITH_PARAMS(
                  "addFicheSolution",
                  ficheId.toString(),
                  PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT_SUFFIX,
                ),
              );
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
          <span>Dans quel projet souhaitez-vous retrouver ces aides ?</span>
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
          </div>
          <Button
            className="mb-4 mr-4 rounded-3xl !text-sm md:mb-0"
            disabled={selectedProjetId < 1 || isSubmitting}
            onClick={validate}
          >
            Découvrir les aides
          </Button>
          <Button onClick={modal.close} priority="secondary" className="rounded-3xl !text-sm">
            Annuler
          </Button>
        </>
      )}
    </modal.Component>
  );
};
