"use client";
import { PropsWithChildren } from "react";
import { useParams } from "next/navigation";
import { useProjetsStore } from "@/stores/projets/provider";
import BannerProjet from "@/components/monEspaceProjet/banner-projet";

export default function Layout({ children }: PropsWithChildren) {
  const { projetId } = useParams();
  const setCurrentProjetId = useProjetsStore((state) => state.setCurrentProjetId);
  setCurrentProjetId(+projetId);

  return (
    <>
      <BannerProjet />
      {children}
    </>
  );
}
