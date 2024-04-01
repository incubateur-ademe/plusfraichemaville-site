import Link from "next/link";
import { homepageData, multilines } from "./homepage-data";
import Image from "next/image";
import clsx from "clsx";

export const HomepageProjet = () => {
  const { projet } = homepageData;
  return (
    <div className="relative gradient-l-to-r-navy">
      <div className="fr-container flex flex-col lg:block pt-60 lg:pt-40 pb-10 lg:pb-36 ">
        <h2
          className={clsx(
            "text-[18px] text-center lg:text-left lg:text-3xl font-bold mb-6 text-white",
            "leading-6 lg:leading-10",
          )}
        >
          {multilines(projet.title)}
        </h2>
        <p className="hidden lg:block mb-11 text-white">{multilines(projet.subtitle)}</p>
        <Link
          className={clsx(
            "fr-btn fr-btn--secondary rounded-3xl !text-white !shadow-none border-[1px] border-white",
            "hover:!text-pfmv-navy hover:!bg-white transition-[background] duration-300",
            "!lg:flex mx-auto !lg:mx-0",
          )}
          href={projet.cta.url}
        >
          {projet.cta.label}
        </Link>
      </div>
      <Image src={projet.image} alt="balade dans un jardin urbain" fill className="-z-10 object-cover" />
    </div>
  );
};
