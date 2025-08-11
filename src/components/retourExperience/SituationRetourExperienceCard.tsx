import Image from "next/image";
import CmsRichText from "@/src/components/common/CmsRichText";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { clsx } from "clsx";
import { Situation } from "@/src/lib/strapi/types/components/retour-experience/Situation";

export default function SituationRetourExperienceCard({
  situation,
  titre,
  className,
}: {
  situation?: Situation;
  titre: string;
  className?: string;
}) {
  if (!situation) {
    return null;
  }
  return (
    <div className={clsx("fr-card border-pfmv-light-grey !p-0 border  max-w-md rounded-2xl !bg-none", className)}>
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h3 className="fr-card__title">{titre}</h3>
          <div className="fr-card__desc h-full">
            <div className={"flex h-full flex-col justify-between"}>
              <CmsRichText label={situation.description} />
            </div>
          </div>
        </div>
      </div>
      <div className="fr-card__header">
        <div className="fr-card__img">
          <Image
            width={600}
            height={300}
            className="h-52 w-full rounded-t-[15px] object-cover"
            src={getStrapiImageUrl(situation.image, STRAPI_IMAGE_KEY_SIZE.medium)}
            alt={titre}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
