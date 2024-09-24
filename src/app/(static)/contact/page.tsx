import React from "react";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { ContactForm } from "@/src/forms/contact/contact-form";

export const metadata: Metadata = computeMetadata("Contactez-nous");

export default async function PageContact() {
  return (
    <div className="fr-container max-w-[40rem] pb-28">
      <h1 className="mt-8 text-[1.75rem] font-bold text-dsfr-text-title-grey">
        Nous contacter
      </h1>
      <ContactForm/>
    </div>
  );
}
