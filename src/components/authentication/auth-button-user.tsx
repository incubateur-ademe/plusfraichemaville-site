"use client";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import clsx from "clsx";
import Image from "next/image";

import { useState } from "react";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import Button from "@codegouvfr/react-dsfr/Button";

export const AuthButtonUser = () => {
  const [open, setOpen] = useState(false);
  const opener = () => setOpen(!open);
  const closer = () => {
    setOpen(false);
  };

  const links = [
    {
      label: "Mon profil",
      url: PFMV_ROUTES.MON_PROFIL,
    },
    {
      label: "Se déconnecter",
      url: PFMV_ROUTES.DECONNEXION,
      className: "text-dsfr-text-label-blue-france font-bold",
    },
  ];

  return (
    <div className="relative">
      <Button
        onClick={opener}
        iconId="ri-arrow-down-s-fill"
        iconPosition="right"
        priority="tertiary no outline"
      >
        <Image src="/images/auth/user.svg" width={28} height={28} alt="Mon compte" />
      </Button>
      {open && (
        <div
          className={clsx(
            "absolute right-0 top-[130%] w-[9.5rem] bg-white p-3 text-right shadow-pfmv-card-shadow",
          )}
        >
          <ul className="relative z-10 flex flex-col gap-3">
            {links.map((link, index) => (
              <li className={`text-sm ${link.className}`} key={index}>
                <LinkWithoutPrefetch onClick={closer} href={link.url}>
                  {link.label}
                </LinkWithoutPrefetch>
              </li>
            ))}
          </ul>
          <div onClick={closer} className="fixed left-0 top-0 z-0 h-screen w-screen"></div>
        </div>
      )}
    </div>
  );
};
