"use client";

const industries = [
  "Retail",
  "Private Equity",
  "Advanced Manufacturing & Services",
  "Technology",
  "Oil & Gas",
  "Healthcare & Life Sciences",
  "Chemicals",
  "Consumer Products",
  "Mining",
  "Financial Services",
];

export default function ChampionSection() {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div
        className="
        mx-auto
        grid
        max-w-7xl
        grid-cols-1
        items-center
        gap-8
        px-6
        lg:grid-cols-[42%_58%]
        lg:gap-14
        lg:px-8
        "
      >
        {/* Image */}
        <div className="order-2 w-full lg:order-1">
          <img
            src="/champion/champion.jpg"
            alt="Champion"
            className="
            aspect-square
            w-full
            object-cover
            "
          />
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <h2
            className="
            max-w-xl
            text-[28px]
            font-semibold
            leading-[1.2]
            tracking-tight
            text-black
            sm:text-[34px]
            lg:text-[45px]
            lg:leading-[1.15]
            "
          >
            We champion the bold to
            <br />
            achieve the extraordinary.
          </h2>

          <p
            className="
            mt-4
            max-w-lg
            text-[16px]
            leading-relaxed
            text-gray-600
            sm:mt-6
            sm:text-[20px]
            "
          >
            Answer two questions and put our thinking to work on your
            challenges.
          </p>

          {/* Image sits here on mobile via order-2 above; question follows */}
          <div className="mt-6 flex items-baseline gap-2 sm:mt-8">
            <p className="text-[16px] font-semibold text-black sm:text-[18px]">
              1. What is your industry?
            </p>
            <span className="text-[13px] text-gray-500 sm:text-[14px]">
              Question 1 of 2
            </span>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex flex-wrap gap-2.5 sm:mt-5 sm:gap-3">
            {industries.map((item) => (
              <button
                key={item}
                className="
                rounded-full
                border
                border-gray-300
                px-4
                py-2
                text-[14px]
                font-semibold
                text-red-700
                transition-all
                duration-300
                hover:border-red-700
                hover:bg-red-700
                hover:text-white
                sm:px-5
                sm:py-2.5
                sm:text-[16px]
                "
              >
                {item}
              </button>
            ))}
          </div>

          {/* View All */}
          <button className="group mt-4 block text-[14px] text-gray-600 transition sm:mt-5 sm:text-[16px]">
            <span
              className="
    underline
    decoration-gray-400
    underline-offset-1
    transition-all
    group-hover:decoration-red-600
    group-hover:text-red-600
    "
            >
              View all
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}