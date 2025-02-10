import { FicheDiagnosticChoixParcours } from "@/src/components/fiches-diagnostic/fiche-diagnostic-choix-parcours";

export default async function FicheDiagnosticChoixParcoursPage() {
  return (
    <div className="fr-container--fluid pt-8 text-black">
      <div className="fr-container">
        <h1 className="mb-2 text-2xl font-bold">Choix de parcours de diag</h1>
        <FicheDiagnosticChoixParcours />
      </div>
    </div>
  );
}
