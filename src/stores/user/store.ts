import { createStore } from "zustand/vanilla";
import { User } from "@/src/generated/prisma/client";
import { SolutionTabIds, SolutionTabIdType } from "@/src/stores/user/helper";
import { SORT_TEMPERATURE } from "@/src/helpers/aideDecisionSortFilter";

export type UserInfos = User | null | undefined;
export type NavigationPreferences = {
  choixSolutionSelectedTabId: SolutionTabIdType;
  choixSolutionAideDecisionCurrentStep?: string;
  choixSolutionAideDecisionTri: string;
};

interface UserState {
  userInfos?: UserInfos;
  navigationPreferences: NavigationPreferences;
}

export type UserActions = {
  setUserInfos: (_userInfos: UserInfos) => void;
  setChoixSolutionSelectedTabId: (tabId: SolutionTabIdType) => void;
  setChoixSolutionAideDecisionCurrentStep: (aideDecisionStep: string) => void;
  setChoixSolutionAideDecisionTri: (aideDecisionResultsTri: string) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  userInfos: undefined,
  navigationPreferences: {
    choixSolutionSelectedTabId: SolutionTabIds.ARBRE,
    choixSolutionAideDecisionTri: SORT_TEMPERATURE.label,
  },
};

export const initUserStore = (): UserState => {
  return { ...defaultInitState };
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    userInfos: undefined,
    setUserInfos: (userInfos: UserInfos) => set(() => ({ userInfos })),
    setChoixSolutionSelectedTabId: (tabId: SolutionTabIdType) =>
      set((state) => ({
        ...state,
        navigationPreferences: {
          ...state.navigationPreferences,
          choixSolutionSelectedTabId: tabId,
        },
      })),
    setChoixSolutionAideDecisionCurrentStep: (aideDecisionStep: string) =>
      set((state) => ({
        ...state,
        navigationPreferences: {
          ...state.navigationPreferences,
          choixSolutionAideDecisionCurrentStep: aideDecisionStep,
        },
      })),
    setChoixSolutionAideDecisionTri: (aideDecisionResultsTri: string) =>
      set((state) => ({
        ...state,
        navigationPreferences: {
          ...state.navigationPreferences,
          choixSolutionAideDecisionTri: aideDecisionResultsTri,
        },
      })),
  }));
};
