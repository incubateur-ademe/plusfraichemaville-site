"use client";
import { MainNavigation } from "@codegouvfr/react-dsfr/MainNavigation";
import { usePathname } from "next/navigation";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useSession } from "next-auth/react";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { NotificationElements, setBadgeOff } from "@/src/helpers/notification-badge";

export default function NavigationMenu() {
  const pathname = usePathname();
  const { status } = useSession();
  const setCurrentProjetId = useProjetsStore((state) => state.setCurrentProjetId);
  const cancelCurrentProjet = () => setCurrentProjetId(null);

  return (
    <MainNavigation
      items={[
        {
          isActive: pathname?.startsWith(PFMV_ROUTES.SURCHAUFFE_URBAINE_INTRODUCTION),
          text: "Surchauffe urbaine",
          menuLinks: [
            {
              linkProps: {
                href: PFMV_ROUTES.SURCHAUFFE_URBAINE_INTRODUCTION,
                target: "_self",
                onClick: cancelCurrentProjet,
              },
              text: "La ville dans une France à +4°C",
            },
            {
              linkProps: {
                href: PFMV_ROUTES.SURCHAUFFE_URBAINE_COMPRENDRE,
                target: "_self",
                onClick: cancelCurrentProjet,
              },
              text: "Comprendre la surchauffe urbaine",
            },
            {
              linkProps: {
                href: PFMV_ROUTES.SURCHAUFFE_URBAINE_TIMING,
                target: "_self",
                onClick: cancelCurrentProjet,
              },
              text: "Pourquoi et quand faire un diagnostic",
            },
            {
              linkProps: {
                href: PFMV_ROUTES.SURCHAUFFE_URBAINE_REX,
                target: "_self",
                onClick: cancelCurrentProjet,
              },
              text: "Diagnostics réalisés par les collectivités",
            },
          ],
        },
        {
          linkProps: { href: PFMV_ROUTES.AIDE_DECISION, target: "_self", onClick: cancelCurrentProjet },
          text: "Découvrir",
          isActive: pathname?.startsWith(PFMV_ROUTES.AIDE_DECISION),
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
              setBadgeOff(NotificationElements.selectionMenuItem);
            },
          },
          text: "Ma sélection",
          isActive: pathname?.startsWith(PFMV_ROUTES.MES_FICHES_SOLUTIONS),
          className: NotificationElements.selectionMenuItem,
        },
        {
          linkProps: { href: PFMV_ROUTES.WEBINAIRES, target: "_self", onClick: cancelCurrentProjet },
          text: "Webinaires",
          isActive: pathname?.startsWith(PFMV_ROUTES.WEBINAIRES),
        },
        {
          linkProps: { href: PFMV_ROUTES.CONTACT, target: "_self", onClick: cancelCurrentProjet },
          text: "Nous contacter",
          isActive: pathname?.startsWith(PFMV_ROUTES.CONTACT),
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
                      href: PFMV_ROUTES.DECONNEXION,
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
