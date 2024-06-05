"use client";
import { PFMV_ROUTES } from "@/helpers/routes";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

export const AuthButtonUser = () => {
  const { status } = useSession();
  const isAuthanticated = status === "authenticated";
  const [open, setOpen] = useState(false);
  const opener = () => setOpen(!open);
  const closer = () => {
    setOpen(false);
  };

  const links = [
    {
      label: "Mon profil",
      url: PFMV_ROUTES.MON_PROFIL,
      shouldDisplay: isAuthanticated,
    },
    {
      label: isAuthanticated ? "Se déconnecter" : "Se connecter",
      url: isAuthanticated ? PFMV_ROUTES.DECONNEXION_AGENT_CONNECT : PFMV_ROUTES.ESPACE_PROJET,
      className: "text-dsfr-text-label-blue-france font-bold",
      shouldDisplay: true,
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
            "absolute right-0 top-[130%] w-40 bg-white px-5 pb-1 pl-3 pt-5 text-right shadow-pfmv-card-shadow",
          )}
        >
          <ul className="relative z-10">
            {links.map(
              (link, index) =>
                link.shouldDisplay && (
                  <li className={`mb-3 text-sm ${link.className}`} key={index}>
                    <Link onClick={closer} href={link.url}>
                      {link.label}
                    </Link>
                  </li>
                ),
            )}
          </ul>
          <div onClick={closer} className="fixed left-0 top-0 z-0 h-screen w-screen"></div>
        </div>
      )}
    </div>
  );
};
