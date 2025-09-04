"use client";

import clsx from "clsx";

export const SplideFrTranslation = {
  prev: "Carte précédente",
  next: "Carte suivante",
  first: "Aller à la première carte",
  last: "Aller à la dernière carte",
  slideX: "Aller à la carte n° %s",
  pageX: "Aller à la page %s",
  carousel: "carousel",
  slide: "carte",
  slideLabel: "%s sur %s",
};

interface SplideControllerProps {
  arrow: "right" | "left";
  className?: string;
}

export const SplideController = ({ arrow, className }: SplideControllerProps) => {
  return (
    <button
      className={clsx(
        "splide__arrows group flex items-center justify-center rounded-full bg-black",
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
