"use client";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Link from "next/link";

export const TYPE_ESPACE_FILTER_NAME = "espaceFilter";

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
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const removeEspaceFilterQueryString = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(TYPE_ESPACE_FILTER_NAME);
    return params.toString();
  };

  const espaceFilter = searchParams.get(TYPE_ESPACE_FILTER_NAME);

  const linkStyle = (typeEspace?: string) => {
    if (typeEspace && espaceFilter === typeEspace) {
      return " border-b ";
    } else if (!typeEspace && !espaceFilter) {
      return " border-b ";
    } else {
      return " hover:border-b ";
    }
  };

  return (
    <div className={`flex flex-row flex-wrap ${className}`}>
      <Link className={`bg-none ${linkStyle()}`} href={pathname + "?" + removeEspaceFilterQueryString()}>
        <div className={"w-28 flex flex-col items-center"}>
          <Image width={50} height={50} src="/images/espaces/espace-icone-tous-espaces.svg" alt="Tous espaces" />
          <div className={"text-sm"}>Tous espaces</div>
        </div>
      </Link>
      {ALL_ESPACES.map((espace) => (
        <Link
          key={espace.code}
          href={pathname + "?" + createQueryString(TYPE_ESPACE_FILTER_NAME, espace.code)}
          className={`bg-none ${linkStyle(espace.code)}`}
        >
          <div className={"w-28 flex flex-col items-center"}>
            <Image width={50} height={50} src={`/images/espaces/${espace.icon}`} alt={espace.label} />
            <div className={"text-sm"}>{espace.label}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
