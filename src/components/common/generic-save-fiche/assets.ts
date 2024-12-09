import clsx from "clsx";

export const baseAssets = (type: "common" | "projet" | "contact") => ({
  saved: {
    code: false,
    label: type === "contact" ? "Sauvegardé" : type === "common" ? "Sauvegardée" : "Ajoutée au projet",
    className: clsx(
      "bg-pfmv-navy !text-sm !w-fit !min-h-[2rem] pl-3 pr-2  rounded-full !py-0",
      "flex justify-center items-center text-white",
      "hover:!bg-dsfr-background-action-high-blue-france-active",
    ),
  },
  unsaved: {
    code: true,
    className: clsx(
      "!w-8 !h-8 rounded-full flex justify-center items-center",
      " shadow-pfmv-card-shadow overflow-hidden",
    ),
  },
});

export const selectSavedOrUnsavedAssets = (isSaved: boolean, type: "common" | "projet" | "contact") =>
  isSaved ? baseAssets(type).saved : baseAssets(type).unsaved;
