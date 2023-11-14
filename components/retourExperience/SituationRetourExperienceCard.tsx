import { DIRECTUS_ASSET_URL } from "@/lib/directus/directusClient";
import Image from "next/image";
import { SituationRetourExperience } from "@/lib/directus/directusModels";

export default async function SituationRetourExperienceCard({
  situation,
  titre,
  className,
}: {
  situation: SituationRetourExperience;
  titre: string;
  className?: string;
}) {
  return (
    <div className={`fr-card fr-card--no-border fr-card--shadow rounded-2xl ${className} max-w-md`}>
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h3 className="fr-card__title">{titre}</h3>
          <div className="fr-card__desc h-full">
            <div className={"flex justify-between flex-col h-full"}>
              <div dangerouslySetInnerHTML={{ __html: situation.description }} />
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
            src={DIRECTUS_ASSET_URL + situation.image + "?key=fiche-technique-card"}
            alt={titre}
          />
        </div>
      </div>
    </div>
  );
}
