const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src');

// 1. LocationSelector.tsx
const locationSelectorCode = `import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X, User, DoorOpen, Beaker, Landmark, ChevronDown, Check } from 'lucide-react';
import type { LocationOption } from '../types/navigation';
import { searchLocations } from '../services/locationService';

interface LocationSelectorProps {
  label: string;
  selected: LocationOption | null;
  onSelect: (location: LocationOption | null) => void;
  options: LocationOption[];
  placeholder?: string;
  colorScheme?: 'emerald' | 'indigo' | 'amber';
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  label,
  selected,
  onSelect,
  options,
  placeholder = 'Search classroom, teacher, lab, hall...',
  colorScheme = 'indigo',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredBySearch = searchLocations(query, options);
  const filteredByCategory = activeCategory === 'all'
    ? filteredBySearch
    : filteredBySearch.filter((item) => {
        if (activeCategory === 'teacher') return item.category === 'teacher';
        if (activeCategory === 'room') return item.category === 'room';
        if (activeCategory === 'facility') return item.category === 'facility';
        if (activeCategory === 'entrance') return item.category === 'entrance';
        return true;
      });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'teacher':
        return <User className="w-4 h-4 text-purple-400" />;
      case 'facility':
        return <Beaker className="w-4 h-4 text-cyan-400" />;
      case 'entrance':
        return <Landmark className="w-4 h-4 text-emerald-400" />;
      default:
        return <DoorOpen className="w-4 h-4 text-amber-400" />;
    }
  };

  const ringColor = colorScheme === 'emerald'
    ? 'focus-within:ring-emerald-500 border-emerald-500/40 hover:border-emerald-500/70'
    : colorScheme === 'amber'
    ? 'focus-within:ring-amber-500 border-amber-500/40 hover:border-amber-500/70'
    : 'focus-within:ring-indigo-500 border-indigo-500/40 hover:border-indigo-500/70';

  const dotColor = colorScheme === 'emerald'
    ? 'bg-emerald-400 shadow-emerald-500/50'
    : colorScheme === 'amber'
    ? 'bg-amber-400 shadow-amber-500/50'
    : 'bg-indigo-400 shadow-indigo-500/50';

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1 tracking-wide uppercase">
        <span className={\`w-2 h-2 rounded-full \${dotColor} shadow-sm animate-pulse\`} />
        {label}
      </label>

      {/* Input Display Field */}
      <div
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className={\`flex items-center gap-2 px-3 py-2.5 bg-slate-900/90 border rounded-xl cursor-pointer transition-all duration-200 shadow-sm \${ringColor}\`}
      >
        <MapPin className={\`w-4 h-4 shrink-0 \${selected ? (colorScheme === 'emerald' ? 'text-emerald-400' : 'text-indigo-400') : 'text-slate-500'}\`} />

        <div className="flex-1 min-w-0">
          {selected ? (
            <div className="flex items-center justify-between">
              <div className="truncate">
                <div className="text-sm font-semibold text-white truncate flex items-center gap-1.5">
                  {selected.name}
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {selected.building} · F{selected.floor}
                  </span>
                </div>
                <div className="text-xs text-slate-400 truncate">{selected.subtitle}</div>
              </div>
            </div>
          ) : (
            <span className="text-sm text-slate-400 select-none truncate">
              {placeholder}
            </span>
          )}
        </div>

        {selected ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(null);
              setQuery('');
            }}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            title="Clear selection"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-500" />
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-slate-900/98 backdrop-blur-xl border border-slate-700/90 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Search bar inside dropdown */}
          <div className="p-3 border-b border-slate-800 bg-slate-950/70">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type room number, teacher, lab, hall..."
                className="w-full pl-9 pr-8 py-2 bg-slate-800/90 text-sm text-white placeholder-slate-400 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2.5 p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex gap-1.5 mt-2.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: 'All' },
                { id: 'teacher', label: 'Faculty' },
                { id: 'room', label: 'Classrooms' },
                { id: 'facility', label: 'Labs & Halls' },
                { id: 'entrance', label: 'Gates & Foyers' },
              ].map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={\`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors \${
                    activeCategory === category.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                  }\`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-64 overflow-y-auto divide-y divide-slate-800/60 custom-scrollbar">
            {filteredByCategory.length === 0 ? (
              <div className="p-6 text-center text-slate-400">
                <p className="text-sm font-medium text-slate-300">No matching locations</p>
                <p className="text-xs text-slate-500 mt-1">Try searching by room number (e.g. 101), teacher name, or lab</p>
              </div>
            ) : (
              filteredByCategory.map((loc) => {
                const isItemActive = selected?.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => {
                      onSelect(loc);
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className={\`flex items-start gap-3 p-3 cursor-pointer transition-all hover:bg-indigo-950/40 \${
                      isItemActive ? 'bg-indigo-900/30' : ''
                    }\`}
                  >
                    <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 mt-0.5 shrink-0">
                      {getCategoryIcon(loc.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={\`text-sm font-semibold truncate \${isItemActive ? 'text-indigo-300' : 'text-slate-100'}\`}>
                          {loc.name}
                        </span>
                        {isItemActive && <Check className="w-4 h-4 text-indigo-400 shrink-0" />}
                      </div>
                      <div className="text-xs text-slate-400 truncate mt-0.5">
                        {loc.subtitle}
                      </div>
                      {loc.details && (
                        <div className="text-[11px] text-slate-400 font-medium truncate mt-0.5 flex items-center gap-1.5">
                          <span>{loc.details}</span>
                          {loc.accessible && (
                            <span className="text-emerald-400 font-normal">· ♿ Step-Free</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
`;

