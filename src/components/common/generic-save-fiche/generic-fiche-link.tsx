"use client";

import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

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
    <LinkWithoutPrefetch href={url} className={className} onClick={onClick}>
      {children}
    </LinkWithoutPrefetch>
  );
};
