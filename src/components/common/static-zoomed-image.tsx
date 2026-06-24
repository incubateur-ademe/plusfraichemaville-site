"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type StaticZoomedImageProps = {
  src: string;
  alt: string;
  caption?: string;
  imageSize: { thumbWidth: number; thumbHeight: number; largeWidth: number; largeHeight: number };
};

export const StaticZoomedImage = ({ src, alt, caption, imageSize }: StaticZoomedImageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button className="cursor-zoom-in text-left" onClick={() => setIsOpen(true)}>
        <Image
          src={src}
          alt={alt}
          width={imageSize.thumbWidth}
          height={imageSize.thumbHeight}
          className="rounded-lg object-contain"
          unoptimized
        />
        {caption && <p className="mt-1 text-center text-sm">{caption}</p>}
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-[2000] flex flex-col bg-black/70 p-4"
          onClick={(e) => {
            setIsOpen(false);
            e.stopPropagation();
          }}
        >
          <button className="hover-transparent mb-2 self-end text-white" onClick={() => setIsOpen(false)}>
            Fermer
          </button>
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <Image
              width={imageSize.largeWidth}
              height={imageSize.largeHeight}
              className="max-h-full max-w-full !object-contain"
              src={src}
              alt={alt}
              unoptimized
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {caption && <p className="mt-2 text-center text-white">{caption}</p>}
        </div>
      )}
    </>
  );
};
