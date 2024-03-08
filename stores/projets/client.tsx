"use client";

import { useProjetsStore } from "./provider";
import { useLayoutEffect } from "react";
import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";

export const ProjetStoreClient = ({ projets }: { projets: ProjetWithRelations[] }) => {
  const setProjets = useProjetsStore((state) => state.setProjets);

  useLayoutEffect(() => {
    setProjets(projets);
  }, [projets, setProjets]);

  return <></>;
};
