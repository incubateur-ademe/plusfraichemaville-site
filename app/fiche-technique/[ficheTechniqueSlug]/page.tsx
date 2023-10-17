import Link from "next/link";
import Accordion from "@codegouvfr/react-dsfr/Accordion";
import { fr } from "@codegouvfr/react-dsfr";
import { getFicheTechniqueBySlug } from "@/lib/directus/queries/fichesTechniquesQueries";
import Image from "next/image";
import { DIRECTUS_ASSET_URL } from "@/lib/directus/directusClient";

export default async function FicheTechnique({ params }: { params: { ficheTechniqueSlug: string } }) {
  const ficheTechnique = await getFicheTechniqueBySlug(params.ficheTechniqueSlug);
  if (ficheTechnique) {
    return (
      <>
        <Image
          src={DIRECTUS_ASSET_URL + ficheTechnique.image_principale}
          alt={ficheTechnique?.titre || "image titre"}
          height={300}
          width={600}
        />
        <h1>{ficheTechnique.titre}</h1>
        <div dangerouslySetInnerHTML={{ __html: ficheTechnique.description || "" }}></div>
        <h3>Etapes de mise en oeuvre</h3>
        <div className={fr.cx("fr-accordions-group")}>
          {ficheTechnique.etapes_mise_en_oeuvre?.map((etape) => (
            <Accordion key={etape.id} label={etape.etape_mise_en_oeuvre_id?.titre}>
              <div dangerouslySetInnerHTML={{ __html: etape.etape_mise_en_oeuvre_id?.description || "" }}></div>
            </Accordion>
          ))}
        </div>
        <Link href="..">Retour à la liste des fiches techniques</Link>
      </>
    );
  } else {
    return (
      <>
        <h1>Fiche technique non trouvée...</h1>
      </>
    );
  }
}
