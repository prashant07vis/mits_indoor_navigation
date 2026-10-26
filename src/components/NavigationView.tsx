import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Accessibility,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Footprints,
  LocateFixed,
  MapPin,
  Navigation,
  RotateCcw,
  Signpost,
  Sparkles,
  Timer,
  TrendingUp,
  Volume2,
  VolumeX,
  Play,
} from 'lucide-react';

import type {
  NavigationMode,
  NavigationNode,
  RouteResult,
  StepInstruction,
} from '../types/navigation';

import {
  formatDistance,
  formatTime,
} from '../services/directionService';

import { navigationNodes } from '../data/navigationNodes';
import {
  speakInstruction,
  stopVoiceNavigation,
  replayInstruction,
  isVoiceNavigationSupported,
} from '../services/voiceNavigation';

interface NavigationViewProps {
  route: RouteResult;
  currentMode: NavigationMode;
  onReset: () => void;
}

/* ============================================================
   MAP CONSTANTS
============================================================ */

const SVG_WIDTH = 1000;
const SVG_HEIGHT = 620;

const MAP_PADDING = 90;

/* ============================================================
   NODE MAP
============================================================ */

const nodeMap = new Map<string, NavigationNode>(
  navigationNodes.map((node) => [node.id, node])
);

/* ============================================================
   DIRECTION TITLE
============================================================ */

const getDirectionTitle = (
  direction: StepInstruction['direction']
): string => {
  switch (direction) {
    case 'left':
      return 'Turn Left';
    case 'right':
      return 'Turn Right';
    case 'slight-left':
      return 'Bear Slightly Left';
    case 'slight-right':
      return 'Bear Slightly Right';
    case 'lift-up':
      return 'Take Lift Up';
    case 'lift-down':
      return 'Take Lift Down';
    case 'stairs-up':
      return 'Take Stairs Up';
    case 'stairs-down':
      return 'Take Stairs Down';
    case 'exit-lift':
      return 'Exit Lift';
    case 'exit-stairs':
      return 'Exit Stairs';
    case 'enter-building':
      return 'Enter Building';
    case 'arrive':
      return 'Destination Reached';
    case 'start':
      return 'Start Navigation';
    case 'straight':
    default:
      return 'Continue Straight';
  }
};

/* ============================================================
   DIRECTION ICON
============================================================ */

const getDirectionIcon = (
  direction: StepInstruction['direction']
) => {
  switch (direction) {
    case 'left':
      return <ArrowLeft className="w-10 h-10" />;
    case 'right':
      return <ArrowRight className="w-10 h-10" />;
    case 'slight-left':
      return <ArrowLeft className="w-9 h-9 rotate-[15deg]" />;
    case 'slight-right':
      return <ArrowRight className="w-9 h-9 -rotate-[15deg]" />;
    case 'lift-up':
    case 'stairs-up':
      return <ArrowUp className="w-10 h-10" />;
    case 'lift-down':
    case 'stairs-down':
      return <ArrowDown className="w-10 h-10" />;
    case 'exit-lift':
    case 'exit-stairs':
      return <ChevronRight className="w-10 h-10" />;
    case 'arrive':
      return <CheckCircle2 className="w-10 h-10" />;
    case 'enter-building':
      return <Signpost className="w-10 h-10" />;
    case 'start':
      return <Navigation className="w-10 h-10" />;
    case 'straight':
    default:
      return <ArrowUp className="w-10 h-10" />;
  }
};

/* ============================================================
   MODE LABEL
============================================================ */

const getModeLabel = (mode: NavigationMode): string => {
  switch (mode) {
    case 'lift':
      return 'Via Lift';
    case 'stairs':
      return 'Via Stairs';
    case 'step-free':
      return 'Step-Free';
    case 'normal':
    default:
      return 'Normal Walk';
  }
};

/* ============================================================
   IMPORTANT NAVIGATION POINT
============================================================ */

const isImportantNavigationPoint = (
  step: StepInstruction
): boolean => {
  return (
    step.direction === 'left' ||
    step.direction === 'right' ||
    step.direction === 'slight-left' ||
    step.direction === 'slight-right' ||
    step.direction === 'lift-up' ||
    step.direction === 'lift-down' ||
    step.direction === 'stairs-up' ||
    step.direction === 'stairs-down' ||
    step.direction === 'exit-lift' ||
    step.direction === 'exit-stairs' ||
    step.direction === 'enter-building' ||
    step.direction === 'arrive' ||
    step.type === 'door' ||
    step.type === 'stairs' ||
    step.type === 'lift' ||
    step.type === 'gate' ||
    step.type === 'entrance'
  );
};

