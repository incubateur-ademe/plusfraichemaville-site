"use client";

import clsx from "clsx";

export const HomepageStoriesControllers = () => {
  return (
    <>
      <HomepageStoriesController arrow="left" />
      <HomepageStoriesController arrow="right" />
    </>
  );
};

export const HomepageStoriesController = ({ arrow }: { arrow: "right" | "left" }) => {
  return (
    <button
      className={clsx(
        "splide__arrows group flex h-14 w-14 items-center justify-center rounded-full bg-black",
        arrow === "left" ? "splide__arrow splide__arrow--prev" : "splide__arrow splide__arrow--next",
        "cursor-pointer transition-[background] duration-300 hover:bg-white hover:text-black",
        "absolute top-1/2 hidden -translate-y-1/2 lg:block ",
        arrow === "left" && "rotate-180",
        { [`${arrow}-6`]: arrow },
      )}
    >
      <i
        className={clsx(`ri-arrow-right-line text-white group-hover:text-black`, arrow === "left" && "rotate-180")}
      ></i>
    </button>
  );
};
