"use client";
import "@splidejs/splide/css/core";
// @ts-expect-error Check changelog from Splide and remove ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Image from "next/image";
import clsx from "clsx";
import Quote from "@codegouvfr/react-dsfr/Quote";
import { SplideFrTranslation } from "@/src/components/common/splide-controllers";

export type HomepageCitation = {
  image: string;
  citation: string;
  auteur: string;
};

const arrowClassName = clsx(
  "splide__arrow absolute top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center md:flex",
  "border border-solid border-white text-white transition-[background] duration-300 hover:!bg-white/10",
);

export const HomepageCitationsSlider = ({ citations }: { citations: HomepageCitation[] }) => {
  return (
    <Splide
      hasTrack={false}
      aria-label="Citations de collectivités utilisatrices de Plus fraîche ma ville"
      options={{
        rewind: true,
        gap: "2rem",
        i18n: {
          ...SplideFrTranslation,
          prev: "Citation précédente",
          next: "Citation suivante",
          slideX: "Aller à la citation n° %s",
          slide: "citation",
        },
        classes: {
          pagination: "splide__pagination !mt-12 gap-2 !p-0",
          page: clsx(
            "splide__pagination__page block size-2.5 rounded-full bg-white/50",
            "transition-[background] duration-300 hover:bg-white/80 [&.is-active]:bg-white",
          ),
        },
      }}
      className="mt-12"
    >
      <SplideTrack className="md:mx-20 lg:mx-auto lg:max-w-[64rem]">
        {citations.map((citation, index) => (
          <SplideSlide key={index}>
            <div className="flex h-full flex-col items-center gap-8 bg-white p-6 md:flex-row md:p-10">
              <Image
                src={citation.image}
                width={184}
                height={184}
                alt=""
                className="size-32 shrink-0 rounded-full object-cover md:size-48"
              />
              <Quote
                text={citation.citation}
                author={citation.auteur}
                size="medium"
                className="!mb-0 !py-0 before:!hidden"
                classes={{ text: "!mb-4", author: "fr-text--sm !mb-0" }}
              />
            </div>
          </SplideSlide>
        ))}
      </SplideTrack>
      <div className="splide__arrows">
        <button className={clsx(arrowClassName, "splide__arrow--prev left-0")}>
          <i className="fr-icon-arrow-left-line" aria-hidden="true" />
        </button>
        <button className={clsx(arrowClassName, "splide__arrow--next right-0")}>
          <i className="fr-icon-arrow-right-line" aria-hidden="true" />
        </button>
      </div>
    </Splide>
  );
};
