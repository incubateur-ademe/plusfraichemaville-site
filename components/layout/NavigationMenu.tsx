"use client";
import { MainNavigation } from "@codegouvfr/react-dsfr/MainNavigation";
import { usePathname } from "next/navigation";
import { PFMV_ROUTES } from "@/helpers/routes";

export default function NavigationMenu() {
  const pathname = usePathname();
  return (
    <MainNavigation
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
      ]}
    />
  );
}
