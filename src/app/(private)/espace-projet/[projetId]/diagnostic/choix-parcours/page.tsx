import { FicheDiagnosticChoixParcours } from "@/src/components/fiches-diagnostic/fiche-diagnostic-choix-parcours";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";

import { BREADCRUMB_CHOIX_PARCOURS_DIAGNOSTIC } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-diag";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Choix du parcours de diagnostic");

export default async function FicheDiagnosticChoixParcoursPage() {
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_CHOIX_PARCOURS_DIAGNOSTIC} />
      <div className="fr-container pt-8 text-black">
        <h1 className="text-2xl">Je fais une analyse de la surchauffe sur l’espace à rafraîchir</h1>
        <div className={"mb-10 text-lg"}>
          {"Avant de rafraîchir un espace, il est essentiel de comprendre son climat actuel. Cela permet de choisir " +
            "les meilleures solutions et d’en mesurer l’efficacité dans le temps. Nous vous proposons deux approches :"}
        </div>
        <FicheDiagnosticChoixParcours />
      </div>
    </>
  );
}
