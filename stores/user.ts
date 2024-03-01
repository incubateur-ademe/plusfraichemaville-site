import { Session } from "next-auth";
import { create } from "zustand";

type UserInfos = Session["user"] | undefined;

interface UserState {
  userInfos: UserInfos;
  setUserInfos: (_userInfos: UserInfos) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userInfos: undefined,
  setUserInfos: (userInfos: UserInfos) => set(() => ({ userInfos })),
}));
