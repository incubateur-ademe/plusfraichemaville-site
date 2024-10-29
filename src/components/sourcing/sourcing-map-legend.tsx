import clsx from "clsx";
import Image from "next/image";

const legends = [
  {
    picto: "ma-collectivite",
    label: "Ma collectivité",
  },
  {
    picto: "rex",
    label: "Projet réalisé",
  },
  {
    picto: "in-progress",
    label: "Projet en cours",
  },
];

export const SourcingMapLegend = () => {
  return (
    <div className="absolute bottom-0 left-0 z-[450] flex items-center gap-6 rounded-tr-2xl bg-white p-3 text-sm">
      <span className="font-bold">Légende</span>
      {legends.map((legend, index) => (
        <div className={clsx("flex items-center", "gap-3")} key={index}>
          <Image src={`/images/sourcing/sourcing-projet-${legend.picto}.svg`} width={20} height={24} alt="" />
          <span>{legend.label}</span>
        </div>
      ))}
    </div>
  );
};
