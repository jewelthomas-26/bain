import {
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";

// Each social link gets its own brand-color hover state.
const socialLinks = [
  { Icon: FaLinkedinIn, label: "LinkedIn", hover: "hover:text-[#0A66C2]" },
  { Icon: FaXTwitter, label: "X", hover: "hover:text-white" },
  { Icon: FaFacebookF, label: "Facebook", hover: "hover:text-[#1877F2]" },
  { Icon: FaYoutube, label: "YouTube", hover: "hover:text-[#FF0000]" },
  { Icon: FaInstagram, label: "Instagram", hover: "hover:text-[#E1306C]" },
];

const footerLinks = [
  "Contact us",
  "Sustainability",
  "Accessibility",
  "Terms of use",
  "Privacy",
  "Modern Slavery Act Statement",
  "Cookie Policy",
  "Sitemap",
  "Log In",
];

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-12 lg:py-14">
        {/* Top */}
       <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
          {/* Left */}
          <div>
            <h3 className="max-w-[650px] text-[18px] sm:text-[20px] leading-8 sm:leading-10 font-light">
              Stay ahead in a rapidly changing world. Subscribe to Bain
              Insights, our monthly look at the critical issues facing global
              businesses.
            </h3>

            <img
              src="/logo/logo_white-bain.svg"
              alt="Bain & Company"
              className="mt-12 sm:mt-16 lg:mt-20 h-7 sm:h-6"
            />
          </div>

          {/* Right */}
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 h-12 sm:h-14 bg-[#444] px-5 text-white placeholder:text-white outline-none hover:bg-[#a8a3a3]"
              />

              <button className="bg-[#d50000] hover:bg-red-800 transition px-8 sm:px-10 h-12 sm:h-14 font-semibold uppercase whitespace-nowrap text-[13px]">
                Subscribe
              </button>
            </div>

            <label className="flex items-start gap-3 mt-5 text-[15px] sm:text-[17px]">
              <input
  type="checkbox"
  className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-red-500"
/>

              <span className="text-[15px]">
                <span className="">*</span> I have read and
                understand{" "}
                <a
                  href="#"
                  className="underline decoration-red-500 hover:no-underline transition-colors underline-offset-3 text-[15px]"
                >
                  Bain&rsquo;s Privacy Notice.
                </a>
              </span>
            </label>

            {/* Social */}
            <div className="flex flex-wrap justify-start md:justify-end gap-6 sm:gap-7 mt-12 sm:mt-16 lg:mt-20 text-2xl">
              {socialLinks.map(({ Icon, label, hover }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className={`text-white transition-all duration-200  ${hover}`}
                >
                  <Icon size={"18px"} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 sm:mt-28 lg:mt-32">
          <div className="flex flex-wrap gap-x-6 sm:gap-x-6 gap-y-3 sm:gap-y-4 text-base sm:text-lg">
            {footerLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="transition-colors duration-200 hover:text-red-600 text-[16px]"
              >
                {link}
              </a>
            ))}
          </div>

          <p className="text-white/60 mt-8 sm:mt-10 text-base sm:text-[16px]">
            © 1996-2026 Bain & Company, Inc.
          </p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-700" />
    </footer>
  );
};

export default Footer;