import React, { useCallback, useEffect, useState } from 'react';

/*
 * How long the splash stays on screen before it
 * slides away, and how long the slide-away takes.
 */
const SHOW_MS = 2800;
const EXIT_MS = 750;

type Phase = 'show' | 'exit' | 'done';

const OUTLINE = '#4A0E2E';

const splashCss = `
@keyframes splash-logo-in {
  0%   { opacity: 0; transform: scale(0.55) rotate(-8deg); }
  70%  { opacity: 1; transform: scale(1.06) rotate(1deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}
@keyframes splash-pin-bounce {
  0%, 100% { transform: translateY(0); }
  45%      { transform: translateY(-13px); }
}
@keyframes splash-shadow {
  0%, 100% { transform: scale(1);   opacity: 0.30; }
  45%      { transform: scale(0.6); opacity: 0.15; }
}
@keyframes splash-march {
  to { stroke-dashoffset: -26; }
}
@keyframes splash-twinkle {
  0%, 100% { opacity: 0.25; transform: scale(0.7); }
  50%      { opacity: 1;    transform: scale(1.1); }
}
@keyframes splash-fade-up {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes splash-progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes splash-slide-up {
  0%   { transform: translateY(0);     border-radius: 0; }
  100% { transform: translateY(-104%); border-radius: 0 0 50% 50% / 0 0 9% 9%; }
}
@keyframes splash-fade-out {
  to { opacity: 0; }
}

.splash-logo   { animation: splash-logo-in 700ms cubic-bezier(.2,.9,.3,1.2) both; }
.splash-pin    { animation: splash-pin-bounce 1.1s ease-in-out 800ms infinite; }
.splash-shadow {
  transform-box: fill-box;
  transform-origin: center;
  animation: splash-shadow 1.1s ease-in-out 800ms infinite;
}
.splash-route  { animation: splash-march 1s linear infinite; }
.splash-spark  {
  transform-box: fill-box;
  transform-origin: center;
  animation: splash-twinkle 1.6s ease-in-out infinite;
}
.splash-title   { animation: splash-fade-up 600ms ease-out 450ms both; }
.splash-tagline { animation: splash-fade-up 600ms ease-out 700ms both; }
.splash-sub     { animation: splash-fade-up 600ms ease-out 950ms both; }
.splash-bar     {
  transform-origin: left center;
  animation: splash-progress ${SHOW_MS}ms cubic-bezier(.4,0,.2,1) both;
}
.splash-exit {
  animation: splash-slide-up ${EXIT_MS}ms cubic-bezier(.76,0,.24,1) forwards;
}

@media (prefers-reduced-motion: reduce) {
  .splash-pin, .splash-shadow, .splash-route, .splash-spark { animation: none; }
  .splash-logo, .splash-title, .splash-tagline, .splash-sub { animation-duration: 1ms; }
  .splash-exit { animation: splash-fade-out ${EXIT_MS}ms ease forwards; }
}
`;

/* ============================================================
   CARTOON MAP LOGO
============================================================ */

