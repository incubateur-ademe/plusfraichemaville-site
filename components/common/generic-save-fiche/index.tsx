"use client";

import { useSession } from "next-auth/react";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { GenericSaveModal } from "./generic-save-modal";
import { GenericSaveButton } from "./generic-save-button";
import clsx from "clsx";
import { generateRandomId } from "@/helpers/common";

export type GenericSaveBaseProps = {
  type: "diagnostic" | "solution";
  id: number;
  projectName?: string;
  withLabel?: boolean;
  withoutModal?: boolean;
};

export const GenericSaveFiche = ({ ...props }: GenericSaveBaseProps) => {
  const status = useSession().status;
  const modal = createModal({
    id: `${props.id.toString()}-${generateRandomId()}`,
    isOpenedByDefault: false,
  });

  return (
    <div className={clsx("absolute top-3 right-4")} data-id="generic-save-fiche">
      <GenericSaveButton modal={modal} status={status} {...props} />
      {!props.withoutModal && <GenericSaveModal modal={modal} status={status} {...props} />}
    </div>
  );
};
