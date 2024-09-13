"use client";

import { useUserStore } from "@/src/stores/user/provider";
import { useEffect } from "react";

export const GenericFichesSaverFromLocalStorage = () => {
  const save = useUserStore((state) => state.updateBookmarkedFichesFromLocalStorage);
  useEffect(() => {
    save();
  }, [save]);
  return null;
};
