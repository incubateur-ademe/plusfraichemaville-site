import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export const metadata: Metadata = computeMetadata("Abonnement lettre d’information");

export default async function PageNewsletterSuccess() {
  return (
    <div className="fr-container mt-16 max-w-[40rem] text-center">
      <i className="fr-icon-success-fill fr-icon--lg text-dsfr-background-action-high-success-hover" />
      <div className="mb-8 mt-4 text-[1.75rem] font-bold text-dsfr-text-title-grey">
        Abonnement effectué avec succès
      </div>

      <LinkWithoutPrefetch href="/" className="fr-btn fr-btn--tertiary mb-36 rounded-3xl">
        {`Retourner à la page d'accueil`}
      </LinkWithoutPrefetch>
    </div>
  );
}
