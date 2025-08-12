import { PFMV_ROUTES } from "@/src/helpers/routes";

export const ROUTE_COUPLES = {
  fichesSolution: {
    public: PFMV_ROUTES.FICHES_SOLUTIONS,
    espaceProjet: PFMV_ROUTES.ESPACE_PROJET_FICHES_SOLUTIONS_LISTE,
  },
  retoursExperience: {
    public: PFMV_ROUTES.RETOURS_EXPERIENCE_PROJET,
    espaceProjet: PFMV_ROUTES.ESPACE_PROJET_RETOURS_EXPERIENCE_PROJET,
  },
} as const;

export type IMessageTemplateType = keyof typeof ROUTE_COUPLES;
