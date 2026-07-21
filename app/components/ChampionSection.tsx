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
    <section className="bg-white py-24">

      <div className="
        mx-auto
        grid
        max-w-7xl
        grid-cols-1
        items-center
        gap-12
        px-8
        lg:grid-cols-2
        lg:px-0
      ">


        {/* Image */}
        <div className="overflow-hidden">
 <div className="overflow-hidden flex justify-center">
  <img
    src="/champion/champion.jpg"
    alt="Champion"
    className="
      h-[320px]
      md:h-[380px]
      lg:h-[520px]
      w-[88%]
      object-cover
    "
  />
</div>

</div>




        {/* Content */}
        <div>

          <h2
            className="
            max-w-xl
            text-4xl
            font-semibold
            leading-tight
            tracking-tight
            text-black
            lg:text-[42px]
            "
          >
            We champion the bold to
            <br />
            achieve the extraordinary.
          </h2>


          <p
            className="
            mt-8
            max-w-xl
            text-[21px]
            leading-relaxed
            text-gray-700
            "
          >
            Answer two questions and put our thinking to work on your
            challenges.
          </p>



          <div className="mt-8 flex items-center gap-3">

            <p className="
              text-base
              font-semibold
              text-black
            ">
              1. What is your industry?
            </p>

            <span className="text-[15px] text-gray-500">
              Question 1 of 2
            </span>

          </div>



          {/* Buttons */}
          <div
            className="
            mt-7
            flex
            flex-wrap
            gap-4
            "
          >

            {industries.map((item)=>(
              <button
                key={item}
                className="
                rounded-full
                border
                border-gray-200
                px-5
                py-3
                text-base
                font-semibold
                text-red-700
                transition-all
                duration-300

                hover:bg-red-600
                hover:text-white
                hover:border-red-600
                "
              >
                {item}
              </button>
            ))}


          </div>



          {/* View All */}
          <button
            className="
            group
            mt-7
            text-base
            text-gray-700
            transition
            "
          >

            <span
              className="
              border-b
              border-gray-400
              pb-1
              transition-all

              group-hover:text-red-600
              group-hover:border-red-600
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