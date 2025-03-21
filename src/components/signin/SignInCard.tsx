"use client";
import { signIn } from "next-auth/react";

import { PFMV_ROUTES } from "@/src/helpers/routes";
import clsx from "clsx";

const messages = {
  connect:
    // eslint-disable-next-line max-len
    "Vous êtes agent ou élu(e) d’une collectivité ? Connectez-vous, créez votre projet et accédez à de nombreuses recommandations !",
  // eslint-disable-next-line max-len
  save: "Vous êtes agent ou élu(e) d’une collectivité ? Connectez-vous pour sauvegarder vos solutions et accéder à de nombreuses recommandations.",
};

type SignInCardProps = {
  callbackUrl?: string;
  message: keyof typeof messages;
  className?: string;
};

export default function SignInCard({
  callbackUrl = process.env.NEXT_PUBLIC_URL_SITE + PFMV_ROUTES.ESPACE_PROJET_LISTE,
  message,
  className,
}: SignInCardProps) {
  const handleSignIn = () => signIn("agentconnect", { callbackUrl });

  return (
    <div className={clsx("max-w-xl rounded-2xl bg-dsfr-background-alt-grey px-12 py-9", className)}>
      <h2 className="text-xl font-bold text-dsfr-text-title-grey">{messages[message]}</h2>
      <div className="mb-8 mt-8">
        Pour vous connecter avec ProConnect, il vous suffit de renseigner votre adresse professionnelle.
      </div>
      <div className="fr-connect-group">
        <button className="fr-connect" onClick={handleSignIn}>
          <span className="fr-connect__login">S’identifier avec</span>{" "}
          <span className="fr-connect__brand">ProConnect</span>
        </button>
        <p>
          <a
            href="https://www.proconnect.gouv.fr/"
            target="_blank"
            rel="noopener"
            title="Qu’est-ce que ProConnect  ? - nouvelle fenêtre"
          >
            Qu’est-ce que ProConnect ?
          </a>
        </p>
      </div>
    </div>
  );
}
