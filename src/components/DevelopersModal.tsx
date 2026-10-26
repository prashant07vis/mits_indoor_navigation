import React from 'react';
import { Users, X, GraduationCap, Linkedin, Github } from 'lucide-react';

interface Developer {
  name: string;
  role: string;
  photo?: string; // path under /public, e.g. '/developers/prashant.jpg'
  linkedin?: string;
  github?: string;
}

const developers: Developer[] = [
  { name: 'Prashant Vishwakarma', role: 'Full-Stack Developer', photo: '/developers/prashant.jpg' },
  { name: 'Shiv Sharma', role: 'Full-Stack Developer', photo: '/developers/shiv.jpg' },
  { name: 'Gourav Soni', role: 'Full-Stack Developer', photo: '/developers/gourav.jpg' },
];

interface DevelopersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DevelopersModal: React.FC<DevelopersModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Meet the Developers</h3>
              <p className="text-xs text-slate-400">The team behind this project</p>
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

        <div className="overflow-y-auto custom-scrollbar pr-1 py-5 space-y-6">
          {/* Developer Circles */}
          <div className="grid grid-cols-3 gap-4">
            {developers.map((dev, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-2">
                <div
  className="
    group
    w-20 h-20
    sm:w-24 sm:h-24
    rounded-full
    overflow-hidden
    bg-gradient-to-tr
    from-teal-500
    via-indigo-500
    to-purple-500
    p-[2.5px]
    shadow-lg
    shadow-teal-500/20
    transition-all
    duration-500
    ease-out
    hover:scale-110
    hover:-translate-y-1
    hover:shadow-xl
    hover:shadow-teal-500/40
    cursor-pointer
  "
>
  <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center">
    {dev.photo ? (
      <img
        src={dev.photo}
        alt={dev.name}
        className="
          w-full
          h-full
          object-cover
          transition-transform
          duration-700
          ease-out
          group-hover:scale-110
        "
      />
    ) : (
      <Users className="w-8 h-8 text-slate-500" />
    )}

    {/* Hover Shine */}
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        rounded-full
        bg-gradient-to-tr
        from-transparent
        via-white/20
        to-transparent
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-500
      "
    />
  </div>
</div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">{dev.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{dev.role}</div>
                </div>
                {(dev.linkedin || dev.github) && (
                  <div className="flex items-center gap-2 mt-0.5">
                    {dev.linkedin && (
  <a
    href={dev.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-500 hover:text-teal-400 transition-colors"
  >
    <Linkedin className="w-3.5 h-3.5" />
  </a>
)}


                    {dev.github && (
  <a
    href={dev.github}
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-500 hover:text-teal-400 transition-colors"
  >
    <Github className="w-3.5 h-3.5" />
  </a>
)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mentor Credit */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30 flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Under the valuable guidance of <strong className="text-white">Dr. Tej Singh Sir</strong>
            </p>
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