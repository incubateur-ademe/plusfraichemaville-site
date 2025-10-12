import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { ContactIframe } from "@/src/forms/contact/contact-iframe";

export const metadata: Metadata = computeMetadata("Contactez-nous");

export default async function PageContact() {
  return (
    <div className="fr-container bg-dsfr-background-alt-blue-france pb-28 pt-4">
      <ContactIframe className="!h-[60rem] md:!h-[70rem]" />
    </div>
  );
}
