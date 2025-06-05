import { createStore } from "zustand/vanilla";
import { UserWithCollectivite } from "@/src/lib/prisma/prismaCustomTypes";

export type UserInfos = UserWithCollectivite | null | undefined;

interface UserState {
  userInfos?: UserInfos;
}

export type UserActions = {
  setUserInfos: (_userInfos: UserInfos) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  userInfos: undefined,
};

export const initUserStore = (): UserState => {
  return { ...defaultInitState };
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    userInfos: undefined,
    setUserInfos: (userInfos: UserInfos) => set(() => ({ userInfos })),
  }));
};
