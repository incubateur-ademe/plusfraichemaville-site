"use client";

import { useSession } from "next-auth/react";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { GenericSaveModal } from "./generic-save-modal";
import { GenericSaveButton } from "./generic-save-button";

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
    <div data-id="generic-save-fiche">
      <GenericSaveButton modal={modal} status={status} {...props} />
      <GenericSaveModal modal={modal} status={status} {...props} />
    </div>
  );
};

export const Test = () => {
  return (
    <div className="py-[3vh] relative">
      <div className="relative h-10">
        <GenericSaveFiche type="diagnostic" id={10} projectName="École" />
      </div>
      <div className="relative h-10">
        <GenericSaveFiche type="solution" id={11} projectName="École" />
      </div>
    </div>
  );
};
