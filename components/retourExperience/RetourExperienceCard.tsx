import { RetourExperience } from "@/lib/directus/directusModels";
import Card from "@codegouvfr/react-dsfr/Card";
import { DIRECTUS_ASSET_URL } from "@/lib/directus/directusClient";

export default function RetourExperienceCard({ retourExperience }: { retourExperience: RetourExperience }) {
  return (
    <Card
      className={"flex-1 grow"}
      background
      border
      enlargeLink
      title={retourExperience.titre}
      desc={
        <>
          <div className="fr-tag mb-6">Normandie</div>
          <div>Climat actuel · Climat futur</div>
          <div>{`${retourExperience.climat_actuel} · ${retourExperience.climat_futur}`}</div>
        </>
      }
      imageAlt={retourExperience.titre || ""}
      imageUrl={DIRECTUS_ASSET_URL + retourExperience.image_principale + "?key=retour-experience-card"}
      linkProps={{
        href: `/projet/${retourExperience.slug}`,
      }}
      size="medium"
      titleAs="h4"
    />
  );
}
