import Image from "next/image";
import { PictoType } from ".";
import clsx from "clsx";
import { ALL_ECHELLES } from "@/components/fiches-diagnostic/filters/echelle";

type PictoEchelleType = PictoType<"territoire" | "espace" | "toutes">;

/**
 *
 * @param size Class size de tailwind. Exemple: "w-20 h-[4px]"
 * @returns
 */
export const PictoEchelleSelector = ({ pictoId, className }: PictoEchelleType) => {
  const selectedPicto = ALL_ECHELLES.find((echelle) => echelle.code === pictoId)?.icon ?? "echelle-toutes";
  const selectedName =
    pictoId === "espace" ? "Échelle Espace" : pictoId === "territoire" ? "Échelle Territoire" : "Toutes les échelles";
  return (
    <div
      className={clsx(
        "w-20 h-24 flex justify-center items-center flex-col rounded-[10px]",
        "text-dsfr-background-flat-warning bg-pfmv-orange",
      )}
    >
      <Image
        src={`/images/echelle/${selectedPicto}.svg`}
        className={clsx("mx-auto !text-dsfr-background-flat-warning", className)}
        alt={`${pictoId}`}
        width={20}
        height={20}
      />
      <span className="text-center text-xs font-bold text-dsfr-background-flat-warning">{selectedName}</span>
    </div>
  );
};
