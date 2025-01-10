"use client";
import { PropsWithChildren, useEffect, use } from "react";
import { useProjetsStore } from "@/src/stores/projets/provider";
import BannerProjet from "@/src/components/espace-projet/banner/banner-projet";

export default function Layout(props: { params: { projetId: number } } & PropsWithChildren) {
  const params = use(props.params);

  const {
    children
  } = props;

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
