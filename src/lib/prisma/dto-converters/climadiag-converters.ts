/**
 * Climadiag Converters
 * Converts Prisma types to DTOs
 */

import { climadiag } from '@/src/generated/prisma/client';
import { ClimadiagDto } from '@/src/types/dto';
import { ProjectionsIndicateurClimadiag } from "@/src/lib/prisma/prismaCustomTypes";

export function convertClimadiagToDto(climadiag: climadiag): ClimadiagDto {
  return {
    id: climadiag.id,
    nom: climadiag.nom,
    typeLieu: climadiag.type_lieu,
    codeInsee: climadiag.code_insee,
    codePostal: climadiag.code_postal,
    epciParentId: climadiag.epci_parent_id,
    joursTresChauxRef: climadiag.jours_tres_chauds_ref,
    joursTresChauxPrevision: climadiag.jours_tres_chauds_prevision as ProjectionsIndicateurClimadiag,
    nuitsChauxdesRef: climadiag.nuits_chaudes_ref,
    nuitsChauxdesPrevision: climadiag.nuits_chaudes_prevision as ProjectionsIndicateurClimadiag,
    joursVdcRef: climadiag.jours_vdc_ref,
    joursVdcPrevision: climadiag.jours_vdc_prevision as ProjectionsIndicateurClimadiag,
    population: climadiag.population,
    superficie: climadiag.superficie,
    couvertureLcz: climadiag.couverture_lcz,
    adresseAllInfos: climadiag.adresse_all_infos,
    searchableField: climadiag.searchable_field,
  };
}
