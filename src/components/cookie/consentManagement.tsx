/* eslint-disable max-len */
"use client";

import { createConsentManagement } from "@codegouvfr/react-dsfr/consentManagement";

export const { ConsentBannerAndConsentManagement, FooterConsentManagementItem, useConsent } = createConsentManagement({
  finalityDescription: {
    matomo: {
      title: "Matomo",
      description: "Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu.",
    },
    hubspot: {
      title: "Hubspot (uniquement pour les utilisateurs/utilisatrices connecté(e)s)",
      description:
        "Nous utilisons Hubspot pour améliorer votre expérience utilisateur et personnaliser nos services. Ces cookies nous permettent d'analyser l'utilisation du site et de vous proposer des contenus adaptés à vos besoins ainsi qu'une expérience optimale.",
    },
  },
  personalDataPolicyLinkProps: {
    href: "/politique-de-confidentialite#cookies",
  },
});
