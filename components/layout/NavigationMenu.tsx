"use client";
import { MainNavigation } from "@codegouvfr/react-dsfr/MainNavigation";
import { usePathname } from "next/navigation";
import { PFMV_ROUTES } from "@/helpers/routes";
import { useSession } from "next-auth/react";
import { useProjetsStore } from "@/stores/projets/provider";
import { NOTIF_BADGE_CLASSNAME, navSelectionBadgeOff } from "@/helpers/notification-badge";

export default function NavigationMenu() {
  const pathname = usePathname();
  const { status } = useSession();
  const setCurrentProjetId = useProjetsStore((state) => state.setCurrentProjetId);
  const cancelCurrentProjet = () => setCurrentProjetId(null);

  return (
    <MainNavigation
      className="nav-main-navigation"
      items={[
        {
          linkProps: { href: PFMV_ROUTES.AIDE_DECISION, target: "_self", onClick: cancelCurrentProjet },
          text: "Découvrir",
          isActive: pathname?.startsWith(PFMV_ROUTES.AIDE_DECISION),
        },
        {
          linkProps: { href: PFMV_ROUTES.FICHES_DIAGNOSTIC, target: "_self", onClick: cancelCurrentProjet },
          text: "Méthodes de diagnostic",
          isActive: pathname?.startsWith(PFMV_ROUTES.FICHES_DIAGNOSTIC),
        },
        {
          text: "Passer à l'action",
          isActive: pathname?.startsWith(PFMV_ROUTES.FICHES_SOLUTIONS),
          linkProps: { href: PFMV_ROUTES.FICHES_SOLUTIONS, target: "_self", onClick: cancelCurrentProjet },
        },
        {
          linkProps: { href: PFMV_ROUTES.RETOURS_EXPERIENCE, target: "_self", onClick: cancelCurrentProjet },
          text: "S'inspirer",
          isActive: pathname?.startsWith(PFMV_ROUTES.RETOURS_EXPERIENCE),
        },
        {
          linkProps: {
            href: PFMV_ROUTES.MES_FICHES_SOLUTIONS,
            target: "_self",
            onClick: () => {
              cancelCurrentProjet();
              navSelectionBadgeOff();
            },
          },
          text: "Ma sélection",
          isActive: pathname?.startsWith(PFMV_ROUTES.MES_FICHES_SOLUTIONS),
          className: NOTIF_BADGE_CLASSNAME,
        },
        {
          linkProps: { href: "/contact", target: "_self", onClick: cancelCurrentProjet },
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
