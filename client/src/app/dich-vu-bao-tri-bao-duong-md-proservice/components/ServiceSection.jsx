"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SERVICES, SLIDES } from "./data";

export default function ServiceSection() {
  const [active, setActive] = useState(0);

  const sliderRef = useRef(null);

  const goToSlide = (index) => {
    const next = (index + SLIDES.length) % SLIDES.length;

    setActive(next);

    sliderRef.current?.scrollTo({
      left: sliderRef.current.clientWidth * next,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    goToSlide(active - 1);
  };

  const handleNext = () => {
    goToSlide(active + 1);
  };

  // sync active when user scroll manually
  const handleScroll = () => {
    if (!sliderRef.current) return;

    const scrollLeft = sliderRef.current.scrollLeft;

    const width = sliderRef.current.clientWidth;

    const index = Math.round(scrollLeft / width);

    setActive(index);
  };

  // preload next image only
  useEffect(() => {
    const nextIndex = (active + 1) % SLIDES.length;

    const img = new window.Image();
    img.src = SLIDES[nextIndex];
  }, [active]);

  return (
    <section
      id="service-section"
      className="
        w-full
        max-w-[1200px]
        mx-auto

        pt-12
        pb-20
        px-4 md:px-6

        font-['SVN-Avenir_Next',sans-serif]

        flex flex-col gap-6
      "
    >
      {/* ─── SLIDER ───────────────── */}
      <div
        className="
          relative
          group

          rounded-[28px]
          overflow-hidden
        "
      >
        {/* scroll slider */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="
            flex
            overflow-x-auto
            snap-x snap-mandatory
            scroll-smooth

            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className="
                relative
                shrink-0
                w-full

                h-[260px]
                sm:h-[420px]
                md:h-[620px]

                snap-center
              "
            >
              <Image
                src={slide}
                alt={`Minh Dental Service ${i + 1}`}
                fill
                loading="lazy"
                sizes="
                  (max-width:768px) 100vw,
                  1200px
                "
                className="
                  object-cover
                  object-center
                "
              />

              {/* overlay */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-tr
                  from-[#B71C1C]/20
                  to-transparent
                "
              />
            </div>
          ))}
        </div>

        {/* PREV */}
        <button
          onClick={handlePrev}
          className="
            absolute
            left-4 top-1/2
            -translate-y-1/2
            z-20

            w-12 h-12
            rounded-full

            bg-white/90
            backdrop-blur-md

            border border-white/60
            shadow-[0_10px_30px_rgba(0,0,0,0.12)]
            hidden
            sm:flex items-center justify-center

            opacity-100 md:opacity-0
            md:group-hover:opacity-100

            transition-all duration-300
          "
        >
          <ChevronLeft size={22} className="text-[#1A1A1A]" />
        </button>

        {/* NEXT */}
        <button
          onClick={handleNext}
          className="
            absolute
            right-4 top-1/2
            -translate-y-1/2
            z-20

            w-12 h-12
            rounded-full

            bg-white/90
            backdrop-blur-md

            border border-white/60
            shadow-[0_10px_30px_rgba(0,0,0,0.12)]
            hidden
            sm:flex items-center justify-center

            opacity-100 md:opacity-0
            md:group-hover:opacity-100

            transition-all duration-300
          "
        >
          <ChevronRight size={22} className="text-[#1A1A1A]" />
        </button>

        {/* dots */}
        <div
          className="
            absolute
            bottom-5
            left-1/2
            -translate-x-1/2

            flex items-center gap-2
            z-20
          "
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`
                rounded-full
                transition-all duration-300

                ${active === i ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/50"}
              `}
            />
          ))}
        </div>
      </div>

      {/* ─── HEADER ───────────────── */}
      <div className="flex flex-col gap-4 max-w-[700px]">
        <h2
          className="
            text-[32px]
            md:text-[48px]

            font-bold
            leading-tight
            text-[#1A1A1A]
          "
        >
          Hệ sinh thái <span className="text-[#B71C1C]">Minh Dental</span>
        </h2>

        <p
          className="
            text-[#455A64]
            text-[15px]
            md:text-[17px]
            leading-relaxed
          "
        >
          Chúng tôi cung cấp giải pháp toàn diện giúp phòng khám của bạn vận
          hành trơn tru và chuyên nghiệp nhất.
        </p>
      </div>

      {/* ─── LIST SERVICES ───────────────── */}
      <div className="flex flex-col divide-y divide-gray-100">
        {SERVICES.map((s) => (
          <div
            key={s.id}
            className="
              group
              py-6

              flex flex-col gap-4

              hover:bg-gray-50/50
              transition

              px-2
              rounded-lg
            "
          >
            <div className="flex gap-4 items-start">
              <span
                className="
                  text-[#B71C1C]
                  font-bold
                  text-lg

                  opacity-60
                  group-hover:opacity-100
                "
              >
                {s.id}
              </span>

              <div>
                <h4
                  className="
                    font-bold
                    text-[16px]
                    md:text-[18px]
                    text-[#1A1A1A]

                    group-hover:text-[#B71C1C]
                    transition
                  "
                >
                  {s.title}
                </h4>

                <p
                  className="
                    text-[14px]
                    text-[#455A64]
                    mt-1
                  "
                >
                  {s.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── CTA ───────────────── */}
      <div>
        <a
          href="#video"
          className="
            inline-flex
            items-center gap-3

            font-bold
            text-[#B71C1C]

            hover:gap-5
            transition-all
          "
        >
          Quy trình 18 bước bảo trì thiết bị
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
