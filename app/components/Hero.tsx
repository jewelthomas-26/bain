"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const slides = [
  {
    id: 1,
    tab: "Win with AI",
    category: "How to Win with AI",
    title: "Turn Artificial Intelligence into Proprietary Intelligence",
    button: "LEARN 7 DECISIONS THAT DEFINE AI TRANSFORMATION LEADERS",
    image: "/hero/45878-16-9.webp",
  },
  {
    id: 2,
    tab: "M&A Midyear Outlook",
    category: "M&A Report",
    title: "Global M&A Midyear Outlook 2025",
    button: "READ THE FULL REPORT",
    image: "/hero/44457_midyearma2026_1440x810.webp",
  },
  {
    id: 3,
    tab: "Retail",
    category: "Retail",
    title: "How Retail Leaders are Winning the Next Decade",
    button: "DISCOVER RETAIL INSIGHTS",
    image: "/hero/45003-gettyimages-576906712-16-9.jpg",
  },
  {
    id: 4,
    tab: "Bain x Google Cloud",
    category: "Partnership",
    title: "Accelerating Enterprise AI with Google Cloud",
    button: "EXPLORE THE PARTNERSHIP",
    image: "/hero/v1-3_bain-googlecloud_web_homepage_1920x1080.webp",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  const slide = slides[active];

  return (
    <section className="relative h-[95vh] min-h-[650px] overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          priority
          key={slide.id}
          className="object-cover animate-hero-zoom"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* Main Content — uses the SAME max-w-7xl + px container as the bottom
          nav below, so the left edge of the text always lines up with the
          left edge of "Win with AI" no matter the screen width. A percentage
          margin (e.g. ml-[18%]) drifts relative to a fixed container as the
          viewport resizes, which is what was causing the misalignment. */}
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
          <div className="max-w-[90%] sm:max-w-lg md:max-w-xl lg:max-w-[600px]">
            <p className="mb-3 sm:mb-5 text-base sm:text-lg font-semibold">
              {slide.category}
            </p>

            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                lg:text-[58px]
                leading-[1.15]
                font-bold
                tracking-[1.0px]
              "
            >
              {slide.title}
            </h1>

            <button
              key={slide.id}
              className="
                group
                mt-6
                sm:mt-8
                flex
                flex-wrap
                items-center
                gap-3
                sm:gap-5
                text-xs
                sm:text-[13px]
                font-bold
                tracking-wide
                text-left
                animate-slide-left
              "
            >
              <span>{slide.button}</span>

              <span
                className="
                  text-2xl
                  sm:text-4xl
                  leading-none
                  sm:mb-2
                  transition-transform
                  duration-300
                  group-hover:translate-x-2
                "
              >
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 z-20 w-full">
        <div className="relative mx-auto flex max-w-7xl gap-4 overflow-x-auto px-6 sm:px-8 no-scrollbar">
          {slides.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActive(index)}
              className="relative flex-1 min-w-[140px] pb-6 sm:pb-10 pt-6 sm:pt-8 text-left"
            >
              {/* Active horizontal line */}
              {active === index && (
                <div className="absolute top-0 left-0 h-[5px] w-[110px] bg-red-600" />
              )}

              <p
                className={`
                  text-sm
                  sm:text-lg
                  font-semibold
                  whitespace-nowrap
                  hover:text-white
                  transition
                  ${active === index ? "text-white" : "text-gray-300"}
                `}
              >
                {item.tab}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Scroll Button */}
      <button
        onClick={() =>
          document.getElementById("next-section")?.scrollIntoView({
            behavior: "smooth",
          })
        }
        className="
          absolute
          bottom-24
          sm:bottom-6
          right-4
          sm:right-6
          z-30
          hidden
          sm:flex
          flex-col
          items-center
          gap-3
          cursor-pointer
        "
      >
        <span className="text-[14px] text-white/50">Scroll</span>

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/70
          "
        >
          <ChevronDown size={28} />
        </div>
      </button>
    </section>
  );
}