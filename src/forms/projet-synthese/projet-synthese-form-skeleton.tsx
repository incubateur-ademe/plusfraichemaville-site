import clsx from "clsx";

const NB_SECTIONS = 5;

const SKELETON_BAR_CLASSNAME = "animate-pulse rounded-xl bg-dsfr-background-contrast-grey-active opacity-30";

export const ProjetSyntheseFormSkeleton = () => (
  <ol className="mt-4 list-inside !pl-0" aria-hidden="true">
    {Array.from({ length: NB_SECTIONS }).map((_, index) => (
      <li key={index} className="fr-h4 mb-8">
        <div className={clsx("inline-block h-6 w-2/5 align-middle", SKELETON_BAR_CLASSNAME)} />
        <div className="mt-4 pl-12">
          <div className={clsx("h-4 w-3/5", SKELETON_BAR_CLASSNAME)} />
          <div className={clsx("mt-3 h-4 w-1/2", SKELETON_BAR_CLASSNAME)} />
        </div>
      </li>
    ))}
  </ol>
);
