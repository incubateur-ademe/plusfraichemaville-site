"use client";

import { useSession } from "next-auth/react";
import { GenericSaveUnauthenticated } from "./generic-save-button-unauthenticated";
import { GenericSaveAuthenticated } from "./generic-save-button-authenticated";
import { GenericSaveSpinner } from "./generic-spinner";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { GenericSaveModal } from "./generic-save-modal";

export type GenericSaveFicheButtonProps = {
  type: "diagnostic" | "solution";
  id: number;
  projectName?: string;
  opener?: () => void;
};

export const GenericSaveFicheButton = ({ ...props }: GenericSaveFicheButtonProps) => {
  const status = useSession().status;

  const modal = createModal({
    id: props.id.toString(),
    isOpenedByDefault: false,
  });

  const selectorComp = {
    authenticated: <GenericSaveAuthenticated {...props} opener={modal.open} />,
    unauthenticated: <GenericSaveUnauthenticated {...props} opener={modal.open} />,
    loading: <GenericSaveSpinner />,
  };

  return (
    <>
      {selectorComp[status]}
      <GenericSaveModal modal={modal} status={status} type={props.type} />
    </>
  );
};

export const Test = () => {
  return (
    <div className="py-[3vh] relative">
      <div className="relative h-10">
        <GenericSaveFicheButton type="diagnostic" id={10} projectName="École" />
      </div>
      <div className="relative h-10">
        <GenericSaveFicheButton type="solution" id={11} projectName="École" />
      </div>
      <div className="relative h-10">
        <GenericSaveFicheButton type="solution" id={12} projectName="École" />
      </div>
    </div>
  );
};
