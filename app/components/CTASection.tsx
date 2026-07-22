import React from "react";

const CTASection = () => {
  return (
    <>
      <section className="bg-[#d60000] overflow-hidden">
        <div className="max-w-[1700px] mx-auto relative grid grid-cols-1 lg:grid-cols-2 min-h-[430px] py-10 lg:py-0">
          
          {/* Center Divider */}
          <div className="hidden lg:block absolute left-1/2 top-[60px] bottom-[60px] border-l border-black -translate-x-1/2" />

          {/* Left */}
          <div className="flex flex-col items-center justify-center px-4 text-center py-6 lg:py-0">
            <h2 className="text-white text-[26px] sm:text-[37px] font-semibold">
              What can we help you achieve?
            </h2>

            <button className="mt-8 lg:mt-14 border border-white text-white font-semibold text-sm uppercase px-8 sm:px-10 py-4 sm:py-5 transition-all duration-300 hover:bg-red-800 hover:border-red-800">
              LET&apos;S GET TO WORK
            </button>
          </div>

          {/* Right */}
          <div className="flex flex-col items-center justify-center px-4 text-center py-6 lg:py-0">
            <h2 className="text-white text-[26px] sm:text-[37px] font-semibold">
              Where will your career take you?
            </h2>

            <button className="mt-8 lg:mt-14 border border-white text-white font-semibold text-sm uppercase px-8 sm:px-10 py-4 sm:py-5 transition-all duration-300 hover:bg-red-800 hover:border-red-800">
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