// 2. TransportSelector.tsx
const transportSelectorCode = `import React from 'react';
import { ArrowUpDown, Footprints, Accessibility, X, CheckCircle2 } from 'lucide-react';
import type { NavigationMode } from '../types/navigation';

interface TransportSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: NavigationMode;
  onSelectMode: (mode: NavigationMode) => void;
  startFloor: number;
  endFloor: number;
}

export const TransportSelector: React.FC<TransportSelectorProps> = ({
  isOpen,
  onClose,
  currentMode,
  onSelectMode,
  startFloor,
  endFloor,
}) => {
  if (!isOpen) return null;

  const getFloorName = (f: number) => {
    if (f === 0) return 'Ground Floor';
    if (f === 1) return 'First Floor';
    if (f === 2) return 'Second Floor';
    return \`Floor \${f}\`;
  };

  const options: {
    mode: NavigationMode;
    title: string;
    description: string;
    icon: React.ReactNode;
    badge: string;
    badgeColor: string;
  }[] = [
    {
      mode: 'lift',
      title: 'Lift / Elevator',
      description: 'Quickest vertical transport. Recommended for convenience and accessible transit.',
      icon: <ArrowUpDown className="w-6 h-6 text-sky-400" />,
      badge: 'Speed & Comfort',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    },
    {
      mode: 'stairs',
      title: 'Staircase',
      description: 'Use the standard campus stairwells. Best for exercise and immediate access without lift wait times.',
      icon: <Footprints className="w-6 h-6 text-amber-400" />,
      badge: 'Active Route',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      mode: 'step-free',
      title: 'Step-Free / Accessible ♿',
      description: 'Strictly excludes all stairs. Forces accessible elevators, ramps, and wide corridors suitable for wheelchairs.',
      icon: <Accessibility className="w-6 h-6 text-emerald-400" />,
      badge: '100% Accessible',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500" />

        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Multi-Floor Transition
              </span>
              <span className="text-xs text-slate-400">
                {getFloorName(startFloor)} → {getFloorName(endFloor)}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              Choose Vertical Transportation
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
          Your route travels across multiple levels. Select your preferred transition method to recalculate the optimal path via Dijkstra's algorithm.
        </p>

        <div className="space-y-3">
          {options.map((opt) => {
            const isSelected = currentMode === opt.mode;
            return (
              <div
                key={opt.mode}
                onClick={() => {
                  onSelectMode(opt.mode);
                  onClose();
                }}
                className={\`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-4 \${
                  isSelected
                    ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-500/20'
                    : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800 hover:border-slate-600'
                }\`}
              >
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 shrink-0 mt-0.5">
                  {opt.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {opt.title}
                    </h4>
                    <span className={\`text-[10px] font-semibold px-2 py-0.5 rounded-full border \${opt.badgeColor}\`}>
                      {opt.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {opt.description}
                  </p>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-1" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
`;

// 3. RouteInfo.tsx
const routeInfoCode = `import React from 'react';
import { Route, Clock, ArrowUpDown, Accessibility, RotateCcw, Footprints } from 'lucide-react';
import type { RouteResult, NavigationMode } from '../types/navigation';
import { formatTime, formatDistance } from '../services/directionService';

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

  const getModeLabel = (mode: NavigationMode) => {
    switch (mode) {
      case 'lift':
        return { label: 'Via Lift', icon: <ArrowUpDown className="w-3.5 h-3.5 text-sky-400" /> };
      case 'stairs':
        return { label: 'Via Stairs', icon: <Footprints className="w-3.5 h-3.5 text-amber-400" /> };
      case 'step-free':
        return { label: 'Step-Free ♿', icon: <Accessibility className="w-3.5 h-3.5 text-emerald-400" /> };
      default:
        return { label: 'Normal Walk', icon: <Route className="w-3.5 h-3.5 text-indigo-400" /> };
    }
  };

  const modeDetails = getModeLabel(currentMode);
  const startName = route.steps[0]?.nodeName || 'Start Point';
  const destName = route.steps[route.steps.length - 1]?.nodeName || 'Destination';

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-4 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Route className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Optimal Route Calculated
            </div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <span className="truncate max-w-[130px]">{startName}</span>
              <span className="text-slate-500">→</span>
              <span className="truncate max-w-[130px]">{destName}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-500/30 transition-all text-xs font-semibold"
          title="Reset current route"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Route</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Route className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Total Distance</div>
            <div className="text-base font-bold text-white">{formatDistance(route.distance)}</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Estimated Walk</div>
            <div className="text-base font-bold text-white">{formatTime(route.estimatedTime)}</div>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
              {modeDetails.icon}
            </div>
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Mode</div>
              <div className="text-xs font-bold text-white truncate">{modeDetails.label}</div>
            </div>
          </div>

          {isMultiFloor && (
            <button
              type="button"
              onClick={onChangeTransport}
              className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shrink-0"
            >
              Change
            </button>
          )}
        </div>
      </div>

      {/* Multi-floor notification bar */}
      {isMultiFloor && (
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs">
          <span className="text-slate-300">
            Floors in Route: {route.floors.map((f) => \`Floor \${f}\`).join(', ')}
          </span>
          <span className="text-indigo-400 font-medium">
            Viewing Floor {activeFloor}
          </span>
        </div>
      )}
    </div>
  );
};
`;

