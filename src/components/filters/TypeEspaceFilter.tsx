import { SelectOption } from "@/src/components/common/SelectFormField";

export type TypeEspace = {
  label: string;
  icon: string;
  code: "rondpoint" | "batiment" | "parking" | "rue" | "place" | "ecole" | "parc";
};

export type TypeEspaceCode = TypeEspace["code"];

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
