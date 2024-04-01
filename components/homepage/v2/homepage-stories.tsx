"use client";
import "@splidejs/splide/css/core";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { homepageData } from "./homepage-data";
import { HomepageStoriesControllers } from "./homepage-stories-controllers";
import { HomepageStory } from "./homepage-story";
import clsx from "clsx";

export const HomepageStories = () => {
  const { stories } = homepageData;
  return (
    <div className="mb-11 relative">
      <h3 className={clsx("my-14 text-lg lg:text-2xl text-pfmv-navy max-w-2xl text-center mx-auto", "px-10 lg:px-0")}>
        {stories.title}
      </h3>
      <div>
        <Splide
          // className="gap-6"
          id="homepage-stories-slider"
          hasTrack={false}
          options={{ rewind: true, type: "loop", autoWidth: true, start: 0 }}
        >
          <SplideTrack className="!pl-3 lg:!pl-6 !overflow-scroll !lg:overflow-hidden">
            {stories.cards.map((story, index) => (
              <SplideSlide className="!mr-3 md:!mr-6" key={index}>
                <HomepageStory story={story} key={index} />
              </SplideSlide>
            ))}
          </SplideTrack>

          <div
            className={clsx(
              "splide__arrows absolute left-0 px-6 top-1/2",
              "-translate-y-1/2 w-screen flex justify-between items-center",
              "hidden lg:flex",
            )}
          >
            <HomepageStoriesControllers />
          </div>
        </Splide>
      </div>
    </div>
  );
};
