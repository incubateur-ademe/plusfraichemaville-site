import Link from "next/link";
import { homepageData } from "./homepage-data";
import { HomepageHeroPictos } from "./homepage-hero-pictos";
import clsx from "clsx";
import { PictoPFMV } from "@/components/common/pictos/picto-pfmv";

export const HomepageHero = () => {
  const { hero } = homepageData;
  return (
    <div className="pt-16 pb-16 relative">
      <div className="w-fit mx-auto z-10">
        <h1
          className={clsx(
            "flex justify-center px-10 lg:px-0 text-2xl lg:text-4xl text-center mb-8 lg:mb-12",
            "text-pfmv-navy font-normal",
          )}
        >
          <div className="w-56 lg:w-auto">
            <PictoPFMV />
          </div>
        </h1>
        <h1
          className={clsx(
            "mb-10 px-10 lg:px-0 text-base lg:text-[26px] font-bold text-pfmv-navy text-center max-w-2xl",
            "lg:leading-9",
          )}
        >
          {hero.baseline}
        </h1>
        <div className="flex gap-4 justify-center flex-col lg:flex-row items-center">
          <Link href={hero.cta1.url} className="fr-btn rounded-3xl">
            {hero.cta1.label}
          </Link>
          <Link href={hero.cta2.url} className="fr-btn fr-btn--secondary rounded-3xl">
            {hero.cta2.label}
          </Link>
        </div>
      </div>
      <HomepageHeroPictos />
    </div>
  );
};
