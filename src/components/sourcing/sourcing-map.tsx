import { getPublicProjets } from "@/src/lib/prisma/prismaProjetQueries";
import {
  getRetoursExperiences,
  getRetoursExperiencesWithSourcing,
} from "@/src/lib/strapi/queries/retoursExperienceQueries";

export const SourcingMap = async () => {
  const inProgressProjets = await getPublicProjets();
  const rexProjets = await getRetoursExperiencesWithSourcing();

  return <div></div>;
};
