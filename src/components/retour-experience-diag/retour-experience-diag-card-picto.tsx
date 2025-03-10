import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { BigTooltip } from "@/src/components/common/big-tooltip";

type RetourExperienceDiagCardPictoProps = {
  ficheDiagnostic: FicheDiagnostic;
};

export const RetourExperienceDiagCardPicto = ({ ficheDiagnostic }: RetourExperienceDiagCardPictoProps) => {
  const nomScientifique = ficheDiagnostic.attributes.nom_scientifique;

  return (
    <BigTooltip tooltipLabel={nomScientifique}>
      <div className="fiche-diagnostic-icone-thick flex size-12 shrink-0 items-center justify-center rounded-full">
        <Image
          src={getStrapiImageUrl(ficheDiagnostic.attributes.image_icone, STRAPI_IMAGE_KEY_SIZE.small)}
          alt={nomScientifique ?? "pictogramme de la fiche diagnostic"}
          className="object-contain"
          width={50}
          height={50}
        />
      </div>
    </BigTooltip>
  );
};
