"use client";

import { useSession } from "next-auth/react";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { DSFRModal } from "@/src/types/global";

export const DiagnosticParcoursLink = ({
  modal,
  textLink,
  className,
}: {
  className?: string;
  textLink: string;
  modal: DSFRModal;
}) => {
  const status = useSession().status;
  const router = useRouter();
  const handleButtonClick = async () => {
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
