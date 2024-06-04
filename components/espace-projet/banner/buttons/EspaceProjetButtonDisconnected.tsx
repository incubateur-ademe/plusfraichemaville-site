import { PFMV_ROUTES } from "@/helpers/routes";
import Link from "next/link";

export const Disconnected = () => {
  return (
    <Link href={PFMV_ROUTES.CONNEXION} className="fr-btn fr-btn--tertiary ri-dashboard-fill fr-btn--icon-left !text-sm">
      Mon espace projet
    </Link>
  );
};
