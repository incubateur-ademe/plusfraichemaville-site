"use client";

import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { PropsWithChildren } from "react";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

type GenericFicheLinkProps = {
  slug: string;
  className?: string;
  onClick?: () => void;
} & PropsWithChildren;

export const FicheDiagLink = ({ slug, className, onClick, children }: GenericFicheLinkProps) => {
  const projetId = useProjetsStore((state) => state.currentProjetId);
  const url = projetId
    ? PFMV_ROUTES.ESPACE_PROJET_FICHE_DIAGNOSTIC(projetId, slug)
    : PFMV_ROUTES.SURCHAUFFE_URBAINE_FICHE_DIAGNOSTIC(slug);

  return (
    <LinkWithoutPrefetch href={url} className={className} onClick={onClick}>
      {children}
    </LinkWithoutPrefetch>
  );
};
