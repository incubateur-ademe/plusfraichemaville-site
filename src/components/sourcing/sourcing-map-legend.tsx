import Image from "next/image";

const legends = [
  {
    picto: "collectivite",
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
    <div className="absolute bottom-0 left-0 z-[450] flex items-center gap-6 rounded-tr-2xl bg-white px-3 py-1 text-sm">
      <span className="font-bold">Légende</span>
      {legends.map((legend, index) => (
        <div className="flex items-center gap-4" key={index}>
          <Image
            src={`/images/sourcing/sourcing-projet-${legend.picto}.svg`}
            width={20}
            height={24}
            className={index === 0 ? "w-[48px]" : "w-[34px]"}
            alt=""
          />
          <span>{legend.label}</span>
        </div>
      ))}
    </div>
  );
};
