"use client";
import clsx from "clsx";
import "@splidejs/splide/css/core";
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { SURCHAUFFE_URBAINE_TIMINGS } from "@/src/components/surchauffe-urbaine/surchauffe-urbaine-timings";
import Image from "next/image";
import React, { useRef, useState } from "react";
// eslint-disable-next-line max-len
import { SurchauffeUrbaineTimingSlideControllers } from "@/src/components/surchauffe-urbaine/surchauffe-urbaine-timing-slide-controllers";
import Link from "next/link";

export const SurchauffeUrbaineTimingComponent = ({ className }: { className?: string }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderRef = useRef<Splide>(null);
  const changeSlide = (id: number) => {
    setCurrentSlide(id);
    sliderRef.current.go(id);
  };
  return (
    <div className={clsx("bg-dsfr-background-alt-blue-france py-10 text-center", className)}>
      <div className="relative mx-auto max-w-[48rem]">
        <Image
          src="/images/surchauffe-urbaine/timing-arrow.svg"
          alt=""
          width={700}
          height={20}
          className="absolute top-5 z-10 md:left-16 md:max-w-[47rem]"
        />

        <ul
          role="tablist"
          className={clsx("flex flex-row items-start justify-between gap-4 md:mr-14")}
          aria-label="Sélectionner une phase"
        >
          {SURCHAUFFE_URBAINE_TIMINGS.map((timing, index) => (
            <li role="presentation" key={timing.code} className="flex h-[11rem] flex-col items-center">
              <button
                type="button"
                role="tab"
                aria-controls={`surchauffe-urbaine-timing-slider-slide0${index + 1}`}
                aria-label={`Afficher la slide sur la phase ${timing.title}`}
                aria-selected={index === 0}
                className={clsx(
                  "pfmv-card z-20 flex cursor-pointer flex-col items-center justify-center !bg-none",
                  index === currentSlide ? "size-[6.25rem] !outline !outline-1 !outline-pfmv-navy" : "size-16",
                  "focus:!outline focus:!outline-1 focus:!outline-pfmv-navy",
                  "transition-all duration-200",
                )}
                onClick={() => changeSlide(index)}
              >
                <Image
                  width={index === currentSlide ? 70 : 40}
                  height={70}
                  src={timing.image}
                  alt={timing.title}
                  className="transition-all duration-200"
                />
              </button>
              <div className="mt-4 max-w-32 font-bold text-pfmv-navy">{timing.title}</div>
            </li>
          ))}
        </ul>
        <Splide
          onMove={(_splide: any, newIndex: number, _prevIndex: number, _destIndex: number) => setCurrentSlide(newIndex)}
          id="surchauffe-urbaine-timing-slider"
          hasTrack={false}
          options={{}}
          ref={sliderRef}
        >
          <SplideTrack className="mt-12 overflow-auto ">
            {SURCHAUFFE_URBAINE_TIMINGS.map((timing) => (
              <SplideSlide className="" key={timing.code}>
                <div className="mx-auto max-w-[43rem] rounded-xl bg-white px-4 py-4 text-left" key={timing.code}>
                  {timing.description}
                </div>
              </SplideSlide>
            ))}
          </SplideTrack>
          <SurchauffeUrbaineTimingSlideControllers />
        </Splide>
        <div>
          Pour aller plus loin sur la surchauffe urbaine
          <Link
            className="ml-2 !text-pfmv-navy after:hidden"
            download
            target="_blank"
            href="https://cdn.plusfraichemaville.fr/Guide_diagnostic_Surchauffe_Urbaine_202406.pdf"
          >
            Télécharger le Guide de l’Ademe
            <i className="ri-download-2-line size-4 before:!mb-1 before:ml-2 before:!size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
