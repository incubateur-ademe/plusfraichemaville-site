// Type dérivé de la requête générée par graphql-codegen (voir `src/lib/strapi/queries/chartes-queries.ts`).
// Ne pas écrire ce type à la main : il suit automatiquement les champs demandés dans la requête.
import type { GetAllChartesQuery } from "@/src/generated/strapi/graphql";

export type Charte = NonNullable<GetAllChartesQuery["chartes"][number]>;
