import { ProjectBookmarks } from "@/helpers/bookmarkedFicheSolutionHelper";
import { Session } from "next-auth";
import { create } from "zustand";

type UserInfos = Session["user"] | undefined;

interface UserState {
  userInfos: UserInfos;
  bookmarkedFichesSolutions?: ProjectBookmarks[];
  setUserInfos: (_userInfos: UserInfos) => void;
  setBookmarkedFichesSolutions: (_bookmarkedFichesSolutions?: ProjectBookmarks[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userInfos: undefined,
  bookmarkedFichesSolutions: [],
  setUserInfos: (userInfos: UserInfos) => set(() => ({ userInfos })),
  setBookmarkedFichesSolutions: (bookmarkedFichesSolutions) => set({ bookmarkedFichesSolutions }),
}));
