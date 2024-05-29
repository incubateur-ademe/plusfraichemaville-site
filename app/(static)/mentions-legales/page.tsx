import React from "react";
import { LegalNotice } from "@incubateur-ademe/legal-pages-react";

export default async function PageMentionsLegales() {
  return (
    <div className="fr-container pt-12">
      <LegalNotice
        siteName="Plus fraîche ma ville"
        licenceUrl="https://github.com/incubateur-ademe/plusfraichemaville-site/blob/main/LICENSE"
        siteHost={{
          name: "Scalingo SAS",
          address: "155 bis Av. Pierre Brossolette 92240 Montrouge",
          country: "France",
          email: "hello@scalingo.com",
        }}
        siteUrl="https://plusfraichemaville.fr"
      />
    </div>
  );
}
