import { FicheDiagnosticChoixParcours } from "@/src/components/fiches-diagnostic/fiche-diagnostic-choix-parcours";

export default async function FicheDiagnosticChoixParcoursPage() {
  return (
    <div className="fr-container--fluid pt-8 text-black">
      <div className="fr-container">
        <h1 className="mb-6 text-2xl font-bold">Je fais un diagnostic de surchauffe sur l’espace à rafraîchir</h1>
        <div className={"mb-12 text-lg"}>
          {"Il est nécessaire d’effectuer un diagnostic que ce soit pour avoir un suivi de l’évolution de" +
            " la surchauffe ou encore mieux cibler les solutions. Vous pouvez calculer les indicateurs" +
            " environnementaux en open source ou encore faire appel à un bureau d’étude pour un diagnostic approfondi."}
        </div>
        <FicheDiagnosticChoixParcours />
      </div>
    </div>
  );
}
