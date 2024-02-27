"use client";

import { projet } from "@prisma/client";
import { useProjetsStore } from "./projets-store-provider";

let init = false;

export const ProjetStoreClient = ({ projets }: { projets: projet[] }) => {
  const setProjets = useProjetsStore((state) => state.setProjets);

  if (!init) {
    init = true;
    setProjets(projets);
  }

  return <></>;
};
