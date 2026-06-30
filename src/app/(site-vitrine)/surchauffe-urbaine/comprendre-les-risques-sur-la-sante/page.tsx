import { Metadata } from "next";
import { Suspense } from "react";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import { StaticZoomedImage } from "@/src/components/common/static-zoomed-image";
import { FicheCardSkeleton } from "@/src/components/common/fiche-card-skeleton";
import { AltSRSantePopulationARisque, AltSRSanteVivreChaleurEnVille } from "./screen-reader-alt-infographies-sante";
import { FichesSolutionsSante } from "./fiches-solutions-sante";

export const metadata: Metadata = computeMetadata("Comprendre les risques de la surchauffe urbaine sur la santé");

export default function SurchauffeUrbaineComprendreLesRisquesPage() {
  return (
    <>
      <div className="fr-container">
        <h1 className="mt-8 text-center text-[1.75rem] font-bold text-dsfr-text-title-grey">
          Surchauffe urbaine et santé : <br /> comprendre les risques pour mieux protéger les habitants
        </h1>
        <div className="mt-12 flex flex-col gap-6">
          <section className="fr-text--lg rounded-xl bg-dsfr-background-alt-blue-france p-6">
            <div className="flex flex-col gap-12 md:flex-row ">
              <div className="flex flex-col md:basis-[65%]">
                <h2>Ce qu’il faut retenir</h2>
                <ul className="mt-2 list-disc md:ml-4">
                  <li>
                    En 2025, plus de 5 700 décès sont attribuables à une exposition de la population à la chaleur sur
                    l’ensemble de la période de surveillance de l’été.
                  </li>
                  <li>
                    Certains habitants sont plus exposés que d'autres du fait de vulnérabilités liées à l’âge, à la
                    condition physique, à l’activité professionnelle ou au milieu social.
                  </li>
                  <li>
                    Certaines solutions de rafraîchissement apportent plus de bénéfices pour la santé que d'autres : la
                    végétalisation, par exemple, a un effet avéré sur la santé mentale.
                  </li>
                  <li>
                    Rafraîchir les espaces publics améliore la santé physique et mentale tout en favorisant les liens
                    sociaux.
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-center">
                <StaticZoomedImage
                  src="/images/surchauffe-urbaine/sante-mieux-vivre-avec-la-chaleur-en-ville.jpg"
                  alt="Infographie : mieux vivre avec la chaleur en ville"
                  imageSize={{ thumbWidth: 250, thumbHeight: 260, largeWidth: 700, largeHeight: 2000 }}
                  ariaDescribedBy="desc-infographie-chaleur"
                />
                <AltSRSanteVivreChaleurEnVille id="desc-infographie-chaleur" />
                <legend className="fr-text--md">
                  Source :{" "}
                  <LinkWithoutPrefetch
                    href="https://www.santepubliquefrance.fr/climat/fortes-chaleurs-canicule/infographie/infographie-mieux-vivre-avec-la-chaleur-en-ville"
                    target="_blank"
                    className="text-pfmv-navy"
                  >
                    Santé publique France
                  </LinkWithoutPrefetch>{" "}
                </legend>
              </div>
            </div>
          </section>
          <section className="fr-text--lg">
            <h2>Comment la chaleur affecte-t-elle le corps humain ?</h2>
            <p>
              Pour l’Organisation mondiale de la santé (OMS) l’impact du <strong>changement climatique</strong> est «
              l’un des plus grands défis sanitaires du XXIe siècle ». Cinq fois plus d'humains mourront à cause de la
              chaleur extrême d'ici 2050, d'après le "compte à rebours" du Lancet.
            </p>
            <p>
              Les travaux de Santé publique France montrent que tout le monde est vulnérable à la chaleur, à différents
              degrés selon son exposition, sa condition physique et son environnement. Cette vulnérabilité peut changer
              d’un jour à l’autre.
            </p>
            <p>
              Concrètement, quand les températures extérieures occasionnent une température du corps dépassant 39 °C à
              40 °C, c’est <strong>le coup de chaleur</strong>. La peau devient sèche et chaude, et on observe des
              dysfonctionnements circulatoires, rénaux, cardiaques et neurologiques. Si la chaleur augmente encore et se
              maintient, d’autres phénomènes se produisent, comme la liquéfaction des membranes cellulaires et une
              coagulation, avec pour conséquence <strong>une nécrose et une dégradation d’organes majeurs</strong>.
            </p>
          </section>
          <section className="fr-text--lg rounded-xl bg-dsfr-background-alt-blue-france p-6">
            <h2>Qui sont les personnes les plus vulnérables face à la chaleur en ville ?</h2>
            <p>
              Tous les habitants ne sont pas égaux face à la chaleur. Identifier et protéger les{" "}
              <strong>populations les plus vulnérables</strong> est indispensable pour prioriser les actions de projets
              de <strong>rafraîchissement urbain</strong>.
            </p>
            <p>Les groupes de populations à risque élevé :</p>
            <div className="flex flex-col items-start gap-4 md:flex-row">
              <ul className="list-disc md:ml-4 md:basis-6/12">
                <li>Les enfants et personnes âgées dont la thermorégulation est moins efficace ;</li>
                <li>
                  Les populations ayant certaines conditions physiques, pathologies ou traitements médicamenteux qui
                  affectent la thermorégulation.
                </li>
                <li>
                  Les femmes enceintes : risque de prématurité, de petit poids de naissance pour l’enfant à naître, ou
                  encore mort fœtale in utero.
                </li>
                <li>Travailleurs exposés : ouvriers, sportifs, agents de terrain.</li>
                <li>
                  Habitants de quartiers surchauffés ou de logements mal isolés : résider dans une zone chaude la nuit
                  pendant plusieurs jours multiplie le risque de décès par 2 à 3, habiter sous les toits le multiplie
                  par 4.
                </li>
              </ul>
              <StaticZoomedImage
                src="/images/surchauffe-urbaine/sante-population-a-risque.jpg"
                alt="Infographie : augmentation de la population à risque en fonction de l'intensité de la chaleur"
                imageSize={{ thumbWidth: 550, thumbHeight: 260, largeWidth: 1200, largeHeight: 844 }}
                ariaDescribedBy="sante-population-a-risque"
              />
              <AltSRSantePopulationARisque id="sante-population-a-risque" />
            </div>
            <p>
              Les femmes sont également plus vulnérables. Le risque de décès lié à la chaleur est légèrement plus élevé
              pour les hommes de moins de 65 ans (possiblement en lien avec des expositions professionnelles) alors
              qu’il est beaucoup plus marqué chez les femmes de plus de 65 ans.
            </p>
            <p>
              Pour aller plus loin, découvrez les méthodes de diagnostic :{" "}
              <LinkWithoutPrefetch
                href={PFMV_ROUTES.SURCHAUFFE_URBAINE_FICHE_DIAGNOSTIC("analyse-vulnerabilite-population")}
                className="text-pfmv-navy"
              >
                Identifier les vulnérabilités face aux vagues de chaleur
              </LinkWithoutPrefetch>{" "}
              et{" "}
              <LinkWithoutPrefetch
                href={PFMV_ROUTES.SURCHAUFFE_URBAINE_FICHE_DIAGNOSTIC("enquetes-confort-vecu")}
                className="text-pfmv-navy"
              >
                Comprendre comment les habitants ressentent la chaleur.
              </LinkWithoutPrefetch>
            </p>
          </section>
          <section className="fr-text--lg">
            <h2>Quelles sont les conséquences de la chaleur sur la mortalité ? </h2>
            <p>La chaleur a un vrai impact sur la santé. Ce n’est pas qu’une question de confort.</p>
            <p>
              Santé publique France a comparé les personnes décédées pendant la canicule de 2003 avec celles qui ont
              survécu.
            </p>
            <p>Les résultats sont clairs :</p>
            <ul className="list-disc md:ml-4">
              <li>Risque de décès multiplié par 4 à 10 pour les personnes en perte d’autonomie ;</li>
              <li>Multiplié par 4 pour les ouvriers ;</li>
              <li>Multiplié par 4 pour les habitants d’une chambre sous les toits ;</li>
              <li>Multiplié par 3,5 à 5 pour les personnes présentant certaines pathologies chroniques ;</li>
              <li>
                Multiplié par 2 à 3 pour les habitants de quartiers exposés à la surchauffe la nuit pendant plusieurs
                jours.
              </li>
            </ul>
          </section>
          <section className="fr-text--lg rounded-xl bg-dsfr-background-alt-blue-france p-6">
            <h2>Mise au point : « santé », de quoi parle-t-on ?</h2>
            <p>
              L'OMS, dans sa Constitution de 1948, a défini la santé humaine comme « un état de complet bien-être
              physique, mental et social, qui ne consiste pas seulement en une absence de maladie ou d'infirmité ». Être
              en bonne santé ne signifie donc pas uniquement « ne pas être malade ». Il s’agit de réunir les conditions
              physiques, mentales et sociales qui permettent le plein épanouissement.
            </p>
            <p>
              Pour un projet de rafraîchissement urbain cela donne un cap. Une solution qui baisse les températures,
              mais isole les habitants socialement n'est pas une solution favorable à la santé. Une solution qui, en
              plus de rafraîchir, crée un espace de vie agréable, favorise le lien social et encourage la mobilité
              active l'est.
            </p>
            <p>
              <strong>L’urbanisme favorable à la santé</strong>, démarche de l’OMS introduite en France dans les années
              2010, est une approche qui vise à faire de la santé et du bien-être des critères majeurs et objectivés
              d’élaboration des politiques d’aménagement et d’urbanisme.
            </p>
          </section>
          <section className="fr-text--lg">
            <h2>Solutions de rafraichissement et santé : une compatibilité systématique ?</h2>
            <p>
              Les solutions qui visent à <strong>rafraîchir nos villes et villages</strong> vont naturellement dans le
              sens de la <strong>santé</strong> : rendre les villes encore vivables et habitables dans une France à +4
              °C, c’est protéger leurs habitants. Certaines solutions présentent plus de co-bénéfices que d’autres.
            </p>
            <p>
              Prenons deux exemples. Des brise-soleil, s’ils réduisent la température ressentie, auront un impact global
              moins important sur la santé que le renfort de la <strong>végétalisation</strong>. En effet, si une
              diminution des températures est mesurable dans les deux cas, la végétalisation présentera de nombreux
              co-bénéfices supplémentaires : motivation pour l’activité physique, restauration de la capacité
              d’attention, détente, sociabilisation, etc.
            </p>
            <p>
              Certaines solutions de rafraichissement urbain peuvent présenter des effets contreproductifs, et méritent
              une attention particulière ;
            </p>
            <ul className="mb-4 list-disc md:ml-4">
              <li>
                Les{" "}
                <LinkWithoutPrefetch href={PFMV_ROUTES.FICHE_SOLUTION("jeux-eau")} className="text-pfmv-navy">
                  jeux d’eau
                </LinkWithoutPrefetch>{" "}
                : s’ils procurent une sensation immédiate de fraicheur, ils peuvent faire oublier les effets du
                rayonnement solaire et les risques pour la peau. On observe souvent des enfants jouer en maillot de bain
                ou en tenue légère sur des plages horaires où il ne faudrait normalement pas s’exposer.
              </li>
              <li>
                Les{" "}
                <LinkWithoutPrefetch
                  href={PFMV_ROUTES.FICHE_SOLUTION("revetement-albedo-eleve")}
                  className="text-pfmv-navy"
                >
                  revêtements à albédo élevé
                </LinkWithoutPrefetch>{" "}
                comme des sols blancs : s’ils permettent une baisse effective de la température de l’air, ils renvoient
                les UV vers les usagers et peuvent éblouir augmentent le risque de cancer de la peau.
              </li>
            </ul>
            <p>
              Globalement, <strong>rafraichir les espaces publics</strong> permet une amélioration substantielle de
              toutes les composantes de la santé.
            </p>
          </section>
          <section className="fr-text--lg rounded-xl bg-dsfr-background-alt-blue-france p-6">
            <h2>Les solutions les plus favorables à la santé</h2>
            <p>
              Allez sur l’espace projet pour faire votre combinaison de solutions les plus favorables à la santé pour
              votre espace.
            </p>
            <Suspense
              fallback={
                <ul className="m-0 mt-6 flex gap-6 overflow-x-auto pb-4 pl-0">
                  {[0, 1, 2].map((i) => (
                    <li key={i} className="flex shrink-0 list-none">
                      <FicheCardSkeleton />
                    </li>
                  ))}
                </ul>
              }
            >
              <FichesSolutionsSante />
            </Suspense>
          </section>
          <section className="fr-text--lg">
            <h2>En savoir plus</h2>
            <ul className="list-disc md:ml-4">
              <li>
                <LinkWithoutPrefetch
                  href="https://www.santepubliquefrance.fr/climat/fortes-chaleurs-canicule/bulletin-national/chaleur-et-sante-bilan-de-lete-2025"
                  target="_blank"
                  className="text-pfmv-navy"
                >
                  Chaleur et santé. Bilan de l’été 2025. Santé publique France
                </LinkWithoutPrefetch>
              </li>
              <li>
                <LinkWithoutPrefetch
                  href="https://www.santepubliquefrance.fr/climat/fortes-chaleurs-canicule/communication-congres/paroles-dexperts-adapter-les-environnements-urbains-aux-vagues-de-chaleur-une-necessite-pour"
                  target="_blank"
                  className="text-pfmv-navy"
                >
                  Santé publique France. 2025. Paroles d'experts. Adapter les environnements urbains aux vagues de
                  chaleur. Événement du 20 juin 2024.
                </LinkWithoutPrefetch>
              </li>
              <li>
                <LinkWithoutPrefetch
                  href="https://www.santepubliquefrance.fr/climat/fortes-chaleurs-canicule/rapportsynthese/impact-sanitaire-de-la-vague-de-chaleur-en-france-survenue-en-aout-2003-rapport-detape-29-aout-2003"
                  target="_blank"
                  className="text-pfmv-navy"
                >
                  Etude sur la canicule de 2003. Santé publique France
                </LinkWithoutPrefetch>
              </li>
              <li>
                <LinkWithoutPrefetch
                  href="https://www.santepubliquefrance.fr/climat/fortes-chaleurs-canicule/communication-congres/paroles-dexperts-adapter-les-environnements-urbains-aux-vagues-de-chaleur-une-necessite-pour"
                  target="_blank"
                  className="text-pfmv-navy"
                >
                  Santé publique France. 2025. Paroles d’experts. Adapter les environnements urbains aux vagues de
                  chaleur : une nécessité pour protéger la santé publique ? ; Événement du 20 juin 2024. Saint-Maurice :
                  Santé publique France.
                </LinkWithoutPrefetch>
                <br />
                <i>
                  Extraits tirés des interventions de Jean-François Toussaint, Mathilde Pascal et Karine Laaidi (Santé
                  Publique France)
                </i>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
