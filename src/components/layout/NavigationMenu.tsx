"use client";
import { MainNavigation } from "@codegouvfr/react-dsfr/MainNavigation";
import { usePathname } from "next/navigation";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useSession } from "next-auth/react";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { NavigationCard } from "@/src/components/navigation/navigation-card";

export default function NavigationMenu() {
  const pathname = usePathname();
  const { status } = useSession();
  const setCurrentProjetId = useProjetsStore((state) => state.setCurrentProjetId);
  const cancelCurrentProjet = () => setCurrentProjetId(null);

  return (
    <MainNavigation
      items={[
        {
          isActive:
            pathname === PFMV_ROUTES.SURCHAUFFE_URBAINE_INTRODUCTION ||
            pathname === PFMV_ROUTES.SURCHAUFFE_URBAINE_COMPRENDRE ||
            pathname === PFMV_ROUTES.SURCHAUFFE_URBAINE_TERRITOIRE ||
            pathname.startsWith(PFMV_ROUTES.FICHES_SOLUTIONS),
          text: "Comprendre",
          megaMenu: {
            categories: [
              {
                categoryMainText: "Comprendre la surchauffe urbaine",
                links: [
                  {
                    linkProps: {
                      href: PFMV_ROUTES.SURCHAUFFE_URBAINE_INTRODUCTION,
                      target: "_self",
                      onClick: cancelCurrentProjet,
                      prefetch: false,
                    },
                    text: "La ville dans une France à +4°C",
                  },
                  {
                    linkProps: {
                      href: PFMV_ROUTES.SURCHAUFFE_URBAINE_COMPRENDRE,
                      target: "_self",
                      onClick: cancelCurrentProjet,
                      prefetch: false,
                    },
                    text: "Comprendre les notions clés",
                  },
                  {
                    linkProps: {
                      href: PFMV_ROUTES.SURCHAUFFE_URBAINE_TERRITOIRE,
                      target: "_self",
                      onClick: cancelCurrentProjet,
                      prefetch: false,
                    },
                    text: "Connaître la sensibilité actuelle et future de ma ville à la surchauffe urbaine",
                  },
                ],
              },
              {
                categoryMainText: "Comprendre comment rafraîchir la ville",
                links: [
                  {
                    linkProps: {
                      href: PFMV_ROUTES.FICHES_SOLUTIONS,
                      target: "_self",
                      onClick: cancelCurrentProjet,
                      prefetch: false,
                    },
                    text: "Explorer toutes les solutions",
                  },
                ],
              },
            ],
          },
        },
        {
          isActive:
            pathname?.startsWith(PFMV_ROUTES.AIDE_DECISION) ||
            pathname?.startsWith(PFMV_ROUTES.SURCHAUFFE_URBAINE_TIMING),
          text: "Passer à l'action",
          className: "menuCategoryShadowNone",
          megaMenu: {
            categories: [
              {
                categoryMainLink: {
                  text: (
                    <NavigationCard
                      imageUrl="/images/navigation/faire-diagnostic.webp"
                      title="Faire un diagnostic de la surchauffe urbaine"
                    />
                  ),
                  linkProps: {
                    href: PFMV_ROUTES.SURCHAUFFE_URBAINE_TIMING,
                    target: "_self",
                    onClick: cancelCurrentProjet,
                    prefetch: false,
                  },
                },
                links: [],
              },
              {
                categoryMainLink: {
                  text: (
                    <NavigationCard
                      imageUrl="/images/navigation/trouver-solution.webp"
                      title="Trouver une solution adaptée à votre espace à rafraîchir"
                    />
                  ),
                  linkProps: {
                    href: PFMV_ROUTES.AIDE_DECISION,
                    target: "_self",
                    onClick: cancelCurrentProjet,
                    prefetch: false,
                  },
                },
                links: [],
              },
              {
                categoryMainLink: {
                  text: (
                    <NavigationCard
                      imageUrl="/images/navigation/creer-projet.webp"
                      title="Créer un projet de rafraîchissement de A à Z"
                    />
                  ),
                  linkProps: {
                    href: PFMV_ROUTES.ESPACE_PROJET,
                    target: "_self",
                    onClick: cancelCurrentProjet,
                    prefetch: false,
                  },
                },
                links: [],
              },
            ],
          },
        },
        {
          isActive:
            pathname?.startsWith(PFMV_ROUTES.RETOURS_EXPERIENCE_DIAGNOSTIC) ||
            pathname?.startsWith(PFMV_ROUTES.RETOURS_EXPERIENCE_PROJET),
          text: "S'inspirer",
          className: "menuCategoryShadowNone",
          megaMenu: {
            categories: [
              {
                categoryMainLink: {
                  text: (
                    <NavigationCard
                      imageUrl="/images/navigation/rex-diagnostic.webp"
                      title="S'inspirer des diagnostics réalisés par les collectivités"
                    />
                  ),
                  linkProps: {
                    href: PFMV_ROUTES.RETOURS_EXPERIENCE_DIAGNOSTIC,
                    target: "_self",
                    onClick: cancelCurrentProjet,
                    prefetch: false,
                  },
                },
                links: [],
              },
              {
                categoryMainLink: {
                  text: (
                    <NavigationCard
                      imageUrl="/images/navigation/rex-projet.webp"
                      title="S'inspirer des projets réalisés par les collectivités"
                    />
                  ),
                  linkProps: {
                    href: PFMV_ROUTES.RETOURS_EXPERIENCE_PROJET,
                    target: "_self",
                    onClick: cancelCurrentProjet,
                    prefetch: false,
                  },
                },
                links: [],
              },
            ],
          },
        },
        {
          linkProps: {
            href: PFMV_ROUTES.WEBINAIRES,
            target: "_self",
            onClick: cancelCurrentProjet,
            prefetch: false,
          },
          text: "Webinaires",
          isActive: pathname?.startsWith(PFMV_ROUTES.WEBINAIRES),
        },
        {
          linkProps: {
            href: PFMV_ROUTES.CONTACT,
            target: "_self",
            onClick: cancelCurrentProjet,
            prefetch: false,
          },
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
                      prefetch: false,
                    },
                    text: "Accéder à mes projets",
                  },
                  {
                    linkProps: {
                      href: PFMV_ROUTES.MON_PROFIL,
                      prefetch: false,
                    },
                    text: "Mon profil",
                  },
                  {
                    linkProps: {
                      href: PFMV_ROUTES.DECONNEXION,
                      prefetch: false,
                    },
                    text: "Se déconnecter",
                  },
                ]
              : [
                  {
                    linkProps: {
                      href: PFMV_ROUTES.CONNEXION,
                      prefetch: false,
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
