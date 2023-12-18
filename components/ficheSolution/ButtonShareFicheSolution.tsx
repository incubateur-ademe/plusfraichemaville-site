"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ButtonShareFicheSolution({ className }: { className?: string }) {
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
            className="flex flex-row mb-4 text-dsfr-text-mention-grey cursor-pointer"
            onClick={copyCurrentUrlToClipboard}
          >
            <i className={`ri-share-forward-fill text-dsfr-text-label-blue-france mr-2`} />
            <span className="mt-[1px] text-dsfr-text-label-blue-france text-sm font-bold">Partager</span>
          </div>
        </>
      ) : (
        <div className="flex flex-row mb-4 text-dsfr-text-mention-grey">
          <i className={`ri-share-forward-fill text-dsfr-text-label-blue-france mr-2`} />
          <span className="mt-[1px] text-dsfr-text-label-blue-france text-sm font-bold">Partager</span>
        </div>
      )}
    </div>
  );
}
