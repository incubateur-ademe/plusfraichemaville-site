"use client";

import { useProjetsStore } from "./provider";
import { useLayoutEffect } from "react";
import { ProjetWithPublicRelations, ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";

export const ProjetStoreClient = ({
  projets,
  pendingProjets,
}: {
  projets: ProjetWithRelations[];
  pendingProjets: ProjetWithPublicRelations[];
}) => {
  const setProjets = useProjetsStore((state) => state.setProjets);
  const setPendingProjets = useProjetsStore((state) => state.setPendingProjets);

  useLayoutEffect(() => {
    setProjets(projets);
  }, [projets, setProjets]);

  useLayoutEffect(() => {
    setPendingProjets(pendingProjets);
  }, [pendingProjets, setPendingProjets]);

  return <></>;
};
