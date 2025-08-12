"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { GenericSaveModal } from "./generic-save-modal";
import { GenericSaveButton } from "./generic-save-button";
import { generateRandomId, TypeFiche } from "@/src/helpers/common";
import clsx from "clsx";
import { unauthenticatedSaveModal } from "@/src/components/common/generic-save-fiche/generic-save-modal-unauthenticated";
import { useUserStore } from "@/src/stores/user/provider";

export type GenericSaveBaseProps = {
  type: TypeFiche;
  id: number;
  projectName?: string;
  withoutModal?: boolean;
  classNameButton?: string;
  className?: string;
};

export const GenericSaveFiche = ({ ...props }: GenericSaveBaseProps) => {
  const currentUserId = useUserStore((state) => state.userInfos?.id);

  const modal = currentUserId
    ? createModal({
        id: `${props.id.toString()}-${generateRandomId()}`,
        isOpenedByDefault: false,
      })
    : unauthenticatedSaveModal;

  return (
    <div data-id="generic-save-fiche" className={clsx(props.className)}>
      <GenericSaveButton modal={modal} {...props} />
      {!props.withoutModal && currentUserId && <GenericSaveModal modal={modal} {...props} />}
    </div>
  );
};
