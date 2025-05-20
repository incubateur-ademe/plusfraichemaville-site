import { FicheDiagnosticChoixParcours } from "@/src/components/fiches-diagnostic/fiche-diagnostic-choix-parcours";

export default async function FicheDiagnosticChoixParcoursPage() {
  return (
    <div className="fr-container pt-8 text-black">
      <h1 className="mb-6 text-[1.75rem] font-bold">Je fais une analyse de la surchauffe sur l’espace à rafraîchir</h1>
      <div className={"mb-10 text-lg"}>
        {"Avant de rafraîchir un espace, il est essentiel de comprendre son climat actuel. Cela permet de choisir " +
          "les meilleures solutions et d’en mesurer l’efficacité dans le temps. Nous vous proposons deux approches :"}
      </div>
      <FicheDiagnosticChoixParcours />
    </div>
  );
}
