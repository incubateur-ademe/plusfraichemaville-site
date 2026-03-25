"use client";

import { useSession } from "next-auth/react";
import Button from "@codegouvfr/react-dsfr/Button";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import React from "react";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { ModaleDiagnosticModuleOutsideProjet } from "@/src/components/surchauffe-urbaine/diagnostic-module-incentive/modale-diagnostic-module-outside-projet";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export const GenericDiagnosticModuleButton = ({ className }: { className?: string }) => {
  const status = useSession().status;
  const router = useRouter();
  const modal = createModal({
    id: `diagnostic-projet-modal`,
    isOpenedByDefault: false,
  });
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
      <ModaleDiagnosticModuleOutsideProjet
        modal={modal}
        linkSuffix={PFMV_ROUTES.ESPACE_PROJET_DIAGNOSTIC_CHOIX_PARCOURS_SUFFIX}
      />
    </>
  );
};
