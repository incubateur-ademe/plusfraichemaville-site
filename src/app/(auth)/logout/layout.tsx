import { ReactElement } from "react";
import AppFooter from "@/src/components/layout/AppFooter";

export default function Layout({ children }: { children: ReactElement | null }) {
  return (
    <div>
      <div className={"pb-40"}>
        <div className="fr-container pt-8">
          <div className="fr-h3">Déconnexion en cours...</div>
        </div>
        {children}
      </div>
      <AppFooter />
    </div>
  );
}
