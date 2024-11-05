import { getRetoursExperiencesWithContacts } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { makeInProgressProjetsPositions, makeRexProjetsPositions } from "./helpers";
import { getPublicProjetsAction } from "@/src/actions/projets/get-public-projets-action";
import dynamic from "next/dynamic";
import { SourcingMapSkeleton } from "./map/sourcing-map-skeleton";

const LazySourcingMapClient = dynamic(() => import("./map/sourcing-map-container"), {
  ssr: false,
  loading: () => <SourcingMapSkeleton />,
});

export const SourcingSearch = async () => {
  const rexProjets = await getRetoursExperiencesWithContacts();
  const rexProjetsPositions = makeRexProjetsPositions(rexProjets);
  const inProgressProjets = await getPublicProjetsAction();
  const inProgressProjetsPositions = makeInProgressProjetsPositions(inProgressProjets.publicProjets);
  const markers = [...rexProjetsPositions, ...inProgressProjetsPositions];

  return (
    <div>
      <LazySourcingMapClient markers={markers} />
    </div>
  );
};
