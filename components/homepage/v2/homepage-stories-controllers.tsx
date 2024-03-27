"use client";

import clsx from "clsx";
import { useState } from "react";

export const HomepageStoriesControllers = ({ totalCards }: { totalCards: number }) => {
  const [offset, setOffset] = useState(0);
  const sliderWidth = 382;
  const maxOffset = -(totalCards - 1) * sliderWidth;

  const handleMove = (direction: "left" | "right") => {
    let newOffset = offset + (direction === "left" ? sliderWidth : -sliderWidth);
    newOffset = Math.min(Math.max(newOffset, maxOffset), 0);

    if (newOffset !== offset) {
      setOffset(newOffset);
      const slider = document.querySelector<HTMLDivElement>("#homepage-stories-slider");
      if (slider) {
        slider.style.transform = `translate3d(${newOffset}px, 0, 0)`;
        slider.style.transition = "transform 0.5s ease-in-out";
      }
    }
  };

  return (
    <div className="absolute left-0 px-6 top-1/2 translate-y-1/2 w-screen flex justify-between items-center">
      <HomepageStoriesController arrow="left" onMove={handleMove} />
      <HomepageStoriesController arrow="right" onMove={handleMove} />
    </div>
  );
};

export const HomepageStoriesController = ({
  arrow,
  onMove,
}: {
  arrow: "right" | "left";
  onMove: (_direction: "left" | "right") => void;
}) => {
  return (
    <div
      onClick={() => onMove(arrow)} // Appelle handleClick lorsque l'élément est cliqué
      className={clsx(
        "group w-14 h-14 flex justify-center items-center rounded-full bg-black",
        "cursor-pointer hover:bg-white hover:text-black transition-[background] duration-300",
      )}
    >
      <i className={clsx(`ri-arrow-${arrow}-line text-white group-hover:text-black`)}></i>
    </div>
  );
};
