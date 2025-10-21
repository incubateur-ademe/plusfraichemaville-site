import StatutProjetActionBanner from "@/src/components/espace-projet/statut-projet/statut-projet-action-banner";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export const StatutActionUserQuestionnaireSatisfaction = () => {
  return (
    <StatutProjetActionBanner
      imagePath="/images/espace-projet/statut/action-termine.svg"
      className="fr-enlarge-link hover:cursor-pointer"
    >
      <h3 className="fr-h5">Merci pour votre retour !</h3>
      <div className="mb-6 mt-4">
        Nous sommes désolés que Plus fraîche ma ville n'ait pas répondu à vos attentes pour votre projet. Pour nous
        aider à nous améliorer, pourriez-vous prendre quelques minutes pour remplir ce questionnaire ? Cela nous serait
        d'une grande aide. Merci beaucoup !
      </div>
      <LinkWithoutPrefetch
        href="https://share-eu1.hsforms.com/1LqT_xF0EQrOEIHai5Zb2vQ2eghl7"
        target="_blank"
        className="fr-btn rounded-3xl bg-pfmv-navy text-white hover:!bg-dsfr-hover-blue-sun"
      >
        Remplir le questionnaire
      </LinkWithoutPrefetch>
    </StatutProjetActionBanner>
  );
};
