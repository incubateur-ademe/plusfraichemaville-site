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
          text: "Découvrir",
          isActive: pathname?.startsWith("/aide-decision"),
        },
        {
          text: "Passer à l'action",
          isActive: pathname?.startsWith("/fiche-solution"),
          linkProps: { href: "/fiche-solution", target: "_self" },
        },
        {
          linkProps: { href: "/projet", target: "_self" },
          text: "S'inspirer",
          isActive: pathname?.startsWith("/projet"),
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
      ]}
    />
  );
}
