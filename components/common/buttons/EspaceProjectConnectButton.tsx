import Link from "next/link";
import { PropsWithChildren } from "react";

export const EspaceProjetConnectButton = ({ children }: PropsWithChildren) => {
  return (
    <Link href="/connexion" className="fr-btn fr-btn--tertiary ri-dashboard-fill fr-btn--icon-left">
      {children}
    </Link>
  );
};
