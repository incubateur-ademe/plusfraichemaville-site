"use client";

import { useSession } from "next-auth/react";

import { GenericSaveUnauthenticated } from "./generic-save-unauthenticated";
import { GenericSaveAuthenticated } from "./generic-save-authenticated";

export type GenericSaveFicheButtonProps = {
  type: "diagnostic" | "solution";
  id: number;
  projectName?: string;
};

export const GenericSaveFicheButton = ({ type, id, projectName }: GenericSaveFicheButtonProps) => {
  const status = useSession().status;
  const selectorComp = {
    authenticated: <GenericSaveAuthenticated type={type} id={id} projectName={projectName} />,
    loading: <>spinner</>,
    unauthenticated: <GenericSaveUnauthenticated type={type} id={id} projectName={projectName} />,
  };

  return <div>{selectorComp[status]}</div>;
};

export const Test = () => {
  return (
    <div className="py-[3vh]">
      <GenericSaveFicheButton type="diagnostic" id={2} />
      <GenericSaveFicheButton type="solution" id={10} projectName="École" />
    </div>
  );
};
