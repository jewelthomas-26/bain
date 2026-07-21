import React from "react";

const CTASection = () => {
  return (
    <>
      <section className="bg-[#d60000]">
        <div className="max-w-[1700px] mx-auto relative grid grid-cols-1 lg:grid-cols-2 h-[430px]">
          
          {/* Center Divider */}
          <div className="hidden lg:block absolute left-1/2 top-[60px] bottom-[60px] border-l border-black -translate-x-1/2" />

          {/* Left */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-white text-[37px] font-semibold whitespace-nowrap">
              What can we help you achieve?
            </h2>

            <button className="mt-14 border border-white text-white font-semibold text-sm uppercase px-10 py-5 transition-all duration-300 hover:bg-red-800 hover:border-red-800 ">
              LET&apos;S GET TO WORK
            </button>
          </div>

          {/* Right */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-white text-[37px] font-semibold whitespace-nowrap">
              Where will your career take you?
            </h2>

            <button className="mt-14 border border-white text-white font-semibold text-sm uppercase px-10 py-5 transition-all duration-300 hover:bg-red-800 hover:border-red-800  ">
              COME FIND OUT
            </button>
          </div>
        </div>
      </section>

      {/* White bottom strip */}
      <div className="h-9 bg-white"></div>
    </>
  );
};

export default CTASection;