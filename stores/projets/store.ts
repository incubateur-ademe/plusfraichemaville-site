import { ProjetWithNomCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { createStore } from "zustand/vanilla";
import { upsert } from "@/helpers/listUtils";
import { FicheSolution } from "@/components/ficheSolution/type";
import { fiche } from "@/components/ficheSolution/FicheSolutionCardWithUserInfo";

interface ProjetsState {
  projets: ProjetWithNomCollectivite[];
  currentProjetId: number | null;
  selectedFichesSolutionsByProjet: Record<ProjetWithNomCollectivite["id"], FicheSolution[]>;
}

export type ProjetsActions = {
  setProjets: (_projets: ProjetWithNomCollectivite[]) => void;
  setCurrentProjetId: (_currentProjetId: number) => void;
  getCurrentProjet: () => ProjetWithNomCollectivite | undefined;
  getProjetById: (_projetId: number) => ProjetWithNomCollectivite | undefined;
  addOrUpdateProjet: (_projet: ProjetWithNomCollectivite) => void;
  setSelectedFicheSolutionByProjet: (_projetId: string, _ficheSolutionId: FicheSolution) => void;
  getSelectedFichesSolutionsByProjet: (_projetId: number) => FicheSolution[];
};

export type ProjetsStore = ProjetsState & ProjetsActions;

export const defaultInitState: ProjetsState = {
  projets: [],
  currentProjetId: null,
  selectedFichesSolutionsByProjet: {
    // TESTING PURPOSE
    "91203119": [fiche],
  },
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
    getProjetById: (projetId) => {
      const { projets } = get();
      return projets.find((projet) => projet.id === projetId);
    },
    addOrUpdateProjet: (_projet) => set((state) => ({ projets: upsert(state.projets, _projet) })),
    setSelectedFicheSolutionByProjet: (projetId, ficheSolutionId) =>
      set((state) => {
        const currentFicheSolution = state.selectedFichesSolutionsByProjet[+projetId] || [];
        const updatedFicheSolutions = currentFicheSolution.includes(ficheSolutionId)
          ? currentFicheSolution
          : [...currentFicheSolution, ficheSolutionId];
        return {
          selectedFichesSolutionsByProjet: {
            ...state.selectedFichesSolutionsByProjet,
            [projetId]: updatedFicheSolutions,
          },
        };
      }),
    getSelectedFichesSolutionsByProjet: (projetId: number) => {
      const { selectedFichesSolutionsByProjet } = get();
      return selectedFichesSolutionsByProjet[projetId];
    },
  }));
};
