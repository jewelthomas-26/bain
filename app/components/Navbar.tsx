"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, Bookmark, Globe, Folder, FolderOpen, X, ExternalLink } from "lucide-react";

// Main nav items – each entry may have a `dropdownType` for custom layouts
const mainNav = [
  {
    label: "Industries",
    dropdownType: "generic" as const,
    items: ["Consumer Products", "Financial Services", "Healthcare", "Private Equity", "Technology", "Oil & Gas", "Mining", "Metals", "Real Estate", "Telecommunications", "Utilities & Renewables", "Travel & Leisure"],
  },
  {
    label: "Consulting Services",
    dropdownType: "consultingServices" as const,
    items: null,
  },
  { label: "Digital", dropdownType: null, items: null },
  {
    label: "Insights",
    dropdownType: "insights" as const,
    items: null,
  },
  {
    label: "About",
    dropdownType: "about" as const,
    items: null,
  },
  { label: "Careers", dropdownType: null, items: null },
];

// ---- Consulting Services dropdown data ----
const consultingServicesColumns = [
  ["AI, Insights, and Solutions", "Customer Experience", "Innovation"],
  ["M&A", "Operations", "People & Organization"],
  ["Private Equity", "Sales & Marketing", "Strategy"],
  ["Sustainability", "Technology", "Transformation"],
];

// ---- Insights dropdown data ----
const insightsLeft = [
  "Industry Insights",
  "Services Insights",
  "Bain Books",
  "Webinars",
  "Bain Futures",
];
const insightsFeaturedCol1 = [
  "Tariff Response",
  "Artificial Intelligence",
  "Thriving in Uncertainty",
  "Executive Conversations",
  "Macro Trends",
];
const insightsFeaturedCol2 = [
  "B2B Growth Agenda",
  "Private Equity Report",
  "M&A Report",
  "Healthcare Private Equity Report",
  "Technology Report",
];
const insightsFeaturedCol3 = [
  "CEO Insights",
  "CFO Insights",
  "COO Insights",
  "CIO Insights",
  "CMO Insights",
];

// ---- About dropdown data ----
const aboutLeft = [
  "What We Do",
  "What We Believe",
  "Our People & Leadership",
];
const aboutRight = [
  "Client Results",
  "Awards & Recognition",
  "Global Affiliations",
];
const aboutFurtherCol1 = ["Sustainability", "Social Impact"];
const aboutFurtherCol2 = ["World Economic Forum"];

const topNav = [
  { label: "Offices", hasDropdown: true },
  { label: "Alumni", hasDropdown: false },
  { label: "Media Center", hasDropdown: false },
  { label: "Subscribe", hasDropdown: false },
  { label: "Contact", hasDropdown: false },
];

// Office locations grouped into the column layout shown in the design:
// column 1 = North & Latin America
// column 2 = Europe & Africa (top) + Middle East (bottom)
// column 3 = Asia & Australia
type OfficeBlock = { title: string; offices: string[] };

const officeColumns: OfficeBlock[][] = [
  [
    {
      title: "North & Latin America",
      offices: [
        "Atlanta",
        "Austin",
        "Bogota",
        "Boston",
        "Buenos Aires",
        "Chicago",
        "Dallas",
        "Denver",
        "Houston",
        "Los Angeles",
        "Mexico City",
        "Minneapolis",
        "Monterrey",
        "Montreal",
        "New York",
        "Rio de Janeiro",
        "San Francisco",
        "Santiago",
        "São Paulo",
        "Seattle",
        "Silicon Valley",
        "Toronto",
        "Washington, DC",
      ],
    },
  ],
  [
    {
      title: "Europe & Africa",
      offices: [
        "Amsterdam",
        "Athens",
        "Berlin",
        "Brussels",
        "Copenhagen",
        "Dusseldorf",
        "Frankfurt",
        "Helsinki",
        "Istanbul",
        "Johannesburg",
        "Kyiv",
        "Lisbon",
        "London",
        "Madrid",
        "Milan",
        "Munich",
        "Oslo",
        "Paris",
        "Rome",
        "Stockholm",
        "Vienna",
        "Warsaw",
        "Zurich",
      ],
    },
    {
      title: "Middle East",
      offices: ["Doha", "Dubai", "Riyadh"],
    },
  ],
  [
    {
      title: "Asia & Australia",
      offices: [
        "Bangkok",
        "Beijing",
        "Bengaluru",
        "Brisbane",
        "Ho Chi Minh City",
        "Hong Kong",
        "Jakarta",
        "Kuala Lumpur",
        "Manila",
        "Melbourne",
        "Mumbai",
        "New Delhi",
        "Perth",
        "Seoul",
        "Shanghai",
        "Singapore",
        "Sydney",
        "Tokyo",
      ],
    },
  ],
];

