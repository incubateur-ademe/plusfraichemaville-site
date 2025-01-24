import { TableauDeBordCardType } from "@/src/components/tableau-de-bord/tableau-de-bord-suivi-card";
import Image from "next/image";
import { PictoType } from ".";
import clsx from "clsx";

const pictos: Record<TableauDeBordCardType, string> = {
  diagnostic: "diagnostic.svg",
  estimation: "estimation.svg",
  financement: "financement.svg",
  annuaire: "annuaire.svg",
  renseignement: "renseignement.svg",
  solution: "solution.svg",
};

type PictoTableauDeBordType = PictoType<TableauDeBordCardType>;

/**
 *
 * @param size Class size de tailwind. Exemple: "w-20 h-[4px]"
 * @returns
 */
export const PictoTableauDeBordSelector = ({ pictoId, className }: PictoTableauDeBordType) => {
  const selectedPicto = pictos[pictoId];

  return (
    <Image
      src={`/images/tableau-de-bord/${selectedPicto}`}
      className={clsx("mx-auto", className)}
      alt={`${pictoId}`}
      width={20}
      height={20}
    />
  );
};
