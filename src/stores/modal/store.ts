import { createStore } from "zustand/vanilla";
import { AidesTerritoiresAide } from "@/src/components/financement/types";
import { PartageOverviewDeleteOrQuitModaleState } from "@/src/components/espace-projet/utilisateurs-projet/partage-overview-delete-or-quit-modale";
import { PartageOverviewMemberStatusAdminProps } from "@/src/components/espace-projet/utilisateurs-projet/partage-overview-member-status-accepted-admin";
import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";

interface ModalState {
  currentEstimationId: number | null;
  currentDetailedAide: AidesTerritoiresAide | null;
  currentUserModification: PartageOverviewMemberStatusAdminProps | null;
  currentDeleteOrQuitModal: PartageOverviewDeleteOrQuitModaleState;
  collectiviteIdToListAvailableProjets: number | null;
  showInfoViewerMode: boolean;
  showAvailableProjetForUser: boolean;
  currentAnnuaireRexProjet: string | null;
  currentFicheDiagnostic: FicheDiagnostic | null;
}

export type ModalActions = {
  setCurrentEstimationId: (_estimationId: number | null) => void;
  setCurrentDetailedAide: (_currentDetailedAide: AidesTerritoiresAide | null) => void;
  setCurrentUserModification: (_currentUserModification: PartageOverviewMemberStatusAdminProps | null) => void;
  setCurrentDeleteOrQuitModal: (_currentDeleteOrQuitModal: PartageOverviewDeleteOrQuitModaleState) => void;
  setCollectiviteIdToListAvailableProjets: (_collectiviteId: number | null) => void;
  setShowInfoViewerMode: (_showInfoViewerMode: boolean) => void;
  setShowAvailableProjetForUser: (_showAvailableProjetForUser: boolean) => void;
  setAnnuaireRexProjetSlug: (_annuaireRexProjetSlug: string | null) => void;
  setCurrentFicheDiagnostic: (_currentFicheDiagnostic: FicheDiagnostic | null) => void;
};

export type ModalStore = ModalState & ModalActions;

export const defaultInitState: ModalState = {
  currentEstimationId: null,
  currentDetailedAide: null,
  currentUserModification: null,
  currentDeleteOrQuitModal: null,
  collectiviteIdToListAvailableProjets: null,
  showInfoViewerMode: false,
  showAvailableProjetForUser: false,
  currentAnnuaireRexProjet: null,
  currentFicheDiagnostic: null,
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
    setShowAvailableProjetForUser: (showAvailableProjetForUser) =>
      set(() => ({ showAvailableProjetForUser: showAvailableProjetForUser })),
    setAnnuaireRexProjetSlug: (annuaireRexProjetSlug) =>
      set(() => ({ currentAnnuaireRexProjet: annuaireRexProjetSlug })),
    setCurrentFicheDiagnostic: (ficheDiagnostic) => set(() => ({ currentFicheDiagnostic: ficheDiagnostic })),
  }));
};
