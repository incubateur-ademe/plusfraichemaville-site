"use client";

import { useIsLecteur } from "@/hooks/use-is-lecteur";
import Button from "@codegouvfr/react-dsfr/Button";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export const ProtectedEspaceProjetUrl = ({ children }: PropsWithChildren) => {
  const isLecteur = useIsLecteur();
  const { back, push } = useRouter();

  if (isLecteur) {
    return (
      <div className="fr-container pt-8">
        <h1 className="text-xl">{"Vous n'êtes pas autorisé à consulter cette page."}</h1>
        <Button onClick={back} priority="primary" className="mr-3 !rounded-[22px]">
          Retour
        </Button>
        <Button onClick={() => push("/")} priority="primary" className="!rounded-[22px]">
          Accueil
        </Button>
      </div>
    );
  }
  return children;
};
