import { createStore } from "zustand/vanilla";
import { updateBookmarkedFichesSolutionsProjetAction } from "@/src/actions/users/update-bookmarked-fs-action";
import { UserWithCollectivite } from "@/src/lib/prisma/prismaCustomTypes";
import {
  FicheBookmarkedSolution,
  FichesBookmarked,
  getAllSavedFichesFromLocalStorage,
} from "@/src/components/common/generic-save-fiche/helpers";
import { updateFichesUserAction } from "@/src/actions/users/update-fiches-user-action";
import { saveAllFichesFromLocalStorageAction } from "@/src/actions/users/save-all-fiches-from-local-storage";
import { TypeFiche } from "@/src/helpers/common";

export type UserInfos = UserWithCollectivite | null | undefined;

interface UserState {
  userInfos?: UserInfos;
  bookmarkedFichesSolutions: FichesBookmarked[];
  bookmarkedFichesDiagnostic: string[];
}

export type UserActions = {
  setUserInfos: (_userInfos: UserInfos) => void;
  setBookmarkedFichesSolutions: (_bookmarkedFichesSolutions: FicheBookmarkedSolution[]) => void;
  setBookmarkedFichesDiagnostic: (_bookmarkedFichesDiagnostic: string[]) => void;
  updateBookmarkedFichesSolutions: (_bookmarkedFichesSolutions: FichesBookmarked[]) => void;
  updateFichesUser: (_type: TypeFiche, _ficheId: number, _projectName: string) => void;
  updateBookmarkedFichesFromLocalStorage: () => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  userInfos: undefined,
  bookmarkedFichesSolutions: [],
  bookmarkedFichesDiagnostic: [],
};

export const initUserStore = (): UserState => {
  return { ...defaultInitState };
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set, get) => ({
    ...initState,
    userInfos: undefined,
    bookmarkedFichesSolutions: [],
    setUserInfos: (userInfos: UserInfos) => set(() => ({ userInfos })),
    setBookmarkedFichesSolutions: (bookmarkedFichesSolutions) => set({ bookmarkedFichesSolutions }),
    setBookmarkedFichesDiagnostic: (bookmarkedFichesDiagnostic) => set({ bookmarkedFichesDiagnostic }),
    updateBookmarkedFichesSolutions: async (bookmarkedFichesSolutions) => {
      const { userInfos } = get();
      if (userInfos) {
        const update = await updateBookmarkedFichesSolutionsProjetAction(userInfos?.id, bookmarkedFichesSolutions);
        if (update.user) {
          set({ userInfos: update.user });
        }
      }
    },

    updateFichesUser: async (type, ficheId, projectName?: string) => {
      const { userInfos } = get();
      if (userInfos) {
        const update = await updateFichesUserAction(userInfos.id, ficheId, type, projectName);
        if (update.user) {
          set(() => ({ userInfos: update.user }));
        }
      }
    },
    updateBookmarkedFichesFromLocalStorage: async () => {
      const fichesBookmarked = getAllSavedFichesFromLocalStorage();
      const { userInfos } = get();
      if (userInfos && (fichesBookmarked.fichesDiagnostic.length > 0 || fichesBookmarked.fichesSolutions.length > 0)) {
        const updatedUser = await saveAllFichesFromLocalStorageAction(userInfos?.id, fichesBookmarked);
        if (updatedUser.user) {
          set({ userInfos: updatedUser.user });
          localStorage.clear();
        }
      }
    },
  }));
};
