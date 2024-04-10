import clsx from "clsx";

export const baseAssets = (type: "common" | "projet") => ({
  saved: {
    code: "",
    label: type === "common" ? "Sauvegardée" : "Ajoutée au projet x",
    className: "!text-sm !w-fit !min-h-[2rem] !pr-3 !pl-[0.65rem]  rounded-full !py-0 flex justify-center items-center",
  },
  unsaved: {
    code: "ri-bookmark-line",
    // code: "ri-add-line",
    label: "",
    className: clsx(
      "!min-h-[2rem] !w-8 !h-8 !p-1  rounded-full flex justify-center items-center",
      // "!min-h-[2rem] !p-1  rounded-full flex justify-center items-center",
      "!bg-pfmv-light-grey [&>*]:bg-pfmv-light-grey] shadow-pfmv-card-shadow",
      "[&>*]:text-dsfr-text-mention-grey",
    ),
  },
});

export const selectSavedOrUnsavedAssets = (isSaved: boolean, type: "common" | "projet") =>
  isSaved ? baseAssets(type).saved : baseAssets(type).unsaved;
