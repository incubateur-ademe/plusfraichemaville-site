import { ImageWithCaption } from "@/src/lib/strapi/types/components/common/ImageWithCaption";
import { getStrapiImageUrl, STRAPI_IMAGE_KEY_SIZE } from "@/src/lib/strapi/strapiClient";
import Image from "next/image";

type ZoomedImageProps = {
  image: ImageWithCaption | null;
  onClose: () => void;
};

export const ZoomedImage = ({ image, onClose }: ZoomedImageProps) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
        <button className="hover-transparent absolute -top-10 right-0 text-white" onClick={onClose}>
          Fermer
        </button>
        <Image
          width={1200}
          height={800}
          className="mx-auto h-[60vh] w-[90vh] !object-contain"
          src={getStrapiImageUrl(image.image, STRAPI_IMAGE_KEY_SIZE.large)}
          alt={image.caption ?? "image fiche rex"}
          unoptimized
        />
        {image.caption && <p className="mt-2 text-center text-white">{image.caption}</p>}
      </div>
    </div>
  );
};
