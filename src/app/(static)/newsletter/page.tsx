import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { NewsletterForm } from "@/src/forms/newsletter/newsletter-form";

export const metadata: Metadata = computeMetadata("Abonnement Newsletter");

export default async function PageNewsletter() {
  return (
    <div className="fr-container !max-w-[40rem] pb-28">
      <h1 className="mt-8 text-[1.75rem] font-bold text-dsfr-text-title-grey">{"S'abonner"}</h1>
      <div className="mb-4">
        {"Recevez des conseils d'experts lors de nos webinaires et parlez-nous de vos projets"}
      </div>
      <NewsletterForm rerouteAfterSuccess />
    </div>
  );
}
