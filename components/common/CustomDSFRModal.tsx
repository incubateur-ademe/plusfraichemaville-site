import clsx from "clsx";
import { PropsWithChildren } from "react";

export default function CustomDSFRModal({
  modalId,
  isModalOpen,
  close,
  children,
}: { isModalOpen: boolean; modalId: string; close: () => void } & PropsWithChildren) {
  return (
    <dialog
      role="dialog"
      id={modalId}
      className={clsx(
        "fr-modal before:!flex-none before:!h-[5vh] after:!flex-none after:!h-[5vh]",
        isModalOpen && "fr-modal--opened",
      )}
    >
      <div className="w-full h-full absolute left-0 top-0 bg-[#000] opacity-25" onClick={close}></div>
      <div className="fr-container fr-container--fluid fr-container-md relative">
        <div className="fr-grid-row fr-grid-row--center !block">
          <div className="max-w-[95%] my-0 mx-auto ">
            <div className="customModalBody">
              <div className="fr-modal__header !pb-0">
                <button
                  className="fr-btn--close fr-btn"
                  title="Fermer la fenêtre modale"
                  aria-controls={modalId}
                  onClick={close}
                >
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
