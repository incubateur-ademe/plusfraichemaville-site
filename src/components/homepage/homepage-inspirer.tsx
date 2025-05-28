import { homepageData } from "./homepage-data";
import Link from "next/link";
import clsx from "clsx";
import { HomepageInspirerCard } from "./homepage-inspirer-card";

export const HomepageInspirer = () => {
  const { inspirer } = homepageData;
  return (
    <div className="mx-auto w-full max-w-[78rem] px-5 pb-20">
      <h2 className="my-10 px-10 text-center text-lg font-bold text-pfmv-navy lg:my-14 lg:px-0 lg:text-[26px]">
        {inspirer.title}
      </h2>

      {inspirer.featuredRex && <HomepageInspirerCard rex={inspirer.featuredRex} featured />}
      <div className="flex flex-wrap items-center justify-center gap-8 lg:flex-row lg:flex-nowrap">
        {inspirer.otherRex.map((rex, index) => (
          <HomepageInspirerCard rex={rex} key={index} />
        ))}
      </div>
      <Link
        className={clsx(
          "fr-btn fr-btn--secondary mx-auto mt-10 !block rounded-3xl",
          "border-[1px] border-pfmv-navy text-pfmv-navy !shadow-none",
        )}
        href={inspirer.cta.url}
        prefetch={false}
      >
        {inspirer.cta.label}
      </Link>
    </div>
  );
};
