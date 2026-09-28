import Image from "next/image";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import clsx from "clsx";

export const BannerPFAT = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("fr-text--lg rounded-xl bg-dsfr-background-alt-blue-france p-6", className)}>
      <div className="mb-4 text-lg font-bold md:text-xl">
        Anticiper les fortes chaleurs pour les agents de collectivité
      </div>
      <div className="flex flex-col items-start gap-4 md:flex-row md:gap-8">
        <Image
          src="/images/surchauffe-urbaine/logo-pfat.webp"
          alt=""
          width={165}
          height={165}
          className="rounded-lg object-contain"
        />
        <div>
          <p>
            Adapter son territoire aux fortes chaleurs, c'est aussi penser aux personnes qui y travaillent.
            <br /> Le service Plus frais au travail de l'ADEME vous accompagne pour agir.
          </p>
          <LinkWithoutPrefetch
            href="https://plusfraisautravail.beta.gouv.fr/solutions/"
            target="_blank"
            className="text-pfmv-navy"
          >
            Découvrir les leviers d'action en tant qu’employeur
          </LinkWithoutPrefetch>
        </div>
      </div>
    </div>
  );
};
