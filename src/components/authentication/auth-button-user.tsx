"use client";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import clsx from "clsx";
import Image from "next/image";

import { useState } from "react";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

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
    <div className="relative h-7">
      <button onClick={opener} className="flex items-center gap-1 hover:!bg-white">
        <Image src="/images/auth/user.svg" width={28} height={28} alt="" />{" "}
        <span className={clsx("text-[10px]", open ? "text-dsfr-text-label-blue-france" : "text-pfmv-light-grey")}>
          ▼
        </span>
      </button>
      {open && (
        <div
          className={clsx(
            "absolute right-0 top-[130%] w-40 bg-white px-5 pb-1 pl-3 pt-3 text-right shadow-pfmv-card-shadow",
          )}
        >
          <ul className="relative z-10">
            {links.map((link, index) => (
              <li className={`mb-3 text-sm ${link.className}`} key={index}>
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
