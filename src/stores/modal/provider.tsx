"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";
import { createModalStore, initModalStore, ModalStore } from "@/src/stores/modal/store";

export const ModalStoreContext = createContext<StoreApi<ModalStore> | null>(null);

export interface ModalStoreProviderProps {
  children: ReactNode;
}

export const ModalStoreProvider = ({ children }: ModalStoreProviderProps) => {
  const storeRef = useRef<StoreApi<ModalStore>>();
  if (!storeRef.current) {
    storeRef.current = createModalStore(initModalStore());
  }

  return <ModalStoreContext.Provider value={storeRef.current}>{children}</ModalStoreContext.Provider>;
};

export const useModalStore = <T,>(selector: (_store: ModalStore) => T): T => {
  const modalStoreContext = useContext(ModalStoreContext);

  if (!modalStoreContext) {
    throw new Error(`useModalStore must be use within modalStoreProvider`);
  }

  return useStore(modalStoreContext, selector);
};
