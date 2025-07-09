import { homepageData, multilines } from "./homepage-data";
import Image from "next/image";
import clsx from "clsx";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export const HomepageProjet = () => {
  const { projet } = homepageData;
  return (
    <div className="gradient-l-to-r-navy relative min-h-80 lg:min-h-0">
      <div className="fr-container flex flex-col pb-10 pt-60 lg:block lg:pb-36 lg:pt-40 ">
        <h2
          className={clsx(
            "mb-6 text-center text-[18px] font-bold text-white lg:text-left lg:text-3xl",
            "leading-6 lg:leading-10",
          )}
        >
          {multilines(projet.title)}
        </h2>
        <p className="mb-11 hidden text-white lg:block">{multilines(projet.subtitle)}</p>
        <LinkWithoutPrefetch
          className={clsx(
            "fr-btn fr-btn--secondary rounded-3xl border-[1px] border-white !text-white !shadow-none",
            "transition-[background] duration-300 hover:!bg-white hover:!text-pfmv-navy",
            "!lg:flex !lg:mx-0 mx-auto",
          )}
          href={projet.cta.url}
        >
          {projet.cta.label}
        </LinkWithoutPrefetch>
      </div>
      <Image
        loading="eager"
        src={projet.image}
        alt="balade dans un jardin urbain"
        fill
        className="-z-10 object-cover"
      />
    </div>
  );
};
