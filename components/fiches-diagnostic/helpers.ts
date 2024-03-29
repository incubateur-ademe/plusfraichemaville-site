import { updateFichesDiagnosticByUserAction } from "@/actions/users/update-fiches-diagnostic-by-user-action";

export const FICHE_DIAGNOSTIC_IDS_STORAGE_KEY = "fiches-diagnostic";

export const updateFicheDiagnosticToLocalStorage = (ficheDiagnosticId: string) => {
  let storedFicheDiagnosticIds = localStorage.getItem(FICHE_DIAGNOSTIC_IDS_STORAGE_KEY);
  let currentFichesDiagnosticIds: string[] = storedFicheDiagnosticIds ? JSON.parse(storedFicheDiagnosticIds) : [];

  if (currentFichesDiagnosticIds) {
    if (currentFichesDiagnosticIds.includes(ficheDiagnosticId.toString())) {
      currentFichesDiagnosticIds = currentFichesDiagnosticIds.filter((id) => id !== ficheDiagnosticId);
    } else {
      currentFichesDiagnosticIds.push(ficheDiagnosticId);
    }
  }

  localStorage.setItem(FICHE_DIAGNOSTIC_IDS_STORAGE_KEY, JSON.stringify(currentFichesDiagnosticIds));
  return currentFichesDiagnosticIds;
};

export const clearAndSaveFichesDiagnostic = async (userId: string) => {
  let storedFicheDiagnosticIds = localStorage.getItem(FICHE_DIAGNOSTIC_IDS_STORAGE_KEY);
  let currentFichesDiagnosticIds: number[] = storedFicheDiagnosticIds ? JSON.parse(storedFicheDiagnosticIds) : [];
  if (currentFichesDiagnosticIds) {
    updateFichesDiagnosticByUserAction(userId, currentFichesDiagnosticIds);
    localStorage.clear();
  }
};

export const getAndAddFichesDiagnosticToStore = (setBookmarkedFichesDiagnostic: (_fichesIds: string[]) => void) => {
  let storedFicheDiagnosticIds = localStorage.getItem(FICHE_DIAGNOSTIC_IDS_STORAGE_KEY);
  let currentFichesDiagnosticIds: string[] = storedFicheDiagnosticIds ? JSON.parse(storedFicheDiagnosticIds) : [];
  setBookmarkedFichesDiagnostic(currentFichesDiagnosticIds);
};

export const getFichesDiagnosticFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    let storedFicheDiagnosticIds = localStorage.getItem(FICHE_DIAGNOSTIC_IDS_STORAGE_KEY);
    let currentFichesDiagnosticIds: number[] = storedFicheDiagnosticIds ? JSON.parse(storedFicheDiagnosticIds) : [];
    return currentFichesDiagnosticIds;
  }
};
