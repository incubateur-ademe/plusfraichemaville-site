"use client";
import Image from "next/image";

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
  return (
    <div className={`flex flex-row flex-wrap ${className}`}>
      <div className={"w-28 flex flex-col items-center"}>
        <Image width={50} height={50} src="/images/espaces/espace-icone-tous-espaces.svg" alt="Tous espaces" />
        <div className={"text-sm"}>Tous espaces</div>
      </div>
      {ALL_ESPACES.map((espace) => (
        <div className={"w-28 flex flex-col items-center"}>
          <Image width={50} height={50} src={`/images/espaces/${espace.icon}`} alt={espace.label} />
          <div className={"text-sm"}>{espace.label}</div>
        </div>
      ))}
    </div>
  );
}
