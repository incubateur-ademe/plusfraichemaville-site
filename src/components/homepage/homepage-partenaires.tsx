import Image from "next/image";

export const HomepagePartenaires = () => {
  const partenairesInHome = [
    {
      image: "/images/homepage/partenaires/logo-amf.webp",
      alt: "Logo de l'Association des Maires de France",
      url: "https://www.amf.asso.fr",
    },
    {
      image: "/images/homepage/partenaires/logo-anru.webp",
      alt: "Logo de l'Agence nationale de l'urbanisme (ANRU)",
      url: "https://anru.fr",
    },
    {
      image: "/images/homepage/partenaires/logo-meteo-france.svg",
      alt: "Logo de Météo France",
      url: "https://meteofrance.com/",
    },
    {
      image: "/images/homepage/partenaires/logo-anct.svg",
      alt: "Logo de L'Agence nationale de la cohésion des territoires (ANCT)",
      url: "https://anct.gouv.fr",
    },
    { image: "/images/homepage/partenaires/logo-cerema.svg", alt: "Logo du CEREMA", url: "https://www.cerema.fr" },
    {
      image: "/images/homepage/partenaires/logo-tribu.jpg",
      alt: "Logo du bureau d'études TRIBU",
      url: "https://www.tribu.coop",
    },
  ];
  return (
    <section className="fr-my-7w fr-container mx-auto w-full justify-items-center">
      <hgroup className="fr-mb-6w">
        <h2 className="fr-h2 !mb-2 text-center">Nos partenaires</h2>
        <p className="fr-text--lead">Ils contribuent à l’expertise de Plus fraîche ma ville </p>
      </hgroup>
      <ul className="flex flex-wrap items-center gap-12 p-0">
        {partenairesInHome.map((partenaire, index) => (
          <li key={index} className="">
            <a
              className="fr-footer__partners-link relative block h-16 w-32 bg-none"
              href={partenaire.url}
              target="_blank"
            >
              <Image src={partenaire.image} alt={partenaire.alt} fill className="object-contain" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
