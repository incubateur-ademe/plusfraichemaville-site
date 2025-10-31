import StatutProjetActionBanner from "@/src/components/espace-projet/statut-projet/statut-projet-action-banner";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export const StatutActionProjetQuestionnaireSatisfaction = () => {
  return (
    <StatutProjetActionBanner
      imagePath="/images/espace-projet/statut/action-termine.svg"
      className="fr-enlarge-link hover:cursor-pointer"
    >
      <h3 className="fr-h5">Merci pour votre retour et félicitations 🥳 !</h3>
      <div className="mb-6 mt-4">
        Un grand merci de la part de toute l'équipe et de la planète ! Votre avis compte beaucoup pour nous.
        Pourriez-vous prendre quelques instants afin de répondre à un court questionnaire de satisfaction ? Votre
        contribution nous aidera à améliorer nos services.
      </div>
      <LinkWithoutPrefetch
        href="https://tally.so/r/w8vbRY"
        target="_blank"
        className="fr-btn rounded-3xl bg-pfmv-navy text-white hover:!bg-dsfr-hover-blue-sun"
      >
        Remplir le questionnaire
      </LinkWithoutPrefetch>
    </StatutProjetActionBanner>
  );
};