// Region & language selector data, grouped the same way as the design:
// Global | North & Latin America | Europe, Middle East, & Africa | Asia & Australia
type RegionEntry = {
  country: string;
  language: string;
  countryCode: string | null;
  external?: boolean;
};
type RegionBlock = { title: string; entries: RegionEntry[] };

const regionLanguageColumns: RegionBlock[] = [
  {
    title: "Global",
    entries: [
      { country: "Global", language: "English", countryCode: null }, // null -> shows Globe icon
    ],
  },
  {
    title: "North & Latin America",
    entries: [
      { country: "Brazil", language: "Português", countryCode: "br" },
      { country: "Argentina", language: "Español", countryCode: "ar" },
      { country: "Canada", language: "Français", countryCode: "ca" },
      { country: "Chile", language: "Español", countryCode: "cl" },
      { country: "Colombia", language: "Español", countryCode: "co" },
    ],
  },
  {
    title: "Europe, Middle East, & Africa",
    entries: [
      { country: "France", language: "Français", countryCode: "fr" },
      { country: "DACH Region", language: "Deutsch", countryCode: "de" },
      { country: "Italy", language: "Italiano", countryCode: "it" },
      { country: "Spain", language: "Español", countryCode: "es" },
      { country: "Greece", language: "Elliniká", countryCode: "gr" },
    ],
  },
  {
    title: "Asia & Australia",
    entries: [
      { country: "China", language: "中文版", countryCode: "cn", external: true },
      { country: "Korea", language: "한국어", countryCode: "kr" },
      { country: "Japan", language: "日本語", countryCode: "jp" },
    ],
  },
];

// Splits an alphabetical list into two vertical columns (top-to-bottom, not round-robin)
function splitHalf(items: string[]) {
  const half = Math.ceil(items.length / 2);
  return [items.slice(0, half), items.slice(half)];
}

// Small filled triangle used everywhere a dropdown/expand indicator is needed.
interface FilledArrowProps {
  direction?: "down" | "up" | "right" | "left";
  size?: number;
  className?: string;
}

function FilledArrow({ direction = "down", size = 9, className = "" }: FilledArrowProps) {
  const rotation =
    direction === "down"
      ? "rotate-0"
      : direction === "up"
        ? "rotate-180"
        : direction === "right"
          ? "-rotate-90"
          : "rotate-90";

  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 10 6"
      fill="currentColor"
      className={`shrink-0 transition-transform duration-200 ${rotation} ${className}`}
    >
      <path d="M0 0L5 6L10 0Z" />
    </svg>
  );
}

