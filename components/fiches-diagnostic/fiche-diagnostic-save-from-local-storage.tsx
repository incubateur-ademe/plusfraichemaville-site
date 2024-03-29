"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { clearAndSaveFichesDiagnostic, getAndAddFichesDiagnosticToStore } from "./helpers";
import { useUserStore } from "@/stores/user/provider";

export const FicheDiagnosticSaveFromLocalStorage = () => {
  const session = useSession();
  const setBookmarkedFichesDiagnostic = useUserStore((state) => state.setBookmarkedFichesDiagnostic);
  const userId = session.data?.user.id;
  useEffect(() => {
    if (userId) {
      clearAndSaveFichesDiagnostic(userId);
    } else {
      getAndAddFichesDiagnosticToStore(setBookmarkedFichesDiagnostic);
    }
  }, [setBookmarkedFichesDiagnostic, userId]);
  return null;
};
