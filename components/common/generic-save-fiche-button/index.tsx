"use client";

import { useSession } from "next-auth/react";

import { GenericSaveUnauthenticated } from "./generic-save-unauthenticated";

type GenericSaveFicheButtonBaseProps = {
  type: "diagnostic" | "solution";
  id: number;
  projectName?: string;
};

export interface GenericSaveFicheButtonCommonProps extends GenericSaveFicheButtonBaseProps {}

export const GenericSaveFicheButton = ({ type, id, projectName }: GenericSaveFicheButtonBaseProps) => {
  const status = useSession().status;
  const selectorComp = {
    authenticated: <></>,
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
