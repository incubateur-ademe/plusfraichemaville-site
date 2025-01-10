"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";
import { UserStore, createUserStore, initUserStore } from "./store";

export const UserStoreContext = createContext<StoreApi<UserStore> | null>(null);

export interface UserStoreProviderProps {
  children: ReactNode;
}

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const storeRef = useRef<StoreApi<UserStore>>(createUserStore(initUserStore()));

  return <UserStoreContext.Provider value={storeRef.current}>{children}</UserStoreContext.Provider>;
};

export const useUserStore = <T,>(selector: (_store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error(`useUserStore must be use within userStoreProvider`);
  }

  return useStore(userStoreContext, selector);
};