// Splits a flat list of strings into up to `maxCols` columns for the mega-menu layout.
function toColumns(items: string[], maxCols = 4, perCol = 6) {
  const cols: string[][] = [];
  for (let i = 0; i < items.length; i += perCol) {
    cols.push(items.slice(i, i + perCol));
  }
  return cols.slice(0, maxCols);
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Offices mega-dropdown (top bar)
  const [officesOpen, setOfficesOpen] = useState(false);
  // Region & language mega-dropdown (top bar)
  const [langOpen, setLangOpen] = useState(false);
  // Saved items mega-dropdown (top bar)
  const [savedOpen, setSavedOpen] = useState(false);

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarSubmenu, setSidebarSubmenu] = useState<string | null>(null); // label of mainNav item being drilled into

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Toggle white background after passing hero threshold
      setIsScrolled(currentScrollY > 60);

      // Hide top bar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setShowTopBar(false);
      } else {
        setShowTopBar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // Close the Offices panel whenever the top bar hides or the mouse leaves the header
  useEffect(() => {
    if (!showTopBar) {
      setOfficesOpen(false);
      setLangOpen(false);
      setSavedOpen(false);
    }
  }, [showTopBar]);

  const closeSidebar = () => {
    setSidebarOpen(false);
    // Reset the submenu after the close animation finishes
    setTimeout(() => setSidebarSubmenu(null), 300);
  };
  const officesRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const savedRef = useRef<HTMLDivElement>(null);

  // Offices dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (officesRef.current && !officesRef.current.contains(event.target as Node)) {
        setOfficesOpen(false);
      }
    }
    if (officesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [officesOpen]);

  // Language dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    if (langOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (savedRef.current && !savedRef.current.contains(event.target as Node)) {
        setSavedOpen(false);
      }
    }
    if (savedOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [savedOpen]);
  // Any dropdown/mega-menu currently open, anywhere in the header
  const isAnyDropdownOpen =
    officesOpen || langOpen || savedOpen || openDropdown !== null;

  // Navbar is "white mode" if scrolled, hovered, OR any dropdown is open
  // (this is the fix: opening a dropdown now forces the solid white bg immediately,
  // instead of requiring a hover/scroll to reveal it)
  const isWhite = isScrolled || isHovered || isAnyDropdownOpen;

  const sidebarSubmenuItems: Record<string, string[]> = {
    Industries: ["Consumer Products", "Financial Services", "Healthcare", "Private Equity", "Technology", "Oil & Gas", "Mining", "Metals", "Real Estate", "Telecommunications", "Utilities & Renewables", "Travel & Leisure"],
    "Consulting Services": consultingServicesColumns.flat(),
    Insights: [...insightsLeft, ...insightsFeaturedCol1, ...insightsFeaturedCol2, ...insightsFeaturedCol3],
    About: [...aboutLeft, ...aboutRight, ...aboutFurtherCol1, ...aboutFurtherCol2],
  };

  const activeSidebarSubmenu = mainNav.find((i) => i.label === sidebarSubmenu);
  const activeSidebarItems = sidebarSubmenu ? sidebarSubmenuItems[sidebarSubmenu] ?? [] : [];


  return (
    <>
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setOpenDropdown(null);
        }}
        className={`fixed top-0 left-0 z-50 w-full transition-colors duration-300 ${isWhite ? "bg-white shadow-sm" : "bg-transparent border-b border-gray-200/50"
          }`}
      >
        {/* ---------- Top Bar ---------- */}
        <div
          className={`relative overflow-visible transition-all duration-300 ease-in-out hidden sm:block ${showTopBar ? "max-h-12 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
            } ${isWhite ? "border-b border-gray-200" : ""}`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2.5 text-[11px] font-semibold tracking-wide">
            {/* Left links */}
            <div className="flex items-center gap-6">
              {topNav.map((item) => {
                if (item.label === "Offices") {
                  const isOpen = officesOpen;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        setOfficesOpen((o) => !o);
                        setLangOpen(false);
                        setSavedOpen(false);
                      }}
                      className={`flex items-center gap-1 uppercase transition-colors hover:text-red-600 ${isOpen ? "text-red-600" : isWhite ? "text-gray-700" : "text-white"
                        }`}
                    >
                      {item.label}
                      <FilledArrow direction={isOpen ? "up" : "down"} />
                    </button>
                  );
                }
                return (
                  <button
                    key={item.label}
                    className={`flex items-center gap-1 uppercase transition-colors hover:text-red-600 ${isWhite ? "text-gray-700" : "text-white"
                      }`}
                  >
                    {item.label}
                    {item.hasDropdown && <FilledArrow direction="down" />}
                  </button>
                );
              })}
            </div>

            {/* Right links */}
            <div className="flex items-center gap-6 ">
              <button
                onClick={() => {
                  setLangOpen((o) => !o);
                  setOfficesOpen(false);
                  setSavedOpen(false);
                }}
                className={`flex items-center gap-1.5 uppercase transition-colors ${langOpen ? "text-red-600" : isWhite ? "text-gray-700" : "text-white"
                  }`}
              >
                <Globe size={15} className={langOpen ? "text-red-700" : isWhite ? "text-red-700" : "text-white"} />
                <span className="hover:text-red-700 tracking-wider">Global | English</span>
                <FilledArrow
                  direction={langOpen ? "up" : "down"}
                  className={langOpen ? "text-red-600" : isWhite ? "text-black" : "text-white"}
                />
              </button>

              <button
                onClick={() => {
                  setSavedOpen((o) => !o);
                  setOfficesOpen(false);
                  setLangOpen(false);
                }}
                className={`flex items-center gap-1.5 uppercase transition-colors ${savedOpen ? "text-red-600" : isWhite ? "text-gray-700" : "text-white"
                  }`}
              >
                <Folder size={15} className={savedOpen ? "text-red-700" : isWhite ? "text-red-700" : "text-white"} />
                <span className="hover:text-red-700 tracking-wider">Saved Items</span>
                <FilledArrow
                  direction={savedOpen ? "up" : "down"}
                  className={savedOpen ? "text-red-600" : isWhite ? "text-black" : "text-white"}
                />
              </button>
            </div>
          </div>

          {/* ---------- Offices mega-dropdown panel ---------- */}
          {officesOpen && (
            <div ref={officesRef} className="absolute left-0 top-full z-50 w-full max-h-188 overflow-y-auto bg-white shadow-xl">
              <div className="mx-auto max-w-7xl px-8 pt-8 pb-4">
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="text-[20px] font-semibold leading-none text-gray-900">Offices</h3>
                  <button
                    onClick={() => setOfficesOpen(false)}
                    className="flex items-center gap-1.5 text-[13px] font-light tracking-wide text-red-700 transition-colors"
                  >
                    Close
                    <X size={22} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-x-16">
                  {officeColumns.map((blocks, ci) => (
                    <div
                      key={ci}
                      className={`flex flex-col gap-10 ${ci > 0 ? "border-l border-gray-200 pl-16 -ml-16" : ""
                        }`}
                    >
                      {blocks.map((block) => {
                        const [colA, colB] = splitHalf(block.offices);
                        return (
                          <div key={block.title}>
                            <h4 className="mb-4 text-[17px] font-bold text-gray-900">{block.title}</h4>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                              <div className="flex flex-col gap-3">
                                {colA.map((city) => (

                                  <a key={city}
                                    href="#"
                                    className="text-[16px] font-normal text-gray-800 tracking-wide transition-colors hover:text-red-600"
                                  >
                                    {city}
                                  </a>
                                ))}
                              </div>
                              <div className="flex flex-col gap-3">
                                {colB.map((city) => (

                                  <a key={city}
                                    href="#"
                                    className="text-[16px] font-normal text-gray-800 transition-colors hover:text-red-600"
                                  >
                                    {city}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="mt-10">

                  <a href="#"
                    className="text-[16px] font-normal tracking-wide text-red-700 transition-colors"
                  >
                    See all offices
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ---------- Region & language mega-dropdown panel ---------- */}
          {langOpen && (
            <div ref={langRef} className="absolute left-0 top-full z-50 w-full bg-white shadow-xl">
              <div className="mx-auto max-w-7xl px-8 pt-8 pb-10">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-[22px] font-semibold leading-none text-gray-900">
                    Select your region and language
                  </h3>
                  <button
                    onClick={() => setLangOpen(false)}
                    className="flex items-center gap-1.5 text-[13px] font-medium text-red-700 transition-colors "
                  >
                    Close
                    <X size={24} strokeWidth={2} />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-x-16">
                  {regionLanguageColumns.map((block, ci) => (
                    <div
                      key={block.title}
                      className={ci > 0 ? "border-l border-gray-200 pl-5 -ml-16" : ""}
                    >
                      <h4 className="mb-4 text-[18px] font-bold text-gray-900">{block.title}</h4>
                      <div className="flex flex-col gap-4">
                        {block.entries.map((entry) => (

                          <a key={entry.country}
                            href="#"
                            className="group inline-flex items-center gap-2.5 text-[14px] font-normal text-gray-800 transition-colors hover:text-red-600"
                          >
                            {entry.countryCode ? (
                              <img
                                src={`https://flagcdn.com/w40/${entry.countryCode.toLowerCase()}.png`}
                                alt={`${entry.country} flag`}
                                className="h-[14px] w-[20px] flex-shrink-0 rounded-[1px] object-cover shadow-sm"
                              />
                            ) : (
                              <Globe size={16} className="flex-shrink-0 text-gray-500 group-hover:text-red-600" />
                            )}
                            <span className="text-[14px]">
                              {entry.country}{" "}
                              <span className="text-gray-500 ">({entry.language})</span>
                            </span>
                            {entry.external && (
                              <ExternalLink size={13} className="text-gray-400 group-hover:text-red-600" />
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ---------- Saved items empty-state panel ---------- */}
          {savedOpen && (
            <div ref={savedRef} className="absolute left-0 top-full z-50 w-full bg-white shadow-xl">
              <div className="mx-auto flex max-w-7xl flex-col items-center px-8 py-16 text-center">
                <FolderOpen size={122} strokeWidth={1.5} className="text-gray-300" />
                <h3 className="mt-6 text-[20px] font-bold text-gray-500">You have no saved items.</h3>
                <p className="mt-4 max-w-full text-[17px] text-gray-800">
                  Bookmark content that interests you and it will be saved here for you to read or share later.
                </p>

                <a href="#"
                  className="mt-8 inline-flex items-center bg-red-700 px-8 py-4.5 text-[12px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-800"
                >
                  Explore Bain Insights
                </a>
              </div>
            </div>
          )}
        </div>

        {/* ---------- Main Nav ---------- */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4 w-full">
          <div className="flex items-center gap-3 sm:gap-10 min-w-0">
            <div className="flex items-center gap-3 sm:gap-6 shrink-0">
              <button
                aria-label="Toggle menu"
                onClick={() => setSidebarOpen((prev) => !prev)}
                className={`group relative flex items-center justify-center p-1.5 transition-colors hover:text-red-600 ${isWhite ? "text-gray-700 sm:text-gray-700" : "text-white"
                  }`}
              >
                <div
                  className={`transition-transform duration-500 ease-in-out transform ${sidebarOpen ? "-rotate-90 -translate-x-1" : "rotate-0 translate-x-0"
                    }`}
                >
                  <Menu size={29} strokeWidth={1.75} />
                </div>
              </button>

              <Link href="/" className="relative block h-7 w-[180px] sm:h-9 sm:w-[190px] shrink-0">
                <Image
                  src={isWhite ? "/logo/logo_red_bain.svg" : "/logo/logo_white-bain.svg"}
                  alt="Bain & Company"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </Link>
            </div>

            <nav className="hidden items-center gap-8 lg:flex">
              {mainNav.map((item) => {
                const isOpen = openDropdown === item.label;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      if (item.dropdownType) {
                        setOpenDropdown(item.label);
                      } else {
                        setOpenDropdown(null);
                      }
                    }}
                  >
                    <button
                      className={`flex items-center gap-1.5 border-b-1  text-[15px] font-medium transition-colors hover:text-red-600 hover:border-red-600 ${isOpen
                        ? "text-red-600 border-red-600"
                        : `border-transparent ${isWhite ? "text-gray-800" : "text-white"}`
                        }`}
                    >
                      {item.label}
                      {item.dropdownType && (
                        <FilledArrow
                          direction={isOpen ? "up" : "down"}
                          className={isWhite ? "text-red-600" : "text-white"}
                        />
                      )}
                    </button>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Right: explore/search + bookmark */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <button
              className={`hidden items-center gap-2 text-[14px] tracking-[1px] font-medium sm:flex ${isWhite ? "text-gray-500" : "text-white"
                }`}
            >
              Explore
              <Search size={23} />
            </button>

            {/* Mobile Search Icon */}
            <button className={`block sm:hidden ${isWhite ? "text-gray-700" : "text-white"}`}>
              <Search size={22} strokeWidth={1.75} />
            </button>

            <span className={`h-5 sm:h-6 w-px ${isWhite ? "bg-gray-300" : "bg-white/60"}`} />

            <div className="relative group/bookmark">
              <button className={isWhite ? "text-gray-700" : "text-white"}>
                <Bookmark size={22} strokeWidth={1.75} className="sm:w-[23px] sm:h-[23px] mt-2" />
              </button>
              <div className="absolute top-full left-1/2 mt-2.5 -translate-x-1/2 opacity-0 invisible group-hover/bookmark:opacity-100 group-hover/bookmark:visible transition-all duration-300 z-50 pointer-events-none">
                <div className="relative bg-black text-white text-[12px] px-3 py-3.5 whitespace-nowrap shadow-md">
                  Save
                  <div className="absolute left-1/2 -top-1 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Mega dropdown panels ---------- */}

        {/* Industries - generic grid */}
        {openDropdown === "Industries" && (() => {
          const item = mainNav.find(i => i.label === "Industries")!;
          const columns = toColumns(item.items ?? []);
          return (
            <div
              className="absolute left-1/2 top-full z-50 w-full max-w-7xl -translate-x-1/2 rounded-b-2xl overflow-hidden bg-white shadow-xl"
              onMouseEnter={() => setOpenDropdown("Industries")}
            >
              <div className="px-8 pt-6 pb-10">
                <h3 className="mb-6 text-[22px] font-semibold text-gray-900">Industries</h3>
                <div className="grid grid-cols-4 gap-x-12 gap-y-4">
                  {columns.map((col, ci) => (
                    <div key={ci} className="flex flex-col gap-4">
                      {col.map((sub) => (
                        <a key={sub} href="#" className="text-[14px] font-normal text-gray-800 transition-colors hover:text-red-600">{sub}</a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-[12px] w-full bg-red-700" />
            </div>
          );
        })()}

        {/* Consulting Services */}
        {openDropdown === "Consulting Services" && (
          <div
            className="absolute left-1/2 top-full z-50 w-full max-w-7xl -translate-x-1/2 rounded-b-2xl overflow-hidden bg-white shadow-xl"
            onMouseEnter={() => setOpenDropdown("Consulting Services")}
          >
            <div className="px-8 pt-6 pb-10">
              <h3 className="mb-6 text-[22px] font-semibold text-gray-900">Consulting Services</h3>
              <div className="grid grid-cols-4 gap-x-12 gap-y-3">
                {consultingServicesColumns.map((col, ci) => (
                  <div key={ci} className="flex flex-col gap-3">
                    {col.map((item) => (
                      <a key={item} href="#" className="text-[14px] font-normal text-gray-800 transition-colors hover:text-red-600">{item}</a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[12px] w-full bg-red-700" />
          </div>
        )}

        {/* Insights */}
        {openDropdown === "Insights" && (
          <div
            className="absolute left-1/2 top-full z-50 w-full max-w-7xl rounded-b-2xl -translate-x-1/2 overflow-hidden bg-white shadow-xl"
            onMouseEnter={() => setOpenDropdown("Insights")}
          >
            <div className="px-8 pt-6 pb-4">
              <div className="grid grid-cols-[180px_1px_1fr] gap-x-10">
                {/* Left: Insights */}
                <div>
                  <h3 className="mb-4 text-[22px] font-semibold text-gray-900">
                    Insights
                  </h3>
                  <div className="flex flex-col gap-3">
                    {insightsLeft.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="text-[14px] font-normal text-gray-800 transition-colors hover:text-red-600"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="mt-5 inline-block text-[17px] font-normal text-red-700 hover:underline"
                  >
                    View all insights
                  </a>
                </div>

                {/* Vertical Divider */}
                <div className="bg-gray-300 w-0.5  self-stretch" />

                {/* Right: Featured topics */}
                <div>
                  <h4 className="mb-4 text-[22px] font-semibold text-gray-400">
                    Featured topics
                  </h4>
                  <div className="grid grid-cols-3 gap-x-10 gap-y-3">
                    <div className="flex flex-col gap-3">
                      {insightsFeaturedCol1.map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="text-[14px] font-normal text-gray-800 transition-colors hover:text-red-600"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3">
                      {insightsFeaturedCol2.map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="text-[14px] font-normal text-gray-800 transition-colors hover:text-red-600"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3">
                      {insightsFeaturedCol3.map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="text-[14px] font-normal text-gray-800 transition-colors hover:text-red-600"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                  <a
                    href="#"
                    className="mt-5 inline-block text-[17px] font-normal text-red-700 hover:underline"
                  >
                    View all featured topics
                  </a>
                </div>
              </div>
            </div>
            <div className="h-[12px] w-full bg-red-700" />
          </div>
        )}

        {/* About */}
        {openDropdown === "About" && (
          <div
            className="absolute left-1/2 top-full z-50 w-full max-w-7xl rounded-b-2xl -translate-x-1/2 overflow-hidden bg-white shadow-xl"
            onMouseEnter={() => setOpenDropdown("About")}
          >
            <div className="px-8 pt-6 pb-6">
              <div className="grid grid-cols-[340px_1fr] gap-x-12">
                {/* Left: About links in 2 columns */}
                <div>
                  <h3 className="mb-4 text-[22px] font-semibold text-gray-900">About</h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    <div className="flex flex-col gap-3">
                      {aboutLeft.map((item) => (
                        <a key={item} href="#" className="text-[14px] font-normal text-black transition-colors hover:text-red-600">{item}</a>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3">
                      {aboutRight.map((item) => (
                        <a key={item} href="#" className="text-[14px] font-normal text-black transition-colors hover:text-red-800">{item}</a>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Right: Further section */}
                <div className="border-l border-gray-200 pl-10">
                  <h4 className="mb-4 text-[22px] font-semibold text-gray-500">Further: Our global responsibility</h4>
                  <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                    <div className="flex flex-col gap-3">
                      {aboutFurtherCol1.map((item) => (
                        <a key={item} href="#" className="text-[14px] font-normal text-black transition-colors hover:text-red-800">{item}</a>
                      ))}
                      <a href="#" className="mt-1 text-[16px] font-normal text-red-700 hover:underline">Learn more about Further</a>
                    </div>
                    <div className="flex flex-col gap-3">
                      {aboutFurtherCol2.map((item) => (
                        <a key={item} href="#" className="text-[14px] font-normal text-black transition-colors hover:text-red-600">{item}</a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[12px] w-full bg-red-700" />
          </div>
        )}
      </header>

      {/* ---------- Sidebar overlay ---------- */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={closeSidebar} />

        {/* Panel Wrapper */}
        <div
          className={`absolute left-0 top-0 h-[90%] w-[360px] max-w-[85vw] transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Close button */}
          <button
            aria-label="Close menu"
            onClick={closeSidebar}
            className="absolute top-0 left-full z-[70] flex h-12 w-12 items-center justify-center bg-[#C00000] text-white shadow-md transition-colors hover:bg-[#A30000]"
          >
            <X size={24} strokeWidth={2.5} />
          </button>

          {/* Actual Panel */}
          <div className="flex h-full w-full flex-col justify-between overflow-hidden rounded-br-3xl bg-white shadow-2xl">
            {/* Content Scroll Container */}
            <div className="relative flex-1 overflow-y-auto px-7 pt-7 pb-6">
              {/* Top Branding Section */}
              <div className="mb-8 flex items-center gap-3">
                <div className="flex items-center gap-[3px] text-red-600">
                  <span className="inline-block h-6 w-[3.5px] rounded-full bg-red-600" />
                  <span className="inline-block h-6 w-[3.5px] rounded-full bg-red-600" />
                  <span className="inline-block h-6 w-[3.5px] rounded-full bg-red-600" />
                </div>

                <Link href="/" onClick={closeSidebar} className="relative ml-3 block h-10 w-50">
                  <Image
                    src="/logo/logo_red_bain.svg"
                    alt="Bain & Company"
                    fill
                    priority
                    className="object-contain object-left"
                  />
                </Link>
              </div>

              {/* ---- Root view ---- */}
              {!sidebarSubmenu && (
                <>
                  {/* Main Navigation Items */}
                  <nav className="flex flex-col gap-5 ml-10">
                    {mainNav.map((item) => {
                      const hasArrow = !!item.dropdownType;

                      return (
                        <div key={item.label} className="flex items-center">
                          <button
                            onClick={() => item.dropdownType && setSidebarSubmenu(item.label)}
                            className="group inline-flex items-center gap-1.5 text-left text-[13px] font-semibold text-gray-900 hover:text-red-600 transition-colors"
                          >
                            <span className="border-b-1 border-transparent  group-hover:border-red-600">
                              {item.label}
                            </span>
                            {hasArrow && (
                              <FilledArrow direction="right" size={10} className="text-red-700" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </nav>

                  {/* Horizontal Divider */}
                  <div className="my-6 h-px w-full bg-gray-200" />

                  {/* Secondary / Lower Navigation Items */}
                  <nav className="flex flex-col gap-4 text-[13px] font-bold uppercase tracking-wider text-gray-900 ml-10">
                    {topNav.map((item) => (
                      <div key={item.label} className="flex items-center">
                        <button className="group inline-flex items-center gap-1.5 hover:text-red-600 transition-colors">
                          <span className="border-b-1 border-transparent font-light  group-hover:border-red-600 text-[11px] uppercase">
                            {item.label}
                          </span>
                          {item.hasDropdown && (
                            <FilledArrow direction="right" size={10} className="text-red-700" />
                          )}
                        </button>
                      </div>
                    ))}

                    {/* Global | English */}
                    <div className="flex items-center">
                      <button className="group inline-flex items-center gap-2 text-gray-900 hover:text-red-600 transition-colors border-b-1 border-transparent hover:border-red-600">
                        <Globe size={15} className="text-red-600 shrink-0" />
                        <span className="pb-0.5 font-medium text-[11px]">GLOBAL | ENGLISH</span>
                        <FilledArrow direction="right" size={10} className="text-red-700" />
                      </button>
                    </div>

                    {/* Saved Items */}
                    <div className="flex items-center">
                      <button className="group inline-flex items-center gap-2 text-gray-900 hover:text-red-600 transition-colors border-b-1 border-transparent hover:border-red-600">
                        <Folder size={15} className="text-red-600 shrink-0" />
                        <span className="pb-0.5 font-medium text-[11px]">SAVED ITEMS</span>
                        <FilledArrow direction="right" size={10} className="text-red-700" />
                      </button>
                    </div>
                  </nav>
                </>
              )}

              {/* ---- Submenu (drill-down) view ---- */}
              {sidebarSubmenu && activeSidebarSubmenu && (
                <>
                  <button
                    onClick={() => setSidebarSubmenu(null)}
                    className="mb-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors"
                  >
                    <FilledArrow direction="left" size={7} className="text-red-600" />
                    Main menu
                  </button>

                  <div className="mb-5 h-px w-full bg-gray-200" />

                  <h3 className="mb-5 text-[17px] font-bold text-gray-900">
                    {activeSidebarSubmenu.label}
                  </h3>

                  <nav className="flex flex-col gap-4">
                    {activeSidebarItems.map((sub) => (
                      <a key={sub}
                        href="#"
                        className="group inline-flex items-center text-[15px] font-medium text-gray-800 hover:text-red-600 transition-colors"
                      >
                        <span className="border-b-2 border-transparent pb-0.5 group-hover:border-red-600">
                          {sub}
                        </span>
                      </a>
                    ))}
                  </nav>
                </>
              )}
            </div>

            {/* Bottom Red Strip */}
            <div className="h-4 w-full bg-red-700" />
          </div>
        </div>
      </div>
    </>
  );
}