import StatutProjetActionBanner from "@/src/components/espace-projet/statut-projet/statut-projet-action-banner";

export const StatutActionUserAnnuaire = () => {
  return (
    <StatutProjetActionBanner
      imagePath="/images/espace-projet/statut/action-en_cours.png"
      className="fr-enlarge-link hover:cursor-pointer"
    >
      <h3 className="fr-h5">Merci pour votre retour et à bientôt !</h3>
      <div className="mt-4">
        Lorsque vous reviendrez sur Plus fraîche ma ville, n’hésitez pas à aller faire un tour sur notre annuaire. Il
        vous permet de vous inspirez des projets réalisés ou en cours et d’identifier les contacts utiles à votre
        projet. Cela peut vous faire gagner du temps.
      </div>
    </StatutProjetActionBanner>
  );
};