const MapLogo: React.FC = () => (
  <svg
    viewBox="0 0 200 190"
    className="w-52 h-52 sm:w-60 sm:h-60 drop-shadow-[0_14px_24px_rgba(0,0,0,0.35)]"
    aria-hidden="true"
  >
    {/* ---------- folded map ---------- */}
    <g transform="rotate(-4 100 110)" strokeLinejoin="round" strokeLinecap="round">
      {/* left panel */}
      <polygon
        points="30,70 75,60 75,150 30,160"
        fill="#FFF3F8"
        stroke={OUTLINE}
        strokeWidth="5"
      />
      {/* middle panel */}
      <polygon
        points="75,60 125,72 125,162 75,150"
        fill="#FFD3E5"
        stroke={OUTLINE}
        strokeWidth="5"
      />
      {/* right panel */}
      <polygon
        points="125,72 170,60 170,150 125,162"
        fill="#FFF3F8"
        stroke={OUTLINE}
        strokeWidth="5"
      />

      {/* park */}
      <rect
        x="38"
        y="92"
        width="22"
        height="17"
        rx="7"
        fill="#9FE3B0"
        stroke={OUTLINE}
        strokeWidth="2.5"
      />
      <circle cx="45" cy="100" r="2.4" fill="#3FAE63" />
      <circle cx="53" cy="102" r="2.4" fill="#3FAE63" />

      {/* building */}
      <rect
        x="88"
        y="92"
        width="17"
        height="17"
        rx="3"
        fill="#FFD9A8"
        stroke={OUTLINE}
        strokeWidth="2.5"
      />
      <rect x="92" y="96" width="4" height="4" fill="#FFF3F8" />
      <rect x="98" y="96" width="4" height="4" fill="#FFF3F8" />

      {/* pond */}
      <ellipse
        cx="148"
        cy="128"
        rx="13"
        ry="8"
        fill="#9AD8F6"
        stroke={OUTLINE}
        strokeWidth="2.5"
      />
      <path
        d="M141 128 q3 -3 6 0 t6 0"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
      />

      {/* route */}
      <path
        className="splash-route"
        d="M42 140 C 58 108, 82 150, 100 120 S 128 98, 140 82"
        fill="none"
        stroke="#E11D6A"
        strokeWidth="5"
        strokeDasharray="8 7"
      />

      {/* start dot */}
      <circle
        cx="42"
        cy="140"
        r="7"
        fill="#FFFFFF"
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* pin shadow */}
      <ellipse
        className="splash-shadow"
        cx="140"
        cy="84"
        rx="11"
        ry="3.2"
        fill="#000000"
      />

      {/* pin */}
      <g transform="translate(140 82)">
        <g className="splash-pin">
          <path
            d="M0 0 C -13 -15 -19 -24 -19 -34 a19 19 0 1 1 38 0 C 19 -24 13 -15 0 0 Z"
            fill="#F0366F"
            stroke={OUTLINE}
            strokeWidth="5"
          />
          <circle
            cx="0"
            cy="-34"
            r="7.5"
            fill="#FFFFFF"
            stroke={OUTLINE}
            strokeWidth="3"
          />
          {/* shine */}
          <path
            d="M-12 -42 q2 -8 9 -10"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            opacity="0.8"
          />
        </g>
      </g>
    </g>

    {/* ---------- sparkles ---------- */}
    <path
      className="splash-spark"
      d="M20 40 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z"
      fill="#FFE27A"
      style={{ animationDelay: '0.1s' }}
    />
    <path
      className="splash-spark"
      d="M176 34 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 z"
      fill="#FFFFFF"
      style={{ animationDelay: '0.7s' }}
    />
    <path
      className="splash-spark"
      d="M178 170 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z"
      fill="#FFE27A"
      style={{ animationDelay: '1.1s' }}
    />
  </svg>
);

/* ============================================================
   SPLASH SCREEN
============================================================ */

export const SplashScreen: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('show');

  const startExit = useCallback(() => {
    setPhase((current) => (current === 'show' ? 'exit' : current));
  }, []);

  /* automatic slide-away */
  useEffect(() => {
    const timer = window.setTimeout(startExit, SHOW_MS);
    return () => window.clearTimeout(timer);
  }, [startExit]);

  /* remove from the page after the slide-away finishes */
  useEffect(() => {
    if (phase !== 'exit') return;

    const timer = window.setTimeout(
      () => setPhase('done'),
      EXIT_MS
    );

    return () => window.clearTimeout(timer);
  }, [phase]);

  /* no page scrolling behind the splash */
  useEffect(() => {
    if (phase === 'done') return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  if (phase === 'done') {
    return null;
  }

  return (
    <div
      role="status"
      aria-label="Loading MITS Indoor Navigation"
      onClick={startExit}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-6 text-center text-white cursor-pointer select-none ${
        phase === 'exit' ? 'splash-exit' : ''
      }`}
      style={{
        background:
          'radial-gradient(circle at 50% 38%, #C2185B 0%, #97144D 45%, #5E0B30 100%)',
      }}
    >
      <style>{splashCss}</style>

      {/* soft dotted texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(#ffffff 1.2px, transparent 1.2px)',
          backgroundSize: '26px 26px',
        }}
      />

      {/* glow behind the logo */}
      <div
        aria-hidden="true"
        className="absolute w-80 h-80 rounded-full bg-white/10 blur-3xl"
        style={{ top: '16%' }}
      />

      <div className="relative flex flex-col items-center">
        <div className="splash-logo">
          <MapLogo />
        </div>

        <h1 className="splash-title mt-4 text-3xl sm:text-4xl font-black tracking-tight">
          Welcome to MITS
        </h1>

        <p className="splash-tagline mt-2 max-w-xs sm:max-w-md text-sm sm:text-base font-semibold text-white/90">
          Madhav Institute of Technology &amp; Science, Gwalior
        </p>

        <p className="splash-sub mt-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-white/70">
          Your indoor campus guide
        </p>

        {/* progress */}
        <div className="mt-8 h-1.5 w-44 sm:w-56 rounded-full bg-white/20 overflow-hidden">
          <div className="splash-bar h-full w-full rounded-full bg-white" />
        </div>
      </div>

      <p className="absolute bottom-6 text-[11px] font-medium text-white/50">
        Tap anywhere to skip
      </p>
    </div>
  );
};

export default SplashScreen;