// 4. NavigationInstructions.tsx
const navigationInstructionsCode = `import React, { useState } from 'react';
import { 
  Footprints, 
  CornerDownRight, 
  CornerDownLeft, 
  ArrowUp, 
  ArrowUpDown, 
  MapPin, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Layers 
} from 'lucide-react';
import type { StepInstruction } from '../types/navigation';
import { formatDistance } from '../services/directionService';

interface NavigationInstructionsProps {
  steps: StepInstruction[];
  onSelectFloor?: (floor: number) => void;
  activeFloor: number;
}

export const NavigationInstructions: React.FC<NavigationInstructionsProps> = ({
  steps,
  onSelectFloor,
  activeFloor,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!steps || steps.length === 0) return null;

  const getStepIcon = (dir: StepInstruction['direction']) => {
    switch (dir) {
      case 'left':
      case 'slight-left':
        return <CornerDownLeft className="w-4 h-4 text-amber-400" />;
      case 'right':
      case 'slight-right':
        return <CornerDownRight className="w-4 h-4 text-amber-400" />;
      case 'lift-up':
      case 'lift-down':
      case 'exit-lift':
        return <ArrowUpDown className="w-4 h-4 text-purple-400" />;
      case 'stairs-up':
      case 'stairs-down':
      case 'exit-stairs':
        return <Footprints className="w-4 h-4 text-orange-400" />;
      case 'arrive':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      default:
        return <ArrowUp className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-slate-950/60 hover:bg-slate-800/50 transition-colors text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Footprints className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Turn-by-Turn Directions</h4>
            <p className="text-xs text-slate-400">{steps.length} navigational steps calculated</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {isExpanded && (
        <div className="p-4 divide-y divide-slate-800/80 max-h-72 overflow-y-auto custom-scrollbar">
          {steps.map((step, idx) => {
            const isCurrentFloor = step.floor === activeFloor;
            return (
              <div
                key={step.index}
                onClick={() => onSelectFloor && onSelectFloor(step.floor)}
                className={\`py-2.5 px-2 rounded-xl transition-all cursor-pointer flex items-start gap-3 \${
                  isCurrentFloor
                    ? 'bg-indigo-950/30 border border-indigo-500/30'
                    : 'hover:bg-slate-800/40 border border-transparent'
                }\`}
              >
                {/* Step indicator number */}
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-200">
                    {idx + 1}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-0.5 h-6 bg-slate-800 my-1" />
                  )}
                </div>

                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
                  {getStepIcon(step.direction)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-200 leading-snug">
                    {step.instruction}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                    {step.distance > 0 && (
                      <span>{formatDistance(step.distance)}</span>
                    )}
                    <span className="flex items-center gap-1 text-slate-500">
                      <Layers className="w-3 h-3" /> Floor {step.floor}
                    </span>
                    {isCurrentFloor && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                        Current Map
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
`;

// 5. FloorSelector.tsx
const floorSelectorCode = `import React from 'react';
import { Building2, Layers, AlertCircle } from 'lucide-react';
import { buildings } from '../data/buildings';
import { getFloorsByBuilding } from '../data/floors';
import type { FloorInfo } from '../types/navigation';

interface FloorSelectorProps {
  selectedBuilding: 'AI' | 'MAIN';
  onSelectBuilding: (buildingId: 'AI' | 'MAIN') => void;
  selectedFloor: number;
  onSelectFloor: (floorNumber: number) => void;
  floorsInRoute?: number[];
}

export const FloorSelector: React.FC<FloorSelectorProps> = ({
  selectedBuilding,
  onSelectBuilding,
  selectedFloor,
  onSelectFloor,
  floorsInRoute = [],
}) => {
  const currentFloors = getFloorsByBuilding(selectedBuilding, true);

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-3 shadow-xl space-y-3">
      {/* Building Switcher */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-indigo-400" />
          Building
        </span>

        <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          {buildings.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => onSelectBuilding(b.id as 'AI' | 'MAIN')}
              className={\`px-3 py-1.5 text-xs font-bold rounded-lg transition-all \${
                selectedBuilding === b.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }\`}
            >
              {b.name.replace(' Building', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Floor Buttons */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          Floor
        </span>

        <div className="flex flex-wrap gap-1.5">
          {currentFloors.map((fl: FloorInfo) => {
            const isSelected = selectedFloor === fl.floor;
            const hasRoute = floorsInRoute.includes(fl.floor);

            if (!fl.isAvailable) {
              return (
                <div
                  key={fl.floor}
                  title="Floor plan pending official survey data"
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800/40 text-slate-500 border border-slate-800 cursor-not-allowed flex items-center gap-1"
                >
                  <span>{fl.label}</span>
                  <AlertCircle className="w-3 h-3 text-slate-600" />
                </div>
              );
            }

            return (
              <button
                key={fl.floor}
                type="button"
                onClick={() => onSelectFloor(fl.floor)}
                className={\`relative px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 \${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/30'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700/60'
                }\`}
              >
                <span>{fl.label}</span>
                {hasRoute && (
                  <span
                    className={\`w-1.5 h-1.5 rounded-full \${
                      isSelected ? 'bg-amber-300 animate-pulse' : 'bg-indigo-400 animate-ping'
                    }\`}
                    title="This floor has part of the active route"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
`;

