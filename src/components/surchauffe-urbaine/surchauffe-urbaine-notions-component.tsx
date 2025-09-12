"use client";
import clsx from "clsx";
import "@splidejs/splide/css/core";
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { SURCHAUFFE_URBAINE_NOTIONS } from "@/src/components/surchauffe-urbaine/surchauffe-urbaine-notions";
import { trackEvent } from "@/src/helpers/matomo/track-matomo";
import { SURCHAUFFE_URBAINE_CHANGE_NOTION } from "@/src/helpers/matomo/matomo-tags";
import LinkWithoutPrefetch from "@/src/components/common/link-without-prefetch";
import { SplideFrTranslation } from "@/src/components/common/splide-controllers";

export const SurchauffeUrbaineNotionsComponent = ({ className }: { className?: string }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderRef = useRef<Splide>(null);
  const changeSlide = (id: number) => {
    setCurrentSlide(id);
    sliderRef.current.go(id);
  };
  return (
    <div className={clsx("bg-dsfr-background-alt-blue-france py-10", className)}>
      <div className="fr-container flex flex-col gap-10 md:flex-row">
        <nav>
          <ul
            role="tablist"
            className={clsx("mt-24 flex flex-col items-start gap-4")}
            aria-label="Sélectionner une notion clé"
          >
            {SURCHAUFFE_URBAINE_NOTIONS.map((notion, index) => (
              <li role="presentation" key={notion.code} className="">
                <button
                  type="button"
                  role="tab"
                  aria-controls={`surchauffe-urbaine-timing-slider-slide0${index + 1}`}
                  aria-label={`Afficher la slide sur la phase ${notion.title}`}
                  aria-selected={index === 0}
                  className={clsx(
                    "text-nowrap border-0 border-pfmv-navy pl-4 text-lg text-pfmv-navy",
                    index === currentSlide ? "!border-l-4 border-solid font-bold" : "",
                  )}
                  onClick={() => {
                    changeSlide(index);
                    trackEvent(SURCHAUFFE_URBAINE_CHANGE_NOTION(notion.shortTitle));
                  }}
                >
                  <div className="">{notion.shortTitle}</div>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <Splide
          onMove={(_splide: any, newIndex: number, _prevIndex: number, _destIndex: number) => setCurrentSlide(newIndex)}
          id="surchauffe-urbaine-notions-slider"
          hasTrack={false}
          options={{ arrows: false, pagination: false, i18n: SplideFrTranslation }}
          ref={sliderRef}
          className="max-w-[45rem]"
        >
          <SplideTrack className="mb-4 overflow-auto">
            {SURCHAUFFE_URBAINE_NOTIONS.map((notion) => (
              <SplideSlide className="" key={notion.code}>
                <article
                  className={clsx(
                    "m-1 max-w-[43rem] rounded-xl px-8 py-6 text-left",
                    "outline outline-1 outline-dsfr-border-action-low-blue-france",
                  )}
                  key={notion.code}
                >
                  <Image src={notion.image} width={500} height={500} alt="" className="max-h-[15rem] w-full" />
                  <h2 className="mb-2 mt-6 text-[1.375rem] font-bold text-pfmv-navy">{notion.title}</h2>
                  {notion.description}
                </article>
              </SplideSlide>
            ))}
          </SplideTrack>
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
