export const commonAssets = {
  saved: {
    code: "fr-icon-bookmark-fill",
    label: "Sauvegardé",
  },
  unsaved: {
    code: "fr-icon-bookmark-line",
    label: "Sauvegarder",
  },
};

const projetAssets = {
  saved: {
    code: "ri-add-circle-fill",
    label: "Ajoutée au projet",
  },
  unsaved: {
    code: "ri-add-circle-line",
    label: "Ajouter au projet",
  },
};

export const selectSavedOrUnsavedAssets = (isSaved: boolean, type: "common" | "projet") =>
  type === "common" && isSaved
    ? commonAssets.saved
    : type === "common" && !isSaved
      ? commonAssets.unsaved
      : type === "projet" && isSaved
        ? projetAssets.saved
        : projetAssets.unsaved;
