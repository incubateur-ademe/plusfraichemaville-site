"use client";

import { useSession } from "next-auth/react";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { GenericSaveModal } from "./generic-save-modal";
import { GenericSaveButton } from "./generic-save-button";
import clsx from "clsx";

export type GenericSaveBaseProps = {
  type: "diagnostic" | "solution";
  id: number;
  projectName?: string;
};

export const GenericSaveFiche = ({ ...props }: GenericSaveBaseProps) => {
  const status = useSession().status;

  const modal = createModal({
    id: props.id.toString(),
    isOpenedByDefault: false,
  });

  return (
    <div className={clsx("absolute top-3 right-4")} data-id="generic-save-fiche">
      <GenericSaveButton modal={modal} status={status} {...props} />
      <GenericSaveModal modal={modal} status={status} {...props} />
    </div>
  );
};
