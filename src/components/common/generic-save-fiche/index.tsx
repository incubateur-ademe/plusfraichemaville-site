"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { GenericSaveModal } from "./generic-save-modal";
import { GenericSaveButton } from "./generic-save-button";
import { generateRandomId } from "@/src/helpers/common";
import clsx from "clsx";

export type GenericSaveBaseProps = {
  type: "diagnostic" | "solution";
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

  return (
    <div data-id="generic-save-fiche" className={clsx(props.className)}>
      <GenericSaveButton modal={modal} {...props} />
      {!props.withoutModal && <GenericSaveModal modal={modal} {...props} />}
    </div>
  );
};
