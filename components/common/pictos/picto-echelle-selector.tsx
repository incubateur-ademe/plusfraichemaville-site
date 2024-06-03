import Image from "next/image";
import { PictoType } from ".";
import clsx from "clsx";
import { ALL_ECHELLES } from "@/components/fiches-diagnostic/filters/echelle";

type PictoEchelleType = PictoType<"territoire" | "espace" | "toutes"> & { large?: boolean };

/**
 *
 * @param size Class size de tailwind. Exemple: "w-20 h-[4px]"
 * @returns
 */
export const PictoEchelleSelector = ({ pictoId, className, large }: PictoEchelleType) => {
  const selectedPicto = ALL_ECHELLES.find((echelle) => echelle.code === pictoId)?.icon ?? "echelle-toutes";
  const selectedName =
    pictoId === "espace" ? "Échelle Espace" : pictoId === "territoire" ? "Échelle Territoire" : "Toutes les échelles";
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center rounded-[10px]",
        "bg-pfmv-orange text-dsfr-background-flat-warning",
        large ? "h-40 w-36" : "h-24 w-20",
      )}
    >
      <Image
        src={`/images/echelle/${selectedPicto}.svg`}
        className={clsx("svg-orange mx-auto", className)}
        alt={`${pictoId}`}
        width={20}
        height={20}
      />
      <span
        className={clsx(
          "text-center font-bold text-dsfr-background-flat-warning",
          large ? "px-6 text-base" : "text-xs",
        )}
      >
        {selectedName}
      </span>
    </div>
  );
};
