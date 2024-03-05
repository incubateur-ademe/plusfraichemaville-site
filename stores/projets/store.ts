import { ProjetWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { createStore } from "zustand/vanilla";
import { upsert } from "@/helpers/listUtils";

interface ProjetsState {
  projets: ProjetWithCollectivite[];
  currentProjetId: number | null;
}

export type ProjetsActions = {
  setProjets: (_projets: ProjetWithCollectivite[]) => void;
  setCurrentProjetId: (_currentProjetId: number) => void;
  getCurrentProjet: () => ProjetWithCollectivite | undefined;
  getProjetById: (_projetId: number) => ProjetWithCollectivite | undefined;
  addOrUpdateProjet: (_projet: ProjetWithCollectivite) => void;
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
