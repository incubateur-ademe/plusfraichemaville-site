"use client";

import Button from "@codegouvfr/react-dsfr/Button";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { useUserStore } from "@/src/stores/user/provider";

export const ProtectedAgentPublicUrl = ({ children }: PropsWithChildren) => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const userInfos = useUserStore((state) => state.userInfos);
  const { back, push } = useRouter();

  if (!currentProjet || !userInfos?.is_agent_public) {
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
