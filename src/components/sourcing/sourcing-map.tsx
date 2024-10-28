import { getPublicProjets } from "@/src/lib/prisma/prismaProjetQueries";
import { getRetoursExperiencesWithSourcing } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { SourcingMapClient } from "./sourcing-map-client";
import { makeInProgressProjetsPositions, makeRexProjetsPositions } from "./helpers";

export const SourcingMap = async () => {
  const rexProjets = await getRetoursExperiencesWithSourcing();
  const rexProjetsPositions = makeRexProjetsPositions(rexProjets);
  const inProgressProjets = await getPublicProjets();
  const inProgressProjetsPositions = makeInProgressProjetsPositions(inProgressProjets);
  const markers = [...rexProjetsPositions, ...inProgressProjetsPositions];
  return (
    <div>
      <SourcingMapClient markers={markers} />
    </div>
  );
};