/* ============================================================
   MAP POINT LABEL
============================================================ */

const getPointLabel = (step: StepInstruction): string => {
  switch (step.direction) {
    case 'left':
      return 'TURN LEFT';
    case 'right':
      return 'TURN RIGHT';
    case 'slight-left':
      return 'SLIGHT LEFT';
    case 'slight-right':
      return 'SLIGHT RIGHT';
    case 'lift-up':
      return 'LIFT UP';
    case 'lift-down':
      return 'LIFT DOWN';
    case 'stairs-up':
      return 'STAIRS UP';
    case 'stairs-down':
      return 'STAIRS DOWN';
    case 'exit-lift':
      return 'EXIT LIFT';
    case 'exit-stairs':
      return 'EXIT STAIRS';
    case 'enter-building':
      return 'ENTER BUILDING';
    case 'arrive':
      return 'DESTINATION';
    default:
      if (step.type === 'door') {
        return `PASS BY ${step.nodeName}`;
      }
      return step.nodeName;
  }
};

/* ============================================================
   NODE TYPE LABEL
============================================================ */

const getNodeTypeLabel = (node: NavigationNode): string => {
  switch (node.type) {
    case 'door':
      return 'Room / Door';
    case 'lift':
      return 'Lift';
    case 'stairs':
      return 'Stairs';
    case 'gate':
      return 'Gate';
    case 'entrance':
      return 'Entrance';
    case 'corridor':
      return 'Corridor';
    default:
      return node.type;
  }
};

/* ============================================================
   NAVIGATION VIEW
============================================================ */

