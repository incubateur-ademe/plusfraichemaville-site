import { Select } from "@codegouvfr/react-dsfr/Select";

import { updateFichesSolutionsProjetAction } from "@/actions/projets/update-fiches-solutions-projet-action";
import { PFMV_ROUTES } from "@/helpers/routes";
import { useProjetsStore } from "@/stores/projets/provider";
import Button from "@codegouvfr/react-dsfr/Button";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { ModalSaveFicheSolutionProps } from "../ButtonSaveFicheSolution";

export const ModalSaveFichesSolutionsConnected = ({ modal, ficheSolutionId }: ModalSaveFicheSolutionProps) => {
  const [selectedProjetId, setSelectedProjetId] = useState(-1);
  const projets = useProjetsStore((state) => state.projets);
  const addOrUpdateProjet = useProjetsStore((state) => state.addOrUpdateProjet);

  const validate = async () => {
    if (selectedProjetId > 0 && ficheSolutionId) {
      const update = await updateFichesSolutionsProjetAction(selectedProjetId, [+ficheSolutionId]);
      if (update.projet) {
        addOrUpdateProjet(update.projet);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProjetId(+event.target.value);
  };

  return (
    <modal.Component title="" size="large">
      <div className="flex items-center mb-4">
        <i className={"fr-icon--lg fr-icon-arrow-right-line mr-4"} />
        <span className="text-2xl font-bold block">Solution ajoutée dans Ma sélection</span>
      </div>
      <span>
        Retrouvez toutes vos solutions mises en favoris dans Ma sélection. <br />
        Voulez-vous ajouter aussi cette solution dans l’un de vos projets ?
      </span>
      <div className="my-10 flex items-center gap-5">
        <Select
          label=""
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
        <Button className="rounded-3xl !h-fit !min-h-fit !text-sm !mb-3" onClick={validate}>
          Ajouter au projet
        </Button>
      </div>
      <Button priority="primary" className="rounded-3xl !min-h-fit !text-sm ml-20 mr-4" onClick={() => modal.close()}>
        Continuer ma lecture
      </Button>
      <Link
        href={PFMV_ROUTES.MES_FICHES_SOLUTIONS}
        onClick={() => modal.close()}
        className="fr-btn fr-btn--secondary rounded-3xl !min-h-fit !text-sm mr-4"
      >
        Voir mes fiches solutions
      </Link>
    </modal.Component>
  );
};