import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";

export enum PptxTemplateTag {
  NOM_PROJET = "nom_projet",
  COMMUNE_PROJET = "commune_projet",
  CODE_POSTAL_PROJET = "code_postal_projet",
  ADRESSE_PROJET = "adresse_projet",
  DATE_GENERATION_SYNTHESE = "date_generation_synthese",
  TITRE_FICHES_SOLUTION = "titre_fiches_solution",
}

export enum PptxSlide {
  INTRO_FICHES_SOLUTION = 2,
}

export type GenerateSyntheseProjetPptxParams = {
  projet: ProjetWithRelations;
  solutionIds?: string[];
  templateFileName?: string;
};
