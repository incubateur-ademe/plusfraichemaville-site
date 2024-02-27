import { projet } from "@prisma/client";
import { createStore } from "zustand/vanilla";

interface ProjetsState {
  projets: projet[];
}
export type ProjetsActions = {
  setProjets: (_projets: projet[]) => void;
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
    setProjets: (projets: projet[]) => set(() => ({ projets })),
  }));
};
