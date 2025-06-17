"use client";
import { PropsWithChildren, use, useEffect } from "react";
import { useProjetsStore } from "@/src/stores/projets/provider";

export default function Layout(props: { params: Promise<{ projetId: number }> } & PropsWithChildren) {
  const params = use(props.params);

  const { children } = props;

  const setCurrentProjetId = useProjetsStore((state) => state.setCurrentProjetId);
  useEffect(() => {
    setCurrentProjetId(+params.projetId);
  }, [params.projetId, setCurrentProjetId]);

  return <>{children}</>;
}
