import React from "react";

const CTASection = () => {
  return (
    <>
      <section className="bg-[#d60000] overflow-hidden">
        <div className="max-w-[1700px] mx-auto relative grid grid-cols-1 lg:grid-cols-2 min-h-[430px] lg:min-h-[430px]">
          {/* Desktop Center Divider */}
          <div className="hidden lg:block absolute left-1/2 top-[60px] bottom-[60px] border-l border-black -translate-x-1/2" />

          {/* Left Section */}
          <div className="flex flex-col items-center justify-center text-center px-4 py-10 lg:py-0 border-b border-black lg:border-b-0">
            <h2 className="text-white text-[16px] sm:text-[20px] lg:text-[37px] font-semibold leading-snug">
              What can we help you achieve?
            </h2>

            <button className="mt-6 lg:mt-14 w-full max-w-[360px] border border-white text-white font-semibold text-sm uppercase py-4 transition-all duration-300 hover:bg-red-800 hover:border-red-800">
              LET&apos;S GET TO WORK
            </button>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center justify-center text-center px-4 py-10 lg:py-0">
            <h2 className="text-white text-[16px] sm:text-[20px] lg:text-[37px] font-semibold leading-snug">
              Where will your career take you?
            </h2>

            <button className="mt-6 lg:mt-14 w-full max-w-[360px] border border-white text-white font-semibold text-sm uppercase py-4 transition-all duration-300 hover:bg-red-800 hover:border-red-800">
              COME FIND OUT
            </button>
          </div>
        </div>
      </section>

      {/* Bottom White Strip */}
      <div className="h-9 bg-white"></div>
    </>
  );
};

export default CTASection;