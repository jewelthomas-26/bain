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
    <section className="relative w-full h-[95vh] min-h-[650px] overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
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
      <div className="relative z-10 h-full w-full flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
          <div className="max-w-[90%] sm:max-w-lg md:max-w-xl lg:max-w-[600px]">
            <p className="mb-3 sm:mb-5 text-sm sm:text-lg font-semibold">
              {slide.category}
            </p>

            <h1
              className="
                text-2xl
                sm:text-4xl
                md:text-5xl
                lg:text-[58px]
                leading-[1.2]
                sm:leading-[1.15]
                font-bold
                tracking-[1.0px]
              "
            >
              {slide.title}
            </h1>

            {/*
              MOBILE: button is left as a normal (non-flex) inline flow, so the
              long CTA text wraps like a paragraph and the arrow, being an
              inline-block element right after it in the markup, simply
              flows onto the end of the last wrapped line — exactly like the
              reference screenshot.

              DESKTOP (sm and up): switches back to the original flex layout
              (flex + flex-wrap + items-center + gap-5) so nothing changes
              there — text and arrow sit side by side with a fixed gap.
            */}
            <button
              key={slide.id}
              className="
                group
                mt-5
                sm:mt-8
                sm:flex
                sm:flex-wrap
                sm:items-center
                sm:gap-5
                text-[11px]
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
                  inline-block
                  ml-2
                  sm:ml-0
                  align-middle
                  text-xl
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
      <div className="absolute bottom-0 left-0 z-20 w-full overflow-hidden">
        <div className="relative mx-auto flex w-full max-w-7xl gap-3 sm:gap-4 overflow-x-auto px-6 sm:px-8 no-scrollbar">
          {slides.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActive(index)}
              className="relative flex-shrink-0 sm:flex-1 min-w-[110px] sm:min-w-[140px] pb-5 sm:pb-10 pt-5 sm:pt-8 text-left"
            >
              {/* Active horizontal line */}
              {active === index && (
                <div className="absolute top-0 left-0 h-[4px] sm:h-[5px] w-[80px] sm:w-[110px] bg-red-600" />
              )}

              <p
                className={`
                  text-xs
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

      {/*
        Scroll Button — previously "hidden sm:flex" (fully hidden on mobile).
        Now shown on mobile too: centered horizontally, smaller circle, no
        "Scroll" label (label only appears from sm: up). Desktop keeps its
        original bottom-right position, gap, label, and icon size untouched.
      */}
      <button
        onClick={() =>
          document.getElementById("next-section")?.scrollIntoView({
            behavior: "smooth",
          })
        }
        className="
          absolute
          bottom-3
          left-1/2
          -translate-x-1/2
          sm:bottom-6
          sm:left-auto
          sm:right-6
          sm:translate-x-0
          z-30
          flex
          flex-col
          items-center
          gap-2
          sm:gap-3
          cursor-pointer
        "
      >
        <span className="hidden sm:block text-[14px] text-white/50">
          Scroll
        </span>

        <div
          className="
            flex
            h-8
            w-8
            sm:h-10
            sm:w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/70
          "
        >
          <ChevronDown className="w-4 h-4 sm:w-7 sm:h-7" />
        </div>
      </button>
    </section>
  );
}