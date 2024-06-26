import React from "react";
import { Metadata } from "next";
import { computeMetadata } from "@/helpers/metadata/helpers";

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
        className="mx-auto min-w-full"
        height="1250"
        /* eslint-disable-next-line max-len */
        src="https://c33e446d.sibforms.com/serve/MUIFAIrbnC4zAXlB0j0W1R3ncBA3WOvbf6rAz_PjDkyHcjlyE_G-VYiQV774wVyiZvSvopQRRJ_W6xdfe8z0uT6h1oYiUfwJ_IOair2CZ2VGYszwyyi1i5d-PANTr31m5goNpUZPfMmPLs0Yk-BYCZFQhbMFsXsUTNVhqP46vd1aK1fzN8QdJ9Kclu5y3gFeiZ1a814lGN3O_iTG"
        scrolling="auto"
        allowFullScreen
      ></iframe>
    </div>
  );
}
