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

export interface IApiSirenQueryToken extends IApiSirenQuery {
  access_token: string;
}

export interface IApiSirenQueryTypes extends IApiSirenQuery {
  etablissement?: {
    uniteLegale: {
      denominationUniteLegale: string | null;
    };
    adresseEtablissement: { codePostalEtablissement: string | null };
  };
}
