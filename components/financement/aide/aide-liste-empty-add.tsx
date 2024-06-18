import clsx from "clsx";
import Link from "next/link";

export const AideListeEmptyAdd = () => {
  return (
    <div>
      <span className="mb-7 block">
        Je sélectionne ici les financements et les aides pour lesquels je souhaite envoyer une candidature
      </span>
      <div className="flex gap-8">
        <div className="dashed h-[30rem] w-72 rounded-xl bg-dsfr-background-default-grey-hover"></div>
        <Link
          href="/"
          className={clsx(
            "fr-btn !h-32 !w-32 rounded-[10px] bg-dsfr-text-label-blue-france",
            "flex !flex-col items-center justify-center",
            "self-center",
          )}
        >
          <i className="ri-add-circle-fill mb-2 text-sm text-white"></i>
          <span className="text-center text-white">Ajouter</span>
        </Link>
      </div>
    </div>
  );
};
