import { homepageData } from "./homepage-data";
import Link from "next/link";
import clsx from "clsx";
import { HomepageInspirerCard } from "./homepage-inspirer-card";

export const HomepageInspirer = () => {
  const { inspirer } = homepageData;
  return (
    <div className="w-full mx-auto pb-20 max-w-[78rem] px-5">
      <h3 className="px-10 lg:px-0 text-pfmv-navy text-lg lg:text-[26px] font-bold my-10 lg:my-14 text-center">
        {inspirer.title}
      </h3>

      {inspirer.featuredRex && <HomepageInspirerCard rex={inspirer.featuredRex} featured />}
      <div className="flex gap-8 lg:flex-row justify-center flex-wrap lg:flex-nowrap items-center">
        {inspirer.otherRex.map((rex, index) => (
          <HomepageInspirerCard rex={rex} key={index} />
        ))}
      </div>
      <Link
        className={clsx(
          "fr-btn fr-btn--secondary mt-10 mx-auto rounded-3xl !block",
          "!shadow-none text-pfmv-navy border-[1px] border-pfmv-navy",
        )}
        href={inspirer.cta.url}
      >
        {inspirer.cta.label}
      </Link>
    </div>
  );
};
