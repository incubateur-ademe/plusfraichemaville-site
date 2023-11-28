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
          text: "Fiches techniques",
          isActive: pathname?.startsWith("/fiche-technique"),
          linkProps: { href: "/fiche-technique", target: "_self" },
        },
        {
          linkProps: { href: "/projet", target: "_self" },
          text: "Projets réalisés",
          isActive: pathname?.startsWith("/projet"),
        },
        {
          linkProps: { href: "/fiche-technique/favoris", target: "_self" },
          text: "Mon projet",
          isActive: pathname?.startsWith("/fiche-technique/favoris"),
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
