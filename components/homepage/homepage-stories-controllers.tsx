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
        "group splide__arrows w-14 h-14 flex justify-center items-center rounded-full bg-black",
        arrow === "left" ? "splide__arrow splide__arrow--prev" : "splide__arrow splide__arrow--next",
        "cursor-pointer hover:bg-white hover:text-black transition-[background] duration-300",
        "absolute top-1/2 hidden lg:block -translate-y-1/2 ",
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