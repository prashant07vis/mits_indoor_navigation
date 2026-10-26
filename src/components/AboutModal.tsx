import React from 'react';
import {
  Info,
  X,
  Navigation,
  Building2,
  Accessibility,
  Users,
  MapPin,
  CheckCircle2,
  Code,
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const features = [
  {
    icon: Navigation,
    title: 'Easy Navigation',
    description:
      'Get clear, step-by-step guidance to reach your selected destination.',
  },
  {
    icon: Building2,
    title: 'Multi-Floor Support',
    description:
      'Navigate classrooms, labs and offices across different floors.',
  },
  {
    icon: Accessibility,
    title: 'Accessible Routes',
    description:
      'Choose step-free routes when accessibility is required.',
  },
  {
    icon: MapPin,
    title: 'Location Search',
    description:
      'Quickly find classrooms, faculty offices, laboratories and important campus locations.',
  },
];

const users = [
  'Students',
  'Faculty & Staff',
  'New Students',
  'Campus Visitors',
];

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl shadow-black/40 animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-400">
              <Info className="w-5 h-5" />
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                About MITS Indoor Campus Navigation
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Smart wayfinding for the MITS campus
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto custom-scrollbar max-h-[calc(90vh-150px)] px-6 py-6 space-y-7">

          {/* Hero / Introduction */}
          <section>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Built for MITS Gwalior
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Navigate your campus
              <span className="text-indigo-400"> with confidence.</span>
            </h3>

            <p className="mt-3 text-sm sm:text-[15px] text-slate-300 leading-7 max-w-xl">
              MITS Indoor Campus Navigation is designed to make moving
              through academic buildings simpler and more convenient for
              students, faculty, staff and visitors.
            </p>

            <p className="mt-3 text-sm sm:text-[15px] text-slate-400 leading-7 max-w-xl">
              Instead of wondering where a classroom, laboratory or faculty
              office is located, users can select their starting point and
              destination and receive clear indoor navigation guidance.
            </p>
          </section>

          {/* Why It Matters */}
          <section className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Why Indoor Navigation?
                </h3>

                <p className="mt-2 text-sm text-slate-400 leading-6">
                  Finding a specific room inside a large academic building
                  can be confusing, especially for new students and visitors.
                  Indoor navigation helps reduce this confusion by providing
                  a clear path to the required location.
                </p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section>
            <div className="mb-4">
              <h3 className="text-base sm:text-lg font-bold text-white">
                What you can do
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Everything you need for a smoother campus experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group p-4 rounded-2xl bg-slate-800/50 border border-slate-700/70 hover:bg-slate-800 hover:border-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:text-indigo-300 group-hover:bg-indigo-500/15 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {feature.title}
                        </h4>

                        <p className="mt-1 text-xs text-slate-400 leading-5">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Designed For */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-purple-400" />

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Designed for the MITS Community
                </h3>

                <p className="text-xs text-slate-400 mt-0.5">
                  Helpful for anyone navigating the campus.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {users.map((user) => (
                <div
                  key={user}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700/60 hover:border-purple-500/30 hover:bg-slate-800/70 transition-all duration-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />

                  <span className="text-xs sm:text-sm font-medium text-slate-300">
                    {user}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Campus Statement */}
          <section className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/50 via-slate-900 to-purple-950/30 p-5">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <h3 className="text-sm font-bold text-indigo-300">
                Built around the campus experience
              </h3>

              <p className="mt-2 text-sm text-slate-300 leading-6">
                The system focuses on making indoor movement at MITS more
                intuitive, reducing unnecessary searching and helping users
                reach the right place with greater confidence.
              </p>
            </div>
          </section>

          {/* Parent Company */}
          <section className="flex items-center justify-between gap-4 p-5 rounded-2xl bg-slate-800/40 border border-slate-700/70">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                Developed by
              </div>

              <div className="mt-1 text-base font-extrabold text-white">
                Code Yoddha
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Empowering campus innovation through technology.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
              <Code className="w-5 h-5" />
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 flex justify-end bg-slate-900/95">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;