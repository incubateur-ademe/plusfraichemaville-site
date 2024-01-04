"use client";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

const images = [
  { original: "/images/homepage/carrousel1.jpg", originalAlt: "Image de rafraichissement urbain" },
  { original: "/images/homepage/carrousel1.jpg", originalAlt: "Image de rafraichissement urbain" },
  { original: "/images/homepage/carrousel1.jpg", originalAlt: "Image de rafraichissement urbain" },
];

export const HomeImageSlider = () => {
  return (
    <ImageGallery
      items={images}
      showFullscreenButton={false}
      showThumbnails={false}
      showBullets={true}
      autoPlay={true}
      showPlayButton={false}
      showNav={false}
      slideDuration={900}
      slideInterval={5000}
    />
  );
};
