import { createStore } from "zustand/vanilla";
import { AidesTerritoiresAide } from "@/src/components/financement/types";
// eslint-disable-next-line max-len
import { PartageOverviewDeleteOrQuitModaleState } from "@/src/components/partage/partage-overview-delete-or-quit-modale";
// eslint-disable-next-line max-len
import { PartageOverviewMemberStatusAdminProps } from "@/src/components/partage/partage-overview-member-status-accepted-admin";

interface ModalState {
  currentEstimationId: number | null;
  currentDetailedAide: AidesTerritoiresAide | null;
  currentUserModification: PartageOverviewMemberStatusAdminProps | null;
  currentDeleteOrQuitModal: PartageOverviewDeleteOrQuitModaleState;
  collectiviteIdToListAvailableProjets: number | null;
  showInfoViewerMode: boolean;
}

export type ModalActions = {
  setCurrentEstimationId: (_estimationId: number | null) => void;
  setCurrentDetailedAide: (_currentDetailedAide: AidesTerritoiresAide | null) => void;
  setCurrentUserModification: (_currentUserModification: PartageOverviewMemberStatusAdminProps | null) => void;
  setCurrentDeleteOrQuitModal: (_currentDeleteOrQuitModal: PartageOverviewDeleteOrQuitModaleState) => void;
  setCollectiviteIdToListAvailableProjets: (_collectiviteId: number | null) => void;
  setShowInfoViewerMode: (_showInfoViewerMode: boolean) => void;
};

export type ModalStore = ModalState & ModalActions;

export const defaultInitState: ModalState = {
  currentEstimationId: null,
  currentDetailedAide: null,
  currentUserModification: null,
  currentDeleteOrQuitModal: null,
  collectiviteIdToListAvailableProjets: null,
  showInfoViewerMode: false,
};

export const initModalStore = (): ModalState => {
  return { ...defaultInitState };
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...initState,
    setCurrentEstimationId: (currentEstimationId) => set(() => ({ currentEstimationId })),
    setCurrentDetailedAide: (currentDetailedAide) => set(() => ({ currentDetailedAide })),
    setCurrentUserModification: (currentUserModification) => set(() => ({ currentUserModification })),
    setCurrentDeleteOrQuitModal: (currentDeleteOrQuitModal) => set(() => ({ currentDeleteOrQuitModal })),
    setCollectiviteIdToListAvailableProjets: (collectiviteId) =>
      set(() => ({ collectiviteIdToListAvailableProjets: collectiviteId })),
    setShowInfoViewerMode: (showInfoViewerMode) => set(() => ({ showInfoViewerMode: showInfoViewerMode })),
  }));
};