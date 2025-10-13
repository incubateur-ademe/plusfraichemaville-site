"use client";
import { useProjetsStore } from "@/src/stores/projets/provider";
import { PictoEspaceSelector } from "@/src/components/common/pictos";
import { PictoId } from "@/src/components/common/pictos/picto-espace-selector";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import clsx from "clsx";
import { BannerProjetButtons } from "./banner-projet-buttons";
import { ChangeEvent, Suspense } from "react";
import { BannerProjetSkeleton } from "./banner-projet-skeleton";
import { LecteurModeLabel } from "@/src/components/common/lecteur-mode-label";
import { useIsLecteur } from "@/src/hooks/use-is-lecteur";
import Link from "next/link";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { Hidden } from "@/src/components/common/hidden";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { BannerProjetUnauthenticated } from "@/src/components/espace-projet/banner/banner-projet-unauthenticated";
import { Case, Conditional, Default } from "@/src/components/common/conditional-renderer";
import { isEmpty } from "@/src/helpers/listUtils";
import { BannerProjetNoProjet } from "@/src/components/espace-projet/banner/banner-projet-no-projet";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export default function BannerProjet({ className }: { className?: string }) {
  const status = useSession().status;
  const currentProjet = useProjetsStore((state) => state.getCurrentProjet());
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname}${Array.from(searchParams.keys()).length ? "?" + searchParams : ""}`;
  const projets = useProjetsStore((state) => state.getProjets());
  const setCurrentProjetId = useProjetsStore((state) => state.setCurrentProjetId);
  const isLecteur = useIsLecteur(currentProjet?.id);
  const router = useRouter();
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentProjetId(+event.target.value);
    const newUrl = currentUrl.replace(/\/espace-projet\/(\d+)\//, `/espace-projet/${+event.target.value}/`);
    router.push(newUrl);
  };

  return (
    <div className={`bg-dsfr-background-alt-blue-france py-3  ${className} h-[6.5rem]`}>
      <Conditional>
        <Case condition={status === "unauthenticated"}>
          <BannerProjetUnauthenticated />
        </Case>
        <Case condition={status === "loading"}>
          <BannerProjetSkeleton />
        </Case>
        <Case condition={status === "authenticated"}>
          <Conditional>
            <Case condition={isEmpty(projets)}>
              <BannerProjetNoProjet />
            </Case>
            <Default>
              {currentProjet != null && (
                <div className="fr-container text-dsfr-text-label-blue-france">
                  <div
                    className={clsx(
                      "flex flex-col justify-between gap-10 font-bold md:flex-row md:items-center md:gap-0",
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
                        <Link
                          prefetch={false}
                          className="mb-1 w-fit rounded !bg-none"
                          href={{
                            pathname: PFMV_ROUTES.ESPACE_PROJET,
                            hash: currentProjet.collectivite.code_insee || currentProjet.collectivite.nom,
                          }}
                        >
                          <div
                            className={clsx(
                              "rounded bg-dsfr-background-action-low-blue-france text-base hover:underline",
                              "flex h-7 items-center pl-2 pr-3",
                            )}
                          >
                            <i className="ri-home-2-fill fr-icon--sm mr-1 before:!size-3.5" />
                            {currentProjet.collectivite.nom}
                          </div>
                        </Link>
                        <Conditional>
                          <Case condition={projets.length === 1}>
                            <h1 className="mb-1 w-fit text-[1.375rem] !leading-6 hover:underline">
                              <LinkWithoutPrefetch
                                href={PFMV_ROUTES.TABLEAU_DE_BORD(currentProjet.id)}
                                className="!bg-none text-pfmv-navy"
                              >
                                {currentProjet.nom}
                              </LinkWithoutPrefetch>
                            </h1>
                          </Case>
                          <Case condition={projets.length > 1}>
                            <Select
                              label={<Hidden accessible>Selectionnez un projet</Hidden>}
                              nativeSelectProps={{
                                onChange: handleChange,
                                value: currentProjet.id,
                              }}
                            >
                              {projets.map((projet) => (
                                <option value={projet.id} key={projet.id}>
                                  {projet.nom}
                                </option>
                              ))}
                            </Select>
                          </Case>
                        </Conditional>
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
                </div>
              )}
            </Default>
          </Conditional>
        </Case>
      </Conditional>
    </div>
  );
}
