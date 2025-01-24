import { AnnuaireLayout } from "@/src/components/annuaire/annuaire-layout";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return <AnnuaireLayout>{children}</AnnuaireLayout>;
};

export default Layout;
