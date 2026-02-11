/**
 * Climadiag DTO
 * Decouples frontend from Prisma database schema
 */

import { TypeLieuClimadiag } from '@/src/generated/prisma/client';
import { ProjectionsIndicateurClimadiag } from "@/src/lib/prisma/prismaCustomTypes";

export interface ClimadiagDto {
  id: number;
  nom: string;
  typeLieu: TypeLieuClimadiag;
  codeInsee: string;
  codePostal: string;
  epciParentId: number | null;
  joursTresChauxRef: number | null;
  joursTresChauxPrevision: ProjectionsIndicateurClimadiag;
  nuitsChauxdesRef: number | null;
  nuitsChauxdesPrevision: ProjectionsIndicateurClimadiag;
  joursVdcRef: number | null;
  joursVdcPrevision: ProjectionsIndicateurClimadiag;
  population: number;
  superficie: number;
  couvertureLcz: number;
  adresseAllInfos: unknown | null;
  searchableField: string;
}
