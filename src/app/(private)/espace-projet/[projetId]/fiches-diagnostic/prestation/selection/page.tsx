import { FicheDiagnosticProjetListe } from "@/src/components/fiches-diagnostic/fiche-diagnostic-projet-liste";

export default async function FicheDiagnosticSelectionPage() {
  return (
    <div className="fr-container--fluid pt-8 text-black">
      <div className="fr-container">
        <h1 className="mb-2 text-2xl font-bold">Je souhaite utiliser ces méthodes de diagnostic pour mon projet</h1>
        <div className="mb-6 mt-4">Retrouvez ici les méthodes de diagnostic mises de côté</div>
        <FicheDiagnosticProjetListe />
      </div>
    </div>
  );
}
