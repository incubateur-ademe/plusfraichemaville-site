import clsx from "clsx";
import { PropsWithChildren } from "react";

export default function CustomDSFRModal({
  modalId,
  children,
  isModalOpen,
}: { modalId: string; isModalOpen?: boolean } & PropsWithChildren) {
  return (
    <dialog
      role="dialog"
      id={modalId}
      className={clsx(
        "fr-modal before:!flex-none before:!h-[5vh] after:!flex-none after:!h-[5vh]",
        isModalOpen && "fr-modal--opened",
      )}
    >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="max-w-[95%]">
            <div className="customModalBody">
              <div className="fr-modal__header !pb-0">
                <button className="fr-btn--close fr-btn" title="Fermer la fenêtre modale" aria-controls={modalId}>
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