// 6. MapView.tsx
const mapViewCode = `import React, { useState, useRef, useMemo } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Navigation, 
  Layers, 
  Compass, 
  MapPin,
  AlertCircle
} from 'lucide-react';
import type { RouteResult, NavigationNode } from '../types/navigation';
import { getMapConfig } from '../data/maps';
import { navigationNodes } from '../data/navigationNodes';

interface MapViewProps {
  buildingId: 'AI' | 'MAIN';
  floorNumber: number;
  route: RouteResult | null;
  onSelectNode?: (node: NavigationNode) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  buildingId,
  floorNumber,
  route,
  onSelectNode,
}) => {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<NavigationNode | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const mapConfig = getMapConfig(buildingId, floorNumber);

  // Zoom controls
  const handleZoomIn = () => setScale((s) => Math.min(s + 0.25, 3));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.25, 0.6));
  const handleReset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  // Pan dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Lookup map for fast node retrieval by id
  const nodeLookup = useMemo(() => {
    const map = new Map<string, NavigationNode>();
    for (const n of navigationNodes) map.set(n.id, n);
    return map;
  }, []);

  // Filter all nodes on current floor
  const currentFloorNodes = navigationNodes.filter(
    (n) => n.building === buildingId && n.floor === floorNumber
  );

  // Convert route path string IDs to NavigationNode objects
  const fullPathNodes = useMemo(() => {
    if (!route) return [];
    return route.path
      .map((id) => nodeLookup.get(id))
      .filter((n): n is NavigationNode => n !== undefined);
  }, [route, nodeLookup]);

  // Nodes in route on this floor
  const floorPathNodes = fullPathNodes.filter(
    (n) => n.building === buildingId && n.floor === floorNumber
  );

  // Generate SVG polyline points for segments on this floor
  const svgPathSegments: string[] = [];
  if (fullPathNodes.length > 1) {
    let currentSegment: NavigationNode[] = [];
    for (let i = 0; i < fullPathNodes.length; i++) {
      const node = fullPathNodes[i];
      if (node.building === buildingId && node.floor === floorNumber) {
        currentSegment.push(node);
      } else {
        if (currentSegment.length > 1) {
          svgPathSegments.push(
            currentSegment.map((n) => \`\${n.x},\${n.y}\`).join(' ')
          );
        }
        currentSegment = [];
      }
    }
    if (currentSegment.length > 1) {
      svgPathSegments.push(
        currentSegment.map((n) => \`\${n.x},\${n.y}\`).join(' ')
      );
    }
  }

  // Check if starting node is on this floor
  const isStartOnThisFloor =
    fullPathNodes.length > 0 &&
    fullPathNodes[0].building === buildingId &&
    fullPathNodes[0].floor === floorNumber;

  // Check if destination node is on this floor
  const isDestinationOnThisFloor =
    fullPathNodes.length > 0 &&
    fullPathNodes[fullPathNodes.length - 1].building === buildingId &&
    fullPathNodes[fullPathNodes.length - 1].floor === floorNumber;

  // Find lift/stairs transition nodes on this floor
  const transitionNodes = floorPathNodes.filter(
    (n) => n.type === 'lift' || n.type === 'stairs'
  );

  if (!mapConfig) {
    return (
      <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-950 border border-slate-800 rounded-3xl p-8 text-center">
        <AlertCircle className="w-12 h-12 text-amber-500 mb-3 animate-bounce" />
        <h3 className="text-xl font-bold text-white mb-2">Floor Plan Data Pending Survey</h3>
        <p className="text-sm text-slate-400 max-w-md mb-4">
          The blueprints for {buildingId} Building Floor {floorNumber} are currently being mapped and calibrated.
          Please select Ground, First, or Second floor to navigate active maps.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[650px] bg-slate-950 border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Top Floating Overlay Bar */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
        <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-xs font-bold text-white shadow-lg flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>{buildingId === 'AI' ? 'AI Building' : 'Main Building'}</span>
          <span className="text-slate-500">·</span>
          <span className="text-indigo-300">
            {floorNumber === 0 ? 'Ground Floor' : floorNumber === 1 ? 'First Floor' : \`Floor \${floorNumber}\`}
          </span>
        </div>

        {route && (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-xs font-semibold text-emerald-300 shadow-lg flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
            <span>Active Navigation View</span>
          </div>
        )}
      </div>

      {/* Compass / Orientation Icon */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <div className="w-10 h-10 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-center text-slate-300 shadow-lg">
          <Compass className="w-6 h-6 text-indigo-400" />
        </div>
      </div>

      {/* Floating Zoom Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-1.5 rounded-2xl shadow-xl">
        <button
          type="button"
          onClick={handleZoomIn}
          className="p-2 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="p-2 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <div className="h-px bg-slate-800 my-0.5" />
        <button
          type="button"
          onClick={handleReset}
          className="p-2 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors"
          title="Reset View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Hover Info Tooltip */}
      {hoveredNode && (
        <div className="absolute bottom-6 left-6 z-20 pointer-events-none bg-slate-900/95 backdrop-blur-md border border-indigo-500/50 px-4 py-2.5 rounded-2xl shadow-2xl">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            {hoveredNode.name}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Type: {hoveredNode.type.toUpperCase()} · X: {hoveredNode.x}, Y: {hoveredNode.y}
          </div>
        </div>
      )}

      {/* Main Interactive Map & SVG Overlay */}
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          transform: \`translate(\${pan.x}px, \${pan.y}px) scale(\${scale})\`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.15s ease-out',
        }}
      >
        <div
          className="relative"
          style={{
            width: mapConfig.width,
            height: mapConfig.height,
          }}
        >
          {/* Blueprint image background */}
          <img
            src={mapConfig.image}
            alt={\`\${buildingId} Floor \${floorNumber} Map\`}
            className="w-full h-full object-contain pointer-events-none rounded-xl"
            draggable={false}
          />

          {/* SVG Route and Marker Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-auto"
            viewBox={\`0 0 \${mapConfig.width} \${mapConfig.height}\`}
          >
            <defs>
              {/* Glow filter for route line */}
              <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Linear gradient for route */}
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>

            {/* Render Route Polyline Segments */}
            {svgPathSegments.map((segmentPoints, idx) => (
              <g key={idx}>
                {/* Background glow shadow line */}
                <polyline
                  points={segmentPoints}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.3"
                  filter="url(#routeGlow)"
                />
                {/* Foreground animated dashed line */}
                <polyline
                  points={segmentPoints}
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="8 6"
                  className="animate-route-dash"
                />
              </g>
            ))}

            {/* Render Waypoint Dots Along Route */}
            {floorPathNodes.map((node) => (
              <circle
                key={node.id}
                cx={node.x}
                cy={node.y}
                r="4.5"
                fill="#38bdf8"
                stroke="#0f172a"
                strokeWidth="1.5"
                className="transition-all"
              />
            ))}

            {/* Start Node Marker */}
            {isStartOnThisFloor && fullPathNodes[0] && (
              <g
                transform={\`translate(\${fullPathNodes[0].x}, \${fullPathNodes[0].y})\`}
                className="cursor-pointer"
              >
                {/* Pulsing ring */}
                <circle r="18" fill="#10b981" opacity="0.25" className="animate-ping" />
                <circle r="11" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
                <circle r="4" fill="#ffffff" />
                <text
                  x="0"
                  y="-18"
                  textAnchor="middle"
                  fill="#10b981"
                  fontSize="12"
                  fontWeight="bold"
                  stroke="#0f172a"
                  strokeWidth="3"
                  paintOrder="stroke"
                >
                  START
                </text>
              </g>
            )}

            {/* Destination Node Marker */}
            {isDestinationOnThisFloor && fullPathNodes[fullPathNodes.length - 1] && (
              <g
                transform={\`translate(\${fullPathNodes[fullPathNodes.length - 1].x}, \${fullPathNodes[fullPathNodes.length - 1].y})\`}
                className="cursor-pointer"
              >
                {/* Pulsing ring */}
                <circle r="18" fill="#f43f5e" opacity="0.3" className="animate-ping" />
                <circle r="11" fill="#f43f5e" stroke="#ffffff" strokeWidth="2.5" />
                <circle r="4" fill="#ffffff" />
                <text
                  x="0"
                  y="-18"
                  textAnchor="middle"
                  fill="#f43f5e"
                  fontSize="12"
                  fontWeight="bold"
                  stroke="#0f172a"
                  strokeWidth="3"
                  paintOrder="stroke"
                >
                  DESTINATION
                </text>
              </g>
            )}

            {/* Vertical Transition Badges (Lift/Stairs) */}
            {transitionNodes.map((tNode) => (
              <g
                key={\`trans-\${tNode.id}\`}
                transform={\`translate(\${tNode.x}, \${tNode.y})\`}
                className="cursor-pointer"
              >
                <circle r="14" fill="#8b5cf6" opacity="0.3" className="animate-pulse" />
                <circle r="9" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" />
                <text
                  x="0"
                  y="18"
                  textAnchor="middle"
                  fill="#c084fc"
                  fontSize="10"
                  fontWeight="bold"
                  stroke="#0f172a"
                  strokeWidth="2.5"
                  paintOrder="stroke"
                >
                  {tNode.type === 'lift' ? 'LIFT' : 'STAIRS'}
                </text>
              </g>
            ))}

            {/* All Clickable Nodes on this floor */}
            {currentFloorNodes.map((node) => {
              const isStart = fullPathNodes[0]?.id === node.id;
              const isEnd = fullPathNodes[fullPathNodes.length - 1]?.id === node.id;

              if (isStart || isEnd) return null;

              return (
                <circle
                  key={node.id}
                  cx={node.x}
                  cy={node.y}
                  r="3.5"
                  fill={node.type === 'entrance' ? '#10b981' : node.type === 'door' ? '#818cf8' : '#64748b'}
                  opacity={node.type === 'corridor' ? 0.35 : 0.7}
                  className="hover:scale-150 transition-transform cursor-pointer"
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => onSelectNode && onSelectNode(node)}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
`;

