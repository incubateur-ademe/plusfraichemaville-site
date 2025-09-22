import { PropsWithChildren } from "react";
import { AnnuaireRexContentSeeProjetModal } from "@/src/components/annuaire/side-panel/annuaire-rex-content-see-projet-modal";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <AnnuaireRexContentSeeProjetModal />
    </>
  );
};

export default Layout;
