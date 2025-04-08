"use client";
import "@splidejs/splide/css/core";
// TODO: Check changelog from Splide and remove ts-ignore
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { HomepageStoriesControllers } from "./homepage-stories-controllers";
import { SurchauffeUrbaineStoryCard } from "./surchauffe-urbaine-story-card";
import { RetourExperienceDiagnostic } from "@/src/lib/strapi/types/api/retour-experience-diagnostic";

export const SurchauffeUrbaineStories = ({ rexDiagStories }: { rexDiagStories: RetourExperienceDiagnostic[] }) => {
  return (
    <div className="relative mb-11">
      <div>
        <Splide
          id="rex-diag-stories-slider"
          hasTrack={false}
          options={{ rewind: true, type: "loop", autoWidth: true, start: 0 }}
        >
          <SplideTrack className="overflow-auto !pl-3 lg:!overflow-hidden lg:!pl-6">
            {rexDiagStories.map((rexDiag, index) => (
              <SplideSlide className="!mr-3 md:!mr-6" key={index}>
                <SurchauffeUrbaineStoryCard rexDiagStory={rexDiag} key={index} />
              </SplideSlide>
            ))}
          </SplideTrack>
          <HomepageStoriesControllers />
        </Splide>
      </div>
    </div>
  );
};
