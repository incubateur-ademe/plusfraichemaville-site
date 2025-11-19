import { BREADCRUMB_EDIT_PROJET } from "@/src/components/espace-projet/banner/espace-projet-breadcurmb-list";
import BannerProjetBreadcrumb from "@/src/components/espace-projet/banner/banner-projet-breadcrumb";
import UpdateProjetForm from "@/src/app/(private)/espace-projet/[projetId]/info-projet/UpdateProjetForm";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Renseignements sur mon projet");

export default function UpdateProjetPage() {
  return (
    <>
      <BannerProjetBreadcrumb step={BREADCRUMB_EDIT_PROJET} />
      <div className="fr-container pt-8">
        <h1 className="text-2xl">{"Je renseigne mon projet"}</h1>
        <div className="mb-4">
          {"Toutes les informations me permettront d'obtenir des recommandations sur mon projet."}
        </div>
        <UpdateProjetForm />
      </div>
    </>
  );
}
