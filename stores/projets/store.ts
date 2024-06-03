import { ProjetWithRelations } from "@/lib/prisma/prismaCustomTypes";
import { createStore } from "zustand/vanilla";
import { upsert } from "@/helpers/listUtils";
import { updateFichesProjetAction } from "@/actions/projets/update-fiches-projet-action";
import { notifications } from "@/components/common/notifications";

interface ProjetsState {
  projets: ProjetWithRelations[];
  currentProjetId: number | null;
  currentEstimationId: number | null;
}

export type ProjetsActions = {
  setProjets: (_projets: ProjetWithRelations[]) => void;
  setCurrentProjetId: (_currentProjetId: number | null) => void;
  getCurrentProjet: () => ProjetWithRelations | undefined;
  getProjetById: (_projetId: number) => ProjetWithRelations | undefined;
  addOrUpdateProjet: (_projet: ProjetWithRelations) => void;
  updateSelectedFiches: (
    _type: "solution" | "diagnostic",
    _ficheId: number,
    _projetId: number,
    _withNotification?: boolean,
  ) => void;
  deleteProjet: (_projetId: number) => void;
  setCurrentEstimationId: (_estimationIdd: number | null) => void;
};

export type ProjetsStore = ProjetsState & ProjetsActions;

export const defaultInitState: ProjetsState = {
  projets: [],
  currentProjetId: null,
  currentEstimationId: null,
};

export const initProjetsStore = (): ProjetsState => {
  return { ...defaultInitState };
};

export const createProjetStore = (initState: ProjetsState = defaultInitState) => {
  return createStore<ProjetsStore>()((set, get) => ({
    ...initState,
    setProjets: (projets) => set(() => ({ projets })),
    setCurrentProjetId: (currentProjetId) => set(() => ({ currentProjetId })),
    setCurrentEstimationId: (currentEstimationId) => set(() => ({ currentEstimationId })),
    getCurrentProjet: () => {
      const { projets, currentProjetId } = get();
      return projets.find((projet) => projet.id === currentProjetId);
    },
    getProjetById: (projetId) => get().projets.find((projet) => projet.id === projetId),
    addOrUpdateProjet: (_projet) => set((state) => ({ projets: upsert(state.projets, _projet) })),
    updateSelectedFiches: async (type, ficheId, projetId, withNotification) => {
      const update = await updateFichesProjetAction(projetId, ficheId, type);
      if (update.projet) {
        set((state) => ({ projets: upsert(state.projets, update.projet!) }));
        if (withNotification) {
          notifications(update.type, update.message);
        }
      }
    },
    deleteProjet: async (projetId) => {
      set((state) => ({
        projets: state.projets.filter((projet) => projet.id !== projetId),
      }));
    },
  }));
};
