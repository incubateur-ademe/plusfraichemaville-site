import { PropsWithChildren } from "react";
import { SourcingLayoutButton } from "./sourcing-layout-button";

export const SourcingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="fr-container pt-8">
      <h2 className="mb-4 text-[28px]">Mes contacts utiles au projet</h2>
      <p className="mb-10">
        Inspirez-vous des projets réalisés ou en cours et identifiez les contacts utiles à votre projet
      </p>
      <div className="mb-10">{children}</div>
      <SourcingLayoutButton />
    </div>
  );
};
