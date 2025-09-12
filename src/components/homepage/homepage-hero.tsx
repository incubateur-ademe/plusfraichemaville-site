import { homepageData } from "./homepage-data";
import { HomepageHeroPictos } from "./homepage-hero-pictos";
import clsx from "clsx";
import { PictoPFMV } from "@/src/components/common/pictos/picto-pfmv";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export const HomepageHero = () => {
  const { hero } = homepageData;
  return (
    <div className="relative pb-16 pt-16">
      <div className="z-10 mx-auto w-fit">
        <hgroup>
          <h1
            className={clsx(
              "mb-8 flex justify-center px-10 text-center text-2xl lg:mb-12 lg:px-0 lg:text-4xl",
              "font-normal text-pfmv-navy",
            )}
          >
            <div className="w-56 lg:w-auto">
              <PictoPFMV />
            </div>
          </h1>
          <p
            className={clsx(
              "mb-10 max-w-2xl px-10 text-center text-base font-bold text-pfmv-navy lg:px-0 lg:text-[26px]",
              "lg:leading-9",
            )}
          >
            {hero.baseline}
          </p>
        </hgroup>
        <div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
          <LinkWithoutPrefetch href={hero.cta1.url} className="fr-btn rounded-3xl">
            {hero.cta1.label}
          </LinkWithoutPrefetch>
          <LinkWithoutPrefetch href={hero.cta2.url} className="fr-btn fr-btn--secondary rounded-3xl">
            {hero.cta2.label}
          </LinkWithoutPrefetch>
        </div>
      </div>
      <HomepageHeroPictos />
    </div>
  );
};
