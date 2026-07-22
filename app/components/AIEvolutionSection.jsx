"use client";

import { useRef, useState } from "react";

// Sharp-edged play triangle (no rounded joins, unlike lucide's Play icon)
function PlayIconSharp({ size = 36, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <polygon points="6,4 20,12 6,20" fill="#D60000" />
    </svg>
  );
}

export default function AIEvolutionSection() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    setPlaying(true);

    video.pause();
    video.currentTime = 0;

    video.controls = true;
    video.loop = false;
    video.muted = false; // change to true if you don't want sound

    video.play();
  };

  return (
    <section className="relative h-[460px] w-full overflow-hidden md:h-[650px]">
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/video/cta.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      {!playing && (
        <>
          <div className="absolute inset-0 bg-black/45" />

          {/* ===== MOBILE LAYOUT (hidden on md+) ===== */}
          <div className="absolute inset-0 flex flex-col md:hidden">
            <div className="mt-[38%] px-6 text-white">
              <p className="text-[15px] font-semibold leading-snug">
                Chuck Whitten, Global Head of Bain&rsquo;s digital practices
              </p>
            </div>

            <button
              onClick={handlePlay}
              aria-label="Play video"
              className="mx-auto mt-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/80 transition hover:scale-110"
            >
              <PlayIconSharp size={36} className="ml-1" />
            </button>

            <div className="mt-4 px-6 text-white">
              <h2 className="text-[26px] font-semibold leading-[1.15] tracking-[-0.5px]">
                AI&rsquo;s Evolution: What Good Looks Like Now
              </h2>
            </div>

            <div className="mt-auto px-6 pb-5">
              <button className="w-full border border-white px-4 py-3 text-[11px] font-semibold uppercase leading-snug tracking-wider text-white transition hover:bg-red-800 hover:border-red-800">
                View how we&apos;ve helped top companies win with AI
              </button>
            </div>
          </div>

          {/* ===== DESKTOP LAYOUT (unchanged, hidden below md) ===== */}
          <div className="hidden md:block">
            {/* Text block — aligned to the same max-w-7xl container as the rest of the page,
                anchored to the bottom of the frame */}
            <div className="absolute inset-0 flex items-end pb-16">
              <div className="mx-auto w-full max-w-7xl px-8">
                <div className="max-w-xl text-white">
                  <p className="mb-6 text-xl md:text-[24px] font-semibold leading-snug">
                    Chuck Whitten, Global Head of Bain&rsquo;s digital practices
                  </p>

                  <h2 className="text-[30px] sm:text-[48px] md:text-[58px] font-semibold leading-[1.1] tracking-[-1px] sm:tracking-[-1.5px]">
                    AI&rsquo;s Evolution:
                    <br />
                    What Good Looks
                    <br />
                    Like Now
                  </h2>

                  <button className="group mt-10 border border-white px-8 py-4 text-[13px] font-semibold uppercase tracking-wider transition hover:bg-red-800 hover:text-white hover:border-red-800">
                    View how we&apos;ve helped top companies win with AI
                  </button>
                </div>
              </div>
            </div>

            {/* Play button — centered on the frame */}
            <button
              onClick={handlePlay}
              aria-label="Play video"
              className="absolute left-1/2 top-1/2 flex h-12 w-12 md:h-18 md:w-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 transition hover:scale-110"
            >
              <PlayIconSharp size={34} className="ml-1" />
            </button>
          </div>
        </>
      )}
    </section>
  );
}