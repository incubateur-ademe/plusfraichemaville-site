"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";

import { createProjetStore, initProjetsStore, type ProjetsStore } from "@/src/stores/projets/store";

export const ProjetsStoreContext = createContext<StoreApi<ProjetsStore> | null>(null);

export interface ProjetsStoreProviderProps {
  children: ReactNode;
}

export const ProjetsStoreProvider = ({ children }: ProjetsStoreProviderProps) => {
  const storeRef = useRef<StoreApi<ProjetsStore>>(createProjetStore(initProjetsStore()));

  return <ProjetsStoreContext.Provider value={storeRef.current}>{children}</ProjetsStoreContext.Provider>;
};

export const useProjetsStore = <T,>(selector: (_store: ProjetsStore) => T): T => {
  const projetsStoreContext = useContext(ProjetsStoreContext);

  if (!projetsStoreContext) {
    throw new Error(`useProjetsStore must be use within projetsStoreProvider`);
  }

  return useStore(projetsStoreContext, selector);
};
