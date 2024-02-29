"use client";

import { useProjetsStore } from "./provider";
import { useLayoutEffect } from "react";
import { ProjetWithNomCollectivite } from "@/lib/prisma/prismaCustomTypes";

export const ProjetStoreClient = ({ projets }: { projets: ProjetWithNomCollectivite[] }) => {
  const setProjets = useProjetsStore((state) => state.setProjets);

  useLayoutEffect(() => {
    setProjets(projets);
  }, [projets, setProjets]);

  return <></>;
};
