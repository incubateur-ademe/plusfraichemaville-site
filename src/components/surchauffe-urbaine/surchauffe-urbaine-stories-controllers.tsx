"use client";

import { SplideController } from "../common/splide-controllers";

export const SurchauffeUrbaineStoriesControllers = () => {
  return (
    <>
      <SplideController
        arrow="left"
        size={{ width: "w-14", height: "h-14" }}
        position={{ top: "top-1/2", left: "left-0" }}
      />
      <SplideController
        arrow="right"
        size={{ width: "w-14", height: "h-14" }}
        position={{ top: "top-1/2", right: "right-6" }}
      />
    </>
  );
};
