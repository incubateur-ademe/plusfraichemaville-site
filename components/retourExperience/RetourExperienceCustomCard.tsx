import { RetourExperience } from "@/lib/directus/directusModels";
import { DIRECTUS_IMAGE_KEY_SIZE, getDirectusImageUrl } from "@/lib/directus/directusClient";
import Image from "next/image";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { getRegionLabelFromCode } from "@/helpers/regions";
import Link from "next/link";

export default function RetourExperienceCustomCard({ retourExperience }: { retourExperience: RetourExperience }) {
  return (
    <div
      className="fr-card fr-card--no-border fr-card--shadow fr-enlarge-link
    flex-1 grow border-dsfr-border-grey rounded-2xl z-0"
    >
      <div className="fr-card__body">
        <div className="fr-card__content pt-4">
          <h3 className="fr-card__title">
            <Link href={`/projet/${retourExperience.slug}`}>{retourExperience.titre}</Link>
          </h3>
          <div className="fr-card__desc h-full">
            <div className={"flex justify-between flex-col h-full pt-4"}>
              <div className="mt-auto">
                <Tag>{getRegionLabelFromCode(retourExperience.region)}</Tag>
                <div className="mt-6 grid grid-rows-2 grid-flow-col gap-0">
                  <div className="text-sm text-dsfr-text-mention-grey">Climat actuel</div>
                  <div>{retourExperience.climat_actuel}</div>
                  <div>{" · "}</div>
                  <div>{" · "}</div>
                  <div className="text-sm text-dsfr-text-mention-grey">Climat futur</div>
                  <div>{retourExperience.climat_futur}</div>
                </div>
              </div>
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
            src={getDirectusImageUrl(retourExperience.image_principale, DIRECTUS_IMAGE_KEY_SIZE.retourExperienceCard)}
            alt={retourExperience?.titre || "image titre"}
          />
        </div>
      </div>
    </div>
  );
}
