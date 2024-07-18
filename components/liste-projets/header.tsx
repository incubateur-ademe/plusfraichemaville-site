import Link from "next/link";
import { PFMV_ROUTES } from "@/helpers/routes";

export const ListeProjetsHeader = () => {
  return (
    <>
      <div className="flex justify-between pb-4">
        <div className="w-full">
          <h1 className="mb-1 text-2xl text-dsfr-text-label-blue-france">Mon espace projet</h1>
          <span className="mb-8 block text-lg">Les projets de rafraîchissement de ma collectivité</span>
        </div>
        <div className="shrink-0">
          <Link href={PFMV_ROUTES.CREATE_PROJET} className="fr-btn ri-add-circle-fill fr-btn--icon-left rounded-3xl">
            Créer un projet
          </Link>
        </div>
      </div>
    </>
  );
};
