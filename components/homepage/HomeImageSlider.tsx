"use client";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const slideImages = [
  {
    url: "/images/homepage/carrousel1.jpg",
    caption: "Slide 1",
  },
  {
    url: "/images/homepage/carrousel1.jpg",
    caption: "Slide 2",
  },
  {
    url: "/images/homepage/carrousel1.jpg",
    caption: "Slide 3",
  },
];

export const HomeImageSlider = () => {
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div style={{'backgroundImage': `url(${slideImage.url})` }} className="flex justify-center items-center bg-cover h-96">
            </div>
          </div>
        ))}
      </Slide>
    </div>)
}