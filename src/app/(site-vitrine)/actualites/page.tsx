import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { CustomSideMenu, SideMenuBloc } from "@/src/components/common/custom-side-menu";
import { Fragment } from "react";
import { Separator } from "@/src/components/common/separator";
import clsx from "clsx";
import { NewsletterLinkedin } from "@/src/components/common/newsletter-linkedin";

export const metadata: Metadata = computeMetadata("Actualités");

export default async function PageActualites() {
  const blocs: SideMenuBloc[] = [
    {
      label: "Évènements",
      contentId: "evenements",
      component: <NewsletterLinkedin />,
    },
    {
      label: "Les vidéos",
      contentId: "videos",
      component: <NewsletterLinkedin />,
    },
    {
      label: "Suivez-nous",
      contentId: "suivez-nous",
      component: <NewsletterLinkedin />,
    },
  ];

  return (
    <div className="relative">
      <div className="fr-container relative flex flex-col-reverse md:flex-row">
        <div
          className={clsx(
            "sticky bottom-0 top-[unset] z-50 mb-8 flex flex-none shrink-0 flex-col-reverse bg-white",
            "pb-4 md:bottom-[unset] md:top-12 md:mb-0 md:h-full md:w-56 md:flex-col md:pt-10",
          )}
        >
          <CustomSideMenu blocs={blocs} />
        </div>
        <div className="border-dsfr-border-default-grey pt-4 md:border-l-[1px] md:pl-7 md:pt-0">
          {blocs.map((tab) => (
            <Fragment key={tab.contentId}>
              <div id={tab.contentId} className="mb-6 mt-8 text-[1.75rem] font-bold text-dsfr-text-title-grey">
                {tab.label}
              </div>
              <div>{tab.component}</div>
              <Separator className="my-10 !h-[1px] !opacity-100" />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
