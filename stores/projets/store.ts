import { ProjetWithNomCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { createStore } from "zustand/vanilla";

interface ProjetsState {
  projets: ProjetWithNomCollectivite[];
}
export type ProjetsActions = {
  setProjets: (_projets: ProjetWithNomCollectivite[]) => void;
};

export type ProjetsStore = ProjetsState & ProjetsActions;

export const defaultInitState: ProjetsState = {
  projets: [],
};

export const initProjetsStore = (): ProjetsState => {
  return { ...defaultInitState };
};

export const createProjetStore = (initState: ProjetsState = defaultInitState) => {
  return createStore<ProjetsStore>()((set) => ({
    ...initState,
    setProjets: (projets) => set(() => ({ projets })),
  }));
};
