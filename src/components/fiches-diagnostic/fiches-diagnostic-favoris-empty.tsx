import { PFMV_ROUTES } from "@/src/helpers/routes";
import Link from "next/link";

export const FichesDiagnosticFavorisEmpty = () => (
  <>
    <div>Retrouvez ici vos méthodes sauvegardées.</div>
    <div>{"Vous n'avez pas encore sélectionné de méthodes de diagnostic."}</div>
    <Link id="fr-button" className="fr-btn mt-8 rounded-3xl" href={PFMV_ROUTES.FICHES_DIAGNOSTIC}>
      Découvrir les méthodes
    </Link>
  </>
);
