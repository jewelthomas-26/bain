"use client";

import { useState, useEffect, useRef } from "react";
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
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startSlideTimer = () => {
    // 1. Clear any existing timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // 2. Reset progress
    setProgress(0);

    // 3. Start interval to update progress every 50ms
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.01; // 100 steps = 5 seconds
        if (next >= 1) {
          // Stop interval – we’ll let the timeout trigger the slide change
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 1; // keep progress at 100% until timeout fires
        }
        return next;
      });
    }, 50);

    // 4. Schedule the actual slide change after 5 seconds
    timeoutRef.current = setTimeout(() => {
      // Advance to the next slide (circular)
      setActive((prev) => (prev + 1) % slides.length);
      // The useEffect below will restart the whole timer for the new slide
    }, 5000);
  };

  // Restart timer whenever the active tab changes (auto‑advance or manual click)
  useEffect(() => {
    startSlideTimer();
    return () => {
      // Cleanup on unmount or before effect re‑runs
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const handleTabClick = (index: number) => {
    if (index === active) {
      // Clicking the same tab restarts its progress bar
      startSlideTimer();
    } else {
      setActive(index); // useEffect will restart timer with new active
    }
  };

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

      {/* Main Content */}
      <div className="relative z-10 h-full w-full flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
          <div className="max-w-[90%] sm:max-w-lg md:max-w-xl lg:max-w-[600px]">
            <p className="mb-3 sm:mb-5 text-[16px] sm:text-lg font-semibold">
              {slide.category}
            </p>

            <h1
              className="
                text-[37px]
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
                text-[14px]
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
                  text-[35px]
                  sm:text-4xl
                  leading-none
                  mb-2
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
      <div className="absolute bottom-0 left-0 z-20 w-full overflow-hidden mb-10 sm:md-0">
        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8">
          {/* Mobile scrollable tabs */}
          <div className="flex sm:hidden overflow-x-auto gap-x-6 no-scrollbar">
            {slides.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(index)}
                className="relative flex-shrink-0 pb-5 pt-5 text-left"
              >
                {active === index && (
                  <div
                    className="absolute top-0 left-0 h-[4px] bg-red-600 transition-[width] duration-100 ease-linear"
                    style={{ width: `${progress * 100}%` }}
                  />
                )}
                <p
                  className={`
                    text-sm font-semibold whitespace-nowrap hover:text-white transition
                    ${active === index ? "text-white" : "text-gray-300"}
                  `}
                >
                  {item.tab}
                </p>
              </button>
            ))}
          </div>

          {/* Desktop grid – 4 equal columns */}
          <div className="hidden sm:grid grid-cols-4 gap-0">
            {slides.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(index)}
                className="relative pb-10 pt-8 text-left"
              >
                {active === index && (
                  <div
                    className="absolute top-0 left-0 h-[5px] bg-red-600 transition-[width] duration-100 ease-linear"
                    style={{
                      width: `${progress * 110}px`,
                      maxWidth: "110px",
                    }}
                  />
                )}
                <p
                  className={`
                    text-base md:text-lg font-semibold whitespace-nowrap hover:text-white transition
                    ${active === index ? "text-white" : "text-gray-300"}
                  `}
                >
                  {item.tab}
                </p>
              </button>
            ))}
          </div>
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
          sm:mb-13 
          cursor-pointer
        "
      >
        <span className="hidden sm:block text-[14px] text-white/50">
          Scroll
        </span>
        <ChevronDown className="w-8 h-8 block md:hidden text-gray-300" />

        <div
          className="
            flex
            h-8
            w-8
            hidden sm:block
            sm:h-10
            sm:w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/70
          "
        >
          <ChevronDown className="w-4 h-4 sm:w-9 sm:h-9" />
        </div>
      </button>
    </section>
  );
}