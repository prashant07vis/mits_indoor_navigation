import React, { useState } from 'react';
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

  const getStepIcon = (direction: StepInstruction['direction']) => {
    switch (direction) {
      case 'left':
      case 'slight-left':
        return <CornerDownLeft className="w-4 h-4 text-amber-400" />;
      case 'right':
      case 'slight-right':
        return <CornerDownRight className="w-4 h-4 text-amber-400" />;
      case 'straight':
        return <ArrowUp className="w-4 h-4 text-sky-400" />;
      case 'lift-up':
      case 'lift-down':
        return <ArrowUpDown className="w-4 h-4 text-purple-400" />;
      case 'stairs-up':
      case 'stairs-down':
        return <Footprints className="w-4 h-4 text-orange-400" />;
      case 'start':
        return <MapPin className="w-4 h-4 text-emerald-400" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
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
            <h4 className="text-sm font-bold text-white">Step-by-Step Directions</h4>
            <p className="text-xs text-slate-400">{steps.length} navigational actions calculated</p>
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
                key={step.nodeId || idx}
                onClick={() => onSelectFloor && onSelectFloor(step.floor)}
                className={`py-2.5 px-2 rounded-xl transition-all cursor-pointer flex items-start gap-3 ${
                  isCurrentFloor
                    ? 'bg-indigo-950/30 border border-indigo-500/30'
                    : 'hover:bg-slate-800/40 border border-transparent'
                }`}
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
                      <span>{Math.round(step.distance)} meters</span>
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
