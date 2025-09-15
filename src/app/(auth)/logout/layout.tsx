import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <div className="fr-container pt-8">
      <div className="fr-h3">Déconnexion en cours...</div>
      {children}
    </div>
  );
}
