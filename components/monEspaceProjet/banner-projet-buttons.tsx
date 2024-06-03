import { PFMV_ROUTES } from "@/helpers/routes";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const links = [
  {
    url: "tableau-de-suivi",
    tooltip: "Tableau de suivi",
  },
  {
    url: "recommandation",
    tooltip: "Recommandations",
  },
];

export const BannerProjetButtons = ({ projetId }: { projetId: number }) => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
    <div className="flex gap-4">
      {links.map((link, index) => (
        <div>
          <Link
            href={PFMV_ROUTES.TABLEAU_DE_BORD_WITH_CURRENT_TAB(projetId, link.url)}
            className={clsx(
              "block size-[51px] rounded-full !bg-none",
              currentTab !== link.url
                ? "hover:!bg-dsfr-background-action-low-blue-france-active"
                : "hover:!bg-dsfr-text-label-blue-france",
              {
                ["bg-dsfr-background-action-low-blue-france"]: currentTab !== link.url,
                ["bg-dsfr-text-label-blue-france"]: currentTab === link.url,
              },
            )}
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
