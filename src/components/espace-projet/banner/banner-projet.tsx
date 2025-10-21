"use client";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { PictoEspaceSelector } from "@/src/components/common/pictos";
import { PictoId } from "@/src/components/common/pictos/picto-espace-selector";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import clsx from "clsx";
import { Suspense } from "react";
import { BannerProjetSkeleton } from "./banner-projet-skeleton";
import { LecteurModeLabel } from "@/src/components/common/lecteur-mode-label";
import { useIsLecteur } from "@/src/hooks/use-is-lecteur";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import Button from "@codegouvfr/react-dsfr/Button";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { getStatutProjetByStatut } from "@/src/components/espace-projet/statut-projet/statut-projet";

export default function BannerProjet({ className }: { className?: string }) {
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const isLecteur = useIsLecteur(currentProjet?.id);

  return (
    <div className={`bg-dsfr-background-alt-blue-france py-3  ${className} min-h-[6rem]`}>
      {!currentProjet ? (
        <BannerProjetSkeleton />
      ) : (
        <div className="fr-container text-dsfr-text-label-blue-france">
          <div className={clsx("flex flex-col justify-between gap-10 font-bold md:flex-row md:items-center md:gap-0")}>
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
                <div className="flex items-center gap-6">
                  <h1 className="mb-1 w-fit text-[1.375rem] !leading-6 hover:underline">
                    <LinkWithoutPrefetch
                      href={PFMV_ROUTES.TABLEAU_DE_BORD(currentProjet.id)}
                      className="!bg-none text-pfmv-navy"
                    >
                      {currentProjet.nom}
                    </LinkWithoutPrefetch>
                  </h1>
                  <LinkWithoutPrefetch
                    href={PFMV_ROUTES.ESPACE_PROJET_INFO_PROJET(currentProjet.id)}
                    className="!bg-none text-sm text-pfmv-navy hover:underline"
                  >
                    <i className="ri-edit-box-line fr-icon--sm mr-1" />
                    Éditer le projet
                  </LinkWithoutPrefetch>
                </div>
                <div className="flex items-center gap-6">
                  <Tag
                    linkProps={{
                      href: `${PFMV_ROUTES.ESPACE_PROJET}#${
                        currentProjet.collectivite.code_insee || currentProjet.collectivite.nom
                      }`,
                    }}
                    iconId="ri-home-4-fill"
                    className="!bg-white hover:underline"
                  >
                    {currentProjet.collectivite.nom}
                  </Tag>
                  <Tag
                    linkProps={{
                      href: PFMV_ROUTES.ESPACE_PROJET_STATUT_PROJET(currentProjet.id),
                    }}
                    iconId={getStatutProjetByStatut(currentProjet.statut).progressIconId}
                    className="!bg-white hover:underline"
                  >
                    {getStatutProjetByStatut(currentProjet.statut).progressLabel}
                  </Tag>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              {isLecteur && (
                <div className="flex rounded-xl bg-white px-4 py-2">
                  <LecteurModeLabel imageClassname="h-6 w-6" />
                </div>
              )}
              <Suspense>
                <Button
                  iconId="fr-icon-user-add-line"
                  className="rounded-3xl"
                  linkProps={{ href: PFMV_ROUTES.TABLEAU_DE_BORD_WITH_CURRENT_TAB(currentProjet.id, "partage") }}
                  priority="secondary"
                >
                  Inviter des membres
                </Button>
                {/*<BannerProjetButtons projetId={currentProjet.id} />*/}
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
