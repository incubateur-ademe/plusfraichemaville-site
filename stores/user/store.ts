import { createStore } from "zustand/vanilla";
import { ProjectBookmarks } from "@/helpers/bookmarkedFicheSolutionHelper";
import { updateBookmarkedFichesSolutionsProjetAction } from "@/actions/users/update-bookmarked-fs-action";
import { UserWithCollectivite } from "@/lib/prisma/prismaCustomTypes";

export type UserInfos = UserWithCollectivite | null | undefined;

interface UserState {
  userInfos?: UserInfos;
  bookmarkedFichesSolutions: ProjectBookmarks[];
}

export type UserActions = {
  setUserInfos: (_userInfos: UserInfos) => void;
  setBookmarkedFichesSolutions: (_bookmarkedFichesSolutions: ProjectBookmarks[]) => void;
  updateBookmarkedFichesSolutions: (_bookmarkedFichesSolutions: ProjectBookmarks[]) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  userInfos: undefined,
  bookmarkedFichesSolutions: [],
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
    updateBookmarkedFichesSolutions: async (bookmarkedFichesSolutions) => {
      const { userInfos } = get();
      if (userInfos) {
        const update = await updateBookmarkedFichesSolutionsProjetAction(userInfos?.id, bookmarkedFichesSolutions);
        if (update.updatedBookmarkedFichesSolutions) {
          set({ bookmarkedFichesSolutions: update.updatedBookmarkedFichesSolutions });
        }
      }
    },
  }));
};
