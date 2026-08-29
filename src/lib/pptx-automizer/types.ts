import { ProjetWithRelations } from "@/src/lib/prisma/prismaCustomTypes";

export enum PptxTemplateTag {
  NOM_PROJET = "nom-projet",
  NOM_PROJET_LEGACY = "nom_projet",
}

export type GenerateSyntheseProjetPptxParams = {
  projet: ProjetWithRelations;
  templateFileName?: string;
};
