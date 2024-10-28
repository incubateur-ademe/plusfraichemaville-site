import { getPublicProjets } from "@/src/lib/prisma/prismaProjetQueries";
import { getRetoursExperiencesWithSourcing } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { Map } from "../map";
import { makeInProgressProjetsPositions, makeRexProjetsPositions } from "./helpers";

// import dynamic from "next/dynamic";
// const Map = dynamic(() => import("@/src/components/map/index").then((mod) => mod.Map));

export const SourcingMap = async () => {
  const rexProjets = await getRetoursExperiencesWithSourcing();

  const rexProjetsPositions = makeRexProjetsPositions(rexProjets);
  const inProgressProjets = await getPublicProjets();
  const inProgressProjetsPositions = makeInProgressProjetsPositions(inProgressProjets);

  const markers = [...rexProjetsPositions, ...inProgressProjetsPositions];

  console.log(rexProjetsPositions);

  return (
    <div>
      <Map markers={markers} />
    </div>
  );
};
