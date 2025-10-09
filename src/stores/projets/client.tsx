"use client";

import { useProjetsStore } from "./provider";
import { useLayoutEffect } from "react";
import { ProjetWithPublicRelations, ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { isEmpty } from "@/src/helpers/listUtils";

export const ProjetStoreClient = ({
  projets,
  pendingProjets,
}: {
  projets: ProjetWithRelations[];
  pendingProjets: ProjetWithPublicRelations[];
}) => {
  const setProjets = useProjetsStore((state) => state.setProjets);
  const setCurrentProjetId = useProjetsStore((state) => state.setCurrentProjetId);
  const currentProjetId = useProjetsStore((state) => state.currentProjetId);
  const setPendingProjets = useProjetsStore((state) => state.setPendingProjets);

  useLayoutEffect(() => {
    setProjets(projets);
    if (!isEmpty(projets) && currentProjetId === null) {
      setCurrentProjetId(projets[0].id);
    }
  }, [projets, setProjets]);

  useLayoutEffect(() => {
    setPendingProjets(pendingProjets);
  }, [pendingProjets, setPendingProjets]);

  return <></>;
};
