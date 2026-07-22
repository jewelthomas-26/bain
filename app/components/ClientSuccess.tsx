"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    title:
      "Banca Investis Transforms Customer Dialogue with a Generative AI Engine",
    image: "/ClientSuccess/17238-engineeringco-1x1.webp",
    stats: [
      {
        number: "500+",
        text: "pieces of information and research analyzed daily",
      },
      {
        number: "7",
        text: "months from ideation to launch",
      },
    ],
  },
  {
    title: "Enterprise AI Accelerates Customer Support Across Europe",
    image: "/ClientSuccess/17238-engineeringco-1x1.webp",
    stats: [
      {
        number: "1M+",
        text: "customers supported",
      },
      {
        number: "40%",
        text: "increase in engagement",
      },
    ],
  },
  {
    title: "Digital Banking Platform Powered by Generative AI",
    image: "/ClientSuccess/17238-engineeringco-1x1.webp",
    stats: [
      {
        number: "98%",
        text: "customer satisfaction",
      },
      {
        number: "12",
        text: "countries launched",
      },
    ],
  },
];

function FilledArrowRight({ size = 14, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M4 2L13 8L4 14V2Z" />
    </svg>
  );
}


export default function ClientSuccess() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white py-20 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Content: 2-column grid. The image is placed in the SAME row as the
            text block (heading -> stat cards), so its bottom edge lines up
            with the bottom of the stat cards. "Read story" flows into the
            next grid row, underneath both, on the left. */}
        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-8 lg:min-h-[700px]">


          {/* Row 1, Col 1: heading through stat cards */}
          <div>
            <h1 className="text-4xl md:text-[55px] font-bold text-black mb-6 leading-tight">
              Bold steps forward.
            </h1>

            <p className="text-[19px] font-semibold text-black">
              Featured client success story
            </p>

            <div className="h-[2px] bg-gray-300 my-2" />

            <h2 className="text-2xl md:text-[35px] font-bold text-black leading-tight">
              {slides[active].title}
            </h2>

            <h4 className="mt-7 mb-2 text-[17px] font-semibold text-black">
              The impact
            </h4>

            <div className="flex flex-col sm:flex-row gap-4">
              {slides[active].stats.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-8 w-full sm:w-56 text-black"
                >
                  <h3 className="text-5xl font-normal">{item.number}</h3>
                  <p className="mt-4 text-gray-700 leading-7">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 1, Col 2: image — stretches to match the height of the
              text block above (default grid align-items: stretch), so its
              bottom edge lands exactly on the stat cards' bottom edge. */}
          <div className="relative">
            <div className="absolute bottom-0 left-0 right-0 h-[600px]  ">
              <Image
                key={active}
                src={slides[active].image}
                alt=""
                fill
                priority
                className="object-cover animate-[fade_.5s_ease]"
              />
            </div>
          </div>

          {/* Row 2, Col 1: Read Story (auto-flows under the text block only) */}
          <button className="group inline-flex items-center gap-2 text-red-700 hover:text-red-800 font-semibold mb-25">
            Read story
            <FilledArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-4 mt-5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${active === index
                ? "bg-red-700 scale-130"
                : "bg-gray-400 hover:bg-red-800"
                }`}
            />
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-10">
          <button className="group border border-gray-300 px-8 py-4 uppercase text-[13px] font-semibold transition-all duration-300 hover:bg-red-800 hover:text-white hover:border-red-800">
            <span className="flex items-center gap-2 text-red-700 group-hover:text-white">
              See All Client Results

            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade {
          from {
            opacity: 0;
            transform: scale(1.03);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}