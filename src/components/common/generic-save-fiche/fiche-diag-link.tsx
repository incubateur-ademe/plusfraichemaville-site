"use client";

import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useProjetsStore } from "@/src/stores/projets/provider";
import Link from "next/link";
import { PropsWithChildren } from "react";

type GenericFicheLinkProps = {
  slug: string;
  className?: string;
  onClick?: () => void;
} & PropsWithChildren;

export const FicheDiagLink = ({ slug, className, onClick, children }: GenericFicheLinkProps) => {
  const projetId = useProjetsStore((state) => state.currentProjetId);
  const url = projetId
    ? PFMV_ROUTES.ESPACE_PROJET_FICHE_DIAGNOSTIC(projetId, slug)
    : PFMV_ROUTES.SURCHAUFFE_URBAINE__FICHE_DIAGNOSTIC(slug);

  return (
    <Link href={url} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};
