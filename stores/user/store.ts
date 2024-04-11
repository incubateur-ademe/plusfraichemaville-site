import { createStore } from "zustand/vanilla";
import { ProjectBookmarks } from "@/helpers/bookmarkedFicheSolutionHelper";
import { updateBookmarkedFichesSolutionsProjetAction } from "@/actions/users/update-bookmarked-fs-action";
import { UserWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { updateFicheDiagnosticByUserAction } from "@/actions/users/update-fiche-diagnostic-by-user-action";
import { FichesBookmarked, getAllSavedFichesFromLocalStorage } from "@/components/common/generic-save-fiche/helpers";
import { updateFichesUserAction } from "@/actions/users/update-fiches-user-action";
import { saveAllFichesFromLocalStorageAction } from "@/actions/users/save-all-fiches-from-local-storage";

export type UserInfos = UserWithCollectivite | null | undefined;

interface UserState {
  userInfos?: UserInfos;
  bookmarkedFichesSolutions: FichesBookmarked[];
  bookmarkedFichesDiagnostic: string[];
}

export type UserActions = {
  setUserInfos: (_userInfos: UserInfos) => void;
  setBookmarkedFichesSolutions: (_bookmarkedFichesSolutions: ProjectBookmarks[]) => void;
  setBookmarkedFichesDiagnostic: (_bookmarkedFichesDiagnostic: string[]) => void;
  updateBookmarkedFichesSolutions: (_bookmarkedFichesSolutions: FichesBookmarked[]) => void;
  updateBookmarkedFichesDiagnostic: (_bookmarkedFichesDiagnostic: FichesBookmarked[]) => void;
  updateFichesUser: (_type: "solution" | "diagnostic", _ficheId: number, _projectName: string) => void;
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
    updateBookmarkedFichesDiagnostic: async (bookmarkedFichesDiagnostic) => {
      const { userInfos } = get();
      if (userInfos) {
        const update = await updateFicheDiagnosticByUserAction(userInfos?.id, bookmarkedFichesDiagnostic);
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
