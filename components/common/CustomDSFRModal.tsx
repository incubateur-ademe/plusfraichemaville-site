import { PropsWithChildren } from "react";

export default function CustomDSFRModal({ modalId, children }: { modalId: string } & PropsWithChildren) {
  return (
    <dialog
      role="dialog"
      id={modalId}
      className="fr-modal before:!flex-none before:!h-[5vh] after:!flex-none after:!h-[5vh]"
    >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center !block">
          <div className="max-w-[95%] my-0 mx-auto ">
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
