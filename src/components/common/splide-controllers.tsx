"use client";

import clsx from "clsx";

interface SplideControllerProps {
  arrow: "right" | "left";
  size?: {
    width: string;
    height: string;
  };
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  className?: string;
}

export const SplideController = ({
  arrow,
  size = { width: "h-14", height: "w-14" },
  position = { top: "top-1/2" },
  className,
}: SplideControllerProps) => {
  return (
    <button
      className={clsx(
        "splide__arrows group flex items-center justify-center rounded-full bg-black",
        size.width,
        size.height,
        position.top,
        position.bottom,
        position.left,
        position.right,
        arrow === "left" ? "splide__arrow splide__arrow--prev" : "splide__arrow splide__arrow--next",
        arrow === "left" && "rotate-180",
        "cursor-pointer transition-[background] duration-300 hover:bg-white hover:text-black",
        "absolute hidden -translate-y-1/2 lg:block",
        { [`${arrow}-6`]: arrow },
        "disabled:opacity-20",
        className,
      )}
    >
      <i className={clsx(`ri-arrow-right-line text-white group-hover:text-black`)}></i>
    </button>
  );
};
