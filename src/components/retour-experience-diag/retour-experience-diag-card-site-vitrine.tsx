import { RetourExperienceDiagnostic } from "@/src/lib/strapi/types/api/retour-experience-diagnostic";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { RetourExperienceDiagLabel } from "./retour-experience-diag";
import clsx from "clsx";
import { RetourExperienceDiagCardPicto } from "./retour-experience-diag-card-picto";
import Image from "next/image";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

type RetourExperienceDiagCardSiteVitrineProps = {
  rex?: RetourExperienceDiagnostic;
  className?: string;
};

export const RetourExperienceDiagCardSiteVitrine = ({ rex, className }: RetourExperienceDiagCardSiteVitrineProps) => {
  if (!rex) return null;

  const { titre, image_principale, lieu, slug } = rex.attributes;

  return (
    <div className={clsx(className, "pfmv-card fr-enlarge-link flex w-80 flex-col bg-white")}>
      <div className="relative mb-5 h-[12rem] ">
        <Image
          width={462}
          height={267}
          className="h-full w-full rounded-t-2xl object-cover"
          src={getStrapiImageUrl(image_principale, STRAPI_IMAGE_KEY_SIZE.medium)}
          alt=""
          unoptimized
        />
        <div className="absolute bottom-2 left-4 flex  gap-2 text-white">
          <RetourExperienceDiagLabel>
            <i className="ri-map-pin-line mr-2 before:!mb-1 before:!size-4"></i>
            {lieu}
          </RetourExperienceDiagLabel>
        </div>
      </div>

      <div className="px-6">
        <h2 className="mb-5 text-[1.375rem] leading-7">
          <LinkWithoutPrefetch href={PFMV_ROUTES.RETOUR_EXPERIENCE_DIAGNOSTIC(slug)} className="bg-none">
            {titre}
          </LinkWithoutPrefetch>
        </h2>
        {rex.attributes.lien_rex_diagnostics && (
          <div className="mb-7 flex flex-wrap items-center gap-2">
            {rex.attributes.lien_rex_diagnostics.data.map(
              (lienRex) =>
                lienRex.attributes.fiche_diagnostic && (
                  <RetourExperienceDiagCardPicto
                    ficheDiagnostic={lienRex.attributes.fiche_diagnostic.data}
                    key={lienRex.attributes.fiche_diagnostic.data.id}
                  />
                ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};
