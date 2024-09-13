"use client";
import Image from "next/image";
import { useTypeEspaceFilter } from "@/src/hooks/useTypeEspaceFilter";
import { SelectOption } from "@/src/components/common/SelectFormField";

export type TypeEspace = {
  label: string;
  icon: string;
  code: "rondpoint" | "batiment" | "parking" | "rue" | "place" | "ecole" | "parc";
};

export const ALL_ESPACES: TypeEspace[] = [
  { label: "Rond point", code: "rondpoint", icon: "espace-icone-rond-point.svg" },
  { label: "Bâtiment", code: "batiment", icon: "espace-icone-batiment.svg" },
  { label: "Parking", code: "parking", icon: "espace-icone-parking.svg" },
  { label: "Rue", code: "rue", icon: "espace-icone-rue.svg" },
  { label: "Place", code: "place", icon: "espace-icone-place.svg" },
  { label: "Cour d'école", code: "ecole", icon: "espace-icone-cour-ecole.svg" },
  { label: "Espaces verts", code: "parc", icon: "espace-icone-cour-parc-jardin.svg" },
];

export const typeEspaceOptions: SelectOption[] = [
  ...ALL_ESPACES.map((espace) => ({ name: espace.label, value: espace.code })),
];

export const selectEspaceByCode = (espaceCode?: string | null) =>
  espaceCode ? ALL_ESPACES.find((espace) => espace.code === espaceCode)?.label || espaceCode : espaceCode;

export default function TypeEspaceFilter({ className }: { className?: string }) {
  const { setTypeEspaceFilter, clearTypeEspaceFilter, isTypeEspaceSelected } = useTypeEspaceFilter();

  const buttonStyle = (typeEspace?: string) => {
    return isTypeEspaceSelected(typeEspace) ? " border-b border-l-0 border-t-0 border-r-0 border-solid " : "";
  };

  return (
    <div className={`flex flex-row flex-wrap ${className}`}>
      <button className={`w-20 !bg-none md:w-28 ${buttonStyle()}`} onClick={() => clearTypeEspaceFilter()}>
        <div className={"flex flex-col items-center"}>
          <Image width={50} height={50} src="/images/espaces/espace-icone-tous-espaces.svg" alt="Tous espaces" />
          <div className={"text-center text-sm"}>Tous espaces</div>
        </div>
      </button>
      {ALL_ESPACES.map((espace) => (
        <button
          key={espace.code}
          onClick={() => setTypeEspaceFilter(espace.code)}
          className={`w-20 !bg-none md:w-28 ${buttonStyle(espace.code)}`}
        >
          <div className={"flex flex-col items-center"}>
            <Image width={50} height={50} src={`/images/espaces/${espace.icon}`} alt={espace.label} />
            <div className={"text-center text-sm"}>{espace.label}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
