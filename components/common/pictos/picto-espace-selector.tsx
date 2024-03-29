import { TypeEspace } from "@/components/filters/TypeEspaceFilter";

import Image from "next/image";
import { PictoType } from ".";

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

type PictoEspaceType = PictoType<PictoId> & { withBackground: boolean };

export const PictoEspaceSelector = ({ pictoId, withBackground, width = 64, height = 64 }: PictoEspaceType) => {
  const selectedPicto = pictos[pictoId];

  return (
    <div className={`p-[5px] w-20 h-20 relative flex justify-center items-center`}>
      {withBackground && (
        <div className="absolute inset-0 w-full h-full -z-1 rounded-lg bg-dsfr-background-action-low-blue-france"></div>
      )}
      <div className="z-10">
        <Image width={width} height={height} alt={`pictogramme ${pictoId}`} src={`/images/espaces/${selectedPicto}`} />
      </div>
    </div>
  );
};
