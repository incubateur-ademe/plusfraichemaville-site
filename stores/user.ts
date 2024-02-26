import { Session } from "next-auth";
import { create } from "zustand";

type UserSession = Session | null;

interface UserState {
  session: UserSession;
  setSession: (_session: UserSession) => void;
}

export const useUserStore = create<UserState>((set) => ({
  session: null,
  setSession: (session: UserSession) => set(() => ({ session })),
}));
