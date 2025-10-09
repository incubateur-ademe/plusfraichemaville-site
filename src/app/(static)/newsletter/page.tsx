import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { NewsletterIframe } from "@/src/forms/newsletter/newsletter-iframe";

export const metadata: Metadata = computeMetadata("Abonnement Newsletter");

export default async function PageNewsletter() {
  return (
    <div className="fr-container bg-dsfr-background-alt-blue-france pb-28 pt-4">
      <NewsletterIframe className="!h-[50rem] md:!h-[40rem]" />
    </div>
  );
}
