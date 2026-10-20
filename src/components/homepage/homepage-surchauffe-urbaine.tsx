import { PFMV_ROUTES } from "@/src/helpers/routes";
import Card from "@codegouvfr/react-dsfr/Card";
import Image from "next/image";

export const HomepageSurchauffeUrbaine = () => {
  return (
    <section className="fr-py-7w mx-auto w-full bg-dsfr-background-contrast-cumuls">
      <div className="fr-container">
        <h2 className="fr-h2 fr-mb-6w text-center">Surchauffe urbaine : comprendre pour mieux agir</h2>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-4 md:grid-rows-2">
          <Card
            className="col-span-2 row-span-2"
            title="Surchauffe urbaine et santé : comprendre les risques pour mieux protéger les habitants"
            desc="En 2025, plus de 5 700 décès sont attribuables à une exposition de la population à la chaleur
            sur l’ensemble de la période de surveillance de l’été."
            size="large"
            imageComponent={
              <Image
                src="/images/homepage/surchauffe-urbaine/comprendre-les-risques.jpg"
                alt=""
                className="w-full object-cover"
                sizes="50vw"
                width={0}
                height={0}
              />
            }
            endDetail="Lire la suite"
            linkProps={{ href: PFMV_ROUTES.SURCHAUFFE_URBAINE_RISQUES_SANTE }}
            enlargeLink
          />
          <Card
            title="Comprendre les notions clés"
            size="small"
            imageComponent={
              <Image
                src="/images/homepage/surchauffe-urbaine/comprendre-notions-cles.jpg"
                alt=""
                className="w-full object-cover"
                sizes="50vw"
                width={0}
                height={0}
              />
            }
            endDetail="Lire la suite"
            linkProps={{ href: PFMV_ROUTES.SURCHAUFFE_URBAINE_COMPRENDRE }}
            enlargeLink
          />
          <Card
            title="La ville dans une France à +4°C"
            size="small"
            imageComponent={
              <Image
                src="/images/homepage/surchauffe-urbaine/ville-dans-france-plus-4-degres.jpg"
                alt=""
                className="w-full object-cover"
                sizes="50vw"
                width={0}
                height={0}
              />
            }
            endDetail="Lire la suite"
            linkProps={{ href: PFMV_ROUTES.SURCHAUFFE_URBAINE_INTRODUCTION }}
            enlargeLink
          />
          <Card
            title="Connaître la sensibilité actuelle et future de ma ville à la surchauffe urbaine"
            className="col-span-2"
            size="small"
            imageComponent={
              <Image
                src="/images/homepage/surchauffe-urbaine/connaitre-sensibilite-commune.jpg"
                alt=""
                className="h-40 w-full object-cover"
                sizes="50vw"
                width={0}
                height={0}
              />
            }
            endDetail="Consulter la cartographie des zones climatiques locales (LCZ)"
            linkProps={{ href: PFMV_ROUTES.SURCHAUFFE_URBAINE_TERRITOIRE }}
            enlargeLink
          />
        </div>
      </div>
    </section>
  );
};
