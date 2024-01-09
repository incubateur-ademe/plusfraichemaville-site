import Image from "next/image";
import CmsRichText from "@/components/common/CmsRichText";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/lib/strapi/strapiClient";
import { GetValues } from "@/lib/strapi/types/types";

export default async function SituationRetourExperienceCard({
  situation,
  titre,
  className,
}: {
  situation?: GetValues<"retour-experience.situation">;
  titre: string;
  className?: string;
}) {
  if (!situation) {
    return null;
  }
  return (
    <div className={`fr-card fr-card--no-border fr-card--shadow rounded-2xl ${className} max-w-md`}>
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h3 className="fr-card__title">{titre}</h3>
          <div className="fr-card__desc h-full">
            <div className={"flex justify-between flex-col h-full"}>
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
            className="w-full h-52 object-cover rounded-t-2xl"
            src={getStrapiImageUrl(situation.image, STRAPI_IMAGE_KEY_SIZE.medium)}
            alt={titre}
          />
        </div>
      </div>
    </div>
  );
}
