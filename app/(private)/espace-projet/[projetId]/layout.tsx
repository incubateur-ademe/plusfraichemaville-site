"use client";
import { ReactElement } from "react";
import BannerProjet from "@/components/monEspaceProjet/banner-projet";
import { useProjetsStore } from "@/stores/projets/provider";

export default function Layout({ children, params }: { children: ReactElement | null; params: { projetId: string } }) {
  const setCurrentProjetId = useProjetsStore((state) => state.setCurrentProjetId);

  setCurrentProjetId(+params.projetId);

  return (
    <>
      <BannerProjet />
      {children}
    </>
  );
}
