
export interface APIResponseCollectionMetadata {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface APIResponseCollection<T> {
  data: T[];
  meta: APIResponseCollectionMetadata;
}

export enum FicheDiagnosticUtilite {
  // eslint-disable-next-line no-unused-vars
  ConfortThermique = "amelioration_confort_thermique",
  // eslint-disable-next-line no-unused-vars
  DiminutionICU = "diminution_effet_icu",
}
