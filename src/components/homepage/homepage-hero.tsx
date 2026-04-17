import { homepageData } from "./homepage-data";
import { HomepageHeroPictos } from "./homepage-hero-pictos";
import clsx from "clsx";
import { PictoPFMV } from "@/src/components/common/pictos/picto-pfmv";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { HomepageHeroCta } from "@/src/components/homepage/homepage-hero-cta";

export const HomepageHero = () => {
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
              "max-w-[44rem] px-10 text-center text-base font-bold text-pfmv-navy lg:px-0 lg:text-2xl",
              "lg:leading-9",
            )}
          >
            Transformez votre envie d'agir contre la surchauffe urbaine en projets durables et défendables.
          </p>
          <p
            className={clsx(
              "mb-10 max-w-2xl px-10 text-center text-base font-bold text-pfmv-navy lg:px-0 lg:text-2xl",
              "lg:leading-9",
            )}
          >
            Plus de 500 projets déjà créés par des agents de collectivités territoriales.
          </p>
        </hgroup>
        <div className="text-center">
          <HomepageHeroCta/>
        </div>
      </div>
      <HomepageHeroPictos />
    </div>
  );
};
