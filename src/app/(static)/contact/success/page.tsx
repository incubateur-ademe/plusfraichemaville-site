import React from "react";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import Link from "next/link";

export const metadata: Metadata = computeMetadata("Contactez-nous");

export default async function PageContact() {
  return (
    <div className="fr-container max-w-[40rem] text-center mt-16">
      <i className="fr-icon-success-fill fr-icon--lg text-dsfr-background-action-high-success-hover" />
      <div className="mt-4 text-[1.75rem] font-bold text-dsfr-text-title-grey">Message envoyé avec succès</div>
      <div className="mt-4 mb-8">Nos équipes reviennent rapidement vers vous</div>
      <Link href="/" className="fr-btn fr-btn--tertiary rounded-3xl mb-36">
        {`Retourner à la page d'accueil`}
      </Link>
    </div>
  );
}
