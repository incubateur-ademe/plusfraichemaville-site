import { SirenInfo } from "@/src/lib/siren/types";

type CategorieJuridique = {
  code: string;
  libelle: string;
};

export const CAT_JURIDIQUE_COMMUNE: CategorieJuridique = {
  code: "7210",
  libelle: "Commune et commune nouvelle",
};

export const CAT_JURIDIQUE_COLLECTIVITE_TERRITORIALE: CategorieJuridique = {
  code: "7229",
  libelle: "(Autre) Collectivité territoriale",
};
export const CAT_JURIDIQUE_COMMUNAUTE_AGGLOMERATION: CategorieJuridique = {
  code: "7348",
  libelle: "Communauté d'agglomération",
};
export const CAT_JURIDIQUE_COMMUNAUTE_COMMUNE: CategorieJuridique = {
  code: "7346",
  libelle: "Communauté de communes",
};

export const CAT_JURIDIQUE_METROPOLE: CategorieJuridique = {
  code: "7344",
  libelle: "Métropole",
};

export const CAT_JURIDIQUE_COMMUNAUTE_URBAINE: CategorieJuridique = {
  code: "7343",
  libelle: "Communauté urbaine",
};

export const CAT_JURIDIQUES_EPCI: CategorieJuridique[] = [
  CAT_JURIDIQUE_COLLECTIVITE_TERRITORIALE,
  CAT_JURIDIQUE_COMMUNAUTE_AGGLOMERATION,
  CAT_JURIDIQUE_COMMUNAUTE_URBAINE,
  CAT_JURIDIQUE_COMMUNAUTE_COMMUNE,
  CAT_JURIDIQUE_METROPOLE,
];

export const isSirenCommune = (sirenInfo: SirenInfo | null | undefined): boolean => {
  return sirenInfo?.uniteLegale?.categorieJuridiqueUniteLegale === CAT_JURIDIQUE_COMMUNE.code;
};

export const isSirenEPCI = (sirenInfo: SirenInfo | null | undefined): boolean => {
  return !!CAT_JURIDIQUES_EPCI.find(
    (catJuridiqueEpci) => catJuridiqueEpci.code === sirenInfo?.uniteLegale?.categorieJuridiqueUniteLegale,
  );
};
