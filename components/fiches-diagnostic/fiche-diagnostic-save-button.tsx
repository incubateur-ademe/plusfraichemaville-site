"use client";

import { useUserStore } from "@/stores/user/provider";
import clsx from "clsx";
import { useSession } from "next-auth/react";

type FicheDiagnosticSaveButtonProps = {
  ficheDiagnosticId: number;
};

export const FicheDiagnosticSaveButton = ({ ficheDiagnosticId }: FicheDiagnosticSaveButtonProps) => {
  const session = useSession();
  const updateBookmarkedFichesDiagnostic = useUserStore((state) => state.updateBookmarkedFichesDiagnostic);

  const ficheDiagnosticIds = useUserStore((state) => state.userInfos?.selection_fiches_diagnostic);
  const isSaved = ficheDiagnosticIds && ficheDiagnosticIds.includes(ficheDiagnosticId);

  const ficheDiagnosticIdsFromStorage = useUserStore((state) => state.bookmarkedFichesDiagnostic);
  const isSavedInStorage =
    ficheDiagnosticIdsFromStorage && ficheDiagnosticIdsFromStorage.includes(ficheDiagnosticId.toString());

  const connectedPicto = isSaved ? "ri-add-circle-fill" : "ri-add-circle-line";
  const disconnectedPicto = isSavedInStorage ? "fr-icon-bookmark-fill" : "fr-icon-bookmark-line";
  const picto = session.status === "authenticated" ? connectedPicto : disconnectedPicto;

  const updateFicheDiagnostic = async () => updateBookmarkedFichesDiagnostic(ficheDiagnosticId);

  return (
    <button
      onClick={updateFicheDiagnostic}
      className={clsx(
        "absolute top-3 right-4 rounded-full bg-pfmv-dark-blue w-8 h-8 flex justify-center items-center",
        "hover:!bg-dsfr-hover-blue-sun",
      )}
    >
      <span className={clsx(picto, "text-white before:!w-4 before:!h-4 h-4 before:!align-[super]")} />
    </button>
  );
};
