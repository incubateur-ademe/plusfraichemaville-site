"use client";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import Image from "next/image";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { useProjetsStore } from "@/src/stores/projets/provider";

export const ServiceStatusProjet = () => {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  if (!currentProjet) {
    return null;
  }
  return (
    <div className="pfmv-card fr-enlarge-link group max-w-[21rem] p-6">
      <div className="flex items-start gap-4">
        <Image src="/images/espace-projet/services/statut.svg" width={32} height={32} alt="" className="size-8" />
        <div>
          <h3>
            <LinkWithoutPrefetch
              className="text-pfmv-navy"
              href={PFMV_ROUTES.ESPACE_PROJET_STATUT_PROJET(currentProjet.id)}
            >
              Où en êtes-vous ? Besoin d’aide ?
            </LinkWithoutPrefetch>
          </h3>
          <p className="text-dsfr-text-default-grey">Dites-nous en plus, nous vous accompagnerons dans votre projet.</p>
          <div className="flex justify-between text-sm text-dsfr-text-default-grey group-hover:underline">
            <span>En savoir plus</span>
            <i className="ri-arrow-right-line fr-icon--sm"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
