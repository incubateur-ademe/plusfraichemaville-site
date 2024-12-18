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

export interface IApiSirenQueryTypes extends IApiSirenQuery {
  etablissement?: {
    adresseEtablissement: { codePostalEtablissement: string | null; codeCommuneEtablissement: string | null };
    uniteLegale?: { denominationUniteLegale?: string };
  };
}
