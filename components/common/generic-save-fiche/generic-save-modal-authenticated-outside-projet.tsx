import { Select } from "@codegouvfr/react-dsfr/Select";

import { PFMV_ROUTES } from "@/helpers/routes";
import { useProjetsStore } from "@/stores/projets/provider";
import Button from "@codegouvfr/react-dsfr/Button";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

import { GenericSaveModalCommonProps } from "./generic-save-modal";
import { setBadgeOff, NotificationElements } from "@/helpers/notification-badge";

export const ModalSaveModalAuthenticatedOutsideProjet = ({
  modal,
  type,
  id: ficheId,
}: GenericSaveModalCommonProps & { id: number }) => {
  const [selectedProjetId, setSelectedProjetId] = useState(-1);
  const projets = useProjetsStore((state) => state.projets);
  const updateSelectedFiche = useProjetsStore((state) => state.updateSelectedFiches);

  const validate = () => {
    if (selectedProjetId > 0) {
      updateSelectedFiche(type, +ficheId, selectedProjetId, true);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedProjetId(+event.target.value);
  };

  return (
    <modal.Component title="" size="large">
      <div className="mb-4 flex items-center">
        <i className={"fr-icon--lg fr-icon-arrow-right-line mr-4"} />
        <span className="block text-2xl font-bold">
          {type === "solution" ? "Solution" : "Méthode de diagnostic"} ajoutée dans Ma sélection
        </span>
      </div>
      <span>
        Retrouvez toutes vos {type === "solution" ? "solutions" : "méthode de diagnostic"} mises en favoris dans Ma
        sélection. <br />
        Voulez-vous ajouter aussi cette solution dans l’un de vos projets ?
      </span>
      <div className="my-10 flex flex-col gap-0 md:flex-row md:items-center md:gap-5">
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
        className="mb-2 mr-4 !min-h-fit rounded-3xl !text-sm md:mb-0 md:ml-20"
        onClick={modal.close}
      >
        Continuer ma lecture
      </Button>
      <Link
        onClick={() => {
          modal.close();
          setBadgeOff(NotificationElements.selectionMenuItem);
        }}
        href={type === "solution" ? PFMV_ROUTES.MES_FICHES_SOLUTIONS : PFMV_ROUTES.MES_FICHES_SOLUTIONS}
        className="fr-btn fr-btn--secondary mr-4 !min-h-fit rounded-3xl !text-sm"
      >
        Voir mes {type === "solution" ? "fiches solutions" : "fiches diagnostic"}
      </Link>
    </modal.Component>
  );
};
