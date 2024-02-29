import { PFMV_ROUTES } from "@/helpers/routes";
import Link from "next/link";

export const ListeProjetsHeader = ({ isListEmpty }: { isListEmpty: boolean }) => {
  return (
    <div className="pb-4 flex justify-between">
      <div>
        <h2 className="text-dsfr-text-label-blue-france text-2xl mb-1">Mon espace projet</h2>
        {isListEmpty ? (
          <span className="text-lg min-h-[3rem] block">
            Vous n’avez pas encore de projets en cours. <br /> Créer un projet pour faire une simulation budgétaire et
            accéder à de nombreuses recommandations.
          </span>
        ) : (
          <span className="text-lg min-h-[3rem] block">Liste des projets de rafraîchissement dans ma collectivité</span>
        )}
      </div>
      <div className="shrink-0">
        <Link href={PFMV_ROUTES.INFO_PROJET} className="fr-btn ri-add-circle-fill fr-btn--icon-left rounded-3xl">
          Créer un projet
        </Link>
      </div>
    </div>
  );
};
