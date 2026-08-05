import { createStore } from "zustand/vanilla";
import { User } from "@/src/generated/prisma/client";
import { SolutionTabIds, SolutionTabIdType } from "@/src/stores/user/helper";

export type UserInfos = User | null | undefined;
export type NavigationPreferences = {
  espaceProjet: { solution: { currentTabId: SolutionTabIdType; currentAideDecisionStep?: string } };
};

interface UserState {
  userInfos?: UserInfos;
  navigationPreferences: NavigationPreferences;
}

export type UserActions = {
  setUserInfos: (_userInfos: UserInfos) => void;
  setSolutionTab: (tabId: SolutionTabIdType) => void;
  setAideDecisionStep: (aideDecisionStep: string) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  userInfos: undefined,
  navigationPreferences: { espaceProjet: { solution: { currentTabId: SolutionTabIds.ARBRE } } },
};

export const initUserStore = (): UserState => {
  return { ...defaultInitState };
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    userInfos: undefined,
    setUserInfos: (userInfos: UserInfos) => set(() => ({ userInfos })),
    setSolutionTab: (tabId: SolutionTabIdType) =>
      set((state) => ({
        ...state.navigationPreferences,
        navigationPreferences: {
          espaceProjet: { solution: { ...state.navigationPreferences.espaceProjet.solution, currentTabId: tabId } },
        },
      })),
    setAideDecisionStep: (aideDecisionStep: string) =>
      set((state) => ({
        ...state.navigationPreferences,
        navigationPreferences: {
          espaceProjet: {
            solution: {
              ...state.navigationPreferences.espaceProjet.solution,
              currentAideDecisionStep: aideDecisionStep,
            },
          },
        },
      })),
  }));
};
