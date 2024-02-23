"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { SignInEmailForm } from "@/components/signin/SignInEmailForm";

const messages = {
  connect:
    "Connectez-vous et créez votre projet pour faire votre simulation budgétaire et accéder à de nombreuses recommandations.",
  save: "Connectez-vous pour sauvegarder vos solutions, faire une estimation budgétaire de votre projet et accéder à de nombreuses recommandations.",
};

type SignInCardProps = {
  callbackUrl?: string;
  message: keyof typeof messages;
};

export default function SignInCard({ callbackUrl, message }: SignInCardProps) {
  return (
    <div className="bg-dsfr-background-alt-grey rounded-2xl px-12 py-9 max-w-xl">
      <div className="text-xl font-bold text-dsfr-text-title-grey">{messages[message]}</div>
      <div className="mt-8 mb-8">
        Vous n’avez jamais utilisé AgentConnect? Renseignez simplement votre adresse professionnelle.
      </div>
      <div className="fr-connect-group">
        <button className="fr-connect" onClick={() => signIn("agentconnect", { callbackUrl })}>
          <span className="fr-connect__login">S’identifier avec</span>{" "}
          <span className="fr-connect__brand">AgentConnect</span>
        </button>
        <p>
          <a
            href="https://agentconnect.gouv.fr/"
            target="_blank"
            rel="noopener"
            title="Qu’est-ce que AgentConnect  ? - nouvelle fenêtre"
          >
            Qu’est-ce que AgentConnect ?
          </a>
        </p>
      </div>
      <hr className="pb-12 mt-12" />
      <SignInEmailForm />
    </div>
  );
}
