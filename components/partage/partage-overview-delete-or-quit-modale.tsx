"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useModalStore } from "@/stores/modal/provider";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { useEffect } from "react";
import { UserProjetWithUser } from "@/lib/prisma/prismaCustomTypes";
import Button from "@codegouvfr/react-dsfr/Button";

export type PartageOverviewDeleteOrQuitModaleState = {
  member: UserProjetWithUser;
  options: {
    title: string;
    description: string;
    confirmLabel: string;
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

  useIsModalOpen(modal, {
    onConceal: () => setCurrentDeleteOrQuitModal(null),
  });

  return (
    <>
      <modal.Component title="" size="large" className="current-user-status-modale min-h-[296px]">
        <div>
          <h2 className="mb-4 text-2xl">{currentDeleteOrQuitModal?.options.title}</h2>
          <p className="mb-4">{currentDeleteOrQuitModal?.options.description}</p>
          <div className="ml-auto w-fit">
            <Button priority="tertiary" className="mr-4" onClick={modal.close}>
              Annuler
            </Button>
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
          </div>
        </div>
      </modal.Component>
    </>
  );
};