// 7. DemoScenarios.tsx
const demoScenariosCode = `import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { LocationOption, NavigationMode } from '../types/navigation';

interface DemoScenario {
  id: string;
  title: string;
  description: string;
  startId: string;
  destId: string;
  mode: NavigationMode;
  tag: string;
  tagColor: string;
}

interface DemoScenariosProps {
  options: LocationOption[];
  onApplyScenario: (start: LocationOption, dest: LocationOption, mode: NavigationMode) => void;
}

export const DemoScenarios: React.FC<DemoScenariosProps> = ({
  options,
  onApplyScenario,
}) => {
  const scenarios: DemoScenario[] = [
    {
      id: 'same-floor',
      title: 'Same Floor (AI Ground)',
      description: 'AI Main Foyer to AI Ground Seminar Hall',
      startId: 'AI_G_ENTRY_MAIN',
      destId: 'AI_G_HALL_01',
      mode: 'normal',
      tag: 'Single Level',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'multi-floor-lift',
      title: 'Multi-Floor via Lift',
      description: 'AI Ground Entrance to 2nd Floor Advanced Lab (Lab 201)',
      startId: 'AI_G_ENTRY_MAIN',
      destId: 'AI_F2_LAB_201',
      mode: 'lift',
      tag: '🛗 Lift Route',
      tagColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    },
    {
      id: 'multi-floor-stairs',
      title: 'Multi-Floor via Stairs',
      description: 'AI Ground to AI 1st Floor HOD / Faculty Wing',
      startId: 'AI_G_ENTRY_MAIN',
      destId: 'AI_F1_ROOM_101',
      mode: 'stairs',
      tag: '🪜 Stairs Route',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'step-free-accessible',
      title: 'Accessible / Step-Free ♿',
      description: 'Ground Floor to 2nd Floor Conference Hall (Zero Stairs)',
      startId: 'AI_G_ENTRY_MAIN',
      destId: 'AI_F2_CONF_HALL',
      mode: 'step-free',
      tag: '♿ Accessible',
      tagColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
    {
      id: 'main-building-tour',
      title: 'Main Building Route',
      description: 'Main Campus Foyer to Principal / Administrative Office',
      startId: 'MAIN_G_ENTRY_WEST',
      destId: 'MAIN_F1_PRINCIPAL',
      mode: 'lift',
      tag: '🏛️ Main Building',
      tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
  ];

  const handleRun = (sc: DemoScenario) => {
    const startLoc = options.find((o) => o.nodeId === sc.startId || o.id === sc.startId);
    const destLoc = options.find((o) => o.nodeId === sc.destId || o.id === sc.destId);

    if (startLoc && destLoc) {
      onApplyScenario(startLoc, destLoc, sc.mode);
    }
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-4 shadow-xl space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Quick Demo Scenarios (Dijkstra Verification)
        </h3>
      </div>
      <p className="text-xs text-slate-400">
        Click any scenario below to instantly test the pathfinding engine across single & multi-floor graphs:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {scenarios.map((sc) => (
          <button
            key={sc.id}
            type="button"
            onClick={() => handleRun(sc)}
            className="p-3 rounded-xl bg-slate-800/70 hover:bg-indigo-950/40 border border-slate-700/60 hover:border-indigo-500/50 transition-all text-left group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className={\`text-[10px] font-semibold px-2 py-0.5 rounded-full border \${sc.tagColor}\`}>
                  {sc.tag}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                {sc.title}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-2">
                {sc.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
`;

