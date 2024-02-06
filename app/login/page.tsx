import React from "react";
import AgentConnectButton from "@codegouvfr/react-dsfr/AgentConnectButton";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default async function EspaceProjet() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/api/auth/callback"; // Define a callback URL or use a default one.
  return (
    <div className="fr-container">
      <div className="text-dsfr-text-title-grey font-bold text-[1.75rem] mt-8 text-center">Espace projet</div>
      <div className="bg-dsfr-background-alt-grey rounded-2xl pl-12 pt-9 mt-12">
        <div className="text-xl">
          Connectez-vous et créez votre projet pour faire votre simulation budgétaire et accéder à de nombreuses
          recommandations.
        </div>
        <div className="mt-8">
          Vous n’avez jamais utilisé AgentConnect? Renseignez simplement votre adresse professionnelle.
        </div>
        <AgentConnectButton onClick={() => signIn("ac", { callbackUrl })} />
      </div>
    </div>
  );
}
