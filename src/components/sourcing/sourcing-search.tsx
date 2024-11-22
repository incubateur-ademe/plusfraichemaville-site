import { getRetoursExperiencesWithContacts } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { makeInProgressProjetsPositions, makeRexMarkers } from "./helpers";
import { getPublicProjetsAction } from "@/src/actions/projets/get-public-projets-action";
import dynamic from "next/dynamic";
import { SourcingMapSkeleton } from "./map/sourcing-map-skeleton";

const LazySourcingMapClient = dynamic(() => import("./map/sourcing-map-container"), {
  ssr: false,
  loading: () => <SourcingMapSkeleton />,
});

export const SourcingSearch = async () => {
  const rexProjets = await getRetoursExperiencesWithContacts();
  const rexMarkers = makeRexMarkers(rexProjets);
  const inProgressProjets = await getPublicProjetsAction();
  const inProgressProjetsPositions = makeInProgressProjetsPositions(inProgressProjets.publicProjets);
  const markers = [...rexMarkers, ...inProgressProjetsPositions];

  return <LazySourcingMapClient markers={markers} />;
};