// 8. Feedback.tsx
const feedbackCode = `import React, { useState } from 'react';
import { Star, MessageSquare, Send, X, ThumbsUp, CheckCircle } from 'lucide-react';
import { feedbackService } from '../services/feedbackService';
import type { FeedbackItem } from '../types/navigation';

interface FeedbackProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Feedback: React.FC<FeedbackProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [category, setCategory] = useState<FeedbackItem['category']>('Route Accuracy');
  const [userName, setUserName] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(feedbackService.getFeedback());

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comments.trim()) return;

    await feedbackService.submitFeedback({
      rating,
      category,
      name: userName.trim() || undefined,
      message: comments.trim(),
    });

    setIsSubmitted(true);
    setFeedbackList(feedbackService.getFeedback());
    setTimeout(() => {
      setIsSubmitted(false);
      setComments('');
      onClose();
    }, 1800);
  };

  const categories: FeedbackItem['category'][] = [
    'Route Accuracy',
    'Map Issue',
    'Wrong Teacher/Room Information',
    'UI/Design',
    'Other',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl p-6 overflow-hidden">
        {/* Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-indigo-500 to-amber-400" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">System Feedback & Ratings</h3>
              <p className="text-xs text-slate-400">Help us refine campus navigation algorithms</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <CheckCircle className="w-12 h-12 text-emerald-400 mb-3 animate-bounce" />
            <h4 className="text-lg font-bold text-white">Feedback Submitted!</h4>
            <p className="text-xs text-slate-300 mt-1">
              Thank you for helping us improve the MITS Indoor Campus Navigation System.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Star Rating */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">
                Rate Route Accuracy & Experience
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-125 transition-transform"
                  >
                    <Star
                      className={\`w-6 h-6 \${
                        (hoverRating || rating) >= star
                          ? 'text-amber-400 fill-amber-400 drop-shadow-sm'
                          : 'text-slate-600'
                      }\`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-amber-300 ml-2">
                  {rating} of 5 Stars
                </span>
              </div>
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">
                Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={\`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all \${
                      category === c
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                    }\`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Name / Roll No */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wide">
                Name or Roll No. (Optional)
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Prashant S. / 0901CS221000"
                className="w-full px-3.5 py-2 bg-slate-800 text-sm text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Comments */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wide">
                Comments & Suggestions *
              </label>
              <textarea
                required
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="e.g. Route from Ground foyer to Lab 201 via lift was very accurate..."
                className="w-full px-3.5 py-2 bg-slate-800 text-sm text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Feedback
              </button>
            </div>
          </form>
        )}

        {/* Recent Feedback Feed */}
        {feedbackList.length > 0 && !isSubmitted && (
          <div className="mt-6 pt-4 border-t border-slate-800">
            <h5 className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
              <ThumbsUp className="w-3 h-3 text-indigo-400" /> Recent Campus Submissions
            </h5>
            <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar pr-1">
              {feedbackList.slice(0, 3).map((item) => (
                <div key={item.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="font-semibold text-white">{item.name || 'Anonymous User'}</span>
                    <div className="flex text-amber-400">
                      {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                    </div>
                  </div>
                  <p className="text-slate-400 mt-1 line-clamp-2 text-[11px]">{item.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
`;

// 9. AboutModal.tsx
const aboutModalCode = `import React from 'react';
import { Info, X, Cpu, GitFork, Code, Award } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">About MITS Indoor Campus Navigation</h3>
              <p className="text-xs text-slate-400">Technical Overview & System Architecture</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar pr-2 py-4 space-y-5 text-xs text-slate-300 leading-relaxed">
          {/* Executive Summary */}
          <div>
            <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-400" /> Project Objective
            </h4>
            <p>
              The <strong>MITS Indoor Campus Navigation System</strong> is an enterprise-grade navigation platform designed for
              <strong> Madhav Institute of Technology & Science (MITS), Gwalior</strong>. It enables real-time mathematical shortest path
              calculation using an unweighted/weighted graph topology mapped directly to authoritative engineering blueprints.
            </p>
          </div>

          {/* Dijkstra Algorithm Breakdown */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-sky-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> Dijkstra's Algorithm Implementation
            </h4>
            <p>
              Unlike mock prototypes with pre-recorded paths, this application runs a pure, manual TypeScript implementation of
              <strong> Dijkstra's Shortest Path Algorithm</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li><strong>Time Complexity</strong>: O((V + E) log V) using priority queue relaxation over adjacency lists.</li>
              <li><strong>Cost Metric</strong>: True Euclidean metric distances in meters (v = 1.4 m/s average human walking speed).</li>
              <li><strong>Vertical Penalties</strong>: Dynamic cost weighting factoring in lift waiting times (15s) vs staircase flight traversal (25s).</li>
              <li><strong>Accessibility Matrix</strong>: Real-time edge filtering that completely prunes non-accessible edges and stairs when <em>Step-Free Mode (♿)</em> is chosen.</li>
            </ul>
          </div>

          {/* Data Decoupling */}
          <div>
            <h4 className="text-sm font-bold text-white mb-1.5 flex items-center gap-1.5">
              <GitFork className="w-4 h-4 text-purple-400" /> Modular Architecture & Data Decoupling
            </h4>
            <p>
              The application adheres to clean enterprise separation:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300 mt-1">
              <li><code className="text-indigo-300">src/data/teachers.ts</code>: Master faculty roster with cabins and designations.</li>
              <li><code className="text-indigo-300">src/data/rooms.ts</code>: Labs, lecture halls, conference rooms, departments.</li>
              <li><code className="text-indigo-300">src/data/navigationNodes.ts</code> & <code className="text-indigo-300">navigationEdges.ts</code>: Spatial graph geometry.</li>
              <li><code className="text-indigo-300">AI Building Floor 3</code>: Architecture is extensible; floor 3 remains flagged as survey pending without artificial mock points.</li>
            </ul>
          </div>

          {/* Parent Company & Credits */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
                Parent Company
              </div>
              <div className="text-base font-black text-white tracking-wide">
                Code Yoddha
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Empowering Campus Innovation & Advanced Spatial Systems
              </div>
            </div>
            <div className="p-2.5 rounded-2xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
              <Code className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
`;

