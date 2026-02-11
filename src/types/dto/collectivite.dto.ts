/**
 * Collectivite DTO
 * Decouples frontend from Prisma database schema
 */

export interface CollectiviteDto {
  id: number;
  nom: string;
  codeInsee: string | null;
  codePostal: string | null;
  adresseInfo: unknown | null;
  adresseAllInfos: unknown | null;
  banId: string | null;
  latitude: number | null;
  longitude: number | null;
  createdBy: string;
  createdAt: string;
  aidesTerritoriesPerimeterId: string | null;
}
