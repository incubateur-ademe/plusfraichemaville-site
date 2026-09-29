import { SelectOption } from "@/src/components/common/SelectFormField";

export type TypeEspace = {
  label: string;
  icon: string;
  code: "rondpoint" | "batiment" | "parking" | "rue" | "place" | "ecole" | "parc" | "plusieurs" | "nondefini";
  searchKeywords?: string;
};

export type TypeEspaceCode = TypeEspace["code"];

export const DEFINED_ESPACES: TypeEspace[] = [
  { label: "Rond point", code: "rondpoint", icon: "espace-icone-rond-point.svg" },
  { label: "Bâtiment", code: "batiment", icon: "espace-icone-batiment.svg", searchKeywords: "confort d'été" },
  { label: "Parking", code: "parking", icon: "espace-icone-parking.svg" },
  { label: "Rue", code: "rue", icon: "espace-icone-rue.svg" },
  { label: "Place", code: "place", icon: "espace-icone-place.svg" },
  { label: "Cour d'école", code: "ecole", icon: "espace-icone-cour-ecole.svg" },
  { label: "Espace vert", code: "parc", icon: "espace-icone-cour-parc-jardin.svg" },
];

export const UNDEFINED_ESPACES: TypeEspace[] = [
  { label: "Plusieurs types d’espaces à la fois", code: "plusieurs", icon: "espace-icone-tous-espaces.svg" },
  { label: "Je ne sais pas encore", code: "nondefini", icon: "espace-icone-tous-espaces.svg" },
];

export const ALL_ESPACES: TypeEspace[] = [...DEFINED_ESPACES, ...UNDEFINED_ESPACES];

export const typeEspaceOptions: SelectOption[] = [
  ...ALL_ESPACES.map((espace) => ({ name: espace.label, value: espace.code })),
];

export const selectEspaceLabelByCode = (espaceCode?: string | null) =>
  espaceCode ? ALL_ESPACES.find((espace) => espace.code === espaceCode)?.label || espaceCode : espaceCode;

export const selectDefinedEspaceByCode = (espaceCode?: string | null) =>
  espaceCode ? DEFINED_ESPACES.find((espace) => espace.code === espaceCode) : null;

export const espaceCodesToEspacesSearchKeywords = (espaceCodes: string[] | null) =>
  espaceCodes
    ?.map((espace) => {
      const typeEspace = selectDefinedEspaceByCode(espace);
      return [typeEspace?.label, typeEspace?.searchKeywords].join(" ");
    })
    .filter(Boolean)
    .join(" ");
