import { PFMV_ROUTES } from "@/src/helpers/routes";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
// eslint-disable-next-line max-len
import { AvailableProjetsForCollectiviteButton } from "@/src/components/liste-projets/available-projets-for-collectivite-button";

export const ListProjetsHeaderEmpty = () => {
  return (
    <>
      <div className="pfmv-card relative mb-5 mt-3 flex h-fit items-center justify-between bg-white py-6 md:py-0">
        <Link href={PFMV_ROUTES.CREATE_PROJET} className="w-full !bg-none">
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
        </Link>
        <div className="mr-[26px] h-[121.5px] w-[132px]  shrink-0">
          <Link
            href={PFMV_ROUTES.CREATE_PROJET}
            className={clsx(
              "fr-btn ri-add-circle-fill fr-btn--icon-left rounded-[10px]",
              "h-full w-full !flex-col items-center justify-center gap-3",
              "before:!m-0 before:!size-6",
            )}
          >
            <span className="block text-center text-sm leading-5">Créer un projet</span>
          </Link>
        </div>
      </div>
      <div className="ml-auto w-fit">
        <AvailableProjetsForCollectiviteButton className="rounded-[10px]" />
      </div>
    </>
  );
};
