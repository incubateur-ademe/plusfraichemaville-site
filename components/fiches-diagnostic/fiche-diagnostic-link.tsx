"use client";

import { PFMV_ROUTES } from "@/helpers/routes";
import { useProjetsStore } from "@/stores/projets/provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

type FicheDiagnosticLinkProps = {
  href: string;
  className?: string;
} & PropsWithChildren;

export const FicheDiagnosticLink = ({ children, className, href }: FicheDiagnosticLinkProps) => {
  const pathname = usePathname();
  const projetId = useProjetsStore((state) => state.currentProjetId);
  const url = pathname.startsWith(PFMV_ROUTES.ESPACE_PROJET) ? `/espace-projet/${projetId}${href}` : href;

  return (
    <Link href={url} className={className}>
      {children}
    </Link>
  );
};
