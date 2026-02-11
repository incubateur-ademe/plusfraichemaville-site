/**
 * INTERNAL USE ONLY - DO NOT IMPORT IN COMPONENTS/FORMS/STORES/ACTIONS
 *
 * These types are for internal Prisma query file use only.
 * For frontend use, import DTOs from @/src/types/dto instead.
 *
 * DTOs provide:
 * - camelCase properties (not snake_case)
 * - Serializable Date fields (strings, not Date objects)
 * - Clear separation between data layer and presentation layer
 */

import {
  collectivite,
  diagnostic_simulation,
  Prisma,
  projet,
  projet_fiche,
  RoleProjet,
  User,
} from "@/src/generated/prisma/client";
import { IndiEnQuestion } from "@/src/helpers/indicateurs-environnementaux/indi-en-types";

export type UserWithCollectivite = Prisma.UserGetPayload<{
  include: { collectivites: { include: { collectivite: true } } };
}>;

export type UserWithProjets = Prisma.UserGetPayload<{
  include: { projets: { include: { projet: true } } };
}>;

export type EstimationWithAides = Prisma.estimationGetPayload<{
  include: {
    estimations_aides: {
      include: {
        aide: true;
      };
    };
    estimations_fiches_solutions: {
      include: {
        estimation_materiaux: true;
      };
    };
  };
}>;

export type UserProjetWithUser = Prisma.user_projetGetPayload<{
  include: { user: true };
}>;

export type UserWithAdminProjets = Prisma.UserGetPayload<{
  include: {
    projets: {
      where: { role: "ADMIN" };
      include: { projet: { include: { collectivite: true } } };
    };
    collectivites: {
      include: {
        collectivite: {
          select: {
            code_postal: true;
            adresse_all_infos: true;
          };
        };
      };
    };
  };
}>;

export type UserProjetWithUserInfos = Prisma.user_projetGetPayload<{
  select: {
    id;
    user: {
      select: {
        id: true;
        nom: true;
        prenom: true;
        email: true;
        poste: true;
        nom_etablissement: true;
      };
    };
    created_at: true;
    role: true;
    invitation_status: true;
    user_id: true;
    nb_views: true;
  };
}>;

export type UserProjetWithPublicInfos = Prisma.user_projetGetPayload<{
  select: {
    id;
    user: {
      select: {
        id: true;
        nom: true;
        prenom: true;
        email: true;
        poste: true;
        nom_etablissement: true;
      };
    };
    projet: {
      select: {
        collectivite: true;
        nom: true;
        type_espace: true;
        niveau_maturite: true;
        adresse_all_infos: true;
      };
    };
  };
}>;

export type UserPublicInfos = Prisma.UserGetPayload<{
  select: {
    id: true;
    nom: true;
    prenom: true;
    email: true;
    poste: true;
    nom_etablissement: true;
  };
}>;

export type UserProjetWithRelations = Prisma.user_projetGetPayload<{
  include: {
    projet: { include: { collectivite: true } };
    user: { include: { collectivites: { include: { collectivite } } } };
  };
}>;

export type ProjetSourcingContact = Prisma.projet_sourcing_contactGetPayload<{
  include: {
    sourced_user_projet: {
      include: {
        user: {
          select: {
            id: true;
            nom: true;
            prenom: true;
            email: true;
            poste: true;
            nom_etablissement: true;
          };
        };
        projet: {
          select: {
            collectivite: true;
            nom: true;
            type_espace: true;
            niveau_maturite: true;
            adresse_all_infos: true;
          };
        };
      };
    };
  };
}>;

export type EstimationAide = EstimationWithAides["estimations_aides"][number];

export interface ProjetWithCollectivite extends projet {
  collectivite: collectivite;
}

export interface ProjetWithRelations extends projet {
  collectivite: collectivite;
  estimations: EstimationWithAides[];
  creator: User;
  users: UserProjetWithUser[];
  sourcing_user_projets: ProjetSourcingContact[];
  fiches: projet_fiche[];
  diagnostic_simulations: diagnostic_simulation[];
}

export interface ProjetWithPublicRelations
  extends Pick<projet, "id" | "nom" | "collectiviteId" | "type_espace" | "niveau_maturite" | "adresse_all_infos"> {
  collectivite: collectivite;
  users: UserProjetWithUserInfos[];
}

type ProjectUserAndAdmin = {
  user: {
    email: string;
  } | null;
  role: RoleProjet;
};

export type ProjetWithAdminUser = ProjetWithCollectivite & {
  users: ProjectUserAndAdmin[];
};

export type EstimationFicheSolution = Prisma.estimation_fiche_solutionGetPayload<{ include: { estimation_materiaux } }>;
export type SimpleEstimationFicheSolution = Prisma.estimation_fiche_solutionGetPayload<{
  select: { fiche_solution_id; quantite; cout_investissement_override; cout_entretien_override };
}>;

export type EstimationSimpleFicheSolutionForm = {
  ficheSolutionId: number;
  quantite: number;
  coutInvestissementOverride?: number;
  coutEntretienOverride?: number;
};

export type EstimationMateriau = Prisma.estimation_materiauxGetPayload<{
  select: { materiau_id; quantite; cout_investissement_override; cout_entretien_override };
}>;

export type EstimationMateriauForm = {
  materiauId: number;
  quantite: number;
  coutInvestissementOverride?: number;
  coutEntretienOverride?: number;
};

export type AgentConnectInfo = { siret: string };

type ClimadiagTemperatureProjection = {
  min: number;
  max: number;
  median: number;
};
export type ProjectionsIndicateurClimadiag = {
  2030: ClimadiagTemperatureProjection;
  2050: ClimadiagTemperatureProjection;
  2100: ClimadiagTemperatureProjection;
};

export type IndiEnItemSaisie = {
  questionCode: IndiEnQuestion["code"];
  quantite: number;
};

export type ProjetIndiEnSimuation = {
  questions: IndiEnItemSaisie[];
  coeffRafraichissementUrbain: number;
  coeffBiodiversite: number;
  coeffPermeabilite: number;
  partCanopee: number;
  partSurfaceVegetalisee: number;
  partRevetementSol: number;
  partFontainerie: number;
  partToiture: number;
};
