"use client";
import "@splidejs/splide/css/core";
// TODO: Check changelog from Splide and remove ts-ignore
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { homepageData } from "./homepage-data";
import { HomepageStoriesControllers } from "./homepage-stories-controllers";
import { HomepageStory } from "./homepage-story";
import clsx from "clsx";

export const HomepageStories = () => {
  const { stories } = homepageData;
  return (
    <div className="relative mb-11">
      <h2 className={clsx("mx-auto my-14 max-w-2xl text-center text-lg text-pfmv-navy lg:text-2xl", "px-10 lg:px-0")}>
        {stories.title}
      </h2>
      <div>
        <Splide
          id="homepage-stories-slider"
          hasTrack={false}
          options={{ rewind: true, type: "loop", autoWidth: true, start: 0, pagination: false }}
        >
          <SplideTrack className="overflow-auto !pl-3 lg:!overflow-hidden lg:!pl-6">
            {stories.cards.map((story, index) => (
              <SplideSlide className="!mr-3 md:!mr-6" key={index}>
                <HomepageStory story={story} key={index} />
              </SplideSlide>
            ))}
          </SplideTrack>
          <HomepageStoriesControllers />
        </Splide>
      </div>
    </div>
  );
};
