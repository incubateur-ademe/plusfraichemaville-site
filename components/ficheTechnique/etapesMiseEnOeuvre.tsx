import Accordion from "@codegouvfr/react-dsfr/Accordion";
import { fr } from "@codegouvfr/react-dsfr";
import { FicheTechniqueEtapeMiseEnOeuvre } from "@/lib/directus/directusModels";

export default async function EtapeMiseEnOeuvre({ etapesMOE }: { etapesMOE: FicheTechniqueEtapeMiseEnOeuvre[] }) {
  if (etapesMOE.length > 0) {
    return (
      <>
        <h3 className={"mt-10"}>Etapes de mise en oeuvre</h3>
        <div className={fr.cx("fr-accordions-group")}>
          {etapesMOE.map((etape) => (
            <Accordion key={etape.id} label={etape.etape_mise_en_oeuvre_id?.titre}>
              <div dangerouslySetInnerHTML={{ __html: etape.etape_mise_en_oeuvre_id?.description || "" }}></div>
            </Accordion>
          ))}
        </div>
      </>
    );
  }
}
