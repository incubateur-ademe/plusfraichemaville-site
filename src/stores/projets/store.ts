import { EstimationAideDto, ProjetWithPublicRelationsDto, ProjetWithRelationsDto } from "@/src/types/dto";
import { createStore } from "zustand/vanilla";
import { updateAideInEstimation } from "./helper";

export interface ProjetsState {
  projets: ProjetWithRelationsDto[];
  pendingProjets: ProjetWithPublicRelationsDto[];
  currentProjetId: number | null;
}

export type ProjetsActions = {
  setProjets: (_projets: ProjetWithRelationsDto[]) => void;
  setPendingProjets: (_projets: ProjetWithPublicRelationsDto[]) => void;
  setCurrentProjetId: (_currentProjetId: number | null) => void;
  getCurrentProjet: () => ProjetWithRelationsDto | undefined;
  getProjetById: (_projetId: number) => ProjetWithRelationsDto | undefined;
  addOrUpdateProjet: (_projet: ProjetWithRelationsDto) => void;
  addOrUpdatePendingProjet: (_pendingProjet: ProjetWithPublicRelationsDto) => void;
  addAideInEstimation: (_estimationId: number, _estimationAide: EstimationAideDto) => void;
  deleteAideInEstimation: (_estimationId: number, _aideTerritoireId: number) => void;
  deleteProjet: (_projetId: number) => void;
  deletePendingProjet: (_projetId: number) => void;
};

export type ProjetsStore = ProjetsState & ProjetsActions;

export const defaultInitState: ProjetsState = {
  projets: [],
  pendingProjets: [],
  currentProjetId: null,
};

export const initProjetsStore = (): ProjetsState => {
  return { ...defaultInitState };
};

export const createProjetStore = (initState: ProjetsState = defaultInitState) => {
  return createStore<ProjetsStore>()((set, get) => ({
    ...initState,
    setProjets: (projets) => set(() => ({ projets })),
    setPendingProjets: (pendingProjets) => set(() => ({ pendingProjets })),
    setCurrentProjetId: (currentProjetId) => set(() => ({ currentProjetId })),
    getCurrentProjet: () => {
      const { projets, currentProjetId } = get();
      return projets.find((projet) => projet.id === currentProjetId);
    },
    getProjetById: (projetId) => get().projets.find((projet) => projet.id === projetId),
    addOrUpdateProjet: (_projet) =>
      set((state) => ({
        projets: [...state.projets.filter((p) => p.id !== _projet.id), _projet],
      })),
    addOrUpdatePendingProjet: (_pendingProjet) =>
      set((state) => ({
        pendingProjets: [...state.pendingProjets.filter((p) => p.id !== _pendingProjet.id), _pendingProjet],
      })),
    deleteProjet: async (projetId) => {
      set((state) => ({
        projets: state.projets.filter((projet) => projet.id !== projetId),
      }));
    },
    deletePendingProjet: async (projetId) => {
      set((state) => ({
        pendingProjets: state.pendingProjets.filter((projet) => projet.id !== projetId),
      }));
    },
    addAideInEstimation: (estimationId, estimationAide) => {
      set((state) => updateAideInEstimation(state, estimationId, estimationAide, null));
    },
    deleteAideInEstimation: (estimationId, aideTerritoireId) => {
      set((state) => updateAideInEstimation(state, estimationId, null, aideTerritoireId));
    },
  }));
};
