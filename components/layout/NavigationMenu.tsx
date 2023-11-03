"use client";
import { MainNavigation } from "@codegouvfr/react-dsfr/MainNavigation";
import { usePathname } from "next/navigation";

export default function NavigationMenu() {
  const pathname = usePathname();
  return (
    <MainNavigation
      items={[
        {
          linkProps: { href: "/", target: "_self" },
          text: "Accueil",
          isActive: pathname === "/",
        },
        {
          linkProps: { href: "/aide-decision", target: "_self" },
          text: "Aide à la décision",
          isActive: pathname.startsWith("/aide-decision"),
        },
        {
          text: "Fiches techniques",
          isActive: pathname.startsWith("/fiche-technique"),
          menuLinks: [
            {
              linkProps: { href: "/fiche-technique", target: "_self" },
              text: "Toutes les fiches techniques",
            },
            {
              linkProps: { href: "/fiche-technique/favoris", target: "_self" },
              text: "Ma sélection de fiches techniques",
            },
          ],
        },
      ]}
    />
  );
}
