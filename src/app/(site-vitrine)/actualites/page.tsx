import { Metadata } from "next";
import { computeMetadata } from "@/src/helpers/metadata/helpers";
import { CustomSideMenu, SideMenuBloc } from "@/src/components/common/custom-side-menu";
import { Fragment } from "react";
import { Separator } from "@/src/components/common/separator";
import clsx from "clsx";
import { NewsletterLinkedin } from "@/src/components/common/newsletter-linkedin";
import { getAllWebinaires } from "@/src/lib/strapi/queries/webinaires-queries";
import { isWebinaireInFuture } from "@/src/components/actualites/webinaires/webinaires-helpers";
import orderBy from "lodash/orderBy";
import { VideosList } from "@/src/components/actualites/webinaires/videos-list";
import { EvenementsList } from "@/src/components/actualites/evenements/evenements-list";

export const metadata: Metadata = computeMetadata("Actualités");

export default async function PageActualites() {
  const blocs: SideMenuBloc[] = [
    {
      label: "Évènements",
      contentId: "evenements",
      component: <EvenementsList />,
    },
    {
      label: "Les vidéos",
      contentId: "videos",
      component: <VideosList />,
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
            "pb-4 md:bottom-[unset] md:top-12 md:mb-0 md:h-full md:w-50 md:flex-col md:pt-7",
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
