import { FicheTechnique } from "@/lib/directus/directusModels";
import Card from "@codegouvfr/react-dsfr/Card";
import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";

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
      imageUrl={getDirectusImageUrl(ficheTechnique.image_principale, DIRECTUS_IMAGE_KEY_SIZE.ficheTechniqueCard)}
      linkProps={{
        href: `/fiche-technique/${ficheTechnique.slug}`,
      }}
      size="medium"
      titleAs="h3"
    />
  );
}
