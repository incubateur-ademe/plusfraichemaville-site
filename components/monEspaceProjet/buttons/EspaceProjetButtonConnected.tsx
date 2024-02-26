"use client";

import { PFMV_ROUTES } from "@/helpers/routes";
import { useUserStore } from "@/stores/user";
import Button from "@codegouvfr/react-dsfr/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const links = [
  {
    label: "Accéder à mes projets",
    url: PFMV_ROUTES.ESPACE_PROJET,
  },
  {
    label: "Mon profil",
    url: PFMV_ROUTES.ESPACE_PROJET,
  },
  // {
  //   label: "Se déconnecter",
  //   url: PFMV_ROUTES.DECONNEXION_AGENT_CONNECT,
  // },
];

export const Connected = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const setSession = useUserStore((state) => state.setSession);

  const onLogout = async () => {
    router.push(PFMV_ROUTES.DECONNEXION_AGENT_CONNECT);
    setSession(null);
  };

  const opener = () => setOpen(!open);
  const closer = () => {
    setOpen(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={opener}
        // eslint-disable-next-line max-len
        className={`fr-btn fr-btn--tertiary ri-dashboard-fill fr-btn--icon-left !text-sm !bg-dsfr-blue-france-925 !shadow-none z-10 relative`}
      >
        Mon espace projet
      </Button>
      {open && (
        <div className="absolute bg-white shadow-pfmv-card-shadow py-5 px-5 pl-3 w-56 top-[130%] right-0 text-right">
          <ul className="z-10 relative">
            {links.map((link, index) => (
              <li className="text-sm mb-4" key={index}>
                <Link onClick={closer} href={link.url}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="text-sm text-dsfr-text-label-blue-france font-bold cursor-pointer">
              <button onClick={onLogout}>Se déconnecter</button>
            </li>
          </ul>
          <div onClick={closer} className="w-screen h-screen fixed left-0 top-0 z-0"></div>
        </div>
      )}
    </div>
  );
};