export const NavigationView: React.FC<NavigationViewProps> = ({
  route,
  currentMode,
  onReset,
}) => {
  /*
   * The user moves through the generated route manually
   * using Previous / Next. Later this same state can be
   * controlled by QR checkpoints or indoor positioning.
   */
  const [activeStep, setActiveStep] = useState(0);

  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const steps = route.steps;

  /* ==========================================================
     SAFE ACTIVE STEP
  ========================================================== */

  const safeStep = Math.min(
    activeStep,
    Math.max(steps.length - 1, 0)
  );

  const currentStep = steps[safeStep];

  useEffect(() => {
    if (!voiceEnabled || !currentStep) return;

    speakInstruction(currentStep.instruction);

    return () => {
      stopVoiceNavigation();
    };
  }, [voiceEnabled, safeStep, currentStep]);

  useEffect(() => {
    setActiveStep(0);
    stopVoiceNavigation();
  }, [route]);

  /* ==========================================================
     ROUTE NODES
  ========================================================== */

  const routeNodes = useMemo(() => {
    return route.path
      .map((nodeId, index) => {
        const node = nodeMap.get(nodeId);

        if (!node) {
          return null;
        }

        return { node, index };
      })
      .filter(
        (
          item
        ): item is {
          node: NavigationNode;
          index: number;
        } => item !== null
      );
  }, [route.path]);

  /* ==========================================================
     CURRENT BUILDING / FLOOR
  ========================================================== */

  const currentFloor = currentStep?.floor ?? 0;

  const currentBuilding = currentStep?.building ?? 'AI';

  /* ==========================================================
     FLOOR ROUTE
  ========================================================== */

  const floorRoute = useMemo(() => {
    return routeNodes.filter(
      ({ node }) =>
        node.floor === currentFloor &&
        node.building === currentBuilding
    );
  }, [routeNodes, currentFloor, currentBuilding]);

  /* ==========================================================
     SCALE ACTUAL NODE COORDINATES TO SVG
  ========================================================== */

  const svgPoints = useMemo(() => {
    if (floorRoute.length === 0) {
      return [];
    }

    const xs = floorRoute.map(({ node }) => node.x);
    const ys = floorRoute.map(({ node }) => node.y);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);

    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const coordinateWidth = Math.max(maxX - minX, 1);
    const coordinateHeight = Math.max(maxY - minY, 1);

    const availableWidth = SVG_WIDTH - MAP_PADDING * 2;
    const availableHeight = SVG_HEIGHT - MAP_PADDING * 2;

    const scaleX = availableWidth / coordinateWidth;
    const scaleY = availableHeight / coordinateHeight;

    const scale = Math.min(scaleX, scaleY);

    const renderedWidth = coordinateWidth * scale;
    const renderedHeight = coordinateHeight * scale;

    const offsetX = (SVG_WIDTH - renderedWidth) / 2;
    const offsetY = (SVG_HEIGHT - renderedHeight) / 2;

    return floorRoute.map(({ node, index }) => ({
      node,
      index,
      x: offsetX + (node.x - minX) * scale,
      y: offsetY + (node.y - minY) * scale,
    }));
  }, [floorRoute]);

  /* ==========================================================
     CURRENT POINT
  ========================================================== */

  const currentPoint = svgPoints.find(
    (point) => point.index === safeStep
  );

  /* ==========================================================
     COMPLETED / UPCOMING ROUTE
  ========================================================== */

  const completedPoints = svgPoints.filter(
    (point) => point.index <= safeStep
  );

  const upcomingPoints = svgPoints.filter(
    (point) => point.index >= safeStep
  );

  /* ==========================================================
     SVG ROUTE STRINGS
  ========================================================== */

  const completedPath = completedPoints
    .map((point) => `${point.x},${point.y}`)
    .join(' ');

  const upcomingPath = upcomingPoints
    .map((point) => `${point.x},${point.y}`)
    .join(' ');

  /* ==========================================================
     DESTINATION
  ========================================================== */

  const destinationNode =
    routeNodes[routeNodes.length - 1]?.node;

  /* ==========================================================
     PROGRESS
  ========================================================== */

  const progress =
    steps.length > 1
      ? (safeStep / (steps.length - 1)) * 100
      : 100;

  /* ==========================================================
     NEXT STEP
  ========================================================== */

  const nextStep = steps[safeStep + 1];

  /* ==========================================================
     FLOOR TRANSITION
  ========================================================== */

  const hasFloorTransition =
    nextStep && nextStep.floor !== currentStep.floor;

  /* ==========================================================
     PREVIOUS / NEXT
  ========================================================== */

  const handlePrevious = () => {
    setActiveStep((value) => Math.max(0, value - 1));
  };

  const handleNext = () => {
    setActiveStep((value) =>
      Math.min(steps.length - 1, value + 1)
    );
  };

  /* ==========================================================
     EMPTY STATE
  ========================================================== */

  if (!currentStep) {
    return (
      <div className="premium-card min-h-[500px] flex items-center justify-center">
        <div className="text-center px-6">
          <Navigation className="w-12 h-12 mx-auto mb-4 text-[#97144D] dark:text-[#F08AB4]" />

          <h2 className="text-xl font-bold text-[#241820] dark:text-[#FFF5FA]">
            Navigation unavailable
          </h2>

          <p className="mt-2 text-sm text-[#6B5963] dark:text-[#C9B6C0]">
            No navigation steps are available for this route.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ======================================================
          NAVIGATION HEADER
      ====================================================== */}

      <div className="premium-card overflow-hidden">
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-[#97144D] dark:bg-[#C2185B] text-white flex items-center justify-center shadow-lg shadow-[#97144D]/20">
                <Navigation className="w-5 h-5" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-[#241820] dark:text-[#FFF5FA]">
                    Indoor Navigation
                  </h2>

                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F3E7EF] dark:bg-[#351524] text-[10px] font-bold uppercase tracking-wider text-[#97144D] dark:text-[#F08AB4]">
                    <Sparkles className="w-3 h-3" />
                    LIVE
                  </span>
                </div>

                <p className="text-xs text-[#6B5963] dark:text-[#C9B6C0] mt-0.5">
                  {currentBuilding === 'AI'
                    ? 'AI Building'
                    : 'Main Building'}
                  {' · '}
                  Floor {currentFloor}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onReset}
              className="premium-button shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border border-[#E3C5D5] dark:border-[#4A2035] bg-white dark:bg-[#28131E] text-xs font-bold text-[#6B5963] dark:text-[#C9B6C0]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">End Route</span>
            </button>
          </div>

          {/* Progress */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#6B5963] dark:text-[#C9B6C0]">
                Route Progress
              </span>

              <span className="text-[10px] font-bold text-[#97144D] dark:text-[#F08AB4]">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="h-2 rounded-full bg-[#F1E5EC] dark:bg-[#321520] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#97144D] to-[#C2185B] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          INDOOR MAP
      ====================================================== */}

      <div className="premium-card overflow-hidden">
        {/* Map header */}
        <div className="px-4 sm:px-5 py-4 border-b border-[#E3C5D5] dark:border-[#4A2035] flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#6B5963] dark:text-[#C9B6C0]">
              Navigation Map
            </p>

            <p className="text-sm font-bold text-[#241820] dark:text-[#FFF5FA] mt-1">
              Follow the highlighted route
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#6B5963] dark:text-[#C9B6C0]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C2185B] dark:bg-[#F08AB4]" />
              Route
            </span>

            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#6B5963] dark:text-[#C9B6C0]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              You
            </span>
          </div>
        </div>

        {/* Map */}
        <div className="relative bg-[#FCF9FB] dark:bg-[#160A11]">
          {/* Floor badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
            <div className="px-3 py-2 rounded-xl bg-white/90 dark:bg-[#211019]/90 backdrop-blur-md border border-[#E3C5D5] dark:border-[#4A2035] shadow-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#97144D] dark:text-[#F08AB4]" />

                <span className="text-xs font-bold text-[#241820] dark:text-[#FFF5FA]">
                  Floor {currentFloor}
                </span>
              </div>
            </div>
          </div>

          {/* Current location badge */}
          {currentPoint && (
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 max-w-[55%]">
              <div className="px-3 py-2 rounded-xl bg-white/90 dark:bg-[#211019]/90 backdrop-blur-md border border-[#E3C5D5] dark:border-[#4A2035] shadow-lg">
                <div className="flex items-center gap-2 min-w-0">
                  <LocateFixed className="w-3.5 h-3.5 shrink-0 text-emerald-500" />

                  <span className="text-xs font-bold text-[#241820] dark:text-[#FFF5FA] truncate">
                    {currentStep.nodeName}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* SVG */}
          <div className="w-full aspect-[1.55] min-h-[300px] sm:min-h-[380px]">
            <svg
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* ==================================================
                  DEFINITIONS
              ================================================== */}

              <defs>
                {/* Grid */}
                <pattern
                  id="navigationGrid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-[#EDE2E8] dark:text-[#2B1821]"
                  />
                </pattern>

                {/* Route glow */}
                <filter
                  id="navigationRouteGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="8" result="blur" />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ==================================================
                  MAP BACKGROUND
              ================================================== */}

              <rect
                x="0"
                y="0"
                width={SVG_WIDTH}
                height={SVG_HEIGHT}
                fill="url(#navigationGrid)"
              />

              {/* Building area */}
              <rect
                x="35"
                y="35"
                width={SVG_WIDTH - 70}
                height={SVG_HEIGHT - 70}
                rx="28"
                fill="currentColor"
                className="text-white dark:text-[#1B0D15]"
              />

              <rect
                x="35"
                y="35"
                width={SVG_WIDTH - 70}
                height={SVG_HEIGHT - 70}
                rx="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-[#E3C5D5] dark:text-[#4A2035]"
              />

              {/* ==================================================
                  UPCOMING ROUTE GLOW
              ================================================== */}

              {upcomingPath && (
                <polyline
                  points={upcomingPath}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="30"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.10"
                  filter="url(#navigationRouteGlow)"
                  className="text-[#C2185B] dark:text-[#F08AB4]"
                />
              )}

              {/* ==================================================
                  UPCOMING ROUTE
              ================================================== */}

              {upcomingPath && (
                <polyline
                  points={upcomingPath}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#C2185B] dark:text-[#F08AB4]"
                  opacity="0.30"
                />
              )}

              {/* ==================================================
                  COMPLETED ROUTE
              ================================================== */}

              {completedPath && (
                <polyline
                  points={completedPath}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#97144D] dark:text-[#C2185B]"
                />
              )}

              {/* ==================================================
                  DIRECTION ARROWS
              ================================================== */}

              {svgPoints.map((point, index) => {
                if (index >= svgPoints.length - 1) {
                  return null;
                }

                const nextPoint = svgPoints[index + 1];

                /*
                 * Don't show arrows behind
                 * the user's current position.
                 */
                if (point.index < safeStep) {
                  return null;
                }

                const dx = nextPoint.x - point.x;
                const dy = nextPoint.y - point.y;

                const segmentLength = Math.sqrt(dx * dx + dy * dy);

                if (segmentLength < 35) {
                  return null;
                }

                const angle = Math.atan2(dy, dx) * (180 / Math.PI);

                const midX = (point.x + nextPoint.x) / 2;
                const midY = (point.y + nextPoint.y) / 2;

                return (
                  <g
                    key={`arrow-${point.index}`}
                    transform={`translate(${midX} ${midY}) rotate(${angle})`}
                  >
                    <path
                      d="M -10 -8 L 5 0 L -10 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#97144D] dark:text-[#F08AB4]"
                    />
                  </g>
                );
              })}

              {/* ==================================================
                  ROUTE POINTS
              ================================================== */}

              {svgPoints.map((point) => {
                const isCurrent = point.index === safeStep;

                const isPast = point.index < safeStep;

                const isDestination =
                  point.node.id === destinationNode?.id;

                const step = steps.find(
                  (item) => item.index === point.index
                );

                const isImportant = step
                  ? isImportantNavigationPoint(step)
                  : false;

                /*
                 * Mobile fix: when a point is near the right edge,
                 * flip its label to the left so it is not cut off.
                 */
                const flipLabel = point.x > SVG_WIDTH - 200;

                const labelX = flipLabel
                  ? point.x - 170
                  : point.x + 20;

                const hereX = point.x > SVG_WIDTH - 180
                  ? point.x - 155
                  : point.x + 25;

                return (
                  <g key={`${point.node.id}-${point.index}`}>
                    {/* Small route node */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={
                        isCurrent
                          ? 8
                          : isDestination
                          ? 8
                          : isImportant
                          ? 5
                          : 3.5
                      }
                      fill="currentColor"
                      className={
                        isCurrent
                          ? 'text-emerald-500'
                          : isDestination
                          ? 'text-[#97144D] dark:text-[#F08AB4]'
                          : isPast
                          ? 'text-[#97144D] dark:text-[#C2185B]'
                          : 'text-[#9D8791] dark:text-[#735564]'
                      }
                      opacity={
                        !isCurrent && !isDestination && !isImportant
                          ? 0.5
                          : 1
                      }
                    />

                    {/* ==================================================
                        IMPORTANT POINT
                    ================================================== */}

                    {isImportant &&
                      !isCurrent &&
                      !isDestination &&
                      step && (
                        <g>
                          {/* Number circle */}
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r="13"
                            fill="white"
                            stroke="currentColor"
                            strokeWidth="3"
                            className={
                              isPast
                                ? 'text-[#97144D] dark:text-[#C2185B]'
                                : 'text-[#C2185B] dark:text-[#F08AB4]'
                            }
                          />

                          <text
                            x={point.x}
                            y={point.y + 4}
                            textAnchor="middle"
                            className="fill-[#97144D] dark:fill-[#F08AB4] text-[11px] font-black"
                          >
                            {point.index + 1}
                          </text>

                          {/* Label */}
                          <g
                            transform={`translate(${labelX}, ${point.y - 24})`}
                          >
                            <rect
                              x="0"
                              y="0"
                              width="150"
                              height="38"
                              rx="10"
                              fill="white"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeOpacity="0.25"
                              className="text-[#E3C5D5] dark:fill-[#211019] dark:text-[#4A2035]"
                            />

                            <text
                              x="75"
                              y="16"
                              textAnchor="middle"
                              className="fill-[#97144D] dark:fill-[#F08AB4] text-[9px] font-black"
                            >
                              {getPointLabel(step)}
                            </text>

                            <text
                              x="75"
                              y="29"
                              textAnchor="middle"
                              className="fill-[#6B5963] dark:fill-[#C9B6C0] text-[9px] font-semibold"
                            >
                              {step.nodeName}
                            </text>
                          </g>
                        </g>
                      )}

                    {/* ==================================================
                        CURRENT POSITION
                    ================================================== */}

                    {isCurrent && (
                      <g>
                        {/* Outer pulse */}
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="34"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="text-emerald-500"
                          opacity="0.20"
                        />

                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="25"
                          fill="currentColor"
                          className="text-emerald-500"
                          opacity="0.10"
                        />

                        {/* Main marker */}
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="17"
                          fill="currentColor"
                          className="text-emerald-500"
                        />

                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="8"
                          fill="white"
                        />

                        {/* You are here label */}
                        <g
                          transform={`translate(${hereX}, ${point.y - 20})`}
                        >
                          <rect
                            x="0"
                            y="0"
                            width="130"
                            height="38"
                            rx="11"
                            fill="currentColor"
                            className="text-emerald-500"
                          />

                          <text
                            x="65"
                            y="16"
                            textAnchor="middle"
                            className="fill-white text-[10px] font-black"
                          >
                            YOU ARE HERE
                          </text>

                          <text
                            x="65"
                            y="29"
                            textAnchor="middle"
                            className="fill-white/80 text-[8px] font-semibold"
                          >
                            {point.node.name}
                          </text>
                        </g>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* ==================================================
                  START MARKER
              ================================================== */}

              {svgPoints[0] && (
                <g>
                  <circle
                    cx={svgPoints[0].x}
                    cy={svgPoints[0].y}
                    r="19"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-[#97144D] dark:text-[#F08AB4]"
                  />

                  <circle
                    cx={svgPoints[0].x}
                    cy={svgPoints[0].y}
                    r="8"
                    fill="currentColor"
                    className="text-[#97144D] dark:text-[#F08AB4]"
                  />

                  <g
                    transform={`translate(${svgPoints[0].x - 40}, ${svgPoints[0].y - 58})`}
                  >
                    <rect
                      x="0"
                      y="0"
                      width="80"
                      height="30"
                      rx="9"
                      fill="currentColor"
                      className="text-[#97144D] dark:text-[#C2185B]"
                    />

                    <text
                      x="40"
                      y="20"
                      textAnchor="middle"
                      className="fill-white text-[11px] font-black"
                    >
                      START
                    </text>
                  </g>
                </g>
              )}

              {/* ==================================================
                  DESTINATION MARKER
              ================================================== */}

              {destinationNode &&
                (() => {
                  const destinationPoint = svgPoints.find(
                    (point) => point.node.id === destinationNode.id
                  );

                  if (!destinationPoint) {
                    return null;
                  }

                  /* keep the label inside the map on small screens */
                  const destLabelX = Math.min(
                    Math.max(destinationPoint.x - 65, 10),
                    SVG_WIDTH - 140
                  );

                  return (
                    <g>
                      <circle
                        cx={destinationPoint.x}
                        cy={destinationPoint.y}
                        r="20"
                        fill="white"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-[#97144D] dark:text-[#F08AB4]"
                      />

                      <circle
                        cx={destinationPoint.x}
                        cy={destinationPoint.y}
                        r="9"
                        fill="currentColor"
                        className="text-[#97144D] dark:text-[#F08AB4]"
                      />

                      <g
                        transform={`translate(${destLabelX}, ${destinationPoint.y + 28})`}
                      >
                        <rect
                          x="0"
                          y="0"
                          width="130"
                          height="36"
                          rx="10"
                          fill="currentColor"
                          className="text-[#97144D] dark:text-[#C2185B]"
                        />

                        <text
                          x="65"
                          y="15"
                          textAnchor="middle"
                          className="fill-white text-[9px] font-black"
                        >
                          DESTINATION
                        </text>

                        <text
                          x="65"
                          y="28"
                          textAnchor="middle"
                          className="fill-white/80 text-[8px] font-semibold"
                        >
                          {destinationNode.name}
                        </text>
                      </g>
                    </g>
                  );
                })()}
            </svg>
          </div>

          {/* ==================================================
              MAP LEGEND
          ================================================== */}

          <div className="px-4 sm:px-5 py-3 border-t border-[#E3C5D5] dark:border-[#4A2035] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-[10px] font-semibold text-[#6B5963] dark:text-[#C9B6C0]">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                You are here
              </span>

              <span className="flex items-center gap-2 text-[10px] font-semibold text-[#6B5963] dark:text-[#C9B6C0]">
                <span className="w-8 h-1.5 rounded-full bg-[#C2185B]" />
                Route
              </span>
            </div>

            <span className="text-[10px] font-semibold text-[#6B5963] dark:text-[#C9B6C0]">
              {getNodeTypeLabel(
                currentPoint?.node ?? routeNodes[0]?.node
              )}
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================
          CURRENT ACTION
      ====================================================== */}

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#97144D] to-[#C2185B] text-white shadow-[0_18px_50px_rgba(151,20,77,0.25)]">
        <div className="absolute -right-20 -top-20 w-48 h-48 rounded-full bg-white/10 blur-3xl" />

        <div className="relative p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] uppercase tracking-[0.16em] font-black text-white/70">
              Current Action
            </span>

            <span className="text-xs font-bold text-white/80">
              {formatDistance(currentStep.distance)}
            </span>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-20 h-20 shrink-0 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
              {getDirectionIcon(currentStep.direction)}
            </div>

            <div className="min-w-0">
              <h3 className="text-2xl font-black">
                {getDirectionTitle(currentStep.direction)}
              </h3>

              <p className="mt-2 text-sm text-white/85 leading-relaxed">
                {currentStep.instruction}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs font-semibold">
              {currentStep.nodeName}
            </span>

            <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs font-semibold">
              Floor {currentStep.floor}
            </span>
          </div>

          {/* Floor transition warning */}
          {hasFloorTransition && nextStep && (
            <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/15">
              <TrendingUp className="w-5 h-5 shrink-0" />

              <div>
                <p className="text-xs font-bold">
                  Floor transition ahead
                </p>

                <p className="text-[11px] text-white/70 mt-0.5">
                  Next: Floor {nextStep.floor}
                  {' · '}
                  {nextStep.direction.includes('lift')
                    ? 'Lift'
                    : 'Stairs'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================
          VOICE NAVIGATION
      ====================================================== */}

      <div className="premium-card overflow-hidden">
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  voiceEnabled
                    ? 'bg-[#97144D] dark:bg-[#C2185B] text-white shadow-lg shadow-[#97144D]/25'
                    : 'bg-[#F3E7EF] dark:bg-[#351524] text-[#97144D] dark:text-[#F08AB4]'
                }`}
              >
                {voiceEnabled ? (
                  <Volume2 className="w-5 h-5 animate-pulse" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </div>

              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider font-black text-[#6B5963] dark:text-[#C9B6C0]">
                  Voice Navigation
                </p>

                <p className="text-sm font-bold text-[#241820] dark:text-[#FFF5FA] mt-0.5">
                  {voiceEnabled
                    ? 'Voice guidance is ON'
                    : 'Voice guidance is OFF'}
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={!isVoiceNavigationSupported}
              onClick={() => {
                if (voiceEnabled) {
                  stopVoiceNavigation();
                  setVoiceEnabled(false);
                } else {
                  setVoiceEnabled(true);
                }
              }}
              className={`premium-button shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                voiceEnabled
                  ? 'border border-[#E3C5D5] dark:border-[#4A2035] bg-white dark:bg-[#28131E] text-[#97144D] dark:text-[#F08AB4]'
                  : 'bg-[#97144D] hover:bg-[#7D103F] dark:bg-[#C2185B] dark:hover:bg-[#A9154F] text-white shadow-lg shadow-[#97144D]/20'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {voiceEnabled ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  Turn Off
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  Turn On
                </>
              )}
            </button>
          </div>

          {voiceEnabled && (
            <div className="mt-4 pt-4 border-t border-[#E3C5D5] dark:border-[#4A2035]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    replayInstruction(currentStep.instruction)
                  }
                  className="premium-button flex-1 py-2.5 rounded-xl bg-[#F3E7EF] dark:bg-[#351524] border border-[#E3C5D5] dark:border-[#4A2035] text-[#97144D] dark:text-[#F08AB4] text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5" />
                  Replay Instruction
                </button>

                <button
                  type="button"
                  onClick={stopVoiceNavigation}
                  className="premium-button px-4 py-2.5 rounded-xl bg-white dark:bg-[#28131E] border border-[#E3C5D5] dark:border-[#4A2035] text-[#6B5963] dark:text-[#C9B6C0] text-xs font-bold flex items-center justify-center gap-2"
                >
                  <VolumeX className="w-3.5 h-3.5" />
                  Stop
                </button>
              </div>
            </div>
          )}

          {!isVoiceNavigationSupported && (
            <p className="mt-3 text-[11px] text-amber-600 dark:text-amber-400">
              Voice navigation is not supported by this browser.
            </p>
          )}
        </div>
      </div>

      {/* ======================================================
          NEXT ACTION PREVIEW
      ====================================================== */}

      {nextStep && (
        <div className="premium-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-[#F3E7EF] dark:bg-[#351524] text-[#97144D] dark:text-[#F08AB4] flex items-center justify-center">
              <ChevronRight className="w-5 h-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider font-black text-[#6B5963] dark:text-[#C9B6C0]">
                Up Next
              </p>

              <p className="text-sm font-bold text-[#241820] dark:text-[#FFF5FA] mt-1">
                {getDirectionTitle(nextStep.direction)}
              </p>

              <p className="text-xs text-[#6B5963] dark:text-[#C9B6C0] mt-1 truncate">
                {nextStep.instruction}
              </p>
            </div>

            <span className="shrink-0 text-[10px] font-bold text-[#6B5963] dark:text-[#C9B6C0]">
              {formatDistance(nextStep.distance)}
            </span>
          </div>
        </div>
      )}

      {/* ======================================================
          ROUTE STATS
      ====================================================== */}

      <div className="grid grid-cols-3 gap-3">
        {/* Distance */}
        <div className="premium-card p-3 sm:p-4 text-center">
          <MapPin className="w-4 h-4 mx-auto text-[#97144D] dark:text-[#F08AB4]" />

          <p className="mt-2 text-lg font-black text-[#241820] dark:text-[#FFF5FA]">
            {formatDistance(route.distance)}
          </p>

          <p className="text-[10px] uppercase tracking-wider font-semibold text-[#6B5963] dark:text-[#C9B6C0]">
            Distance
          </p>
        </div>

        {/* Time */}
        <div className="premium-card p-3 sm:p-4 text-center">
          <Timer className="w-4 h-4 mx-auto text-[#97144D] dark:text-[#F08AB4]" />

          <p className="mt-2 text-lg font-black text-[#241820] dark:text-[#FFF5FA]">
            {formatTime(route.estimatedTime)}
          </p>

          <p className="text-[10px] uppercase tracking-wider font-semibold text-[#6B5963] dark:text-[#C9B6C0]">
            Est. Time
          </p>
        </div>

        {/* Floors */}
        <div className="premium-card p-3 sm:p-4 text-center">
          <TrendingUp className="w-4 h-4 mx-auto text-[#97144D] dark:text-[#F08AB4]" />

          <p className="mt-2 text-lg font-black text-[#241820] dark:text-[#FFF5FA]">
            {route.floors.length}
          </p>

          <p className="text-[10px] uppercase tracking-wider font-semibold text-[#6B5963] dark:text-[#C9B6C0]">
            Floors
          </p>
        </div>
      </div>

      {/* ======================================================
          MODE
      ====================================================== */}

      <div className="premium-card p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#F3E7EF] dark:bg-[#351524] flex items-center justify-center text-[#97144D] dark:text-[#F08AB4]">
            {currentMode === 'step-free' ? (
              <Accessibility className="w-4 h-4" />
            ) : currentMode === 'lift' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <Footprints className="w-4 h-4" />
            )}
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider font-black text-[#6B5963] dark:text-[#C9B6C0]">
              Navigation Mode
            </p>

            <p className="text-sm font-bold text-[#241820] dark:text-[#FFF5FA] mt-0.5">
              {getModeLabel(currentMode)}
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================
          PREVIOUS / NEXT
      ====================================================== */}

      <div className="premium-card p-3 flex gap-2">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={safeStep === 0}
          className="premium-button flex-1 py-3 rounded-xl border border-[#E3C5D5] dark:border-[#4A2035] bg-white dark:bg-[#28131E] text-[#241820] dark:text-[#FFF5FA] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs font-bold"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={safeStep >= steps.length - 1}
          className="premium-button flex-1 py-3 rounded-xl bg-[#97144D] hover:bg-[#7D103F] dark:bg-[#C2185B] dark:hover:bg-[#A9154F] text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs font-bold shadow-lg shadow-[#97144D]/20"
        >
          Next Step
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ======================================================
          STEP COUNTER
      ====================================================== */}

      <div className="text-center text-[10px] font-semibold text-[#6B5963] dark:text-[#C9B6C0] pb-2">
        Step {safeStep + 1} of {steps.length}

        {nextStep && (
          <>
            {' · '}
            Next: {nextStep.nodeName}
          </>
        )}
      </div>
    </div>
  );
};