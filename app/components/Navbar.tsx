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
          {/* Left cluster: hamburger + logo + nav links, all grouped together
              (previously the nav links were a separate flex child, which made
              `justify-between` push them out toward the middle of the header
              instead of sitting right next to the logo). */}
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
                {/* Place your two logo files inside /public/logo/ */}
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
              className="absolute left-1/2 top-full z-50 w-full max-w-7xl -translate-x-1/2 overflow-hidden border border-gray-100 bg-white shadow-xl"
              onMouseEnter={() => setOpenDropdown(item.label)}
            >
              {/* Panel is capped at max-w-7xl (same width as the nav container)
                  and centered — NOT full viewport width. Layout is stacked:
                  heading on its own row, then the columns below it, both
                  starting at the same left edge (px-8 matches the nav row). */}
              <div className="relative px-8 py-10">
                <h3 className="mb-8 text-[36px] font-semibold leading-[1] text-gray-900">
                  {item.label}
                </h3>

                <div className="grid grid-cols-4 gap-x-16 gap-y-4">
                  {columns.map((col, ci) => (
                    <div key={ci} className="flex flex-col gap-5">
                      {col.map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          className="text-[18px] leading-[1] font-normal text-gray-800 transition-colors hover:text-red-600"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom red bar spans the full panel width */}
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
        <div className="absolute inset-0 bg-black/40" onClick={closeSidebar} />

        {/* Panel */}
        <div
          className={`absolute left-0 top-0 h-full w-full max-w-[390px] bg-white shadow-xl transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close button */}
          <button
            aria-label="Close menu"
            onClick={closeSidebar}
            className="absolute -right-11 top-0 flex h-11 w-11 items-center justify-center bg-red-600 text-white hover:bg-red-700"
          >
            <X size={20} strokeWidth={2} />
          </button>

          <div className="h-full overflow-y-auto px-8 py-8">
            {/* ---- Root view ---- */}
            {!sidebarSubmenu && (
              <>
                <Link
                  href="/"
                  className="mb-8 flex items-center gap-2 text-lg font-bold uppercase tracking-wide text-red-600"
                >
                  <span className="text-xl leading-none">|||</span>
                  Bain &amp; Company
                </Link>

                <nav className="flex flex-col gap-5">
                  {mainNav.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => item.items && setSidebarSubmenu(item.label)}
                      className="group flex items-center justify-between text-left text-[17px] font-medium text-gray-800 hover:text-red-600"
                    >
                      <span className="border-b-2 border-transparent pb-0.5 group-hover:border-red-600">
                        {item.label}
                      </span>
                      {item.items && <FilledArrow direction="right" size={10} />}
                    </button>
                  ))}
                </nav>

                <div className="my-6 h-px w-full bg-gray-200" />

                <nav className="flex flex-col gap-5">
                  {topNav.map((item) => (
                    <button
                      key={item.label}
                      className="group flex items-center justify-between text-left text-[13px] font-semibold uppercase tracking-wide text-gray-700 hover:text-red-600"
                    >
                      <span className="border-b-2 border-transparent pb-0.5 group-hover:border-red-600">
                        {item.label}
                      </span>
                      {item.hasDropdown && <FilledArrow direction="right" size={9} />}
                    </button>
                  ))}

                  <button className="group flex items-center gap-1.5 text-left text-[13px] font-semibold uppercase tracking-wide text-red-600 hover:text-red-700">
                    <Globe size={14} />
                    <span className="border-b-2 border-transparent pb-0.5 group-hover:border-red-600">
                      Global | English
                    </span>
                    <FilledArrow direction="right" size={9} />
                  </button>

                  <button className="group flex items-center gap-1.5 text-left text-[13px] font-semibold uppercase tracking-wide text-red-600 hover:text-red-700">
                    <Folder size={14} />
                    <span className="border-b-2 border-transparent pb-0.5 group-hover:border-red-600">
                      Saved Items
                    </span>
                    <FilledArrow direction="right" size={9} />
                  </button>
                </nav>
              </>
            )}

            {/* ---- Submenu (drill-down) view ---- */}
            {sidebarSubmenu && activeSidebarSubmenu && (
              <>
                <button
                  onClick={() => setSidebarSubmenu(null)}
                  className="mb-6 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-red-600 hover:text-red-700"
                >
                  <FilledArrow direction="left" size={9} />
                  Main menu
                </button>

                <div className="mb-4 h-px w-full bg-gray-200" />

                <h3 className="mb-4 text-[17px] font-semibold text-gray-900">{activeSidebarSubmenu.label}</h3>

                <nav className="flex flex-col gap-4">
                  {activeSidebarSubmenu.items?.map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      className="group flex items-center text-[15px] text-gray-700 hover:text-red-600"
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
        </div>
      </div>
    </>
  );
}