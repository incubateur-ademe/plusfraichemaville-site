"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { PropsWithChildren } from "react";

type AideFicheModalProps = { id: number } & PropsWithChildren;

export const AideFicheModal = ({ id, children }: AideFicheModalProps) => {
  const modal = createModal({
    id: id.toString(),
    isOpenedByDefault: false,
  });

  return (
    <div>
      <modal.Component title="" size="large" className="aide-modal relative">
        <button className="absolute right-8 top-8 text-pfmv-navy" onClick={modal.close}>
          <i className="ri-close-line"></i>
        </button>
        {children}
      </modal.Component>
    </div>
  );
};
