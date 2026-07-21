"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, Bookmark, Globe, Folder, X } from "lucide-react";

// Main nav items with dropdown sub-items (edit as needed)
const mainNav = [
  {
    label: "Industries",
    items: ["Consumer Products", "Financial Services", "Healthcare", "Private Equity", "Technology"],
  },
  {
    label: "Consulting Services",
    items: ["Strategy", "Mergers & Acquisitions", "Performance Improvement", "Digital"],
  },
  { label: "Digital", items: null },
  {
    label: "Insights",
    items: ["Reports", "Podcasts", "Videos", "Case Studies"],
  },
  {
    label: "About",
    items: ["Our History", "Leadership", "Social Impact", "Diversity & Inclusion"],
  },
  { label: "Careers", items: null },
];

const topNav = [
  { label: "Offices", hasDropdown: true },
  { label: "Alumni", hasDropdown: false },
  { label: "Media Center", hasDropdown: false },
  { label: "Subscribe", hasDropdown: false },
  { label: "Contact", hasDropdown: false },
];

// Small filled triangle used everywhere a dropdown/expand indicator is needed.
interface FilledArrowProps {
  direction?: "down" | "up" | "right" | "left";
  size?: number;
  className?: string;
}

// Small filled triangle used everywhere a dropdown/expand indicator is needed.
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

  const closeSidebar = () => {
    setSidebarOpen(false);
    // Reset the submenu after the close animation finishes
    setTimeout(() => setSidebarSubmenu(null), 300);
  };

  // Navbar is "white mode" if scrolled OR hovered (even while transparent at top)
  const isWhite = isScrolled || isHovered;

  const activeSidebarSubmenu = mainNav.find((i) => i.label === sidebarSubmenu);

  return (
    <>
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setOpenDropdown(null);
        }}
        className={`fixed top-0 left-0 z-50 w-full transition-colors duration-300 ${
          isWhite ? "bg-white shadow-sm" : "bg-transparent border-b border-gray-200/50"
        }`}
      >
        {/* ---------- Top Bar ---------- */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showTopBar ? "max-h-12 opacity-100" : "max-h-0 opacity-0"
          } ${isWhite ? "border-b border-gray-200" : ""}`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2.5 text-[11px] font-semibold tracking-wide">
            {/* Left links */}
            <div className="flex items-center gap-6">
              {topNav.map((item) => (
                <button
                  key={item.label}
                  className={`flex items-center gap-1 uppercase transition-colors hover:text-red-600 ${
                    isWhite ? "text-gray-700" : "text-white"
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && <FilledArrow direction="down" />}
                </button>
              ))}
            </div>

            {/* Right links */}
            <div className="flex items-center gap-6">
              <button
                className={`flex items-center gap-1.5 uppercase transition-colors ${
                  isWhite ? "text-gray-700" : "text-white"
                }`}
              >
                <Globe size={13} className={isWhite ? "text-red-600" : "text-white"} />
                <span>Global | English</span>
                <FilledArrow direction="down" className={isWhite ? "text-black" : "text-white"} />
              </button>

              <button
                className={`flex items-center gap-1.5 uppercase transition-colors ${
                  isWhite ? "text-gray-700" : "text-white"
                }`}
              >
                <Folder size={13} className={isWhite ? "text-red-600" : "text-white"} />
                <span>Saved Items</span>
                <FilledArrow direction="down" className={isWhite ? "text-black" : "text-white"} />
              </button>
            </div>
          </div>
        </div>

        {/* ---------- Main Nav ---------- */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-6">
              <button
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
                className={`transition-colors hover:text-red-600 ${isWhite ? "text-gray-700" : "text-white"}`}
              >
                <Menu size={26} strokeWidth={1.75} />
              </button>

              <Link href="/" className="relative block h-9 w-[190px]">
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
                    onMouseEnter={() => item.items && setOpenDropdown(item.label)}
                  >
                    <button
                      className={`flex items-center gap-1.5 border-b-2 py-1 text-[15px] font-medium transition-colors hover:text-red-600 hover:border-red-600 ${
                        isOpen
                          ? "text-red-600 border-red-600"
                          : `border-transparent ${isWhite ? "text-gray-800" : "text-white"}`
                      }`}
                    >
                      {item.label}
                      {item.items && (
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
          <div className="flex items-center gap-5">
            <button
              className={`hidden items-center gap-2 text-[14px] tracking-[1px] font-medium sm:flex ${
                isWhite ? "text-gray-500" : "text-white"
              }`}
            >
              Explore
              <Search size={23} />
            </button>
            <span className={`h-6 w-px ${isWhite ? "bg-gray-300" : "bg-white"}`} />

            <button className={isWhite ? "text-gray-700" : "text-white"}>
              <Bookmark size={23} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* ---------- Mega dropdown panel ---------- */}
        {mainNav.map((item) => {
          if (!item.items || openDropdown !== item.label) return null;
          const columns = toColumns(item.items);
          return (
            <div
              key={item.label}
              className="absolute left-1/2 top-full z-50 w-full max-w-7xl -translate-x-1/2 overflow-hidden rounded-b-2xl bg-white shadow-xl"
              onMouseEnter={() => setOpenDropdown(item.label)}
            >
              <div className="relative px-8 pt-6 pb-10">
                <h3 className="mb-8 text-[26px] font-semibold leading-[1] text-gray-900">
                  {item.label}
                </h3>

                <div className="grid grid-cols-4 gap-x-16 gap-y-4">
                  {columns.map((col, ci) => (
                    <div key={ci} className="flex flex-col gap-5">
                      {col.map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          className="text-[14px] leading-[1] font-normal text-gray-800 transition-colors hover:text-red-600"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom red bar */}
              <div className="h-[6px] w-full bg-red-600" />
            </div>
          );
        })}
      </header>

      {/* ---------- Sidebar overlay ---------- */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" onClick={closeSidebar} />

        {/* Panel */}
        <div
          className={`absolute left-0 top-0 h-full w-[360px] max-w-[85vw] bg-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close button at top right outer edge */}
          <button
            aria-label="Close menu"
            onClick={closeSidebar}
            className="absolute top-0 left-full flex h-12 w-12 items-center justify-center bg-[#C00000] text-white hover:bg-[#A30000] transition-colors z-50 shadow-md"
          >
            <X size={24} strokeWidth={2.5} className="text-white" />
          </button>

          {/* Content Scroll Container */}
          <div className="relative flex-1 overflow-y-auto px-7 pt-7 pb-6">


            {/* Top Branding Section */}
            <div className="mb-8 flex items-center gap-3">
              {/* Three vertical red bars */}
              <div className="flex gap-[3px] items-center text-red-600">
                <span className="inline-block w-[3.5px] h-6 bg-red-600 rounded-full" />
                <span className="inline-block w-[3.5px] h-6 bg-red-600 rounded-full" />
                <span className="inline-block w-[3.5px] h-6 bg-red-600 rounded-full" />
              </div>

              {/* Logo Image */}
              <Link href="/" onClick={closeSidebar} className="relative block h-10 w-46">
                <Image
                  src="/logo/logo_red_bain.svg"
                  alt="Bain & Company"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </Link>

              {/* Red Circle Arrow Icon */}
              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-red-600 text-red-600 shrink-0">
                <FilledArrow direction="right" size={6} className="text-red-600 ml-[1px]" />
              </div>
            </div>

            {/* ---- Root view ---- */}
            {!sidebarSubmenu && (
              <>
                {/* Main Navigation Items */}
                <nav className="flex flex-col gap-5 ml-10">
                  {mainNav.map((item) => {
                    const hasArrow = item.items !== null || item.label === "Careers";
                    return (
                      <div key={item.label} className="flex items-center">
                        <button
                          onClick={() => item.items && setSidebarSubmenu(item.label)}
                          className="group inline-flex items-center gap-1.5 text-left text-[13px] font-semibold text-gray-900 hover:text-red-600 transition-colors"
                        >
                          <span className="border-b-2 border-transparent pb-0.5 group-hover:border-red-600">
                            {item.label}
                          </span>
                          {hasArrow && (
                            <FilledArrow direction="right" size={8} className="text-red-600" />
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
                        <span className="border-b-2 border-transparent font-medium pb-0.5 group-hover:border-red-600 text-[11px] uppercase">
                          {item.label}
                        </span>
                        {item.hasDropdown && (
                          <FilledArrow direction="right" size={7} className="text-red-600" />
                        )}
                      </button>
                    </div>
                  ))}

                  {/* Global | English */}
                  <div className="flex items-center">
                    <button className="group inline-flex items-center gap-2 text-gray-900 hover:text-red-600 transition-colors">
                      <Globe size={15} className="text-red-600 shrink-0" />
                      <span className="border-b-2 border-transparent pb-0.5 font-medium  group-hover:border-red-600 text-[11px]">
                        GLOBAL | ENGLISH
                      </span>
                      <FilledArrow direction="right" size={7} className="text-red-600" />
                    </button>
                  </div>

                  {/* Saved Items */}
                  <div className="flex items-center">
                    <button className="group inline-flex items-center gap-2 text-gray-900 hover:text-red-600 transition-colors">
                      <Folder size={15} className="text-red-600 shrink-0" />
                      <span className="border-b-2 border-transparent pb-0.5 group-hover:border-red-600">
                        SAVED ITEMS
                      </span>
                      <FilledArrow direction="right" size={7} className="text-red-600" />
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
                  {activeSidebarSubmenu.items?.map((sub) => (
                    <a
                      key={sub}
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

          {/* Bottom Solid Red Strip */}
          <div className="h-6 w-full bg-red-600 shrink-0 rounded-br-2xl" />
        </div>
      </div>
    </>
  );
}