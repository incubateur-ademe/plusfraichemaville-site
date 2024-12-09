import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";

export const metadata: Metadata = computeMetadata("Politique des cookies");

export default async function PagePolitiqueDesCookies() {
  return (
    <div className="fr-container pt-12">
      <h1>Politique des cookies</h1>
      <p>{"Ce site n'utilise pas cookie optionnel."}</p>
      <p>
        {"Les cookies utilisés sur ce site ne servent qu'à l'authentification lors " +
          "de la connexion à votre espace projet."}
      </p>
    </div>
  );
}
