"use client";
import Image from "next/image";
import clsx from "clsx";
import ProConnectButton from "@codegouvfr/react-dsfr/ProConnectButton";
import { signIn, useSession } from "next-auth/react";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import Button from "@codegouvfr/react-dsfr/Button";

export default function EspaceProjetIncentiveBanner({
  message,
  imagePath,
  className,
}: {
  message: string;
  imagePath: string;
  className: string;
}) {
  const handleSignIn = () => signIn("agentconnect", { callbackUrl: getFullUrl(PFMV_ROUTES.ESPACE_PROJET) });
  const projetId = useProjetsStore((state) => state.currentProjetId);
  const status = useSession().status;
  if (projetId) {
    return null;
  }
  return (
    <div
      className={clsx(
        "w-full rounded-2xl bg-dsfr-background-contrast-info text-center md:text-start",
        "grid gap-4 md:auto-cols-max md:grid-flow-col md:gap-16 ",
        "bg-[url(/images/espace-projet-incentive/background.svg)] bg-right-bottom bg-no-repeat",
        className,
      )}
    >
      <div className="mt-auto">
        <Image src={imagePath} alt="" width={210} height={200} className="relative hidden md:block" />
      </div>
      <div className={"mx-auto md:mt-6"}>
        <p className="fr-h5 max-w-[30rem] text-wrap">{message}</p>
        {status === "authenticated" ? (
          <Button className="my-4 rounded-3xl" linkProps={{ href: PFMV_ROUTES.ESPACE_PROJET }}>
            {"Démarrer sur l'espace projet !"}
          </Button>
        ) : (
          <ProConnectButton onClick={handleSignIn} />
        )}
      </div>
    </div>
  );
}
