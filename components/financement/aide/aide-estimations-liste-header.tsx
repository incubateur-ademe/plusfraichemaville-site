import { PFMV_ROUTES } from "@/helpers/routes";
import Link from "next/link";

export const AideEstimationsListeHeader = ({ projetId }: { projetId?: number }) => {
  if (!projetId) {
    return null;
  }
  return (
    <div className="mb-10 flex items-center justify-between">
      <h1 className="mb-0 max-w-3xl text-[28px] font-bold leading-9">
        Pour quelle estimation souhaitez-vous trouver des financements ou des soutiens à {"l'ingénierie"} ?
      </h1>
      <Link
        href={PFMV_ROUTES.TABLEAU_DE_BORD_WITH_CURRENT_TAB(projetId, "tableau-de-suivi")}
        className="fr-btn fr-btn--tertiary rounded-[20px] !text-sm"
      >
        Retour au tableau de bord
      </Link>
    </div>
  );
};