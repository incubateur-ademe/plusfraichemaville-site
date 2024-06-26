import { PFMV_ROUTES } from "@/helpers/routes";
import Link from "next/link";

export const AideEstimationsListeHeader = ({ projetId, title }: { projetId?: number; title: string }) => {
  if (!projetId) {
    return null;
  }
  return (
    <div className="mb-10 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
      <h1 className="mb-0 max-w-3xl text-[28px] font-bold leading-9">{title}</h1>
      <Link
        href={PFMV_ROUTES.TABLEAU_DE_BORD_WITH_CURRENT_TAB(projetId, "tableau-de-suivi")}
        className="fr-btn fr-btn--secondary shrink-0 rounded-[20px] !text-sm"
      >
        Retour au tableau de bord
      </Link>
    </div>
  );
};
