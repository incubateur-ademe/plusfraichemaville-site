import sharp from "sharp";
import { Media } from "@/src/lib/strapi/types/common/Media";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";

// Shared by every slide module that swaps a placeholder picture for a Strapi image (materiau
// or fiche solution rows on the materiaux and estimation recap slides): downloads and
// normalizes an image to PNG, the only bitmap format the pptx media registry is guaranteed to
// map to a valid OOXML content type (Strapi may serve jpg/png/webp).

export const getImagePngFilename = (imageKey: string) => `${imageKey}.png`;

export const loadImagePngBuffer = async (image: Media) => {
  const imageUrl = getStrapiImageUrl(image, STRAPI_IMAGE_KEY_SIZE.small);
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image ${imageUrl} (${response.status})`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return sharp(Buffer.from(arrayBuffer)).png().toBuffer();
};
