import React from 'react';
import {
  Route,
  Clock,
  ArrowUpDown,
  Accessibility,
  RotateCcw,
  Footprints,
} from 'lucide-react';

import type { RouteResult, NavigationMode } from '../types/navigation';
import { formatTime } from '../services/directionService';

interface RouteInfoProps {
  route: RouteResult | null;
  currentMode: NavigationMode;
  onReset: () => void;
  onChangeTransport: () => void;
  activeFloor: number;
}

export const RouteInfo: React.FC<RouteInfoProps> = ({
  route,
  currentMode,
  onReset,
  onChangeTransport,
  activeFloor,
}) => {
  if (!route) return null;

  const isMultiFloor = route.floors.length > 1;

  const getModeDetails = (mode: NavigationMode) => {
    switch (mode) {
      case 'lift':
        return {
          label: 'Via Lift',
          description: 'Use the lift for floor transfer',
          icon: <ArrowUpDown className="w-5 h-5" />,
          iconClass:
            'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25',
          glowClass:
            'hover:border-sky-500/40 hover:shadow-[0_12px_30px_rgba(14,165,233,0.10)]',
        };

      case 'stairs':
        return {
          label: 'Via Stairs',
          description: 'Use the staircase for floor transfer',
          icon: <Footprints className="w-5 h-5" />,
          iconClass:
            'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
          glowClass:
            'hover:border-amber-500/40 hover:shadow-[0_12px_30px_rgba(245,158,11,0.10)]',
        };

      case 'step-free':
        return {
          label: 'Step-Free',
          description: 'Accessible route without stairs',
          icon: <Accessibility className="w-5 h-5" />,
          iconClass:
            'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
          glowClass:
            'hover:border-emerald-500/40 hover:shadow-[0_12px_30px_rgba(16,185,129,0.10)]',
        };

      case 'normal':
      default:
        return {
          label: 'Normal Walk',
          description: 'Standard walking route',
          icon: <Route className="w-5 h-5" />,
          iconClass:
            'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/25',
          glowClass:
            'hover:border-indigo-500/40 hover:shadow-[0_12px_30px_rgba(99,102,241,0.10)]',
        };
    }
  };

  const modeDetails = getModeDetails(currentMode);

  return (
    <div
      className="
        premium-card
        relative
        overflow-hidden
        bg-white
        dark:bg-[#1B0D15]
        border
        border-[#E3C5D5]
        dark:border-[#4A2035]
        rounded-3xl
        p-4
        sm:p-5
        shadow-[0_8px_30px_rgba(151,20,77,0.07)]
        dark:shadow-[0_12px_35px_rgba(0,0,0,0.30)]
        space-y-4
        transition-colors
        duration-300
      "
    >
      {/* Decorative glow */}
      <div
        className="
          pointer-events-none
          absolute
          -top-20
          -right-20
          w-40
          h-40
          rounded-full
          bg-[#C2185B]/5
          dark:bg-[#C2185B]/10
          blur-3xl
        "
      />

      {/* =====================================================
          ROUTE HEADER
      ====================================================== */}
      <div
        className="
          relative
          flex
          items-center
          justify-between
          gap-3
          pb-4
          border-b
          border-[#E8D5DF]
          dark:border-[#3A202C]
        "
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="
              group
              p-2.5
              rounded-xl
              bg-indigo-500/10
              text-indigo-600
              dark:text-indigo-400
              border border-indigo-500/20
              transition-all
              duration-300
              hover:scale-105
              hover:rotate-2
              hover:bg-indigo-500/15
            "
          >
            <Route
              className="
                w-5 h-5
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />
          </div>

          <div className="min-w-0">
            <div
              className="
                text-[10px]
                sm:text-[11px]
                font-bold
                text-[#8B7881]
                dark:text-slate-400
                uppercase
                tracking-[0.12em]
              "
            >
              Optimal Route Found
            </div>

            <div className="text-sm font-bold text-[#241820] dark:text-white flex items-center gap-1.5 min-w-0 mt-0.5">
              <span className="truncate">
                {route.steps[0]?.nodeName || 'Start'}
              </span>

              <span className="text-[#C9A5B7] dark:text-slate-500 shrink-0">
                →
              </span>

              <span className="truncate">
                {route.steps[route.steps.length - 1]?.nodeName ||
                  'Destination'}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="
            premium-button
            group
            flex
            items-center
            gap-1.5
            px-3
            py-2
            rounded-xl
            bg-[#F8F1F6]
            hover:bg-[#F3E2EB]
            dark:bg-[#28131E]
            dark:hover:bg-[#351824]
            text-[#6B5963]
            hover:text-[#97144D]
            dark:text-slate-300
            dark:hover:text-[#F08AB4]
            border
            border-[#E3C5D5]
            hover:border-[#C2185B]/30
            dark:border-[#4A2035]
            dark:hover:border-[#633049]
            text-xs
            font-semibold
            transition-all
            duration-300
            shrink-0
          "
          title="Reset current route"
        >
          <RotateCcw
            className="
              w-3.5 h-3.5
              transition-transform
              duration-500
              group-hover:rotate-[-45deg]
            "
          />

          <span className="hidden sm:inline">
            New Route
          </span>
        </button>
      </div>

      {/* =====================================================
          METRICS
      ====================================================== */}
      <div className="grid grid-cols-2 gap-3">
        {/* Distance */}
        <div
          className="
            premium-card
            group
            p-3.5
            rounded-2xl
            bg-[#FCF8FA]
            dark:bg-[#24131C]
            border
            border-[#E8D5DF]
            dark:border-[#422331]
            flex
            items-center
            gap-3
            cursor-default
          "
        >
          <div
            className="
              p-2.5
              rounded-xl
              bg-indigo-500/10
              text-indigo-600
              dark:text-indigo-400
              border border-indigo-500/15
              transition-all
              duration-300
              group-hover:scale-110
            "
          >
            <Route className="w-4 h-4" />
          </div>

          <div className="min-w-0">
            <div className="text-[10px] sm:text-[11px] text-[#8B7881] dark:text-slate-400 font-medium">
              Total Distance
            </div>

            <div className="text-base font-extrabold text-[#241820] dark:text-white mt-0.5">
              {Math.round(route.distance)} m
            </div>
          </div>
        </div>

        {/* Time */}
        <div
          className="
            premium-card
            group
            p-3.5
            rounded-2xl
            bg-[#FCF8FA]
            dark:bg-[#24131C]
            border
            border-[#E8D5DF]
            dark:border-[#422331]
            flex
            items-center
            gap-3
            cursor-default
          "
        >
          <div
            className="
              p-2.5
              rounded-xl
              bg-emerald-500/10
              text-emerald-600
              dark:text-emerald-400
              border border-emerald-500/15
              transition-all
              duration-300
              group-hover:scale-110
            "
          >
            <Clock className="w-4 h-4" />
          </div>

          <div className="min-w-0">
            <div className="text-[10px] sm:text-[11px] text-[#8B7881] dark:text-slate-400 font-medium">
              Estimated Walk
            </div>

            <div className="text-base font-extrabold text-[#241820] dark:text-white mt-0.5">
              {formatTime(route.estimatedTime)}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MODE CARD
      ====================================================== */}
      <div
        className={`
          premium-card
          group
          relative
          overflow-hidden
          rounded-2xl
          bg-[#FCF8FA]
          dark:bg-[#24131C]
          border
          border-[#E8D5DF]
          dark:border-[#422331]
          p-4
          flex
          items-center
          justify-between
          gap-4
          transition-all
          duration-300
          ${modeDetails.glowClass}
        `}
      >
        {/* Hover accent */}
        <div
          className="
            absolute
            left-0
            top-0
            bottom-0
            w-1
            bg-gradient-to-b
            from-[#C2185B]
            to-indigo-500
            opacity-40
            group-hover:opacity-100
            transition-opacity
            duration-300
          "
        />

        <div className="flex items-center gap-3 min-w-0">
          {/* Mode icon */}
          <div
            className={`
              w-12
              h-12
              rounded-xl
              border
              flex
              items-center
              justify-center
              shrink-0
              transition-all
              duration-400
              group-hover:scale-110
              group-hover:-rotate-2
              ${modeDetails.iconClass}
            `}
          >
            {modeDetails.icon}
          </div>

          {/* Mode information */}
          <div className="min-w-0">
            <div
              className="
                text-[11px]
                font-bold
                text-[#8B7881]
                dark:text-slate-400
                uppercase
                tracking-wider
              "
            >
              Mode
            </div>

            <div
              className="
                text-base
                font-extrabold
                text-[#241820]
                dark:text-white
                mt-0.5
                truncate
                transition-colors
                duration-300
              "
            >
              {modeDetails.label}
            </div>

            <div className="text-[10px] sm:text-[11px] text-[#8B7881] dark:text-slate-500 mt-0.5 truncate">
              {modeDetails.description}
            </div>
          </div>
        </div>

        {/* Change */}
        {isMultiFloor && (
          <button
            type="button"
            onClick={onChangeTransport}
            className="
              premium-button
              shrink-0
              px-3
              py-2
              rounded-xl
              bg-[#97144D]
              hover:bg-[#7D103F]
              text-white
              border border-[#C2185B]/30
              shadow-sm
              hover:shadow-md
              hover:shadow-[#97144D]/20
              text-[11px]
              font-bold
              transition-all
              duration-300
            "
          >
            Change
          </button>
        )}
      </div>

      {/* =====================================================
          MULTI-FLOOR INFORMATION
      ====================================================== */}
      {isMultiFloor && (
        <div
          className="
            route-highlight
            group
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-2
            px-4
            py-3
            rounded-2xl
            bg-indigo-500/5
            dark:bg-indigo-500/10
            border
            border-indigo-500/20
            text-xs
          "
        >
          <div className="flex items-center gap-2 text-[#6B5963] dark:text-slate-300">
            <span
              className="
                w-2
                h-2
                rounded-full
                bg-indigo-500
                shadow-[0_0_10px_rgba(99,102,241,0.5)]
                animate-pulse
              "
            />

            <span>
              Path spans Floors:{' '}
              <strong className="text-[#241820] dark:text-white">
                {route.floors.map((f) => `F${f}`).join(', ')}
              </strong>
            </span>
          </div>

          <span
            className="
              text-indigo-600
              dark:text-indigo-400
              font-bold
              sm:text-right
            "
          >
            Viewing Floor {activeFloor}
          </span>
        </div>
      )}
    </div>
  );
};

export default RouteInfo;