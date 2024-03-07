import { updateBookmarkedFichesSolutionsProjetAction } from "@/actions/users/update-bookmarked-fs-action";
import { ProjectBookmarks } from "@/helpers/bookmarkedFicheSolutionHelper";
import { Session } from "next-auth";
import { create } from "zustand";

type UserInfos = Session["user"] | undefined;

interface UserState {
  userInfos: UserInfos;
  bookmarkedFichesSolutions: ProjectBookmarks[];
  setUserInfos: (_userInfos: UserInfos) => void;
  setBookmarkedFichesSolutions: (_bookmarkedFichesSolutions: ProjectBookmarks[]) => void;
  updateBookmarkedFichesSolutions: (_bookmarkedFichesSolutions: ProjectBookmarks[]) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
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
