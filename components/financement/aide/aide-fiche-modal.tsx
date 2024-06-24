"use client";

import Button from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { PropsWithChildren } from "react";

type AideFicheModalProps = { id: number } & PropsWithChildren;

export const AideFicheModal = ({ id, children }: AideFicheModalProps) => {
  const modal = createModal({
    id: id.toString(),
    isOpenedByDefault: false,
  });

  return (
    <>
      <modal.Component title="" size="large" className="aide-modal relative">
        {children}
      </modal.Component>
      <Button
        priority="tertiary"
        className="!mx-auto mb-5 mt-auto !block rounded-3xl px-9"
        nativeButtonProps={modal.buttonProps}
      >
        {"J'explore la solution"}
      </Button>
    </>
  );
};
