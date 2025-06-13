import { PropsWithChildren } from "react";
// eslint-disable-next-line max-len
import { AnnuaireRexContentSeeProjetModal } from "@/src/components/annuaire/side-panel/annuaire-rex-content-see-projet-modal";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="mb-40">
      {children}
      <AnnuaireRexContentSeeProjetModal />
    </div>
  );
};

export default Layout;
