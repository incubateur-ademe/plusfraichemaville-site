import { getRetoursExperiencesWithContacts } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { makeInProgressProjetsPositions, makeRexMarkers } from "./helpers";
import { getPublicProjetsAction } from "@/src/actions/projets/get-public-projets-action";
import SourcingMapContainer from "./map/sourcing-map-container";

export const SourcingSearch = async ({ projetId }: { projetId: string }) => {
  const rexProjets = await getRetoursExperiencesWithContacts();
  const rexMarkers = makeRexMarkers(rexProjets);
  const inProgressProjets = await getPublicProjetsAction({ excludeProjetId: projetId });
  const inProgressProjetsPositions = makeInProgressProjetsPositions(inProgressProjets.publicProjets);
  const markers = [...rexMarkers, ...inProgressProjetsPositions];

  return <SourcingMapContainer markers={markers} />;
};
