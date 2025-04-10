import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { getRetoursExperiencesDiag } from "@/src/lib/strapi/queries/retour-experience-diag-queries";
import { RetourExperienceDiagCard } from "@/src/components/retour-experience-diag/retour-experience-diag-card";
import AccomagnementEspaceProjetCard from "@/src/components/common/accomagnement-espace-projet-card";

export const metadata: Metadata = computeMetadata("Exemples de diagnostic réalisé par les collectivités");

export default async function SurchauffeUrbaineListeRetourExperiencePage() {
  const allRetoursExperiences = await getRetoursExperiencesDiag();

  return (
    <div className="fr-container px-4 pt-12">
      <ul className="flex grow list-none flex-wrap justify-center gap-10 p-0 md:justify-normal">
        {allRetoursExperiences.map((retourExperience) => (
          <li key={retourExperience.id} className="flex">
            <RetourExperienceDiagCard rex={retourExperience} className="w-80" flatStyle={false} />
          </li>
        ))}
      </ul>
      <div className="mb-4 mt-10 max-w-[38rem] text-lg font-bold">
        Rendez-vous sur l’espace projet pour avoir le contact des collectivités et des prestataires de ces diagnostics
      </div>
      <AccomagnementEspaceProjetCard />
    </div>
  );
}
