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
    <section className="bg-white py-20">
      <div
        className="
        mx-auto
        grid
        max-w-7xl
        grid-cols-1
        items-center
        gap-10
        px-6
        lg:grid-cols-[42%_58%]
        lg:gap-14
        lg:px-8
        "
      >
        {/* Image */}
        <div className="w-full">
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
        <div>
          <h2
            className="
            max-w-xl
            text-[34px]
            font-semibold
            leading-[1.15]
            tracking-tight
            text-black
            lg:text-[45px]
            "
          >
            We champion the bold to
            <br />
            achieve the extraordinary.
          </h2>

          <p
            className="
            mt-6
            max-w-lg
            text-[20px]
            leading-relaxed
            text-gray-600
            "
          >
            Answer two questions and put our thinking to work on your
            challenges.
          </p>

          <div className="mt-8 flex items-baseline gap-2">
            <p className="text-[18px] font-semibold text-black">
              1. What is your industry?
            </p>
            <span className="text-[14px] text-gray-500">
              Question 1 of 2
            </span>
          </div>

          {/* Buttons */}
          <div className="mt-5 flex flex-wrap gap-3">
            {industries.map((item) => (
              <button
                key={item}
                className="
                rounded-full
                border
                border-gray-300
                px-5
                py-2.5
                text-[16px]
                font-semibold
                text-red-700
                transition-all
                duration-300
                hover:border-red-700
                hover:bg-red-700
                hover:text-white
                "
              >
                {item}
              </button>
            ))}
          </div>

          {/* View All */}
          <button className="group mt-5 block text-[15px] text-gray-600 transition">
            <span
              className="
              border-b
              border-gray-400
              transition-all
              group-hover:border-red-600
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