// 10. Footer.tsx
const footerCode = `import React from 'react';
import { Cpu } from 'lucide-react';
import { navigationNodes } from '../data/navigationNodes';
import { navigationEdges } from '../data/navigationEdges';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-8 border-t border-slate-800/80 bg-slate-950/90 py-6 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Institute & Parent Company */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200">
              MITS Indoor Campus Navigation System
            </span>
          </div>
          <span className="hidden sm:inline text-slate-600">|</span>
          <div className="text-slate-300">
            Madhav Institute of Technology & Science, Gwalior
          </div>
          <span className="hidden sm:inline text-slate-600">|</span>
          <div className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold tracking-wide">
            Parent Company: Code Yoddha
          </div>
        </div>

        {/* Right: Graph Metrics */}
        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>Dijkstra Engine: <strong className="text-white">Active</strong></span>
          </div>
          <span>•</span>
          <div>
            <span>Nodes: <strong className="text-white">{navigationNodes.length}</strong></span>
          </div>
          <span>•</span>
          <div>
            <span>Edges: <strong className="text-white">{navigationEdges.length}</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
`;

// 12. App.tsx
const appTsxCode = `import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeftRight, Navigation } from 'lucide-react';
import { Header } from './components/Header';
import { LocationSelector } from './components/LocationSelector';
import { TransportSelector } from './components/TransportSelector';
import { MapView } from './components/MapView';
import { RouteInfo } from './components/RouteInfo';
import { NavigationInstructions } from './components/NavigationInstructions';
import { FloorSelector } from './components/FloorSelector';
import { DemoScenarios } from './components/DemoScenarios';
import { Feedback } from './components/Feedback';
import { AboutModal } from './components/AboutModal';
import { Footer } from './components/Footer';

import type { LocationOption, NavigationMode, RouteResult, NavigationNode } from './types/navigation';
import { getAllLocationOptions } from './services/locationService';
import { buildGraph, dijkstra } from './algorithms/dijkstra';
import { generateDirections } from './services/directionService';
import { navigationNodes } from './data/navigationNodes';
import { navigationEdges } from './data/navigationEdges';

export const App: React.FC = () => {
  // Master locations catalog
  const locationOptions = useMemo(() => getAllLocationOptions(), []);

  // Prebuild master navigation graph
  const graph = useMemo(() => buildGraph(navigationNodes, navigationEdges), []);

  // Selection states
  const [startLocation, setStartLocation] = useState<LocationOption | null>(null);
  const [destLocation, setDestLocation] = useState<LocationOption | null>(null);
  const [navigationMode, setNavigationMode] = useState<NavigationMode>('normal');

  // Building & Floor viewing states
  const [currentBuilding, setCurrentBuilding] = useState<'AI' | 'MAIN'>('AI');
  const [currentFloor, setCurrentFloor] = useState<number>(0);

  // Active route calculation result
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);

  // Modal states
  const [isTransportModalOpen, setIsTransportModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Recalculate route whenever start, dest, or navigationMode changes
  useEffect(() => {
    if (!startLocation || !destLocation) {
      setRouteResult(null);
      return;
    }

    // Check if start and destination are different floors or buildings
    const isMultiFloor = startLocation.floor !== destLocation.floor || startLocation.building !== destLocation.building;

    // Default mode for multi-floor if still 'normal'
    let effectiveMode = navigationMode;
    if (isMultiFloor && effectiveMode === 'normal') {
      effectiveMode = 'lift';
      setNavigationMode('lift');
    }

    const dijkstraResult = dijkstra(
      graph,
      startLocation.nodeId,
      destLocation.nodeId,
      effectiveMode
    );

    if (dijkstraResult) {
      const fullRoute = generateDirections(
        dijkstraResult.path,
        dijkstraResult.distance,
        graph.nodes,
        navigationEdges,
        effectiveMode
      );
      setRouteResult(fullRoute);

      // Automatically sync map view to start location's building & floor
      setCurrentBuilding(startLocation.building);
      setCurrentFloor(startLocation.floor);

      // Prompt vertical transport choice modal once if multi-floor
      if (isMultiFloor && navigationMode === 'normal') {
        setIsTransportModalOpen(true);
      }
    } else {
      setRouteResult(null);
    }
  }, [startLocation, destLocation, navigationMode, graph]);

  // Swap start and destination
  const handleSwap = () => {
    const temp = startLocation;
    setStartLocation(destLocation);
    setDestLocation(temp);
  };

  // Reset entire navigation
  const handleResetRoute = () => {
    setStartLocation(null);
    setDestLocation(null);
    setRouteResult(null);
    setNavigationMode('normal');
  };

  // Apply quick demo scenario
  const handleApplyDemo = (start: LocationOption, dest: LocationOption, mode: NavigationMode) => {
    setStartLocation(start);
    setDestLocation(dest);
    setNavigationMode(mode);
    setCurrentBuilding(start.building);
    setCurrentFloor(start.floor);
  };

  // Click on a map node to set destination
  const handleMapNodeClick = (node: NavigationNode) => {
    const matched = locationOptions.find((loc) => loc.nodeId === node.id);
    if (matched) {
      if (!startLocation) {
        setStartLocation(matched);
      } else {
        setDestLocation(matched);
      }
    }
  };

  const currentBuildingDisplayName = currentBuilding === 'AI' ? 'AI Building' : 'Main Building';
  const currentFloorDisplayName = currentFloor === 0 ? 'Ground Floor' : currentFloor === 1 ? 'First Floor' : \`Floor \${currentFloor}\`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Header
        onOpenFeedback={() => setIsFeedbackModalOpen(true)}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        currentBuildingName={currentBuildingDisplayName}
        currentFloorName={currentFloorDisplayName}
      />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Quick Demo Scenarios */}
        <DemoScenarios
          options={locationOptions}
          onApplyScenario={handleApplyDemo}
        />

        {/* Core Navigation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel: Search, Controls & Instructions */}
          <div className="lg:col-span-5 space-y-4">
            {/* Search & Selection Card */}
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-4 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-indigo-400" />
                  Route Planner
                </span>
                {(startLocation || destLocation) && (
                  <button
                    type="button"
                    onClick={handleResetRoute}
                    className="text-[11px] font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Start Point Input */}
              <LocationSelector
                label="Start Location (Origin)"
                selected={startLocation}
                onSelect={setStartLocation}
                options={locationOptions}
                placeholder="Choose or search origin (e.g. AI Main Foyer)"
                colorScheme="emerald"
              />

              {/* Swap Button */}
              <div className="flex justify-center -my-1">
                <button
                  type="button"
                  onClick={handleSwap}
                  disabled={!startLocation && !destLocation}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                  title="Swap Start and Destination"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Destination Point Input */}
              <LocationSelector
                label="Destination Location"
                selected={destLocation}
                onSelect={setDestLocation}
                options={locationOptions}
                placeholder="Search teacher, classroom, lab, hall..."
                colorScheme="indigo"
              />

              {/* Multi-floor transition banner if applicable */}
              {startLocation && destLocation && (startLocation.floor !== destLocation.floor || startLocation.building !== destLocation.building) && (
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    Mode: <strong className="text-white capitalize">{navigationMode}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsTransportModalOpen(true)}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                  >
                    Change Transport
                  </button>
                </div>
              )}
            </div>

            {/* Route Metrics Dashboard */}
            {routeResult && (
              <RouteInfo
                route={routeResult}
                currentMode={navigationMode}
                onReset={handleResetRoute}
                onChangeTransport={() => setIsTransportModalOpen(true)}
                activeFloor={currentFloor}
              />
            )}

            {/* Step-by-Step Directions */}
            {routeResult && routeResult.steps && (
              <NavigationInstructions
                steps={routeResult.steps}
                onSelectFloor={setCurrentFloor}
                activeFloor={currentFloor}
              />
            )}
          </div>

          {/* Right Panel: Interactive Map View & Floor Switchers */}
          <div className="lg:col-span-7 space-y-4">
            {/* Building & Floor Selector */}
            <FloorSelector
              selectedBuilding={currentBuilding}
              onSelectBuilding={setCurrentBuilding}
              selectedFloor={currentFloor}
              onSelectFloor={setCurrentFloor}
              floorsInRoute={routeResult?.floors || []}
            />

            {/* Interactive Blueprint Map View */}
            <MapView
              buildingId={currentBuilding}
              floorNumber={currentFloor}
              route={routeResult}
              onSelectNode={handleMapNodeClick}
            />
          </div>
        </div>
      </main>

      {/* Vertical Transport Modal */}
      <TransportSelector
        isOpen={isTransportModalOpen}
        onClose={() => setIsTransportModalOpen(false)}
        currentMode={navigationMode}
        onSelectMode={setNavigationMode}
        startFloor={startLocation?.floor ?? 0}
        endFloor={destLocation?.floor ?? 0}
      />

      {/* Feedback Modal */}
      <Feedback
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />

      {/* About System Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
`;

