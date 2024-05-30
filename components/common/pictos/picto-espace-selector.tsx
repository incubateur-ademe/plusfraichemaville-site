import { TypeEspace } from "@/components/filters/TypeEspaceFilter";

import Image from "next/image";
import { PictoType } from ".";
import clsx from "clsx";

const pictos: Record<TypeEspace["code"], string> = {
  rondpoint: "espace-icone-rond-point.svg",
  batiment: "espace-icone-batiment.svg",
  parking: "espace-icone-parking.svg",
  rue: "espace-icone-rue.svg",
  place: "espace-icone-place.svg",
  ecole: "espace-icone-cour-ecole.svg",
  parc: "espace-icone-cour-parc-jardin.svg",
};

export type PictoId = keyof typeof pictos;

type PictoEspaceType = PictoType<PictoId> & {
  withBackground: boolean;
  size: "small" | "medium";
  pictoClassName?: string;
};

export const PictoEspaceSelector = ({ pictoId, withBackground, size = "medium", pictoClassName }: PictoEspaceType) => {
  const selectedPicto = pictos[pictoId];

  return (
    <div
      className={clsx(
        `relative flex items-center justify-center`,
        size === "small" ? "h-[3.125rem] w-[3.125rem]" : " h-20 w-20",
      )}
    >
      {withBackground && (
        <div className="-z-1 absolute inset-0 h-full w-full rounded-lg bg-dsfr-background-action-low-blue-france"></div>
      )}
      <div className="z-10">
        <Image
          fill
          alt={`pictogramme ${pictoId}`}
          src={`/images/espaces/${selectedPicto}`}
          className={clsx("p-[5px]", pictoClassName)}
        />
      </div>
    </div>
  );
};
