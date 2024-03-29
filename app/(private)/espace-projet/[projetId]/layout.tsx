"use client";
import { PropsWithChildren } from "react";
import { useProjetsStore } from "@/stores/projets/provider";
import BannerProjet from "@/components/monEspaceProjet/banner-projet";

export default function Layout({ children, params }: { params: { projetId: number } } & PropsWithChildren) {
  const setCurrentProjetId = useProjetsStore((state) => state.setCurrentProjetId);
  setCurrentProjetId(+params.projetId);

  return (
    <>
      <BannerProjet />
      {children}
    </>
  );
}
