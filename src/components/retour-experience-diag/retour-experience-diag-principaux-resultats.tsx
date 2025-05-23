"use client";

import { ImageWithCaption } from "@/src/lib/strapi/types/components/common/ImageWithCaption";
import CmsRichText from "../common/CmsRichText";
import "@splidejs/splide/css/core";
// TODO: Check changelog from Splide and remove ts-ignore
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { ImageLoader } from "../common/image-loader";
import { useState } from "react";
import { SplideController } from "../common/splide-controllers";
import clsx from "clsx";
import { ZoomedImage } from "../common/zoomed-image";

type RetourExperienceDiagPrincipauxResultatsType = {
  content: string;
  images: ImageWithCaption[];
};

export const RetourExperienceDiagPrincipauxResultats = ({
  content,
  images,
}: RetourExperienceDiagPrincipauxResultatsType) => {
  const [zoomedImage, setZoomedImage] = useState<ImageWithCaption | null>(null);

  if (!content) {
    return null;
  }

  return (
    <div className="mb-20">
      <h2 className="mb-4">Principaux résultats</h2>
      <div className="flex flex-col gap-12 md:flex-row">
        <CmsRichText label={content} />
        <div className="relative w-96 shrink-0">
          <div
            className={clsx(
              "absolute right-2 top-2 z-20 flex size-8 cursor-pointer items-center justify-center rounded-full",
              "pointer-events-none bg-black/60",
            )}
          >
            <i className="ri-search-line size-5 text-white before:!mb-2 before:!size-5"></i>
          </div>
          <Splide
            id="fiche-diagnostic-rex-principaux-resultats-slider"
            hasTrack={false}
            options={{ autoWidth: true, start: 0 }}
          >
            <SplideTrack className="">
              {images.map((image, index) => (
                <SplideSlide className="size-full" key={index}>
                  <ImageLoader
                    width={384}
                    height={248}
                    className="max-h-60 w-full cursor-pointer object-cover"
                    containerClassName="size-full"
                    src={getStrapiImageUrl(image.image, STRAPI_IMAGE_KEY_SIZE.medium)}
                    alt={image.caption ?? "image fiche rex"}
                    onClick={() => setZoomedImage(image)}
                    unoptimized
                  />
                  <div className="mt-4 text-xs text-dsfr-text-mention-grey">{image.caption}</div>
                </SplideSlide>
              ))}
            </SplideTrack>
            <SplideController
              arrow="left"
              size={{ width: "w-10", height: "h-10" }}
              position={{ top: "top-1/3", left: "!left-2" }}
              className={`!bg-black/60 ${images.length <= 1 ? "pointer-events-none !hidden" : ""}`}
            />
            <SplideController
              arrow="right"
              size={{ width: "w-10", height: "h-10" }}
              position={{ top: "top-1/3", right: "!right-2" }}
              className={`!bg-black/60 ${images.length <= 1 ? "pointer-events-none !hidden" : ""}`}
            />
          </Splide>
        </div>
      </div>

      <ZoomedImage image={zoomedImage} onClose={() => setZoomedImage(null)} />
    </div>
  );
};
