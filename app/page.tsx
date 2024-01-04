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

export default function Home() {
  return (
    <main className="">
      <div className="bg-dsfr-background-action-low-blue-france flex justify-center">
        <div className="flex flex-col md:flex-row max-w-[90rem] gap-x-16 justify-center items-center ">
          <div className={"basis-1/3  md:text-left mx-6 "}>
            <div className="text-dsfr-text-label-blue-france text-[1.75rem] leading-normal font-bold mt-8">
              Un outil d’aide à la décision pour accompagner les collectivités dans le choix de solutions de
              rafraîchissement urbain
            </div>
            <Button className="rounded-3xl mt-8 mb-8" linkProps={{ href: "/aide-decision" }}>
              Découvrir les solutions
            </Button>
          </div>
          <div className={"basis-2/3"}>
            <HomeImageSlider />
          </div>
        </div>
      </div>
      <div className="fr-container my-10 flex flex-col items-center">
        <div className="text-[1.375rem] text-dsfr-text-title-grey font-bold text-center mb-6">
          Vous aider à passer à l’action pour protéger les villes des canicules estivales
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
            label="Je découvre les solutions qui correspondent à mon projet"
          />
          <HomeActionPresentation
            image="/images/homepage/perso-fs.svg"
            link="/fiche-solution"
            buttonLabel="Explorer les fiches solutions"
            label="Je bénéficie d’informations techniques précises"
          />
          <HomeActionPresentation
            image="/images/homepage/perso-rex.svg"
            link="/projet"
            buttonLabel="Découvrir les projets réalisés"
            label="Je m’inspire des projets réalisés par d’autres collectivités"
          />
        </div>
      </div>
      <div className="bg-dsfr-background-action-low-blue-france flex flex-col justify-center items-center">
        <div
          className="text-dsfr-text-label-blue-france font-bold text-[1.375rem] 
        mt-12 max-w-md m-x-auto text-center leading-normal"
        >
          Différents types de solutions à combiner pour lutter contre la surchauffe urbaine
        </div>
        <div className="fr-container flex mt-12 gap-6 flex-wrap justify-center mb-12">
          <HomeSolutionExplanationCard typeSolution={TYPE_SOLUTION_VERTE} />
          <HomeSolutionExplanationCard typeSolution={TYPE_SOLUTION_BLEUE} />
          <HomeSolutionExplanationCard typeSolution={TYPE_SOLUTION_GRISE} />
          <HomeSolutionExplanationCard typeSolution={TYPE_SOLUTION_DOUCE} />
        </div>
      </div>
      <AppFooter />
    </main>
  );
}
