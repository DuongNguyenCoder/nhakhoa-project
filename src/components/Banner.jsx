import React, { useEffect, useRef, useState } from "react";
import { ImgsBanner } from "@/data/ImgsBanner";

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const goToSlide = (direction) => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + direction + ImgsBanner.length) % ImgsBanner.length
    );
  };

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      goToSlide(1);
    }, 2500);
    return () => clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    const offset = currentIndex * 100;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${offset}%)`;
    }
  }, [currentIndex]);

  return (
    <div 
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative w-full overflow-hidden md:h-64 lg:h-[394px]"
    >
      <div
        ref={trackRef}
        className="flex transition-transform duration-500 ease-in-out"
      >
        {ImgsBanner.map((item, index) => (
          <img
            key={index}
            src={item.image}
            className="w-full flex-shrink-0 object-cover"
            alt={`Banner ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={() => goToSlide(-1)}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white bg-opacity-50 px-2 py-1 rounded-full shadow hover:bg-opacity-80"
      >
        ‹
      </button>
      <button
        onClick={() => goToSlide(1)}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white bg-opacity-50 px-2 py-1 rounded-full shadow hover:bg-opacity-80"
      >
        ›
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {ImgsBanner.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 w-2 rounded-full ${
              idx === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}


