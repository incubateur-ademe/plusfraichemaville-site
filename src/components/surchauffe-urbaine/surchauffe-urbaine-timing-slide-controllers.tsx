"use client";

import clsx from "clsx";

export const SurchauffeUrbaineTimingSlideControllers = () => {
  return (
    <>
      <button
        className={clsx(
          "splide__arrows group flex items-center justify-center rounded-full bg-dsfr-border-action-low-blue-france",
          "absolute -top-0 size-10 -translate-y-1/2",
          "cursor-pointer transition-[background] duration-300 hover:!bg-pfmv-navy ",
          "disabled:hidden",
          "hidden md:flex",
          "splide__arrow splide__arrow--prev -left-12 rotate-180",
        )}
      >
        <i
          className={clsx("ri-arrow-right-line text-pfmv-navy group-hover:text-white", "transition-all duration-300")}
        ></i>
      </button>

      <button
        className={clsx(
          "splide__arrows group flex items-center justify-center rounded-full bg-dsfr-border-action-low-blue-france",
          "absolute -top-0 size-10 -translate-y-1/2",
          "cursor-pointer transition-[background] duration-300 hover:!bg-pfmv-navy ",
          "disabled:hidden",
          "hidden md:flex",
          "splide__arrow splide__arrow--next -right-12",
        )}
      >
        <i
          className={clsx("ri-arrow-right-line text-pfmv-navy group-hover:text-white", "transition-all duration-300")}
        ></i>
      </button>
    </>
  );
};
