"use client";

import { useProjetsStore } from "@/src/stores/projets/provider";
import { PropsWithChildren } from "react";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { ROUTE_COUPLES } from "@/src/components/common/generic-links/route-couples";

type GenericLinkProps = {
  page: keyof typeof ROUTE_COUPLES;
  className?: string;
  onClick?: () => void;
} & PropsWithChildren;

export const GenericLink = ({ page, children, className, onClick }: GenericLinkProps) => {
  const projetId = useProjetsStore((state) => state.currentProjetId);
  const url = !projetId ? ROUTE_COUPLES[page].public : ROUTE_COUPLES[page].espaceProjet(projetId);

  return (
    <LinkWithoutPrefetch href={url} className={className} onClick={onClick}>
      {children}
    </LinkWithoutPrefetch>
  );
};
