import { AidesTerritoiresAide } from "@/components/financement/types";

export interface IApiAidesTerritoiresResponse {
  message?: string;
}

export interface IApiAidesTerritoiresQueryToken extends IApiAidesTerritoiresResponse {
  token: string;
}

export interface IApiAidesTerritoiresQueryPerimeter extends IApiAidesTerritoiresResponse {
  results: { id: string; zipcodes: string[]; code: string }[];
}

export interface IApiAidesTerritoiresPaginatedAides extends IApiAidesTerritoiresResponse {
  count: number;
  previous: string;
  next: string;
  results: AidesTerritoiresAide[];
}
