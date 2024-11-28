"use client";

import { ALL_ESPACES } from "@/src/helpers/type-espace-filter";
import { useTypeEspaceFilter } from "@/src/hooks/useTypeEspaceFilter";

import Image from "next/image";

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
