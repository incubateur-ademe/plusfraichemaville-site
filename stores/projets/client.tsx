"use client";

import { useProjetsStore } from "./provider";
import { useLayoutEffect } from "react";
import { ProjetWithCollectivite } from "@/lib/prisma/prismaCustomTypes";

export const ProjetStoreClient = ({ projets }: { projets: ProjetWithCollectivite[] }) => {
  const setProjets = useProjetsStore((state) => state.setProjets);

  useLayoutEffect(() => {
    setProjets(projets);
  }, [projets, setProjets]);

  return <></>;
};
