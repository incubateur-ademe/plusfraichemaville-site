import { WebinaireResponse } from "@/src/components/webinaires/types";
import Image from "next/image";
import CmsRichText from "@/src/components/common/CmsRichText";
import { dateToLiteralString, stipStrapiTime } from "@/src/helpers/dateUtils";
import Button from "@codegouvfr/react-dsfr/Button";
import React from "react";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";

export const WebinaireCard = ({ webinaire }: { webinaire: WebinaireResponse }) => {
  const isWebinairePast =
    webinaire.attributes.jour_evenement && new Date(webinaire.attributes.jour_evenement) <= new Date();
  const timeInterval =
    webinaire.attributes.heure_debut && webinaire.attributes.heure_fin
      ? `de ${stipStrapiTime(webinaire.attributes.heure_debut)} à ${stipStrapiTime(webinaire.attributes.heure_fin)}`
      : null;
  return (
    <div
      key={webinaire.id}
      className="flex flex-col items-center gap-2 rounded-xl bg-white px-8 py-4 md:flex-row md:gap-12"
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
        <div className="content-center text-lg font-bold">{webinaire.attributes.titre}</div>
      </div>
      <CmsRichText label={webinaire.attributes.description || ""} className="!mt-4 basis-6/12" />
      <div className="basis-3/12 flex-col text-center">
        <div className="font-bold">
          {(webinaire.attributes.jour_evenement &&
            dateToLiteralString(new Date(webinaire.attributes.jour_evenement))) ||
            "Date non définie"}
        </div>
        <div className="mb-2 font-bold">{timeInterval}</div>
        <Conditional>
          <Case condition={!isWebinairePast}>
            <div className="mt-4 text-center">
              {webinaire.attributes.lien_inscription ? (
                <Button
                  className=" !w-36 !justify-center rounded-3xl"
                  linkProps={{ href: webinaire.attributes.lien_inscription, target: "_blank" }}
                >
                  {"Je m'inscris"}
                </Button>
              ) : (
                "Inscription non disponible"
              )}
            </div>
          </Case>
          <Default>
            <div className="mt-4 text-center">
              {webinaire.attributes.lien_replay ? (
                <Button
                  className=" !w-36 !justify-center rounded-3xl"
                  linkProps={{ href: webinaire.attributes.lien_replay, target: "_blank" }}
                >
                  {"Replay"}
                </Button>
              ) : (
                "Replay non disponible"
              )}
            </div>
          </Default>
        </Conditional>
      </div>
    </div>
  );
};
