import { PFMV_ROUTES } from "@/helpers/routes";
import { useRecommandationsViewed } from "@/hooks/use-recommandations-viewed";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const BannerProjetButtons = ({ projetId }: { projetId: number }) => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  const { recommandationsAlreadyViewed, updateToRecommandationsViewed } = useRecommandationsViewed();
  const links = [
    {
      url: "tableau-de-suivi",
      tooltip: "Tableau de suivi",
    },
    {
      url: "recommandation",
      tooltip: "Recommandations",
      badge: true,
      update: updateToRecommandationsViewed,
    },
  ];

  return (
    <div className="flex gap-4">
      {links.map((link, index) => (
        <div key={index}>
          <Link
            href={PFMV_ROUTES.TABLEAU_DE_BORD_WITH_CURRENT_TAB(projetId, link.url)}
            className={clsx(
              "block size-[51px] rounded-full !bg-none",
              !recommandationsAlreadyViewed &&
                link.badge &&
                "after:bg-pfmv-background-action-high-red-marianne-hover !relative block after:absolute",
              !recommandationsAlreadyViewed &&
                link.badge &&
                "after:right-1 after:top-1 after:size-[7.5px] after:rounded-full",

              currentTab !== link.url
                ? "hover:!bg-dsfr-background-action-low-blue-france-active"
                : "hover:!bg-dsfr-text-label-blue-france",
              {
                ["bg-dsfr-background-action-low-blue-france"]: currentTab !== link.url,
                ["bg-dsfr-text-label-blue-france"]: currentTab === link.url,
              },
            )}
            onClick={async () => link.update && link.update()}
            aria-describedby={`tooltip-${link.tooltip}-${projetId}`}
            id="link-2990"
            key={index}
          />
          <span
            className="fr-tooltip fr-placement"
            id={`tooltip-${link.tooltip}-${projetId}`}
            role="tooltip"
            aria-hidden="true"
          >
            {link.tooltip}
          </span>
        </div>
      ))}
    </div>
  );
};
