"use client";
import { trackEvent } from "@/src/helpers/matomo/trackEvent";
import { WEBINAIRE_SUBSCRIPTION } from "@/src/helpers/matomo/matommo-tags";

export const WebinaireSubscriptionButton = ({ lienInscription }: { lienInscription: string }) => {
  return (
    <a
      href={lienInscription}
      target={"_blank"}
      className="fr-btn !w-36 !justify-center rounded-3xl"
      onClick={() => trackEvent(WEBINAIRE_SUBSCRIPTION)}
    >
      {"Je m'inscris"}
    </a>
  );
};
