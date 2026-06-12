"use client";

import { useProjetsStore } from "./provider";
import { useLayoutEffect } from "react";
import { ProjetWithPublicRelations, ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { user_projet } from "@/src/generated/prisma/client";

export const ProjetStoreClient = ({
  projets,
  pendingProjets,
  userProjets,
}: {
  projets: ProjetWithRelations[];
  pendingProjets: ProjetWithPublicRelations[];
  userProjets: user_projet[];
}) => {
  const setProjets = useProjetsStore((state) => state.setProjets);
  const setPendingProjets = useProjetsStore((state) => state.setPendingProjets);
  const setUserProjets = useProjetsStore((state) => state.setUserProjets);

  useLayoutEffect(() => {
    setProjets(projets);
  }, [projets, setProjets]);

  useLayoutEffect(() => {
    setUserProjets(userProjets);
  }, [userProjets, setUserProjets]);

  useLayoutEffect(() => {
    setPendingProjets(pendingProjets);
  }, [pendingProjets, setPendingProjets]);

  return <></>;
};
