import React from 'react';
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
    return `Floor ${f}`;
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
                className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                  isSelected
                    ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-500/20'
                    : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 shrink-0 mt-0.5">
                  {opt.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {opt.title}
                    </h4>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${opt.badgeColor}`}>
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
