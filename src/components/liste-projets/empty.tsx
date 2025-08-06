import { PFMV_ROUTES } from "@/src/helpers/routes";
import clsx from "clsx";
import Image from "next/image";
import { AvailableProjetsForCollectiviteButton } from "@/src/components/liste-projets/available-projets-for-collectivite-button";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export const ListProjetsHeaderEmpty = () => {
  return (
    <>
      <div
        className={clsx(
          "pfmv-card fr-enlarge-link group relative my-5",
          "flex h-fit items-center justify-between bg-white py-6 md:py-0",
        )}
      >
        <div className="w-full !bg-none">
          <div className=" flex items-center justify-between">
            <div className="flex items-center gap-11">
              <div className="hidden shrink-0 md:block">
                <Image
                  className="rounded-bl-2xl rounded-tl-2xl"
                  src="/images/espace-projet/empty-projet.jpg"
                  width={304}
                  height={160}
                  alt=""
                />
              </div>
              <div className="pl-6 pr-6 md:pl-0">
                <span className="block text-lg font-bold">Vous n’avez pas encore créé de projet ?</span>
                <span className="text-lg">N’attendez pas la prochaine vague de chaleur !</span>
              </div>
            </div>
          </div>
        </div>
        <LinkWithoutPrefetch
          href={PFMV_ROUTES.CREATE_PROJET}
          className={clsx(
            "fr-btn rounded-2xl group-hover:!bg-dsfr-background-action-high-blue-france-active",
            "!flex-col items-center justify-center gap-3",
            "mr-6 size-32 shrink-0",
          )}
        >
          <span className="ri-add-circle-fill"></span>
          <span className="block text-center text-sm leading-5">Créer un projet</span>
        </LinkWithoutPrefetch>
      </div>
      <div className="ml-auto w-fit">
        <AvailableProjetsForCollectiviteButton className="rounded-[10px]" />
      </div>
    </>
  );
};
