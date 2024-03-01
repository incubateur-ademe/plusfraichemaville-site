"use client";

import { PFMV_ROUTES } from "@/helpers/routes";
import Button from "@codegouvfr/react-dsfr/Button";
import Link from "next/link";

import { useState } from "react";

const links = [
  {
    label: "Accéder à mes projets",
    url: PFMV_ROUTES.ESPACE_PROJET_LISTE,
  },
  {
    label: "Mon profil",
    url: PFMV_ROUTES.MON_PROFIL,
  },
  {
    label: "Se déconnecter",
    url: PFMV_ROUTES.DECONNEXION_AGENT_CONNECT,
    className: "text-dsfr-text-label-blue-france font-bold",
  },
];

export const Connected = () => {
  const [open, setOpen] = useState(false);

  const opener = () => setOpen(!open);
  const closer = () => {
    setOpen(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={opener}
        // eslint-disable-next-line max-len
        className={
          // eslint-disable-next-line max-len
          "fr-btn fr-btn--tertiary ri-dashboard-fill fr-btn--icon-left !text-sm !bg-dsfr-blue-france-925 !shadow-none z-10 relative"
        }
      >
        Mon espace projet
      </Button>
      {open && (
        <div className="absolute bg-white shadow-pfmv-card-shadow py-5 px-5 pl-3 w-56 top-[130%] right-0 text-right">
          <ul className="z-10 relative">
            {links.map((link, index) => (
              <li className={`text-sm mb-4 ${link.className}`} key={index}>
                <Link onClick={closer} href={link.url}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div onClick={closer} className="w-screen h-screen fixed left-0 top-0 z-0"></div>
        </div>
      )}
    </div>
  );
};
