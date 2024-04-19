"use client";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
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
            className="flex flex-row items-center gap-2 mb-4 text-dsfr-text-mention-grey cursor-pointer"
            onClick={copyCurrentUrlToClipboard}
          >
            <div
              className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center",
                "bg-pfmv-navy hover:!bg-dsfr-background-action-high-blue-france-active",
              )}
            >
              <i className={clsx("fr-icon--sm ri-share-forward-fill text-white")} />
            </div>
            <span className="mt-[1px] text-dsfr-text-label-blue-france text-sm font-bold">Partager</span>
          </div>
        </>
      ) : (
        <div className="flex flex-row items-center gap-2 mb-4 text-dsfr-text-mention-grey">
          <div className="bg-pfmv-navy w-8 h-8 rounded-full flex items-center justify-center">
            <i className={clsx(" fr-icon--sm ri-share-forward-fill text-white")} />
          </div>
          <span className="mt-[1px] text-dsfr-text-label-blue-france text-sm font-bold">Partager</span>
        </div>
      )}
    </div>
  );
}
