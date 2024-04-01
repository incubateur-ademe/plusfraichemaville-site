"use client";

import { useUserStore } from "@/stores/user/provider";
import Button from "@codegouvfr/react-dsfr/Button";
import clsx from "clsx";

type FicheDiagnosticSaveButtonProps = {
  ficheDiagnosticId: number;
  projetId?: number;
  showLabel?: boolean;
  className?: string;
};

export const FicheDiagnosticSaveButton = ({
  ficheDiagnosticId,
  projetId,
  showLabel = false,
  className,
}: FicheDiagnosticSaveButtonProps) => {
  const updateBookmarkedFichesDiagnostic = useUserStore((state) => state.updateBookmarkedFichesDiagnostic);

  const ficheDiagnosticIds = useUserStore((state) => state.userInfos?.selection_fiches_diagnostic);
  const isSaved = ficheDiagnosticIds && ficheDiagnosticIds.includes(+ficheDiagnosticId);

  const ficheDiagnosticIdsFromStorage = useUserStore((state) => state.bookmarkedFichesDiagnostic);
  const isSavedInStorage =
    ficheDiagnosticIdsFromStorage && ficheDiagnosticIdsFromStorage.includes(ficheDiagnosticId.toString());

  const projetPicto = isSaved ? "ri-add-circle-fill" : "ri-add-circle-line";
  const label = isSavedInStorage || isSaved ? "Sauvegardée" : showLabel ? "Sauvegarder" : "";
  const userBookmarkPicto = isSavedInStorage || isSaved ? "fr-icon-bookmark-fill" : "fr-icon-bookmark-line";
  const picto = projetId ? projetPicto : userBookmarkPicto;

  const updateFicheDiagnostic = async () => updateBookmarkedFichesDiagnostic(ficheDiagnosticId);

  return (
    <>
      {label ? (
        <Button
          onClick={updateFicheDiagnostic}
          className={clsx("rounded-3xl text-sm", className)}
          iconId={picto}
          size="small"
        >
          {label}
        </Button>
      ) : (
        <button
          onClick={updateFicheDiagnostic}
          className={clsx(
            "rounded-full bg-pfmv-dark-blue w-8 h-8 flex justify-center items-center",
            "hover:!bg-dsfr-hover-blue-sun",
            className,
          )}
        >
          <span className={clsx(picto, "text-white before:!w-4 before:!h-4 h-4 before:!align-[super]")} />
        </button>
      )}
    </>
  );
};
