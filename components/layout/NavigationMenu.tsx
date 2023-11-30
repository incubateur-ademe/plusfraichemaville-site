"use client";
import { MainNavigation } from "@codegouvfr/react-dsfr/MainNavigation";
import { usePathname } from "next/navigation";

export default function NavigationMenu() {
  const pathname = usePathname();
  return (
    <MainNavigation
      items={[
        {
          linkProps: { href: "/aide-decision", target: "_self" },
          text: "Aide à la décision",
          isActive: pathname?.startsWith("/aide-decision"),
        },
        {
          text: "Fiches solutions",
          isActive: pathname?.startsWith("/fiche-solution"),
          linkProps: { href: "/fiche-solution", target: "_self" },
        },
        {
          linkProps: { href: "/projet", target: "_self" },
          text: "Projets réalisés",
          isActive: pathname?.startsWith("/projet"),
        },
        {
          linkProps: { href: "/mon-projet/favoris", target: "_self" },
          text: "Mon projet",
          isActive: pathname?.startsWith("/mon-projet/favoris"),
        },
        {
          linkProps: { href: "/projet", target: "_self" },
          text: "Contact",
          isActive: pathname?.startsWith("/contact"),
        },
      ]}
    />
  );
}
