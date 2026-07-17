"use client";

import { useSession } from "next-auth/react";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { DSFRModal } from "@/src/types/global";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { MATOMO_EVENT } from "@/src/helpers/matomo/matomo-tags";

export const DiagnosticParcoursLink = ({
  modal,
  textLink,
  className,
  matomoEvent,
}: {
  className?: string;
  textLink: string;
  modal: DSFRModal;
  matomoEvent?: MATOMO_EVENT;
}) => {
  const status = useSession().status;
  const router = useRouter();
  const handleButtonClick = async () => {
    if (matomoEvent) {
      trackEvent(matomoEvent);
    }
    if (status != "authenticated") {
      router.push(PFMV_ROUTES.CONNEXION);
    } else {
      modal.open();
    }
  };
  return (
    <>
      <button className={clsx("!fr-link", className)} onClick={handleButtonClick}>
        {textLink}
      </button>
    </>
  );
};
