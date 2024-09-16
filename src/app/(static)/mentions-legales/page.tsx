import React from "react";
import { LegalNotice } from "@incubateur-ademe/legal-pages-react";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Mentions légales");

export default async function PageMentionsLegales() {
  return (
    <div className="fr-container pt-12">
      <LegalNotice
        siteName="Plus fraîche ma ville"
        licenceUrl="https://github.com/incubateur-ademe/plusfraichemaville-site/blob/main/LICENSE"
        contactEmail="plusfraichemaville@ademe.fr"
        siteHost={{
          name: "Scalingo SAS",
          address: "155 bis Av. Pierre Brossolette 92240 Montrouge",
          country: "France",
          email: "hello@scalingo.com",
        }}
        siteUrl="https://plusfraichemaville.fr"
        thirdParties={[
          {
            name: "RemixIcon",
            url: "https://remixicon.com/",
            text: "Certaines icônes du site sont issues de la librairie RemixIcon",
          },
        ]}
      />
    </div>
  );
}
