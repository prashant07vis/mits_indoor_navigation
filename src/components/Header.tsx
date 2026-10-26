import React, { useEffect, useState } from 'react';
import {
  Compass,
  Info,
  Layers,
  ShieldCheck,
  Moon,
  Sun,
} from 'lucide-react';
import { navigationConfig } from '../config/navigationConfig';

interface HeaderProps {
  onOpenAbout: () => void;
  currentBuildingName: string;
  currentFloorName: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAbout,
  currentBuildingName,
  currentFloorName,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('mits-theme') === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('mits-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('mits-theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <header
      className="
        sticky top-0 z-40
        bg-white/95 dark:bg-[#1B0D15]/95
        backdrop-blur-xl
        border-b border-[#E3C5D5] dark:border-[#4A2035]
        px-4 lg:px-8 py-3.5
        shadow-[0_4px_20px_rgba(151,20,77,0.08)]
        dark:shadow-[0_4px_25px_rgba(0,0,0,0.4)]
        transition-all duration-300
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* =====================================================
            BRAND
        ====================================================== */}
        <div className="flex items-center gap-3 min-w-0">

          {/* Logo */}
          <div
            className="
              group
              relative
              flex items-center justify-center
              w-10 h-10
              rounded-xl
              bg-gradient-to-br
              from-[#97144D]
              to-[#C2185B]
              text-white
              shrink-0
              cursor-pointer
              shadow-lg
              shadow-[#97144D]/25
              transition-all
              duration-500
              ease-out
              hover:scale-110
              hover:-rotate-3
              hover:shadow-xl
              hover:shadow-[#C2185B]/40
            "
          >
            <Compass
              className="
                w-5 h-5
                transition-transform
                duration-500
                group-hover:rotate-45
                group-hover:scale-110
              "
            />

            {/* Online indicator */}
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span
                className="
                  animate-ping
                  absolute
                  inline-flex
                  h-full
                  w-full
                  rounded-full
                  bg-[#C2185B]
                  opacity-50
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  rounded-full
                  h-3 w-3
                  bg-[#C2185B]
                  border-2 border-white
                  dark:border-[#1B0D15]
                "
              />
            </span>
          </div>

          {/* Brand text */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">

              <h1
                className="
                  text-base sm:text-lg
                  font-extrabold
                  tracking-tight
                  text-[#241820]
                  dark:text-white
                  leading-none
                  truncate
                  transition-colors duration-300
                "
              >
                {navigationConfig.appName}
              </h1>

              {/* Production badge */}
              <span
                className="
                  hidden md:inline-flex
                  items-center gap-1
                  text-[10px]
                  font-semibold
                  tracking-wider
                  uppercase
                  px-2 py-0.5
                  rounded-full
                  bg-[#F3E7EF]
                  dark:bg-[#351524]
                  text-[#97144D]
                  dark:text-[#F08AB4]
                  border border-[#E3C5D5]
                  dark:border-[#633049]
                  transition-all duration-300
                  hover:bg-[#E8D3DF]
                  dark:hover:bg-[#45202F]
                "
              >
                <ShieldCheck className="w-3 h-3" />
                Production Grade
              </span>
            </div>

            <p
              className="
                text-xs
                text-[#6B5963]
                dark:text-[#C9B6C0]
                mt-0.5
                font-medium
                truncate
                transition-colors duration-300
              "
            >
              {navigationConfig.collegeName}
            </p>
          </div>
        </div>


        {/* =====================================================
            RIGHT ACTIONS
        ====================================================== */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">

          {/* ===================================================
              ACTIVE BUILDING / FLOOR
          =================================================== */}
          <div
            className="
              hidden lg:flex
              group
              items-center gap-1.5
              px-3 py-1.5
              rounded-lg
              bg-[#F8F1F6]
              dark:bg-[#28131E]
              border border-[#E3C5D5]
              dark:border-[#4A2035]
              text-xs
              font-semibold
              text-[#4A3942]
              dark:text-[#E8D8DF]
              cursor-default
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-[#C2185B]/40
              hover:shadow-[0_6px_18px_rgba(194,24,91,0.10)]
              dark:hover:shadow-[0_6px_20px_rgba(194,24,91,0.15)]
            "
          >
            <Layers
              className="
                w-3.5 h-3.5
                text-[#C2185B]
                transition-transform duration-300
                group-hover:scale-110
                group-hover:-rotate-6
              "
            />

            <span>{currentBuildingName}</span>

            <span className="text-[#C9A5B7]">
              /
            </span>

            <span className="text-[#97144D] dark:text-[#F08AB4]">
              {currentFloorName}
            </span>
          </div>


          {/* ===================================================
              ABOUT BUTTON
          =================================================== */}
          <button
            type="button"
            onClick={onOpenAbout}
            className="
              premium-button
              group
              relative
              flex items-center gap-1.5
              px-3 py-1.5
              rounded-lg
              bg-[#97144D]
              hover:bg-[#7D103F]
              text-white
              text-xs
              font-semibold
              shadow-md
              shadow-[#97144D]/20
              hover:shadow-lg
              hover:shadow-[#97144D]/30
              transition-all duration-300
              active:scale-95
            "
            aria-label="About Navigation System"
          >
            <Info
              className="
                w-4 h-4
                transition-transform duration-300
                group-hover:scale-110
                group-hover:rotate-6
              "
            />

            <span className="hidden sm:inline">
              About
            </span>
          </button>


          {/* ===================================================
              DARK / LIGHT MODE
          =================================================== */}
          <button
            type="button"
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="
              group
              relative
              w-10 h-9
              rounded-lg
              bg-[#F3E7EF]
              dark:bg-[#351524]
              hover:bg-[#E8D3DF]
              dark:hover:bg-[#45202F]
              border
              border-[#E3C5D5]
              dark:border-[#633049]
              text-[#97144D]
              dark:text-[#F08AB4]
              flex items-center justify-center
              overflow-hidden
              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-lg
              hover:shadow-[#C2185B]/15
              active:scale-95
            "
            aria-label={
              isDarkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
            title={
              isDarkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
          >
            {isDarkMode ? (
              <Sun
                className="
                  w-4 h-4
                  transition-all duration-500
                  group-hover:rotate-45
                  group-hover:scale-110
                "
              />
            ) : (
              <Moon
                className="
                  w-4 h-4
                  transition-all duration-500
                  group-hover:-rotate-12
                  group-hover:scale-110
                "
              />
            )}

            {/* Small hover glow */}
            <span
              className="
                pointer-events-none
                absolute inset-0
                bg-gradient-to-r
                from-transparent
                via-white/15
                to-transparent
                -translate-x-full
                group-hover:translate-x-full
                transition-transform duration-700
              "
            />
          </button>

        </div>
      </div>
    </header>
  );
};