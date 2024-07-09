"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export const Carousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  async function getImages() {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/data/banner`, {
        cache: "no-store",
      });
      setImages(res.data.data);
    } catch (error) {
      console.log("Error getting banner images", error);
    } finally {
      setLoading(false);
    }
  }

  const [currentSlider, setCurrentSlider] = useState(0);
  const carouselImages = images;

  const prevSlider = () =>
    setCurrentSlider((currentSlider) =>
      currentSlider === 0 ? carouselImages.length - 1 : currentSlider - 1
    );

  const nextSlider = useCallback(
    () =>
      setCurrentSlider((currentSlider) =>
        currentSlider === carouselImages.length - 1 ? 0 : currentSlider + 1
      ),
    [carouselImages.length]
  );

  useEffect(() => {
    getImages();
    const intervalId = setInterval(() => {
      nextSlider();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [nextSlider]);

  return (
    <>
      <section className=" w-full md:h-[400px] lg:h-[400px] relative overflow-hidden">
        {/* arrow left */}
        <button
          onClick={prevSlider}
          className="absolute top-1/2 left-3 z-10 flex justify-center items-center bg-white rounded-full w-6 h-6 md:w-8 md:h-8"
        >
          <svg
            className="w-4 h-4 md:w-6 md:h-6 icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <path
              fill="#0095FF"
              d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
            ></path>
          </svg>
        </button>
        {/* arrow right */}
        <button
          onClick={nextSlider}
          className="absolute top-1/2 z-10 right-3  flex justify-center items-center bg-white rounded-full w-6 h-6 md:w-8 md:h-8"
        >
          <svg
            className="w-4 h-4 md:w-6 md:h-6 icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            transform="rotate(180)"
          >
            <path
              fill="#0095FF"
              d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
            ></path>
          </svg>
        </button>
        {/* dots */}
        <div className="flex justify-center items-center rounded-full z-50 absolute bottom-4 w-full gap-1">
          {carouselImages.map((_, inx) => (
            <button
              key={inx}
              onClick={() => setCurrentSlider(inx)}
              className={`rounded-full duration-500 bg-primary ${
                currentSlider === inx ? "w-8" : "w-2"
              } h-2`}
            ></button>
          ))}
        </div>
        {/* Carousel container */}
        <div
          className="ease-linear duration-500 flex transform-gpu"
          style={{ transform: `translateX(-${currentSlider * 100}%)` }}
        >
          {/* sliders */}
          {
            carouselImages.map((slide, inx) => (
              <Image
                key={inx}
                src={slide?.image }
                width={1200}
                height={540}
                className="min-w-full lg:h-[400px] bg-black/20 sm:h-96 md:h-[400px] object-center rounded-md"
                alt={`Slider - ${inx + 1}`}
              />
          
          ))}
        </div>
      </section>
    </>
  );
};
