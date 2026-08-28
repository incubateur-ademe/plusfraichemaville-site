import Image from "next/image";
import CmsRichText from "@/src/components/common/CmsRichText";
import { dateToLiteralString, stipStrapiTime } from "@/src/helpers/dateUtils";
import Button from "@codegouvfr/react-dsfr/Button";

import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";
import { isWebinaireInFuture } from "@/src/components/webinaires/webinaires-helpers";
import { WebinaireSubscriptionButton } from "@/src/components/webinaires/webinaire-subscription-button";
import { Webinaire } from "@/src/lib/strapi/types/api/webinaire";
import clsx from "clsx";

export const WebinaireCard = ({ webinaire, className }: { webinaire: Webinaire; className?: string }) => {
  const isWebinairePast = !isWebinaireInFuture(webinaire);
  const timeInterval =
    webinaire.heure_debut && webinaire.heure_fin
      ? `de ${stipStrapiTime(webinaire.heure_debut)} à ${stipStrapiTime(webinaire.heure_fin)}`
      : null;
  return (
    <div
      key={webinaire.documentId}
      className={clsx(
        "flex flex-col items-center gap-2 rounded-xl bg-white px-8 py-4 md:flex-row md:gap-12",
        className,
      )}
    >
      <div className="flex min-w-60 basis-3/12">
        <Image
          className="mr-6 hidden shrink-0 md:block"
          src={
            isWebinairePast
              ? "/images/webinaire/webinaire-video-past.svg"
              : "/images/webinaire/webinaire-video-future.svg"
          }
          width={40}
          height={40}
          alt=""
        />
        <div className="content-center text-lg font-bold">{webinaire.titre}</div>
      </div>
      <CmsRichText label={webinaire.description || ""} className="!mt-4 basis-6/12" />
      <div className="basis-3/12 flex-col text-center">
        <div className="font-bold">
          {(webinaire.jour_evenement && dateToLiteralString(new Date(webinaire.jour_evenement))) || "Date non définie"}
        </div>
        <div className="mb-2 font-bold">{timeInterval}</div>
        <Conditional>
          <Case condition={!isWebinairePast}>
            <div className="mt-4 text-center">
              {webinaire.lien_inscription ? (
                <WebinaireSubscriptionButton lienInscription={webinaire.lien_inscription} />
              ) : (
                "Inscription non disponible"
              )}
            </div>
          </Case>
          <Default>
            <div className="mt-4 flex flex-col items-center gap-4 text-center">
              {webinaire.lien_replay && (
                <Button
                  className=" !w-36 !justify-center rounded-3xl"
                  linkProps={{ href: webinaire.lien_replay, target: "_blank" }}
                >
                  {"Replay"}
                </Button>
              )}
              {webinaire.lien_btn_secondaire && (
                <Button
                  className=" !w-36 !justify-center rounded-3xl"
                  linkProps={{ href: webinaire.lien_btn_secondaire, target: "_blank" }}
                  priority={webinaire.lien_replay ? "secondary" : "primary"}
                >
                  {webinaire.label_btn_secondaire || "Support de présentation"}
                </Button>
              )}
            </div>
          </Default>
        </Conditional>
      </div>
    </div>
  );
};
