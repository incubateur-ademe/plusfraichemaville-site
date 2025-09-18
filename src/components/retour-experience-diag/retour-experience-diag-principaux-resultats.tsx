"use client";

import { ImageWithCaption } from "@/src/lib/strapi/types/components/common/ImageWithCaption";
import CmsRichText from "../common/CmsRichText";
import "@splidejs/splide/css/core";
// @ts-expect-error Check changelog from Splide and remove ts-ignore
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import { ImageLoader } from "../common/image-loader";
import { useState } from "react";
import { SplideController, SplideFrTranslation } from "../common/splide-controllers";
import clsx from "clsx";
import { ZoomedImage } from "../common/zoomed-image";
import Button from "@codegouvfr/react-dsfr/Button";

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
          <Splide
            id="fiche-diagnostic-rex-principaux-resultats-slider"
            hasTrack={false}
            options={{ autoWidth: true, start: 0, pagination: false, i18n: SplideFrTranslation }}
          >
            <SplideTrack className="">
              {images.map((image, index) => (
                <SplideSlide className="size-full" key={index}>
                  <ImageLoader
                    width={384}
                    height={248}
                    className="max-h-60 w-full object-cover"
                    containerClassName="size-full"
                    src={getStrapiImageUrl(image.image, STRAPI_IMAGE_KEY_SIZE.medium)}
                    alt={image.caption ?? "image fiche rex"}
                    unoptimized
                  />
                  <div className="mt-4 text-xs text-dsfr-text-mention-grey">{image.caption}</div>
                  <div className={clsx("absolute right-2 top-2 z-20 ", "")}>
                    <Button
                      className="flex w-10 items-center justify-center  rounded-full bg-black/60"
                      onClick={() => setZoomedImage(image)}
                      aria-label="Agrandir"
                    >
                      <i className="ri-search-line size-5 text-white before:!mb-2 before:!size-5"></i>
                    </Button>
                  </div>
                </SplideSlide>
              ))}
            </SplideTrack>
            <SplideController
              arrow="left"
              className={clsx(
                "!left-2 top-1/3 size-10 !bg-black/60",
                images.length <= 1 && "pointer-events-none !hidden",
              )}
            />
            <SplideController
              arrow="right"
              className={clsx(
                "!right-2 top-1/3 size-10 !bg-black/60",
                images.length <= 1 && "pointer-events-none !hidden",
              )}
            />
          </Splide>
        </div>
      </div>

      <ZoomedImage image={zoomedImage} onClose={() => setZoomedImage(null)} />
    </div>
  );
};
