import React from "react";
import { PrivacyPolicy } from "@incubateur-ademe/legal-pages-react";
import { Metadata } from "next";
import { computeMetadata } from "@/helpers/metadata/helpers";
import { FooterConsentManagementItem } from "@/components/cookie/consentManagement";

export const metadata: Metadata = computeMetadata("Politique de confidentialité");

export default async function PagePolitiqueDeConfidentialite() {
  return (
    <div className="fr-container pt-12">
      <PrivacyPolicy
        siteName="Plus fraîche ma ville"
        cookieConsentButton={<FooterConsentManagementItem />}
        cookies={[
          {
            category: "Authentification",
            name: "Next-Auth",
            expiration: "1 mois",
            finalities: "Gestion de l'authentification dans l'espace projet",
            editor: "Next Auth & ADEME",
            destination: "France",
          },
          {
            category: "Mesure d’audience anonymisée",
            name: "Matomo",
            expiration: "13 mois",
            finalities: "Mesure d’audience",
            editor: "Matomo & ADEME",
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
          {
            name: "Ragtime",
            country: "France",
            hostingCountry: "France",
            serviceType: "Agent conversationnel",
            policyUrl: "https://ragtime.ai",
          },
        ]}
      />
    </div>
  );
}
