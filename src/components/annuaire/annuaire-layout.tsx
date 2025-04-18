import { PropsWithChildren } from "react";
import { AnnuaireLayoutButton } from "./annuaire-layout-button";
// eslint-disable-next-line max-len
import { AnnuaireRexContentSeeProjetModal } from "@/src/components/annuaire/side-panel/annuaire-rex-content-see-projet-modal";

export const AnnuaireLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="fr-container mb-40 pt-8">
      <div className="mb-10">{children}</div>
      <AnnuaireLayoutButton />
      <AnnuaireRexContentSeeProjetModal />
    </div>
  );
};
