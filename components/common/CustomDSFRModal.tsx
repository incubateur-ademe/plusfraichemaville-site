import { PropsWithChildren } from "react";

export default function CustomDSFRModal({ modalId, children }: { modalId: string } & PropsWithChildren) {
  return (
    <dialog role="dialog" id={modalId} className="fr-modal">
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="max-w-[95%]">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
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
