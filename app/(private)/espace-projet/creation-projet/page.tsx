import { ProjetInfoForm } from "@/forms/projet/ProjetInfoForm";

export default async function CreateProjetPage() {
  return (
    <div className="fr-container pt-8">
      <h1 className="fr-h5 !text-dsfr-text-label-blue-france !mb-2">{"Je renseigne mon projet"}</h1>
      <div className="mb-4">
        {"Toutes les informations me permettront d'obtenir des recommandations sur mon projet."}
      </div>
      <ProjetInfoForm />
    </div>
  );
}
