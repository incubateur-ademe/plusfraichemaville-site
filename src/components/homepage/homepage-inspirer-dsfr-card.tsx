import { PFMV_ROUTES } from "@/src/helpers/routes";
import Image from "next/image";
import Card from "@codegouvfr/react-dsfr/Card";
import { getRegionLabelFromCode } from "@/src/helpers/regions";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { RexInHome } from "@/src/components/retourExperience/RetourExperienceCard";
import { getClimatLabelFromCode } from "@/src/helpers/retourExperience/climatRetourExperience";

export const HomepageInspirerDSFRCard = ({ rex }: { rex: RexInHome }) => {
  return (
    <Card
      className="flex h-full w-[17.625rem]"
      size="small"
      title={rex.titre}
      endDetail="En savoir plus sur le projet"
      start={
        <Tag iconId="ri-map-pin-2-fill" className="before:mb-1">
          {getRegionLabelFromCode(rex.region?.code)}
        </Tag>
      }
      desc={
        <>
          Climat actuel : {getClimatLabelFromCode(rex.climat_actuel)}
          <br />
          Climat futur : {getClimatLabelFromCode(rex.climat_futur)}
        </>
      }
      imageComponent={
        <Image
          src={rex.image_principale}
          alt={rex.titre}
          className="h-40 w-full object-cover"
          sizes="50vw"
          width={0}
          height={0}
        />
      }
      enlargeLink
      linkProps={{ href: PFMV_ROUTES.RETOUR_EXPERIENCE_PROJET(rex.slug) }}
    />
  );
};
