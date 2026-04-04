import { ProjetCreationForm } from "@/src/forms/projet/ProjetCreationForm";
import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Création de projet");

export default async function CreateProjetPage() {
  return (
    <div className="fr-container mx-auto w-full max-w-4xl pb-12 pt-8">
      <ProjetCreationForm />
    </div>
  );
}
