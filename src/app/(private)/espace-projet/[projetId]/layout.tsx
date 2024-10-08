"use client";
import { PropsWithChildren, useEffect } from "react";
import { useProjetsStore } from "@/src/stores/projets/provider";
import BannerProjet from "@/src/components/espace-projet/banner/banner-projet";

export default function Layout({ children, params }: { params: { projetId: number } } & PropsWithChildren) {
  const setCurrentProjetId = useProjetsStore((state) => state.setCurrentProjetId);
  useEffect(() => {
    setCurrentProjetId(+params.projetId);
  }, [params.projetId, setCurrentProjetId]);

  return (
    <>
      <BannerProjet />
      {children}
    </>
  );
}
