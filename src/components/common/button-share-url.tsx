"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { notifications } from "./notifications";
import Button from "@codegouvfr/react-dsfr/Button";

export default function ButtonShareUrl({ url, className }: { url: string; className?: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const copyCurrentUrlToClipboard = () => {
    navigator.clipboard.writeText(url);
    notifications("success", "FICHE_URL_COPY_CLIPBOARD");
  };
  return (
    <div className={`${className}`}>
      {isClient ? (
        <div className={clsx("flex flex-row items-center gap-2")}>
          <Button
            priority="tertiary"
            size="small"
            onClick={copyCurrentUrlToClipboard}
            className={clsx("!w-8 justify-center")}
          >
            <i className={clsx("fr-icon--sm fr-icon-links-line")} />
          </Button>
          <span className="mt-[1px] text-sm font-bold text-dsfr-text-label-blue-france">Copier le lien de la page</span>
        </div>
      ) : (
        <div className="mb-4 flex flex-row items-center gap-2 text-dsfr-text-mention-grey">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pfmv-navy">
            <i className={clsx(" fr-icon--sm ri-share-forward-fill text-white")} />
          </div>
          <span className="mt-[1px] text-sm font-bold text-dsfr-text-label-blue-france">Copier le lien de la page</span>
        </div>
      )}
    </div>
  );
}
