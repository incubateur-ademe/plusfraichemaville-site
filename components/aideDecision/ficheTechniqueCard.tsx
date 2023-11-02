import { FicheTechnique } from "@/lib/directus/directusModels";
import Card from "@codegouvfr/react-dsfr/Card";
import { DIRECTUS_ASSET_URL } from "@/lib/directus/directusClient";

export default function FicheTechniqueCard({ ficheTechnique }: { ficheTechnique: FicheTechnique }) {
  return (
    <Card
      className={"flex-1 grow"}
      background
      border
      enlargeLink
      title={ficheTechnique.titre}
      desc={ficheTechnique.description_courte}
      imageAlt={ficheTechnique.titre || ""}
      imageUrl={DIRECTUS_ASSET_URL + ficheTechnique.image_principale + "?key=fiche-technique-card"}
      linkProps={{
        href: `/fiche-technique/${ficheTechnique.slug}`,
      }}
      size="medium"
      titleAs="h3"
    />
  );
}
