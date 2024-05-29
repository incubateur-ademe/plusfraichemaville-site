import React from "react";
import { PrivacyPolicy } from "@incubateur-ademe/legal-pages-react";

export default async function PagePolitiqueDeConfidentialite() {
  return (
    <div className="fr-container pt-12">
      <PrivacyPolicy
        siteName="Plus fraîche ma ville"
        cookieConsentButton={<div>{"Ce site n'utilise pas de cookies optionnels"}</div>}
        cookies={[
          {
            category: "Authentification",
            name: "Next-Auth",
            expiration: "1 mois",
            finalities: "Gestion de l'authentification dans l'espace projet",
            editor: "Next Auth & ADEME",
            destination: "France",
          },
        ]}
        thirdParties={[
          {
            name: "Scalingo",
            country: "France",
            hostingCountry: "France",
            serviceType: "Hébergement",
            policyUrl: "https://scalingo.com/fr/contrat-gestion-traitements-donnees-personnelles",
          },
        ]}
      />
    </div>
  );
}
