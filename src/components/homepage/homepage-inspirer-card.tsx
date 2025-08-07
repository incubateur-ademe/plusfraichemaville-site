import RetourExperienceCard, { RexInHome } from "@/src/components/retourExperience/RetourExperienceCard";
import { PFMV_ROUTES } from "@/src/helpers/routes";
import clsx from "clsx";
import { homepageData } from "./homepage-data";
import Image from "next/image";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export const HomepageInspirerCard = ({
  rex,
  featured = false,
}: {
  rex: (typeof homepageData.inspirer.otherRex)[number];

  featured?: boolean;
}) => {
  return featured ? (
    <div>
      <RetourExperienceCard retourExperience={rex as unknown as RexInHome} className="mx-auto mb-8 flex lg:hidden" />
      <div className="hidden !bg-none lg:inline-block">
        <div className="pfmv-card fr-enlarge-link mb-10 flex gap-8 px-8">
          <div className="relative flex w-[427px] shrink-0 items-center justify-center py-10">
            <Image
              src={rex.image_principale}
              alt={rex.titre}
              className="h-auto w-full object-cover"
              sizes="50vw"
              width={0}
              height={0}
            />
          </div>
          <div className="py-12">
            <h3 className="mb-4 text-2xl font-bold">
              <LinkWithoutPrefetch
                href={PFMV_ROUTES.RETOUR_EXPERIENCE_PROJET(rex.slug)}
                className="hidden !bg-none lg:inline-block"
              >
                {rex.titre}
              </LinkWithoutPrefetch>
            </h3>
            <p>
              Le projet {'"arbres de pluie"'} à Lyon, initié fin 2020 dans le cadre du programme européen Life ARTISAN ,
              offre une solution prometteuse face au réchauffement climatique et à la dégradation urbaine. Porté par la
              Métropole de Lyon, ce projet vise à élargir les fosses qui entourent les arbres existants, afin de
              permettre une meilleure infiltration des eaux de pluie et le rafraîchissement de la ville. Par la capture
              de carbone, la recharge des nappes phréatiques et le refuge qu’ils constituent pour la biodiversité, les
              arbres se transforment en alliés précieux pour {"l'environnement"}. De plus, cette initiative crée des
              îlots de fraîcheur grâce à {"l'évapotranspiration"} des arbres. Les résultats probants des premières
              installations, avec une absorption complète des petites pluies et une meilleure résilience face aux
              sécheresses, témoignent de {"l'efficacité"} de ce projet bénéfique pour {"l'amélioration"} du cadre de vie
              urbain et la préservation de la nature.&nbsp;
            </p>
            <div
              className={clsx(
                "!bg-none font-bold text-pfmv-navy hover:text-dsfr-background-action-high-blue-france-active",
              )}
            >
              Lire la suite
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <RetourExperienceCard className="w-[17.5rem]" retourExperience={rex as unknown as RexInHome} />
  );
};
