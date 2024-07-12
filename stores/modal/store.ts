import { createStore } from "zustand/vanilla";
import { AidesTerritoiresAide } from "@/components/financement/types";
import { PartageOverviewMemberStatusAdminProps } from "@/components/partage/partage-overview-member-status-admin";

interface ModalState {
  currentEstimationId: number | null;
  currentDetailedAide: AidesTerritoiresAide | null;
  currentUserStatusModification: PartageOverviewMemberStatusAdminProps | null;
}

export type ModalActions = {
  setCurrentEstimationId: (_estimationId: number | null) => void;
  setCurrentDetailedAide: (_currentDetailedAide: AidesTerritoiresAide | null) => void;
  setCurrentUserStatusModification: (
    _currentUserStatusModification: PartageOverviewMemberStatusAdminProps | null,
  ) => void;
};

export type ModalStore = ModalState & ModalActions;

export const defaultInitState: ModalState = {
  currentEstimationId: null,
  currentDetailedAide: null,
  currentUserStatusModification: null,
};

export const initModalStore = (): ModalState => {
  return { ...defaultInitState };
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...initState,
    setCurrentEstimationId: (currentEstimationId) => set(() => ({ currentEstimationId })),
    setCurrentDetailedAide: (currentDetailedAide) => set(() => ({ currentDetailedAide })),
    setCurrentUserStatusModification: (currentUserStatusModification) => set(() => ({ currentUserStatusModification })),
  }));
};
