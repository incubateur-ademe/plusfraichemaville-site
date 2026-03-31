"use client";

import { useSession } from "next-auth/react";
import Button from "@codegouvfr/react-dsfr/Button";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { DSFRModal } from "@/src/types/global";

export const GenericDiagnosticModuleButton = ({ modal, className }: { className?: string; modal: DSFRModal }) => {
  const status = useSession().status;
  const router = useRouter();
  const handleButtonClick = async () => {
    if (status != "authenticated") {
      router.push(PFMV_ROUTES.CONNEXION);
    } else {
      modal.open();
    }
  };
  return (
    <>
      <Button className={clsx("rounded-3xl", className)} onClick={handleButtonClick}>
        {status != "authenticated" ? "Démarrer sur l'espace projet !" : "Allez au module diagnostic de votre projet"}
      </Button>
    </>
  );
};
