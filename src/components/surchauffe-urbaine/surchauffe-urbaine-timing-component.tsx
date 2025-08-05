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
import { SURCHAUFFE_URBAINE_CHANGE_TIMING } from "@/src/helpers/matomo/matomo-tags";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";

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
                  "transition-all duration-300",
                )}
                onClick={() => changeSlide(index)}
              >
                <Image
                  width={index === currentSlide ? 70 : 40}
                  height={70}
                  src={timing.image}
                  alt={timing.title}
                  className="transition-all duration-300"
                />
              </button>
              <div className="mt-4 max-w-32 font-bold text-pfmv-navy">{timing.title}</div>
            </li>
          ))}
        </ul>
        <Splide
          onMove={(_splide: any, newIndex: number, _prevIndex: number, _destIndex: number) => {
            setCurrentSlide(newIndex);
            trackEvent(SURCHAUFFE_URBAINE_CHANGE_TIMING(newIndex));
          }}
          id="surchauffe-urbaine-timing-slider"
          hasTrack={false}
          options={{ pagination: false }}
          ref={sliderRef}
        >
          <SplideTrack className="overflow-auto ">
            {SURCHAUFFE_URBAINE_TIMINGS.map((timing) => (
              <SplideSlide className="pt-8" key={timing.code}>
                <div
                  className="relative mx-auto max-w-[45rem] rounded-xl bg-white px-4 py-4 text-left"
                  key={timing.code}
                >
                  <div
                    className={clsx(
                      "absolute top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 transform bg-white",
                      timing.arrowClassname,
                    )}
                  />
                  {timing.description}
                </div>
              </SplideSlide>
            ))}
          </SplideTrack>
          <SurchauffeUrbaineTimingSlideControllers />
        </Splide>
      </div>
      <div className="fr-container text-center">
        Pour aller plus loin sur la surchauffe urbaine
        <LinkWithoutPrefetch
          className="ml-2 !text-pfmv-navy after:hidden"
          download
          target="_blank"
          href="https://cdn.plusfraichemaville.fr/Guide_diagnostic_Surchauffe_Urbaine_202406.pdf"
        >
          Télécharger le recueil de l’Ademe « Diagnostic de la surchauffe urbaine »
          <i className="ri-download-2-line size-4 before:!mb-1 before:ml-2 before:!size-4" />
        </LinkWithoutPrefetch>
      </div>
    </div>
  );
};
