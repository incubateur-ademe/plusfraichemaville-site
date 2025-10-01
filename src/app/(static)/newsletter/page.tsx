import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { NewsletterIframe } from "@/src/forms/newsletter/newsletter-iframe";

export const metadata: Metadata = computeMetadata("Abonnement Newsletter");

export default async function PageNewsletter() {
  return (
    <div className="fr-container pb-28">
      <NewsletterIframe />
    </div>
  );
}
