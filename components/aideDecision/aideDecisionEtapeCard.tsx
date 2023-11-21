import { AideDecisionEtape } from "@/lib/directus/directusModels";
import Card from "@codegouvfr/react-dsfr/Card";
import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";

export default function AideDecisionEtapeCard({ aideDecisionEtape }: { aideDecisionEtape: AideDecisionEtape }) {
  return (
    <Card
      background
      border
      enlargeLink
      title={aideDecisionEtape.nom}
      desc={aideDecisionEtape.description}
      imageAlt={aideDecisionEtape.nom || ""}
      imageUrl={getDirectusImageUrl(aideDecisionEtape.image, DIRECTUS_IMAGE_KEY_SIZE.aideDecisionCard)}
      linkProps={{
        href: `/aide-decision/${aideDecisionEtape.slug}`,
      }}
      size="medium"
      titleAs="h3"
    />
  );
}
