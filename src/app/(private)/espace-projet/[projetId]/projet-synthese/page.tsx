import { BREADCRUMB_PROJET_SYNTHESE } from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { ProjetSynthesePage } from "@/src/components/espace-projet/projet-synthese/projet-synthese-page";

export const metadata: Metadata = computeMetadata("Télécharger la synthèse");

export default function Page() {
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_PROJET_SYNTHESE} />
      <div className="fr-container pt-8">
        <ProjetSynthesePage />
      </div>
    </>
  );
}
