import Link from "next/link";
import { homepageData } from "./homepage-data";

export const HomepageHero = () => {
  const { hero } = homepageData;
  return (
    <div className="pt-10 pb-16">
      <div className="w-fit mx-auto">
        <h1 className="text-4xl text-center mb-12 text-pfmv-navy font-normal">{hero.title()}</h1>
        <h2 className="mb-10 text-[26px] font-bold text-pfmv-navy text-center max-w-2xl">{hero.baseline}</h2>
        <div className="flex gap-4 justify-center">
          <Link href={hero.cta1.url} className="fr-btn rounded-3xl">
            {hero.cta1.label}
          </Link>
          <Link href={hero.cta2.url} className="fr-btn fr-btn--secondary rounded-3xl">
            {hero.cta2.label}
          </Link>
        </div>
      </div>
    </div>
  );
};
