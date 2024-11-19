"use client";

import Image, { ImageProps } from "next/image";
import { clsx } from "clsx";

interface ImageLoaderProps extends ImageProps {
  containerClassName?: string;
}

export const ImageLoader = ({ containerClassName, className, ...props }: ImageLoaderProps) => {
  return (
    <div className={clsx("bg-dsfr-background-alt-grey", containerClassName)}>
      <Image
        {...props}
        className={clsx("w-full object-cover opacity-0 transition-opacity duration-200", className)}
        onLoad={(event) => {
          const img = event.target as HTMLImageElement;
          img.classList.remove("opacity-0");
          img.classList.add("opacity-100");
          props.onLoad?.(event);
        }}
        alt={props.alt || ""}
      />
    </div>
  );
};
