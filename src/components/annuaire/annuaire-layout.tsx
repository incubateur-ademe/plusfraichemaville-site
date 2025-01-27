import { PropsWithChildren } from "react";
import { AnnuaireLayoutButton } from "./annuaire-layout-button";

export const AnnuaireLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="fr-container pt-8">
      <div className="mb-10">{children}</div>
      <AnnuaireLayoutButton />
    </div>
  );
};
