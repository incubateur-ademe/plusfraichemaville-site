"use client";

import { useUserStore } from "@/stores/user/provider";
import Button from "@codegouvfr/react-dsfr/Button";
import clsx from "clsx";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import Link from "next/link";
import { PFMV_ROUTES } from "@/helpers/routes";

type FicheDiagnosticSaveButtonProps = {
  ficheDiagnosticId: number;
  projetId?: number;
  showLabel?: boolean;
  className?: string;
};

const modal = createModal({
  id: "bookmark-diag-modal",
  isOpenedByDefault: false,
});

export const FicheDiagnosticSaveButton = ({
  ficheDiagnosticId,
  projetId,
  showLabel = false,
  className,
}: FicheDiagnosticSaveButtonProps) => {
  const updateBookmarkedFichesDiagnostic = useUserStore((state) => state.updateBookmarkedFichesDiagnostic);

  const ficheDiagnosticIdsFromDatabase = useUserStore((state) => state.userInfos?.selection_fiches_diagnostic);
  const isSavedInDatabase =
    ficheDiagnosticIdsFromDatabase && ficheDiagnosticIdsFromDatabase.includes(+ficheDiagnosticId);

  const ficheDiagnosticIdsFromStorage = useUserStore((state) => state.bookmarkedFichesDiagnostic);
  const isSavedInStorage =
    ficheDiagnosticIdsFromStorage && ficheDiagnosticIdsFromStorage.includes(ficheDiagnosticId.toString());

  const projetPicto = isSavedInDatabase ? "ri-add-circle-fill" : "ri-add-circle-line";
  const label = isSavedInStorage || isSavedInDatabase ? "Sauvegardée" : showLabel ? "Sauvegarder" : "";

  const userBookmarkPicto = isSavedInStorage || isSavedInDatabase ? "fr-icon-bookmark-fill" : "fr-icon-bookmark-line";
  const picto = projetId ? projetPicto : userBookmarkPicto;

  const updateFicheDiagnostic = async () => {
    updateBookmarkedFichesDiagnostic(ficheDiagnosticId);
    if (!(isSavedInDatabase || isSavedInStorage)) {
      modal.open();
    }
  };

  return (
    <>
      <modal.Component title="" size="large">
        <div className="flex items-center mb-10">
          <i className={"fr-icon--lg fr-icon-arrow-right-line mr-4"} />
          <span className="text-2xl font-bold">Méthode diagnostic ajoutée dans ma sélection</span>
        </div>
        <Button
          priority="primary"
          className="rounded-3xl !min-h-fit !text-sm md:ml-20 mr-4 mb-4"
          onClick={() => modal.close()}
        >
          Continuer ma lecture
        </Button>
        <Link
          href={PFMV_ROUTES.MES_FICHES_SOLUTIONS}
          className="fr-btn fr-btn--secondary rounded-3xl !min-h-fit !text-sm mr-4"
        >
          Voir mes méthodes de diagnostic
        </Link>
      </modal.Component>
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
