"use client";
import Image from "next/image";
import clsx from "clsx";
import ProConnectButton from "@codegouvfr/react-dsfr/ProConnectButton";
import { signIn, useSession } from "next-auth/react";
import { getFullUrl, PFMV_ROUTES } from "@/src/helpers/routes";
import Button from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { ModaleAideDecisionChoixProjet } from "@/src/components/common/espace-projet-incentive/modale-aide-decision-choix-projet";

export default function AideDecisionIncentiveBanner({ className }: { className?: string }) {
  const handleSignIn = () => signIn("agentconnect", { callbackUrl: getFullUrl(PFMV_ROUTES.ESPACE_PROJET) });
  const status = useSession().status;
  const modalChoixProjet = createModal({
    id: "aide-decision-choix-projet-modal",
    isOpenedByDefault: false,
  });

  return (
    <div
      className={clsx(
        "rounded-2xl bg-dsfr-background-contrast-info py-6",
        "flex gap-4 md:flex-row md:gap-16 ",
        className,
      )}
    >
      <div className="my-auto md:ml-8">
        <Image
          src="/images/espace-projet-incentive/apercu-aide-decision.png"
          alt=""
          width={320}
          height={400}
          className="relative hidden max-w-60 rounded-2xl md:block"
        />
      </div>
      <div className="flex flex-col justify-between gap-6">
        <div className="text-wrap text-lg font-bold ">
          Rechercher des solutions par type d'espace
          <br />
          Composez votre combinaison de solutions en répondant à quelques questions sur votre espace.
        </div>
        {status === "authenticated" ? (
          <Button className="rounded-3xl" onClick={modalChoixProjet.open}>
            Commencer
          </Button>
        ) : (
          <ProConnectButton onClick={handleSignIn} />
        )}
      </div>
      {status === "authenticated" && <ModaleAideDecisionChoixProjet modal={modalChoixProjet} />}
    </div>
  );
}