// Write all files
const filesToWrite = [
  { path: path.join(srcDir, 'components', 'LocationSelector.tsx'), content: locationSelectorCode },
  { path: path.join(srcDir, 'components', 'TransportSelector.tsx'), content: transportSelectorCode },
  { path: path.join(srcDir, 'components', 'RouteInfo.tsx'), content: routeInfoCode },
  { path: path.join(srcDir, 'components', 'NavigationInstructions.tsx'), content: navigationInstructionsCode },
  { path: path.join(srcDir, 'components', 'FloorSelector.tsx'), content: floorSelectorCode },
  { path: path.join(srcDir, 'components', 'MapView.tsx'), content: mapViewCode },
  { path: path.join(srcDir, 'components', 'DemoScenarios.tsx'), content: demoScenariosCode },
  { path: path.join(srcDir, 'components', 'Feedback.tsx'), content: feedbackCode },
  { path: path.join(srcDir, 'components', 'AboutModal.tsx'), content: aboutModalCode },
  { path: path.join(srcDir, 'components', 'Footer.tsx'), content: footerCode },
  { path: path.join(srcDir, 'App.tsx'), content: appTsxCode },
];

for (const f of filesToWrite) {
  fs.mkdirSync(path.dirname(f.path), { recursive: true });
  fs.writeFileSync(f.path, f.content, 'utf8');
  console.log('Updated:', path.relative(srcDir, f.path));
}
console.log('All components updated successfully!');
