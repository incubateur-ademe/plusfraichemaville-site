import React from "react";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Contactez-nous");

export default async function PageContact() {
  return (
    <div className="fr-container">
      <h1 className="mt-8 text-center text-[1.75rem] font-bold text-dsfr-text-title-grey">
        {"Abonnez-vous à notre bulletin d'informations"}
      </h1>
      <div className="mb-4 mt-6 text-center text-dsfr-text-title-grey">
        {"N'hésitez pas à nous contacter aussi par mail : plusfraichemaville@ademe.fr"}
      </div>
      <iframe
        id="iframeNewsletter"
        width="100%"
        height="680"
        title="Inscription à la newsletter"
        src="https://cloud.contact.ademe.fr/inscription-PFMV"
      ></iframe>
    </div>
  );
}
