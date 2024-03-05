"use client";
import { MainNavigation } from "@codegouvfr/react-dsfr/MainNavigation";
import { usePathname } from "next/navigation";
import { PFMV_ROUTES } from "@/helpers/routes";
import { useSession } from "next-auth/react";

export default function NavigationMenu() {
  const pathname = usePathname();
  const { status } = useSession();

  return (
    <MainNavigation
      className="nav-main-navigation"
      items={[
        {
          linkProps: { href: PFMV_ROUTES.AIDE_DECISION, target: "_self" },
          text: "Découvrir",
          isActive: pathname?.startsWith(PFMV_ROUTES.AIDE_DECISION),
        },
        {
          text: "Passer à l'action",
          isActive: pathname?.startsWith(PFMV_ROUTES.FICHES_SOLUTIONS),
          linkProps: { href: PFMV_ROUTES.FICHES_SOLUTIONS, target: "_self" },
        },
        {
          linkProps: { href: PFMV_ROUTES.RETOURS_EXPERIENCE, target: "_self" },
          text: "S'inspirer",
          isActive: pathname?.startsWith(PFMV_ROUTES.RETOURS_EXPERIENCE),
        },
        {
          linkProps: { href: "/mon-projet/favoris", target: "_self" },
          text: "Ma sélection",
          isActive: pathname?.startsWith("/mon-projet/favoris"),
        },
        {
          linkProps: { href: "/contact", target: "_self" },
          text: "Nous contacter",
          isActive: pathname?.startsWith("/contact"),
        },
        {
          menuLinks:
            status === "authenticated"
              ? [
                  {
                    linkProps: {
                      href: PFMV_ROUTES.ESPACE_PROJET_LISTE,
                    },
                    text: "Accéder à mes projets",
                  },
                  {
                    linkProps: {
                      href: PFMV_ROUTES.MON_PROFIL,
                    },
                    text: "Mon profil",
                  },
                  {
                    linkProps: {
                      href: PFMV_ROUTES.DECONNEXION_AGENT_CONNECT,
                    },
                    text: "Se déconnecter",
                  },
                ]
              : [
                  {
                    linkProps: {
                      href: PFMV_ROUTES.CONNEXION,
                    },
                    text: "Se connecter",
                  },
                ],
          text: "Mon Espace Projet",
          className: "lg:hidden",
        },
      ]}
    />
  );
}
