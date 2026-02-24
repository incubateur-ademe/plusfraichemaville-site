import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import { BREADCRUMB_MES_FINANCEMENTS } from "@/src/components/espace-projet/banner/breadcrumb-list/espace-projet-breadcurmb-financement";
import { GenericFicheLink } from "@/src/components/common/generic-save-fiche/generic-fiche-link";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Sélectionner des aides");

export default function SelectionnerAidesPage() {
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_MES_FINANCEMENTS} />
      <div className="fr-container pt-8">
        <h1 className="mb-4 text-2xl font-bold">Sélectionner des aides</h1>
        <p className="mb-8 text-lg">Cette fonctionnalité est en cours de développement.</p>
        <GenericFicheLink
          href={PFMV_ROUTES.ESPACE_PROJET_FINANCEMENT_LISTE_ESTIMATION}
          className="fr-btn fr-btn--secondary rounded-3xl"
        >
          Retour aux financements
        </GenericFicheLink>
      </div>
    </>
  );
}
