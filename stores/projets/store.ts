import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { createStore } from "zustand/vanilla";
import { upsert } from "@/helpers/listUtils";

interface ProjetsState {
  projets: ProjetWithRelations[];
  currentProjetId: number | null;
}

export type ProjetsActions = {
  setProjets: (_projets: ProjetWithRelations[]) => void;
  setCurrentProjetId: (_currentProjetId: number | null) => void;
  getCurrentProjet: () => ProjetWithRelations | undefined;
  getProjetById: (_projetId: number) => ProjetWithRelations | undefined;
  addOrUpdateProjet: (_projet: ProjetWithRelations) => void;
};

export type ProjetsStore = ProjetsState & ProjetsActions;

export const defaultInitState: ProjetsState = {
  projets: [],
  currentProjetId: null,
};

export const initProjetsStore = (): ProjetsState => {
  return { ...defaultInitState };
};

export const createProjetStore = (initState: ProjetsState = defaultInitState) => {
  return createStore<ProjetsStore>()((set, get) => ({
    ...initState,
    setProjets: (projets) => set(() => ({ projets })),
    setCurrentProjetId: (currentProjetId) => set(() => ({ currentProjetId })),
    getCurrentProjet: () => {
      const { projets, currentProjetId } = get();
      return projets.find((projet) => projet.id === currentProjetId);
    },
    getProjetById: (projetId) => get().projets.find((projet) => projet.id === projetId),
    addOrUpdateProjet: (_projet) => set((state) => ({ projets: upsert(state.projets, _projet) })),
  }));
};
