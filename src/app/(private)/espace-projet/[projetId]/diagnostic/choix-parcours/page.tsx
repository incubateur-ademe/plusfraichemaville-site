import { FicheDiagnosticChoixParcours } from "@/src/components/fiches-diagnostic/fiche-diagnostic-choix-parcours";

export default async function FicheDiagnosticChoixParcoursPage() {
  return (
    <div className="fr-container pt-8 text-black">
      <h1 className="mb-6 text-2xl font-bold">Je fais un diagnostic de surchauffe sur l’espace à rafraîchir</h1>
      <div className={"mb-4 text-lg"}>
        {"Avant de rafraîchir un espace, il est essentiel de comprendre son climat actuel. Cela permet de choisir " +
          "les meilleures solutions et d’en mesurer l’efficacité dans le temps. Nous vous proposons deux approches :"}
      </div>
      <div className={"mb-4 text-lg"}>
        <strong>{"Une analyse simplifiée et immédiate : "}</strong>
        {"Observez la surchauffe au sein de votre espace " +
          "à un instant “T” à l’aide de quatre indicateurs open source et de vos propres relevés terrain."}
      </div>
      <div className={"mb-10 text-lg"}>
        <strong>{"Un diagnostic approfondi : "}</strong>
        {"Sollicitez une expertise pour une analyse détaillée de l’effet d’îlot de chaleur urbain et/ou du confort " +
          "thermique, à différentes échelles."}
      </div>
      <FicheDiagnosticChoixParcours />
    </div>
  );
}
