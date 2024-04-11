import { Select } from "@codegouvfr/react-dsfr/Select";

import { PFMV_ROUTES } from "@/helpers/routes";
import { useProjetsStore } from "@/stores/projets/provider";
import Button from "@codegouvfr/react-dsfr/Button";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

import { GenericSaveModalCommonProps } from "./generic-save-modal";

export const ModalSaveModalAuthenticatedOutsideProjet = ({
  modal,
  type,
  id: ficheId,
}: GenericSaveModalCommonProps & { id: number }) => {
  const [selectedProjetId, setSelectedProjetId] = useState(-1);
  const projets = useProjetsStore((state) => state.projets);
  const updateSelectedFiche = useProjetsStore((state) => state.updateSelectedFiches);

  const validate = () => {
    updateSelectedFiche(type, +ficheId, selectedProjetId, true);
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProjetId(+event.target.value);
  };

  return (
    <modal.Component title="" size="large">
      <div className="flex items-center mb-4">
        <i className={"fr-icon--lg fr-icon-arrow-right-line mr-4"} />
        <span className="text-2xl font-bold block">
          {type === "solution" ? "Solution" : "Méthode de diagnostic"} ajoutée dans Ma sélection
        </span>
      </div>
      <span>
        Retrouvez toutes vos {type === "solution" ? "solutions" : "méthode de diagnostic"} mises en favoris dans Ma
        sélection. <br />
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
      <Button priority="primary" className="rounded-3xl !min-h-fit !text-sm md:ml-20 mr-4" onClick={modal.close}>
        Continuer ma lecture
      </Button>
      <Link
        onClick={modal.close}
        href={type === "solution" ? PFMV_ROUTES.MES_FICHES_SOLUTIONS : PFMV_ROUTES.MES_FICHES_SOLUTIONS}
        className="fr-btn fr-btn--secondary rounded-3xl !min-h-fit !text-sm mr-4"
      >
        Voir mes {type === "solution" ? "fiches solutions" : "fiches diagnostic"}
      </Link>
    </modal.Component>
  );
};
