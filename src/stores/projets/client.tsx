"use client";

import { useProjetsStore } from "./provider";
import { useLayoutEffect } from "react";
import { ProjetWithPublicRelationsDto, ProjetWithRelationsDto } from "@/src/types/dto";

export const ProjetStoreClient = ({
  projets,
  pendingProjets,
}: {
  projets: ProjetWithRelationsDto[];
  pendingProjets: ProjetWithPublicRelationsDto[];
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
