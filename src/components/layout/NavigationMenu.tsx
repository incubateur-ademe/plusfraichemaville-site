"use client";
import { MainNavigation } from "@codegouvfr/react-dsfr/MainNavigation";
import { usePathname } from "next/navigation";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useSession } from "next-auth/react";
import { useProjetsStore } from "@/src/stores/projets/provider";

export default function NavigationMenu() {
  const pathname = usePathname();
  const { status } = useSession();
  const setCurrentProjetId = useProjetsStore((state) => state.setCurrentProjetId);
  const cancelCurrentProjet = () => setCurrentProjetId(null);

  return (
    <MainNavigation
      id="header-navigation"
      items={[
        {
          isActive:
            pathname === PFMV_ROUTES.SURCHAUFFE_URBAINE_INTRODUCTION ||
            pathname === PFMV_ROUTES.SURCHAUFFE_URBAINE_COMPRENDRE ||
            pathname === PFMV_ROUTES.SURCHAUFFE_URBAINE_TERRITOIRE ||
            pathname === PFMV_ROUTES.SURCHAUFFE_URBAINE_RISQUES_SANTE ||
            pathname === PFMV_ROUTES.SURCHAUFFE_URBAINE_REPONDRE_URGENCE,
          text: "Comprendre",
          menuLinks: [
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
              text: "Les notions clés de la surchauffe urbaine",
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
            {
              linkProps: {
                href: PFMV_ROUTES.SURCHAUFFE_URBAINE_RISQUES_SANTE,
                target: "_self",
                onClick: cancelCurrentProjet,
                prefetch: false,
              },
              text: "Surchauffe urbaine : quels risques pour la santé ?",
            },
            {
              linkProps: {
                href: PFMV_ROUTES.SURCHAUFFE_URBAINE_REPONDRE_URGENCE,
                target: "_self",
                onClick: cancelCurrentProjet,
                prefetch: false,
              },
              text: "Vague de chaleur : répondre à l'urgence, rafraîchir durablement son territoire",
            },
          ],
        },
        {
          isActive:
            pathname?.startsWith(PFMV_ROUTES.RETOURS_EXPERIENCE_PROJET) ||
            pathname?.startsWith(PFMV_ROUTES.RETOURS_EXPERIENCE_DIAGNOSTIC),
          text: "S'inspirer",
          menuLinks: [
            {
              linkProps: {
                href: PFMV_ROUTES.RETOURS_EXPERIENCE_DIAGNOSTIC,
                target: "_self",
                onClick: cancelCurrentProjet,
                prefetch: false,
              },
              text: "Diagnostics réalisés par les collectivités",
              isActive: pathname?.startsWith(PFMV_ROUTES.RETOURS_EXPERIENCE_DIAGNOSTIC),
            },
            {
              linkProps: {
                href: PFMV_ROUTES.RETOURS_EXPERIENCE_PROJET,
                target: "_self",
                onClick: cancelCurrentProjet,
                prefetch: false,
              },
              text: "Solutions mises en place par les collectivités",
              isActive: pathname?.startsWith(PFMV_ROUTES.RETOURS_EXPERIENCE_PROJET),
            },
          ],
        },
        {
          isActive:
            pathname?.startsWith(PFMV_ROUTES.SURCHAUFFE_URBAINE_TIMING) ||
            pathname?.startsWith(PFMV_ROUTES.FICHES_SOLUTIONS),
          text: "Passer à l'action",
          menuLinks: [
            {
              text: (<span className="font-bold">Créer un projet de rafraîchissement</span>),
              linkProps: {
                className: "bg-dsfr-beige-galet",
                href: PFMV_ROUTES.ESPACE_PROJET,
                target: "_self",
                onClick: cancelCurrentProjet,
                prefetch: false,
              },
            },
            {
              text: "Faire un diagnostic de la surchauffe urbaine",
              isActive: pathname?.startsWith(PFMV_ROUTES.SURCHAUFFE_URBAINE_TIMING),
              linkProps: {
                href: PFMV_ROUTES.SURCHAUFFE_URBAINE_TIMING,
                target: "_self",
                onClick: cancelCurrentProjet,
                prefetch: false,
              },
            },
            {
              text: "Trouver une solution adaptée à votre projet",
              isActive: pathname?.startsWith(PFMV_ROUTES.FICHES_SOLUTIONS),
              linkProps: {
                href: PFMV_ROUTES.FICHES_SOLUTIONS,
                target: "_self",
                onClick: cancelCurrentProjet,
                prefetch: false,
              },
            },
          ],
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
          linkProps: {
            href: PFMV_ROUTES.RECHERCHE_GLOBALE(),
            target: "_self",
            onClick: cancelCurrentProjet,
            prefetch: false,
          },
          text: "Rechercher",
          isActive: pathname?.startsWith(PFMV_ROUTES.RECHERCHE_GLOBALE()),
          className: "lg:hidden",
        },
        {
          menuLinks:
            status === "authenticated"
              ? [
                  {
                    linkProps: {
                      href: PFMV_ROUTES.ESPACE_PROJET,
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
          text: "Mes projets",
          className: "lg:hidden",
        },
      ]}
    />
  );
}
