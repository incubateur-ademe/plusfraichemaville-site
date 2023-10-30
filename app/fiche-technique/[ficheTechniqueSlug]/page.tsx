import { getFicheTechniqueBySlug } from "@/lib/directus/queries/fichesTechniquesQueries";
import Image from "next/image";
import { DIRECTUS_ASSET_URL } from "@/lib/directus/directusClient";
import EtapeMiseEnOeuvre from "@/components/ficheTechnique/EtapesMiseEnOeuvre";
import ObjectifsDeveloppementDurable from "@/components/ficheTechnique/ObjectifsDeveloppementDurable";

export default async function FicheTechnique({ params }: { params: { ficheTechniqueSlug: string } }) {
  const ficheTechnique = await getFicheTechniqueBySlug(params.ficheTechniqueSlug);
  if (ficheTechnique) {
    return (
      <>
        <Image
          width={1200}
          height={500}
          className="w-full max-h-64 object-cover"
          src={DIRECTUS_ASSET_URL + ficheTechnique.image_principale}
          alt={ficheTechnique?.titre || "image titre"}
        />
        <h1 className={"mt-8"}>{ficheTechnique.titre}</h1>
        <div dangerouslySetInnerHTML={{ __html: ficheTechnique.description || "" }}></div>
        <ObjectifsDeveloppementDurable objectifs={ficheTechnique.odd} />
        <EtapeMiseEnOeuvre etapesMOE={ficheTechnique.etapes_mise_en_oeuvre} />
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
