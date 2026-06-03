"use client";

import { createConsentManagement } from "@codegouvfr/react-dsfr/consentManagement";

export const { ConsentBannerAndConsentManagement, useConsent } = createConsentManagement({
  finalityDescription: {
    matomo: {
      title: "Matomo",
      description: "Nous utilisons des cookies pour mesurer l’audience de notre site et améliorer son contenu.",
    },
    posthog: {
      title: "PostHog",
      description: "Nous utilisons des cookies pour un meilleur affichage de nos sondages.",
    },
  },
  personalDataPolicyLinkProps: {
    href: "/politique-de-confidentialite#cookies",
  },
});
