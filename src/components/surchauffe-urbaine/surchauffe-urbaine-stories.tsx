"use client";
import "@splidejs/splide/css/core";
// TODO: Check changelog from Splide and remove ts-ignore
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { SurchauffeUrbaineStoriesControllers } from "./surchauffe-urbaine-stories-controllers";
import { SurchauffeUrbaineStoryCard } from "./surchauffe-urbaine-story-card";
import { RetourExperienceDiagnostic } from "@/src/lib/strapi/types/api/retour-experience-diagnostic";
import { SplideFrTranslation } from "@/src/components/common/splide-controllers";

export const SurchauffeUrbaineStories = ({ rexDiagStories }: { rexDiagStories: RetourExperienceDiagnostic[] }) => {
  return (
    <Splide
      id="rex-diag-stories-slider"
      hasTrack={false}
      options={{ rewind: true, type: "loop", autoWidth: true, start: 0, pagination: false, i18n: SplideFrTranslation }}
    >
      <div className="px-3 md:px-12">
        <SplideTrack className="overflow-auto lg:!overflow-hidden">
          {rexDiagStories.map((rexDiag, index) => (
            <SplideSlide className="!mr-3 md:!mr-6" key={index}>
              <SurchauffeUrbaineStoryCard rexDiagStory={rexDiag} key={index} />
            </SplideSlide>
          ))}
        </SplideTrack>
      </div>
      <SurchauffeUrbaineStoriesControllers />
    </Splide>
  );
};
