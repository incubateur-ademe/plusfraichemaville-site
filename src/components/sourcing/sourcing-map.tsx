import { getPublicProjets } from "@/src/lib/prisma/prismaProjetQueries";
import { getRetoursExperiencesWithSourcing } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { Map } from "../map";
import { LatLngTuple } from "leaflet";

// import dynamic from "next/dynamic";
// const Map = dynamic(() => import("@/src/components/map/index").then((mod) => mod.Map));

export const SourcingMap = async () => {
  const inProgressProjets = await getPublicProjets();
  const rexProjets = await getRetoursExperiencesWithSourcing();

  const rexProjetsPositions = rexProjets
    .filter((projet) => (projet.attributes.location as LatLngTuple) !== null)
    .map((projet) => {
      const location = projet.attributes.location as LatLngTuple;
      const geocode = [location.lat, location?.lng] as LatLngTuple;
      return {
        geocode,
      };
    });

  return (
    <div>
      <Map markers={rexProjetsPositions} />
    </div>
  );
};
