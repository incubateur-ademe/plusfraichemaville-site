import { PFMV_ROUTES } from "@/helpers/routes";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export const ListProjetsHeaderEmpty = () => {
  return (
    <div className="relative mt-3">
      <Link href={PFMV_ROUTES.CREATE_PROJET}>
        <div className="pfmv-card flex justify-between items-center">
          <div className="flex gap-11 items-center">
            <div>
              <Image
                className="rounded-tl-2xl rounded-bl-2xl"
                src="/images/espace-projet/empty-projet.jpg"
                width={304}
                height={160}
                alt=""
              />
            </div>
            <div>
              <span className="text-lg font-bold block">Vous n’avez pas encore créé de projet ?</span>
              <span className="text-lg">N’attendez pas la prochaine vague de chaleur !</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="w-[132px] h-[121.5px] shrink-0 absolute right-[26px] top-1/2 -translate-y-1/2">
        <Link
          href={PFMV_ROUTES.CREATE_PROJET}
          className={clsx(
            "fr-btn ri-add-circle-fill fr-btn--icon-left rounded-3xl",
            "w-full h-full !flex-col items-center justify-center gap-3",
            "before:!m-0 before:!size-6",
          )}
        >
          <span className="block text-sm leading-5 text-center">Créer un projet</span>
        </Link>
      </div>
    </div>
  );
};
