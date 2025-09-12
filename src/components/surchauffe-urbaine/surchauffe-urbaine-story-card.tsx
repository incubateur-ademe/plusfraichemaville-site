import { PFMV_ROUTES } from "@/src/helpers/routes";
import clsx from "clsx";
import Image from "next/image";
import { RetourExperienceDiagnostic } from "@/src/lib/strapi/types/api/retour-experience-diagnostic";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { SITE_VITRINE_REX_DIAG_STORY } from "@/src/helpers/matomo/matomo-tags";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

export const SurchauffeUrbaineStoryCard = ({ rexDiagStory }: { rexDiagStory: RetourExperienceDiagnostic }) => {
  return (
    <div className="group text-left">
      <LinkWithoutPrefetch
        href={PFMV_ROUTES.RETOUR_EXPERIENCE_DIAGNOSTIC(rexDiagStory.attributes.slug)}
        onClick={() => trackEvent(SITE_VITRINE_REX_DIAG_STORY(rexDiagStory.attributes.slug))}
      >
        <div
          className={clsx(
            "flex shrink-0 flex-col justify-end rounded-2xl pt-5 md:h-[540px] md:w-[358px]",
            "relative h-[296px] w-[210px] overflow-hidden",
            "px-5 py-5 md:px-8 md:py-10",
            `gradient-solution-grise`,
          )}
        >
          <div className="mb-2 flex text-sm text-white md:text-lg">{rexDiagStory.attributes.lieu}</div>
          <h2 className="m-0 text-base text-white md:text-[1.375rem] md:leading-7">{rexDiagStory.attributes.titre}</h2>
          <Image
            src={getStrapiImageUrl(rexDiagStory.attributes.image_principale, STRAPI_IMAGE_KEY_SIZE.medium)}
            alt=""
            fill
            sizes="60vw"
            className="-z-10 object-cover transition-transform duration-300 ease-in group-hover:scale-[1.05]"
            unoptimized
          />
        </div>
      </LinkWithoutPrefetch>
    </div>
  );
};
