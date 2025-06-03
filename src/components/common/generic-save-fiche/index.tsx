"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { GenericSaveModal } from "./generic-save-modal";
import { GenericSaveButton } from "./generic-save-button";
import { generateRandomId, TypeFiche } from "@/src/helpers/common";
import clsx from "clsx";
import { useProjetsStore } from "@/src/stores/projets/provider";
// eslint-disable-next-line max-len
import { unauthenticatedSaveModal } from "@/src/components/common/generic-save-fiche/generic-save-modal-unauthenticated";

export type GenericSaveBaseProps = {
  type: TypeFiche;
  id: number;
  projectName?: string;
  withLabel?: boolean;
  withoutModal?: boolean;
  classNameButton?: string;
  className?: string;
};

export const GenericSaveFiche = ({ ...props }: GenericSaveBaseProps) => {
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);
  const modal = currentProjetId
    ? createModal({
        id: `${props.id.toString()}-${generateRandomId()}`,
        isOpenedByDefault: false,
      })
    : unauthenticatedSaveModal;

  return (
    <div data-id="generic-save-fiche" className={clsx(props.className)}>
      <GenericSaveButton modal={modal} {...props} />
      {!props.withoutModal && currentProjetId && <GenericSaveModal modal={modal} {...props} />}
    </div>
  );
};
