import { BREADCRUMB_BESOIN_AIDE } from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { BesoinAidePage } from "@/src/components/espace-projet/besoin-aide/besoin-aide-page";

export const metadata: Metadata = computeMetadata("Demande d'aide sur l'utilisation de l'espace projet");

export default function Page() {
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_BESOIN_AIDE} />
      <div className="fr-container pt-8">
        <BesoinAidePage />
      </div>
    </>
  );
}
