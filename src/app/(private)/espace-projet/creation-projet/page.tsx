import CreateProjetBreadcrumb from "@/src/components/espace-projet/banner/create-projet-breadcrumb";
import { ProjetCreationForm } from "@/src/forms/projet/ProjetCreationForm";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { Metadata } from "next";

export const metadata: Metadata = computeMetadata("Création de projet");

export default async function CreateProjetPage() {
  return (
    <div className="fr-container">
      <CreateProjetBreadcrumb />
      <div className="mx-auto w-full max-w-4xl pb-12 pt-8">
        <ProjetCreationForm />
      </div>
    </div>
  );
}
