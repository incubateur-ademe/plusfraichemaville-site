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

type FicheDiagnosticRexPrincipauxResultatsType = {
  content: string;
  images: ImageWithCaption[];
};

export const FicheDiagnosticRexPrincipauxResultats = ({
  content,
  images,
}: FicheDiagnosticRexPrincipauxResultatsType) => {
  const [zoomedImage, setZoomedImage] = useState<ImageWithCaption | null>(null);

  return (
    <div className="mb-20">
      <h2 className="mb-4 text-2xl">Principaux résultats</h2>
      <div className="flex gap-12">
        <CmsRichText label={content} />
        <div className="relative w-96 shrink-0">
          <div className="absolute right-2 top-2 z-20 flex size-8 items-center justify-center rounded-full bg-black/60">
            <i className="ri-search-line size-5 text-white before:!mb-2 before:!size-5"></i>
          </div>
          <Splide
            id="fiche-diagnostic-rex-principaux-resultats-slider"
            hasTrack={false}
            options={{ rewind: true, type: "loop", autoWidth: true, start: 0 }}
          >
            <SplideTrack className="h-64 overflow-auto lg:!overflow-hidden">
              {images.map((image, index) => (
                <SplideSlide className="size-full" key={index}>
                  <ImageLoader
                    width={384}
                    height={248}
                    className="size-full cursor-pointer object-cover"
                    containerClassName="size-full"
                    src={getStrapiImageUrl(image.image, STRAPI_IMAGE_KEY_SIZE.medium)}
                    alt={image.caption ?? "image fiche rex"}
                    onClick={() => setZoomedImage(image)}
                  />
                </SplideSlide>
              ))}
            </SplideTrack>
            <SplideController
              arrow="left"
              size={{ width: "w-10", height: "h-10" }}
              position={{ top: "top-1/2", left: "!left-2" }}
              className={`!bg-black/60 ${images.length <= 1 ? "pointer-events-none !hidden" : ""}`}
            />
            <SplideController
              arrow="right"
              size={{ width: "w-10", height: "h-10" }}
              position={{ top: "top-1/2", right: "!right-2" }}
              className={`!bg-black/60 ${images.length <= 1 ? "pointer-events-none !hidden" : ""}`}
            />
          </Splide>
        </div>
      </div>

      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <button
              className="hover-transparent absolute -top-10 right-0 text-white"
              onClick={() => setZoomedImage(null)}
            >
              Fermer
            </button>
            <ImageLoader
              width={1200}
              height={800}
              className="h-[60vh] w-[90vh] object-contain"
              src={getStrapiImageUrl(zoomedImage.image, STRAPI_IMAGE_KEY_SIZE.large)}
              alt={zoomedImage.caption ?? "image fiche rex"}
            />
            {zoomedImage.caption && <p className="mt-2 text-center text-white">{zoomedImage.caption}</p>}
          </div>
        </div>
      )}
    </div>
  );
};
