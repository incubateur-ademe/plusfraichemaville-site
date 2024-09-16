import { EstimationAide, ProjetWithPublicRelations, ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";
import { createStore } from "zustand/vanilla";
import { upsert } from "@/src/helpers/listUtils";
import { updateAideInEstimation } from "./helper";
import { currentUserIsAdmin } from "@/src/components/partage/helpers";

export interface ProjetsState {
  projets: ProjetWithRelations[];
  pendingProjets: ProjetWithPublicRelations[];
  currentProjetId: number | null;
}

export type ProjetsActions = {
  setProjets: (_projets: ProjetWithRelations[]) => void;
  setPendingProjets: (_projets: ProjetWithPublicRelations[]) => void;
  setCurrentProjetId: (_currentProjetId: number | null) => void;
  getCurrentProjet: () => ProjetWithRelations | undefined;
  getProjetById: (_projetId: number) => ProjetWithRelations | undefined;
  addOrUpdateProjet: (_projet: ProjetWithRelations) => void;
  addOrUpdatePendingProjet: (_pendingProjet: ProjetWithPublicRelations) => void;
  addAideInEstimation: (_estimationId: number, _estimationAide: EstimationAide) => void;
  deleteAideInEstimation: (_estimationId: number, _aideTerritoireId: number) => void;
  deleteProjet: (_projetId: number) => void;
  deletePendingProjet: (_projetId: number) => void;
  isCurrentUserAdmin: (_userId?: string) => boolean;
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
    addOrUpdateProjet: (_projet) => set((state) => ({ projets: upsert(state.projets, _projet) })),
    addOrUpdatePendingProjet: (_pendingProjet) =>
      set((state) => ({ pendingProjets: upsert(state.pendingProjets, _pendingProjet) })),
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
    isCurrentUserAdmin: (userId?: string) => {
      const currentProjet = get().getCurrentProjet();
      return currentProjet ? currentUserIsAdmin(currentProjet.users, userId) : false;
    },
  }));
};
