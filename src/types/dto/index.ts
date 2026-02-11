/**
 * DTO Barrel Export
 * All DTOs for frontend consumption
 *
 * DTOs decouple the frontend from Prisma database schema by:
 * - Using camelCase instead of snake_case
 * - Converting Date objects to ISO string format
 * - Providing clear type boundaries
 */

export * from './collectivite.dto';
export * from './user.dto';
export * from './aide.dto';
export * from './estimation.dto';
export * from './user-projet.dto';
export * from './projet-fiche.dto';
export * from './sourcing.dto';
export * from './diagnostic.dto';
export * from './projet.dto';
export * from './climadiag.dto';
