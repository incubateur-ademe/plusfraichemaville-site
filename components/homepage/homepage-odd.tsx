import Image from "next/image";

export const HomepageOdd = () => (
  <div className="fr-container flex w-full flex-col gap-8 py-8 text-start md:flex-row md:items-center md:gap-0">
    <div className="max-w-sm text-sm">Plus fraîche ma ville répond aux Objectifs de Développement Durable</div>
    <div className={"flex flex-row"}>
      <Image
        src={`/images/odd/odd3.svg`}
        alt="Bonne santé et bien être"
        title="Bonne santé et bien être"
        width={70}
        height={70}
        className={"mr-2"}
      />
      <Image
        src={`/images/odd/odd13.svg`}
        alt="Mesure relatives à la lutte contre les changements climatiques"
        title="Mesure relatives à la lutte contre les changements climatiques"
        width={70}
        height={70}
        className={"mr-2"}
      />
    </div>
  </div>
);
