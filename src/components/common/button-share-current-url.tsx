"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ButtonShareCurrentUrl({ className }: { className?: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const copyCurrentUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Le lien vers cette page a été copié dans votre presse papier.", {
      id: "clipboard",
      duration: 5000,
    });
  };
  return (
    <div className={`${className}`}>
      {isClient ? (
        <>
          <div
            className="mb-4 flex cursor-pointer flex-row items-center gap-2 text-dsfr-text-mention-grey"
            onClick={copyCurrentUrlToClipboard}
          >
            <div
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded-full",
                "bg-pfmv-navy hover:!bg-dsfr-background-action-high-blue-france-active",
              )}
            >
              <i className={clsx("fr-icon--sm ri-share-forward-fill text-white")} />
            </div>
            <span className="mt-[1px] text-sm font-bold text-dsfr-text-label-blue-france">Partager</span>
          </div>
        </>
      ) : (
        <div className="mb-4 flex flex-row items-center gap-2 text-dsfr-text-mention-grey">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pfmv-navy">
            <i className={clsx(" fr-icon--sm ri-share-forward-fill text-white")} />
          </div>
          <span className="mt-[1px] text-sm font-bold text-dsfr-text-label-blue-france">Partager</span>
        </div>
      )}
    </div>
  );
}
