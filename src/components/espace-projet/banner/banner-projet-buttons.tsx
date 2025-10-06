import { PFMV_ROUTES } from "@/src/helpers/routes";
import { useRecommandationsViewed } from "@/src/hooks/use-recommandations-viewed";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import {
  BannerPictoPartage,
  BannerPictoProps,
  BannerPictoRecommandations, BannerPictoStatut,
  BannerPictoTableauDeSuivi,
} from "./banner-projet-buttons-pictos";
import { useRef } from "react";
import Link from "next/link";

export const BannerProjetButtons = ({ projetId }: { projetId: number }) => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");
  const linkRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const { recommandationsAlreadyViewed, updateToRecommandationsViewed } = useRecommandationsViewed();
  const links = [
    {
      url: "tableau-de-suivi" as const,
      tooltip: "Tableau de bord",
      picto: ({ active }: BannerPictoProps) => <BannerPictoTableauDeSuivi active={active} />,
    },
    {
      url: "recommandation" as const,
      tooltip: "Recommandations",
      notificationBadge: true,
      update: updateToRecommandationsViewed,
      picto: ({ active }: BannerPictoProps) => <BannerPictoRecommandations active={active} />,
    },
    {
      url: "partage" as const,
      tooltip: "Partage",
      picto: ({ active }: BannerPictoProps) => <BannerPictoPartage active={active} />,
    },
    {
      url: "statut" as const,
      tooltip: "Vos retours",
      picto: ({ active }: BannerPictoProps) => <BannerPictoStatut active={active} />,
    },
  ];

  return (
    <>
      {links.map((link, index) => {
        const Picto = link.picto;
        return (
          <div className="relative" key={index}>
            <Link
              href={PFMV_ROUTES.TABLEAU_DE_BORD_WITH_CURRENT_TAB(projetId, link.url)}
              prefetch={false}
              ref={(ref) => {
                if (linkRef.current) {
                  linkRef.current[index] = ref;
                }
              }}
              aria-label={link.tooltip}
              className={clsx(
                "block size-[51px] rounded-full !bg-none",
                !recommandationsAlreadyViewed &&
                  link.notificationBadge &&
                  "!relative block after:absolute after:bg-pfmv-background-action-high-red-marianne-hover",
                !recommandationsAlreadyViewed &&
                  link.notificationBadge &&
                  "after:right-1 after:top-1 after:size-[7.5px] after:rounded-full",

                currentTab !== link.url
                  ? "hover:!bg-dsfr-background-action-low-blue-france-active"
                  : "hover:!bg-dsfr-text-label-blue-france",
                {
                  ["bg-dsfr-background-action-low-blue-france"]: currentTab !== link.url,
                  ["bg-dsfr-text-label-blue-france"]: currentTab === link.url,
                },
              )}
              onClick={() => {
                linkRef.current[index]?.blur();
                if (link.update) {
                  link.update();
                }
              }}
              aria-describedby={`tooltip-${link.url}-${projetId}`}
              id="link-2990"
              key={index}
            />
            <Picto active={currentTab == link.url} />
            <span
              className="fr-tooltip fr-placement"
              id={`tooltip-${link.url}-${projetId}`}
              role="tooltip"
              aria-hidden="true"
            >
              {link.tooltip}
            </span>
          </div>
        );
      })}
    </>
  );
};
