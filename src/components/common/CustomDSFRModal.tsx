import clsx from "clsx";
import { PropsWithChildren } from "react";

type CustomDSFRModalProps = {
  modalId: string;
  className?: string;
  size?: "small" | "large";
  close: () => void;
} & PropsWithChildren;

export default function CustomDSFRModal({ modalId, size = "large", close, children, className }: CustomDSFRModalProps) {
  return (
    <dialog
      role="dialog"
      id={modalId}
      className={clsx(`fr-modal before:!h-[5vh] before:!flex-none after:!h-[5vh] after:!flex-none`, className)}
    >
      <div className="absolute left-0 top-0 h-full w-full bg-[#000] opacity-25" onClick={close}></div>
      <div className="fr-container fr-container--fluid fr-container-md relative">
        <div className="fr-grid-row fr-grid-row--center !block">
          <div className={clsx("mx-auto my-0", size === "large" ? "md:max-w-[95%]" : "md:max-w-[66%]")}>
            <div className="customModalBody" id={`custom-${modalId}`}>
              <div className="fr-modal__header">
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
