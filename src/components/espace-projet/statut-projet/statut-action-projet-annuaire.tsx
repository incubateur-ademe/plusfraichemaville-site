import StatutProjetActionBanner from "@/src/components/espace-projet/statut-projet/statut-projet-action-banner";
import { GenericFicheLink } from "@/src/components/common/generic-save-fiche/generic-fiche-link";
import { PFMV_ROUTES } from "@/src/helpers/routes";

export const StatutActionProjetAnnuaire = () => {
  return (
    <StatutProjetActionBanner
      imagePath="/images/espace-projet/statut/action-en_cours.png"
      className="fr-enlarge-link hover:cursor-pointer"
    >
      <h3 className="fr-h5">Merci pour votre retour !</h3>
      <div className="mb-6 mt-4">
        Au passage, connaissez-vous l’annuaire des projets Plus fraîche ma ville ? Il vous permet de vous inspirez des
        projets réalisés ou en cours et d’identifier les contacts utiles à votre projet.
        <br />
        N’hésitez pas à y jeter un coup d’oeil.
      </div>
      <GenericFicheLink
        href={PFMV_ROUTES.ESPACE_PROJET_ANNUAIRE_MAP_CONTACT}
        className="fr-btn rounded-3xl bg-pfmv-navy text-white hover:!bg-dsfr-hover-blue-sun"
      >
        Voir l’annuaire des projets
      </GenericFicheLink>
    </StatutProjetActionBanner>
  );
};
