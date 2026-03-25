import { Select } from "@codegouvfr/react-dsfr/Select";
import { useProjetsStore } from "@/src/stores/projets/provider";
import Button from "@codegouvfr/react-dsfr/Button";
import { ChangeEvent, useState } from "react";

import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useRouter } from "next/navigation";
import { isEmpty } from "@/src/helpers/listUtils";
import { Hidden } from "../../common/hidden";
import { DSFRModal } from "@/src/types/global";

export const ModaleDiagnosticModuleOutsideProjet = ({
  modal,
  linkSuffix,
}: {
  modal: DSFRModal;
  linkSuffix: string;
}) => {
  const [selectedProjetId, setSelectedProjetId] = useState(-1);
  const projets = useProjetsStore((state) => state.projets);
  const router = useRouter();

  const validate = async () => {
    if (selectedProjetId > 0) {
      modal.close();
      router.push(PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_CHOIX_PARCOURS(selectedProjetId));
    }
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProjetId(+event.target.value);
  };

  return (
    <modal.Component title="Sélection du projet" size="large">
      {isEmpty(projets) ? (
        <>
          <div className="mb-12">Vous devez créer un projet pour pouvoir établir un diagnostic.</div>
          <Button
            priority="primary"
            className="mb-4 mr-4 rounded-3xl md:mb-0"
            onClick={() => {
              modal.close();
              router.push(PFMV_ROUTES.CREATE_PROJET_WITH_PARAMS("", "", linkSuffix));
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
          <span>Pour quel projet souhaitez-vous établir un diagnostic ?</span>
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
          <Button className="mb-4 mr-4 rounded-3xl !text-sm md:mb-0" disabled={selectedProjetId < 1} onClick={validate}>
            Allez au module diagnostic
          </Button>
          <Button onClick={modal.close} priority="secondary" className="rounded-3xl !text-sm">
            Annuler
          </Button>
        </>
      )}
    </modal.Component>
  );
};
