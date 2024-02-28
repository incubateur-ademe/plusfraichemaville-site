import { TypeEspace } from "@/components/filters/TypeEspaceFilter";

import Image from "next/image";

const pictos: Record<TypeEspace["code"], string> = {
  rondpoint: "espace-icone-rond-point.svg",
  batiment: "espace-icone-batiment.svg",
  parking: "espace-icone-parking.svg",
  rue: "espace-icone-rue.svg",
  place: "espace-icone-place.svg",
  ecole: "espace-icone-cour-ecole.svg",
  parc: "espace-icone-cour-parc-jardin.svg",
};

export const PictoEspaceSelector = ({
  pictoId,
  withBackground,
  width = 65,
  height = 65,
}: {
  pictoId: keyof typeof pictos;
  withBackground?: boolean;
  width?: number;
  height?: number;
}) => {
  const selectedPicto = pictos[pictoId];

  return (
    <div className={`w-[75px] h-[75px] relative flex justify-center items-center`}>
      {withBackground && (
        <div className="absolute inset-0 w-full h-full -z-1 rounded-lg bg-[var(--blue-france-850-200)]"></div>
      )}
      <div className="z-10">
        <Image width={width} height={height} alt={`pictogramme ${pictoId}`} src={`/images/espaces/${selectedPicto}`} />
      </div>
    </div>
  );
};
