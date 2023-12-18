"use client";
import Image from "next/image";
import { useTypeEspaceFilter } from "@/hooks/useTypeEspaceFilter";

type TypeEspace = {
  label: string;
  icon: string;
  code: string;
};

const ALL_ESPACES: TypeEspace[] = [
  { label: "Rond-point", code: "rondpoint", icon: "espace-icone-rond-point.svg" },
  { label: "Bâtiment", code: "batiment", icon: "espace-icone-batiment.svg" },
  { label: "Parking", code: "parking", icon: "espace-icone-parking.svg" },
  { label: "Rue", code: "rue", icon: "espace-icone-rue.svg" },
  { label: "Place", code: "place", icon: "espace-icone-place.svg" },
  { label: "Cour d'école", code: "ecole", icon: "espace-icone-cour-ecole.svg" },
  { label: "Parc et jardin", code: "parc", icon: "espace-icone-cour-parc-jardin.svg" },
];

export default function TypeEspaceFilter({ className }: { className?: string }) {
  const { setTypeEspaceFilter, clearTypeEspaceFilter, isTypeEspaceSelected } = useTypeEspaceFilter();

  const buttonStyle = (typeEspace?: string) => {
    return isTypeEspaceSelected(typeEspace) ? " border-b border-l-0 border-t-0 border-r-0 border-solid " : "";
  };

  return (
    <div className={`flex flex-row flex-wrap ${className}`}>
      <button className={`!bg-none ${buttonStyle()}`} onClick={() => clearTypeEspaceFilter()}>
        <div className={"w-16 md:w-28 flex flex-col items-center"}>
          <Image width={50} height={50} src="/images/espaces/espace-icone-tous-espaces.svg" alt="Tous espaces" />
          <div className={"text-sm text-center"}>Tous espaces</div>
        </div>
      </button>
      {ALL_ESPACES.map((espace) => (
        <button
          key={espace.code}
          onClick={() => setTypeEspaceFilter(espace.code)}
          className={`!bg-none ${buttonStyle(espace.code)}`}
        >
          <div className={"w-16 md:w-28 flex flex-col items-center"}>
            <Image width={50} height={50} src={`/images/espaces/${espace.icon}`} alt={espace.label} />
            <div className={"text-sm text-center"}>{espace.label}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
