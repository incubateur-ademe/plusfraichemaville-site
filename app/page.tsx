import Button from "@codegouvfr/react-dsfr/Button";
import AppFooter from "@/components/layout/AppFooter";
import "react-slideshow-image/dist/styles.css";
import { HomeImageSlider } from "@/components/homepage/HomeImageSlider";

export default function Home() {
  return (
    <main className="">
      <div className="bg-dsfr-background-action-low-blue-france justify-center flex">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-20 justify-center items-center text-center">
          <div className={"text-left pr-36"}>
            <div className="text-dsfr-text-label-blue-france text-[1.75rem] leading-normal font-bold">
              Un outil d’aide à la décision pour accompagner les collectivités dans le choix de solutions de
              rafraîchissement urbain
            </div>
            <Button
              className="rounded-3xl mt-8"
              linkProps={{
                href: "/aide-decision",
              }}
            >
              Découvrir les solutions
            </Button>
          </div>
          <div className={""}>
            <HomeImageSlider />
          </div>
        </div>
      </div>
      <AppFooter />
    </main>
  );
}
