import { createStore } from "zustand/vanilla";
import { ProjectBookmarks } from "@/helpers/bookmarkedFicheSolutionHelper";
import { updateBookmarkedFichesSolutionsProjetAction } from "@/actions/users/update-bookmarked-fs-action";
import { UserWithCollectivite } from "@/lib/prisma/prismaCustomTypes";
import { updateFicheDiagnosticByUserAction } from "@/actions/users/update-fiche-diagnostic-by-user-action";
import { FichesBookmarked } from "@/components/common/generic-save-fiche/helpers";
import { updateFichesUserAction } from "@/actions/users/update-fiches-user-action";

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
  updateFichesUser: (_type: "solution" | "diagnostic", _ficheId: number) => void;
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
    updateFichesUser: async (type, ficheId) => {
      const { userInfos } = get();
      if (userInfos) {
        const update = await updateFichesUserAction(userInfos.id, ficheId, type);
        if (update.user) {
          set(() => ({ userInfos: update.user }));
        }
      }
    },
  }));
};
