interface IApiSirenQuery {
  fault?: {
    code: number;
    description: string;
    message: string;
  };
  error?: {
    error_description: string;
  };
  header: {
    debut: number;
    nombre: number;
    message: "OK" | string;
    statut: number;
    total: number;
  };
}

export type SirenInfo = {
  siren: string;
  siret: string;
  uniteLegale?: { denominationUniteLegale?: string; categorieJuridiqueUniteLegale?: string };
  adresseEtablissement: { codePostalEtablissement: string | null; codeCommuneEtablissement: string | null };
};

export interface IApiSirenQueryTypes extends IApiSirenQuery {
  etablissement?: SirenInfo;
}
