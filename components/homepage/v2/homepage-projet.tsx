import Link from "next/link";
import { homepageData, multilines } from "./homepage-data";
import Image from "next/image";

export const HomepageProjet = () => {
  const { projet } = homepageData;
  return (
    <div className="relative gradient-l-to-r-navy">
      <div className="fr-container pt-40 pb-36 ">
        <h2 className="text-3xl font-bold mb-6 text-white">{multilines(projet.title)}</h2>
        <p className="mb-11 text-white">{multilines(projet.subtitle)}</p>
        <Link
          className="fr-btn fr-btn--secondary rounded-3xl !text-white !shadow-none border-[1px] border-white"
          href={projet.cta.url}
        >
          {projet.cta.label}
        </Link>
      </div>
      <Image src={projet.image} alt="balade dans un jardin urbain" fill objectFit="cover" className="-z-10" />
    </div>
  );
};
