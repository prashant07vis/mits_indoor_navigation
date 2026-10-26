import React from 'react';
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
      description: 'AI Main Foyer to AI Ground Room M005',
      startId: 'AI_G_ENTRY_MAIN',
      destId: 'AI_G_M005_ENTRY',
      mode: 'normal',
      tag: 'Single Level',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'multi-floor-lift',
      title: 'Multi-Floor via Lift',
      description: 'AI Ground Entrance to 2nd Floor Room M201',
      startId: 'AI_G_ENTRY_MAIN',
      destId: 'AI_F2_M201_ENTRY',
      mode: 'lift',
      tag: '🛗 Lift Route',
      tagColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    },
    {
      id: 'multi-floor-stairs',
      title: 'Multi-Floor via Stairs',
      description: 'AI Ground to AI 1st Floor Room M101',
      startId: 'AI_G_ENTRY_MAIN',
      destId: 'AI_F1_M101_ENTRY',
      mode: 'stairs',
      tag: '🪜 Stairs Route',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'step-free-accessible',
      title: 'Accessible / Step-Free ♿',
      description: 'Ground Floor to 2nd Floor Pro Vice-Chancellor Office (Zero Stairs)',
      startId: 'AI_G_ENTRY_MAIN',
      destId: 'AI_F2_PVC_ENTRY',
      mode: 'step-free',
      tag: '♿ Accessible',
      tagColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
    {
      id: 'main-building-tour',
      title: 'Main Building Route',
      description: 'Main Campus Foyer to HoD Office (ECE), 2nd Floor',
      startId: 'MAIN_G_FOYER_ENTRY',
      destId: 'MAIN_F2_HOD_ECE_ENTRY',
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
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${sc.tagColor}`}>
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
