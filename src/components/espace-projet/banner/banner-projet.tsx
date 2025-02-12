"use client";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { PictoEspaceSelector } from "@/src/components/common/pictos";
import { PictoId } from "@/src/components/common/pictos/picto-espace-selector";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import Link from "next/link";
import clsx from "clsx";
import { BannerProjetButtons } from "./banner-projet-buttons";
import { Suspense } from "react";
import { BannerProjetSkeleton } from "./banner-projet-skeleton";
import { LecteurModeLabel } from "@/src/components/common/lecteur-mode-label";
import { useIsLecteur } from "@/src/hooks/use-is-lecteur";

export default function BannerProjet({ className }: { className?: string }) {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const isLecteur = useIsLecteur(currentProjet?.id);

  return (
    <div className={`bg-dsfr-background-alt-blue-france py-4 ${className} min-h-[7rem]`}>
      {!currentProjet ? (
        <BannerProjetSkeleton />
      ) : (
        <div
          className={clsx(
            "fr-container justify-between font-bold text-dsfr-text-label-blue-france md:items-center",
            "flex flex-col gap-10 md:flex-row md:gap-0",
          )}
        >
          <div className="flex">
            <div className="mr-5">
              <PictoEspaceSelector
                pictoId={currentProjet.type_espace as PictoId}
                withBackground
                size="small"
                className="!size-20"
                pictoClassName="svg-blue"
              />
            </div>
            <div className="flex flex-col justify-between py-1">
              <div className="mb-1 w-fit">
                <Link
                  href={{
                    pathname: PFMV_ROUTES.ESPACE_PROJET_LISTE,
                    hash: currentProjet.collectivite.code_insee || currentProjet.collectivite.nom,
                  }}
                >
                  <div
                    className={clsx(
                      "mr-1 rounded-[4px] bg-dsfr-background-action-low-blue-france text-base hover:underline",
                      "h-[30px] pl-2 pr-4",
                      "flex items-center",
                    )}
                  >
                    <i className="ri-home-2-fill fr-icon--sm mr-1 before:!size-[14px]"></i>
                    {currentProjet.collectivite.nom}
                  </div>
                </Link>
              </div>
              <Link
                href={PFMV_ROUTES.TABLEAU_DE_BORD(currentProjet.id)}
                className="mb-1 w-fit !bg-none text-[1.375rem] !leading-6 hover:underline"
              >
                {currentProjet.nom}
              </Link>
            </div>
          </div>
          <div className="flex gap-4">
            {isLecteur && (
              <div className="flex rounded-xl bg-white px-4 py-2">
                <LecteurModeLabel imageClassname="h-6 w-6" />
              </div>
            )}
            <Suspense>
              <BannerProjetButtons projetId={currentProjet.id} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}
