"use client";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { Button, ButtonProps } from "@codegouvfr/react-dsfr/Button";
import { AgentConnectCard } from "../cards/AgentConnect";
import { ReactNode } from "react";

type PickedButtonProps = ButtonProps.Common & Pick<ButtonProps.WithIcon, "iconId" | "title">;

type BaseProps = {
  label?: string;
  id: string;
  children?: ReactNode;
};

type EspaceProjetConnectButtonWithModalProps = {
  button: PickedButtonProps & BaseProps;
};

/**
 * Bouton qui déclenche l'affichage d'une modal de login au clic.
 */
export function EspaceProjetConnectButtonWithModal({ button }: EspaceProjetConnectButtonWithModalProps) {
  const modal = createModal({
    id: button.id,
    isOpenedByDefault: false,
  });

  return (
    <div className="absolute z-[1000] top-10 right-10 w-3xl">
      <modal.Component
        size="large"
        title={
          <>
            Pour sauvegarder une solution, <span className="text-dsfr-blue-france-sun-113">connectez-vous.</span>
          </>
        }
      >
        <span className="block mb-9">Retrouvez toutes vos solutions sauvegardées dans Ma sélection.</span>
        <AgentConnectCard />
      </modal.Component>
      <Button {...button} onClick={() => modal.open()}>
        {button.label}
      </Button>
    </div>
  );
}
