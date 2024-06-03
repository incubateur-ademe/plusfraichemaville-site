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
          "fr-btn fr-btn--tertiary ri-dashboard-fill fr-btn--icon-left relative z-10 !bg-dsfr-background-action-low-blue-france !text-sm !shadow-none"
        }
      >
        Mon espace projet
      </Button>
      {open && (
        <div className="absolute right-0 top-[130%] w-56 bg-white px-5 py-5 pl-3 text-right shadow-pfmv-card-shadow">
          <ul className="relative z-10">
            {links.map((link, index) => (
              <li className={`mb-4 text-sm ${link.className}`} key={index}>
                <Link onClick={closer} href={link.url}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div onClick={closer} className="fixed left-0 top-0 z-0 h-screen w-screen"></div>
        </div>
      )}
    </div>
  );
};
