"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useModalStore } from "@/src/stores/modal/provider";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { useEffect } from "react";
import { UserProjetWithUser } from "@/src/lib/prisma/prismaCustomTypes";
import Button from "@codegouvfr/react-dsfr/Button";
import { Hidden } from "../common/hidden";

export type PartageOverviewDeleteOrQuitModaleState = {
  member?: UserProjetWithUser;
  options: {
    title: string;
    description: string;
    confirmLabel: string | null;
    action: (..._args: any[]) => void;
  };
} | null;

const modal = createModal({
  id: "partage-overview-delete-or-qui-modale",
  isOpenedByDefault: false,
});

export const PartageOverviewDeleteOrQuitModale = () => {
  const currentDeleteOrQuitModal = useModalStore((state) => state.currentDeleteOrQuitModal);
  const setCurrentDeleteOrQuitModal = useModalStore((state) => state.setCurrentDeleteOrQuitModal);

  useEffect(() => {
    if (currentDeleteOrQuitModal) {
      modal.open();
    }
  }, [currentDeleteOrQuitModal]);

  const isModalOpen = useIsModalOpen(modal, {
    onConceal: () => setCurrentDeleteOrQuitModal(null),
  });

  return (
    <>
      <modal.Component
        title={<Hidden>{currentDeleteOrQuitModal?.options.title ?? "Fiche détail de l'aide"}</Hidden>}
        size="large"
        className="current-user-status-modale min-h-[296px]"
      >
        <div>
          {isModalOpen && <h2 className="mb-4 text-2xl">{currentDeleteOrQuitModal?.options.title}</h2>}
          <p className="mb-4">{currentDeleteOrQuitModal?.options.description}</p>
          <div className="ml-auto w-fit">
            <Button priority="tertiary" className="mr-4" onClick={modal.close}>
              Annuler
            </Button>
            {currentDeleteOrQuitModal?.options.confirmLabel && (
              <Button
                priority="tertiary"
                className="!text-pfmv-climadiag-red"
                onClick={() => {
                  currentDeleteOrQuitModal?.options.action();
                  modal.close();
                }}
              >
                {currentDeleteOrQuitModal?.options.confirmLabel}
              </Button>
            )}
          </div>
        </div>
      </modal.Component>
    </>
  );
};
