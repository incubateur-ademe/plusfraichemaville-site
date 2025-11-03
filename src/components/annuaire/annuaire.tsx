import { getRetoursExperiencesWithContacts } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { makeInProgressProjetsPositions, makeRexMarkers } from "./helpers";
import { getPublicProjetsAction } from "@/src/actions/projets/get-public-projets-action";
import AnnuaireMapContainer from "./map/annuaire-map-container";
import { AnnuaireSavedContacts } from "@/src/components/annuaire/annuaireSavedContacts";
import { AnnuaireTitle } from "@/src/components/annuaire/annuaire-title";

export const Annuaire = async ({ projetId }: { projetId: string }) => {
  const rexProjets = await getRetoursExperiencesWithContacts();
  const rexMarkers = makeRexMarkers(rexProjets);
  const inProgressProjets = await getPublicProjetsAction({ excludeProjetId: projetId });
  const inProgressProjetsPositions = makeInProgressProjetsPositions(inProgressProjets.publicProjets);
  const markers = [...rexMarkers, ...inProgressProjetsPositions];

  return (
    <div className="fr-container mt-8">
      <AnnuaireTitle/>
      <AnnuaireMapContainer markers={markers} />
      <hr className="mt-3 pb-2" id="annuaire-saved-contacts" />
      <AnnuaireSavedContacts />
    </div>
  );
};
