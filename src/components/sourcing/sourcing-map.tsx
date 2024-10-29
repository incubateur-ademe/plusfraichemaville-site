import { getRetoursExperiencesWithContacts } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { SourcingMapClient } from "./sourcing-map-client";
import { makeInProgressProjetsPositions, makeRexProjetsPositions } from "./helpers";
import { getPublicProjetsAction } from "@/src/actions/projets/get-public-projets-action";

export const SourcingMap = async () => {
  const rexProjets = await getRetoursExperiencesWithContacts();
  const rexProjetsPositions = makeRexProjetsPositions(rexProjets);
  const inProgressProjets = await getPublicProjetsAction();
  const inProgressProjetsPositions = makeInProgressProjetsPositions(inProgressProjets.publicProjets);
  const markers = [...rexProjetsPositions, ...inProgressProjetsPositions];

  return (
    <div>
      <SourcingMapClient markers={markers} />
    </div>
  );
};
