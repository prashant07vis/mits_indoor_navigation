import React from 'react';
import { Building2, Layers, AlertCircle } from 'lucide-react';
import { buildings } from '../data/buildings';
import { getFloorsByBuilding } from '../data/floors';

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
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedBuilding === b.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
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
          {currentFloors.map((fl) => {
            const isSelected = selectedFloor === fl.floor;
            const hasRoute = floorsInRoute.includes(fl.floor);

            if (!fl.isAvailable) {
              return (
                <div
                  key={fl.floor}
                  title={fl.statusNote || 'Floor plan pending official survey data'}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800/40 text-slate-500 border border-slate-800 cursor-not-allowed flex items-center gap-1"
                >
                  <span>F{fl.floor}</span>
                  <AlertCircle className="w-3 h-3 text-slate-600" />
                </div>
              );
            }

            return (
              <button
                key={fl.floor}
                type="button"
                onClick={() => onSelectFloor(fl.floor)}
                className={`relative px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/30'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700/60'
                }`}
              >
                <span>{fl.label}</span>
                {hasRoute && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-amber-300 animate-pulse' : 'bg-indigo-400 animate-ping'
                    }`}
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
