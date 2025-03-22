"use client";

import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

type GenericFicheLinkProps = {
  href: string;
  className?: string;
  onClick?: () => void;
} & PropsWithChildren;

export const GenericFicheLink = ({ children, className, href, onClick }: GenericFicheLinkProps) => {
  const pathname = usePathname();
  const projetId = useProjetsStore((state) => state.currentProjetId);
  const url =
    pathname.startsWith(PFMV_ROUTES.ESPACE_PROJET) && !href.startsWith(PFMV_ROUTES.ESPACE_PROJET)
      ? `/espace-projet/${projetId}${href}`
      : href;

  return (
    <Link href={url} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};
