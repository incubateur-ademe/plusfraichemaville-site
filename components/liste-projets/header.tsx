import Link from "next/link";
import { ListProjetsHeaderEmpty } from "./empty";
import { PFMV_ROUTES } from "@/helpers/routes";

export const ListeProjetsHeader = ({ isListEmpty }: { isListEmpty: boolean }) => {
  return (
    <>
      <div className="pb-4 flex justify-between">
        <div className="w-full">
          <h2 className="text-dsfr-text-label-blue-france text-2xl mb-1">Mon espace projet</h2>
          <span className="text-lg block mb-8">Les projets de rafraîchissement de ma collectivité</span>
          {isListEmpty && <ListProjetsHeaderEmpty />}
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
