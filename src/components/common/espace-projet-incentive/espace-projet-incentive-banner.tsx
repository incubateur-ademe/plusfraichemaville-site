"use client";
import Image from "next/image";
import clsx from "clsx";
import ProConnectButton from "@codegouvfr/react-dsfr/ProConnectButton";
import { signIn } from "next-auth/react";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";

export default function EspaceProjetIncentiveBanner({
  message,
  imagePath,
  className,
}: {
  message: string;
  imagePath: string;
  className: string;
}) {
  const handleSignIn = () => signIn("agentconnect", { callbackUrl: getFullUrl(PFMV_ROUTES.ESPACE_PROJET_LISTE) });
  return (
    <div
      className={clsx(
        "w-full rounded-2xl bg-dsfr-background-contrast-info text-center md:text-start",
        "grid md:auto-cols-max md:grid-flow-col gap-4 md:gap-16 ",
        "bg-[url(/images/espace-projet-incentive/background.svg)] bg-no-repeat bg-right-bottom fr-card--shadow",
        className,
      )}
    >
      <div className="mt-auto">
        <Image src={imagePath} alt="" width={210} height={200} className="relative hidden md:block" />
      </div>
      <div className={"md:mt-6 mx-auto"}>
        <p className="fr-h5 max-w-[30rem] text-wrap">{message}</p>
        <ProConnectButton onClick={handleSignIn} />
      </div>
    </div>
  );
}
