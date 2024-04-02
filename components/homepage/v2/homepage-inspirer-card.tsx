"use client";

import RetourExperienceCard, { RexInHome } from "@/components/retourExperience/RetourExperienceCard";
import { PFMV_ROUTES } from "@/helpers/routes";
import clsx from "clsx";
import Link from "next/link";
import { homepageData } from "./homepage-data";
import Image from "next/image";

export const HomepageInspirerCard = ({
  rex,
  featured = false,
}: {
  rex: (typeof homepageData.inspirer.otherRex)[number];

  featured?: boolean;
}) => {
  return featured ? (
    <div>
      <RetourExperienceCard retourExperience={rex as unknown as RexInHome} className="flex lg:hidden mx-auto mb-8" />
      <Link href={`${PFMV_ROUTES.RETOURS_EXPERIENCE}/${rex.slug}`} className="hidden lg:inline-block !bg-none">
        <div className="flex gap-8 pfmv-card px-8 mb-10">
          <div className="w-[427px] py-10 shrink-0 relative flex justify-center items-center">
            <Image
              src={rex.image_principale}
              alt={rex.titre}
              className="object-cover w-full h-auto"
              sizes="50vw"
              width={0}
              height={0}
            />
          </div>
          <div className="py-12">
            <h4 className="font-bold text-2xl mb-4">{rex.titre}</h4>
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
                "text-pfmv-navy font-bold !bg-none hover:text-dsfr-background-action-high-blue-france-active",
              )}
            >
              Lire la suite
            </div>
          </div>
        </div>
      </Link>
    </div>
  ) : (
    <RetourExperienceCard className="w-[17.5rem]" retourExperience={rex as unknown as RexInHome} />
  );
};
