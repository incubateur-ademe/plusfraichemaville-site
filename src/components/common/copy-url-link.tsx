"use client";

import clsx from "clsx";
import { MouseEvent } from "react";
import { notifications } from "./notifications";

type CopyUrlLinkProps = {
  url: string;
  className?: string;
};

export const CopyUrlLink = ({ url, className }: CopyUrlLinkProps) => {
  const copyUrlToClipboard = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigator.clipboard.writeText(url);
    notifications("success", "FICHE_URL_COPY_CLIPBOARD");
  };

  return (
    <a href={url} onClick={copyUrlToClipboard} className={clsx("fr-link", className)}>
      Copier le lien de la page
    </a>
  );
};
