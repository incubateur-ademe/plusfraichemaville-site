import Button from "@codegouvfr/react-dsfr/Button";
import AppFooter from "@/components/layout/AppFooter";
import { HomeImageSlider } from "@/components/homepage/HomeImageSlider";
import React from "react";
import { HomeActionPresentation } from "@/components/homepage/HomeActionPresentation";
import { HomeSolutionExplanationCard } from "@/components/homepage/HomeSolutionExplanationCard";
import {
  TYPE_SOLUTION_BLEUE,
  TYPE_SOLUTION_DOUCE,
  TYPE_SOLUTION_GRISE,
  TYPE_SOLUTION_VERTE,
} from "@/helpers/typeSolution";
import Link from "next/link";
import { ALL_REX_FOR_HOMEPAGE } from "@/components/homepage/HomepageRetourExperienceList";
import RetourExperienceCardForHomepage from "@/components/homepage/RetourExperienceCardForHomepage";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <div className="bg-dsfr-background-action-low-blue-france flex justify-center">
        <div className="flex flex-col md:flex-row max-w-[90rem] gap-x-8 justify-center items-center">
          <div className={"basis-2/5  md:text-left mx-6 2xl:ml-[7.5rem]"}>
            <div className="text-dsfr-text-label-blue-france text-[1.75rem] leading-normal font-bold mt-8">
              {"N’attendez pas"}
              <br /> {"la prochaine vague"}
            </div>
            <div className="text-dsfr-text-label-blue-france text-lg font-bold mt-4">
              {"Le service numérique dédié aux agents et aux élus qui rafraîchissent durablement leur collectivité."}
            </div>
            <Button className="rounded-3xl mt-8 mb-8" linkProps={{ href: "/aide-decision" }}>
              Trouver une solution adaptée
            </Button>
          </div>
          <div>
            <HomeImageSlider />
          </div>
        </div>
      </div>
      <div className="fr-container flex flex-col items-center pt-12 pb-20">
        <div className="text-[1.375rem] text-dsfr-text-title-grey font-bold text-center mb-6">
          Comment fonctionne Plus fraîche ma ville ?
        </div>
        <div className="text-lg text-dsfr-text-title-grey text-center max-w-[38rem] m-auto">
          Des solutions techniques documentées pour vous guider pas à pas depuis le choix des solutions jusqu’à leur
          mise en œuvre
        </div>
        <div className="flex mt-12 gap-14 flex-wrap justify-center">
          <HomeActionPresentation
            image="/images/homepage/perso-aide-decision.svg"
            link="/aide-decision"
            buttonLabel="Trouver une solution adaptée"
            label="1. Je sélectionne les solutions qui correspondent à mon besoin"
          />
          <HomeActionPresentation
            image="/images/homepage/perso-fs.svg"
            link="/fiche-solution"
            buttonLabel="Explorer les fiches solutions"
            label="2. Je bénéficie d’informations techniques précises"
          />
          <HomeActionPresentation
            image="/images/homepage/perso-rex.svg"
            link="/projet"
            buttonLabel="Découvrir les projets réalisés"
            label="3. Je m’inspire des projets réalisés par d’autres collectivités"
          />
        </div>
      </div>
      <div className="bg-dsfr-background-alt-blue-france flex justify-center pt-12 pb-20">
        <div className="fr-container flex flex-col items-center">
          <div className="text-[1.375rem] text-dsfr-text-title-grey max-w-[35rem] font-bold text-center mb-8">
            Comprendre le phénomène d’îlot de chaleur urbain et comment y remédier
          </div>
          <div className="flex flex-col md:flex-row md:gap-16 ">
            <div className="basis-2/3 flex max-w-[50rem] shrink ">
              <video
                className="!cursor-pointer"
                controls
                preload="metadata"
                poster="/images/homepage/video-poster.jpg"
                src="/videos/homepage/video-homepage.mp4"
              />
            </div>
            <div className="basis-1/3 mt-8">
              <div className="text-lg font-bold">Quelques chiffres</div>
              <div className="mt-6">
                <span className="text-lg font-bold text-dsfr-text-label-blue-france">+ 2°C à + 5°C </span> d’ici à la
                fin du siècle selon les scénarii du 6ème rapport du GIEC (2023)
              </div>
              <div className="mt-6">
                <span className="text-lg font-bold text-dsfr-text-label-blue-france">
                  2 fois plus de vagues de chaleur
                </span>{" "}
                en France d’ici 2050, plus intenses et prolongées (Météo-France, 2023)
              </div>
              <div className="mt-6">
                <span className="text-lg font-bold text-dsfr-text-label-blue-france">En moyenne 2 à 3 °C</span> de
                différence de température en ville par rapport à la campagne, et jusqu’à 10 °C pendant les périodes de
                canicule (Ademe, 2023)
              </div>
              <div className="mt-6">
                <span className="text-lg font-bold text-dsfr-text-label-blue-france">
                  Plus fraîche ma ville est la 4ème action
                </span>{" "}
                du plan de gestion des vagues de chaleur
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dsfr-background-action-low-blue-france flex flex-col justify-center items-center pt-12 pb-20">
        <div
          className="text-dsfr-text-label-blue-france font-bold text-[1.375rem]
          max-w-md m-x-auto text-center leading-normal"
        >
          Différents types de solutions à combiner pour lutter contre la surchauffe urbaine
        </div>
        <div className="fr-container !max-w-[80rem] flex mt-12 gap-6 flex-wrap justify-center">
          <HomeSolutionExplanationCard typeSolution={TYPE_SOLUTION_VERTE} />
          <HomeSolutionExplanationCard typeSolution={TYPE_SOLUTION_BLEUE} />
          <HomeSolutionExplanationCard typeSolution={TYPE_SOLUTION_GRISE} />
          <HomeSolutionExplanationCard typeSolution={TYPE_SOLUTION_DOUCE} />
        </div>
      </div>
      <div className="fr-follow !py-12">
        <div className="fr-container">
          <div className="fr-grid-row">
            <div className="fr-col-12">
              <div className="fr-follow__newsletter">
                <div>
                  <h2 className="fr-h5">Abonnez-vous à notre lettre d’information</h2>
                  <p className="fr-text--sm">
                    {"Rejoignez la communauté Plus Fraîche ma ville, recevez des conseils d'experts lors " +
                      "de nos webinaires et parlez-nous de vos projets."}
                  </p>
                </div>
                <div>
                  <Link className="fr-btn rounded-3xl" href={`/contact`}>
                    Nous contacter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center pt-12 pb-12">
        <div className="font-bold text-[1.375rem] text-center leading-normal">
          {"Ces collectivités qui sont passées à l'action"}
        </div>
        <div>
          <div className="fr-container !max-w-[80rem] flex mt-8 mb-16 gap-6 flex-wrap justify-center">
            {ALL_REX_FOR_HOMEPAGE.map((rex) => (
              <RetourExperienceCardForHomepage key={rex.slug} retourExperience={rex} />
            ))}
          </div>
          <hr className="pb-10 mt-3" />
          <div className="fr-container flex flex-col gap-8 md:gap-0 md:flex-row text-start w-full md:items-center">
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
              <Image
                src={`/images/odd/odd11.svg`}
                alt="Ville et communauté durable"
                title="Ville et communauté durable"
                width={70}
                height={70}
                className={"mr-2"}
              />
            </div>
          </div>
        </div>
      </div>

      <AppFooter />
    </main>
  );
}
