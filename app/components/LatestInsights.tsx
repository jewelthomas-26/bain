import React from "react";



const insights = [
  {
    id: 1,
    image: "/Insights/43817_strongmomentumininsurance_1440x810.webp",
    category: "Strategy",
    title: "Strong Momentum in Insurance, but Structural Challenges Remain",
    description:
      "Insurers can increase relevance and expand the market by lowering the cost of risk.",
    type: "Insurance Industry Outlook",
  },
  {
    id: 2,
    image: "/Insights/gettyimages-2243586375_16-9_alt2.jpg",
    category: "AI, Insights, and Solutions",
    title: "Is Your AI Transformation Forgetting the Front Line?",
    description:
      "Build a competitive advantage by augmenting your front line.",
    type: "Brief",
  },
];
function BookmarkIcon({ size = 22, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 3H17C17.5523 3 18 3.44772 18 4V21L12 16.8L6 21V4C6 3.44772 6.44772 3 7 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const LatestInsights = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Heading */}
      <div className="flex items-center justify-center gap-6 mb-14">
        <div className="flex-1 h-px bg-gray-300"></div>

        <h2 className="text-4xl md:text-[30px] font-bold text-gray-900">
          Our Latest Insights
        </h2>

        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-0 gap-10">
  {insights.map((item, index) => (
    <div
      key={item.id}
      className={`group relative ${
        index === 0 ? "lg:border-r lg:border-gray-300 lg:pr-8" : "lg:pl-8"
      }`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-[340px] object-cover"
      />

     <div className="pt-5 flex flex-col h-[280px]">
  <p className="text-red-600 text-[12px] font-semibold">
    {item.category}
  </p>

  <h3 className="mt-3 text-[20px] font-semibold leading-snug text-black cursor-pointer transition-colors duration-300 hover:text-red-600">
    {item.title}
  </h3>

  <p className="mt-4 font-tiempos text-black text-[16px] leading-8">
  {item.description}
</p>

  {/* Footer */}
  <div className="mt-auto flex items-center justify-between pt-1 text-[13px] text-gray-500">
  <span>{item.type}</span>

  <div className="relative group">
    <button className="text-gray-500  transition-colors">
      <BookmarkIcon size={22} />
    </button>

    <div className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
      <div className="relative bg-black text-white text-xs px-4 py-5 whitespace-nowrap">
        Save
        <div className="absolute left-1/2 top-12 -translate-x-1/2 w-4 h-4 bg-black rotate-45"></div>
      </div>
    </div>
  </div>
</div>
</div>

    </div>
  ))}
</div>


      {/* Button */}
      <div className="flex justify-center mt-16">
        <button className="border border-gray-300 text-[13px] px-10 py-4 text-red-700 font-semibold uppercase tracking-wide transition-all duration-300 hover:bg-red-800 hover:text-white hover:border-red-800">
          See All Insights
        </button>
      </div>
    </section>
  );
};

export default LatestInsights;