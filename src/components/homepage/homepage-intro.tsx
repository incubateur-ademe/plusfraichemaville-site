import Image from "next/image";
import Button from "@codegouvfr/react-dsfr/Button";
import { PFMV_ROUTES } from "@/src/helpers/routes";

export const HomepageIntro = () => {
  return (
    <div className="gradient-l-to-r-white relative  flex flex-col lg:flex-row">
      <div className="fr-container">
        <hgroup className="fr-py-4w fr-py-md-12w">
          <h1 className="fr-h1 text-pfmv-navy max-w-xl">
            Agissez durablement <br /> contre la surchauffe urbaine
          </h1>
          <p className="font-bold text-pfmv-navy max-w-xl fr-h5">
            Le service de l'ADEME qui vous aide à concevoir vos projets de rafraîchissement urbain.
          </p>
          <div className="fr-mt-4w flex justify-center lg:justify-start">
            <Button linkProps={{ href: PFMV_ROUTES.ESPACE_PROJET }} size="large">Commencer</Button>
          </div>
        </hgroup>
      </div>
      <div className="relative h-64 w-full lg:absolute lg:inset-0 lg:-z-10 lg:h-auto lg:overflow-hidden">
        <Image
          loading="eager"
          src="/images/homepage/home-hero.jpg"
          alt="balade dans un jardin urbain"
          fill
          className="object-cover lg:ml-[25rem] lg:object-contain"
        />
      </div>
    </div>
  );
};
