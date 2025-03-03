import { FicheDiagnostic } from "@/src/lib/strapi/types/api/fiche-diagnostic";
import { getFicheDiagUtilite } from "../fiches-diagnostic/helpers";
import Image from "next/image";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import clsx from "clsx";

type RetourExperienceDiagCardPictoProps = {
  ficheDiagnostic: FicheDiagnostic;
};

export const RetourExperienceDiagCardPicto = ({ ficheDiagnostic }: RetourExperienceDiagCardPictoProps) => {
  const bgColor = getFicheDiagUtilite(ficheDiagnostic).colors.bgDark;
  const nomScientifique = ficheDiagnostic.attributes.nom_scientifique;

  return (
    <div className={clsx("group relative flex size-12 shrink-0 items-center justify-center rounded-full", bgColor)}>
      <Image
        src={getStrapiImageUrl(ficheDiagnostic.attributes.image_icone, STRAPI_IMAGE_KEY_SIZE.small)}
        alt={nomScientifique ?? "pictogramme de la fiche diagnostic"}
        className="object-contain"
        width={40}
        height={40}
      />
      <div
        className={clsx(
          "absolute left-0 top-full z-10 hidden w-64 -translate-y-1/2 rounded-md",
          "bg-black/70 px-5 py-1 text-center text-sm font-bold text-white group-hover:block",
        )}
      >
        {nomScientifique}
      </div>
    </div>
  );
};
