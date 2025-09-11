import { ReactElement } from "react";

export default function Layout({ children }: { children: ReactElement | null }) {
  return (
    <div className="fr-container pt-8">
      <div className="fr-h3">Déconnexion en cours...</div>
      {children}
    </div>
  );
}
