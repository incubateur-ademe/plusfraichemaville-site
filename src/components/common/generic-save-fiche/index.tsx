"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { GenericSaveModal } from "./generic-save-modal";
import { GenericSaveButton } from "./generic-save-button";
import { generateRandomId, TypeFiche } from "@/src/helpers/common";
import clsx from "clsx";
import { useProjetsStore } from "@/src/stores/projets/provider";

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
  const modal = createModal({
    id: `${props.id.toString()}-${generateRandomId()}`,
    isOpenedByDefault: false,
  });
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);

  if (!currentProjetId && props.type === TypeFiche.diagnostic) {
    return null;
  }

  return (
    <div data-id="generic-save-fiche" className={clsx(props.className)}>
      <GenericSaveButton modal={modal} {...props} />
      {!props.withoutModal && <GenericSaveModal modal={modal} {...props} />}
    </div>
  );
};
