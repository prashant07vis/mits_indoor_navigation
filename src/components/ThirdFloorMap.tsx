import React from 'react';
import {
  ArrowUp,
  DoorOpen,
  GraduationCap,
  Layers3,
  MapPin,
  MoveUp,
  UserRound,
  WashingMachine,
} from 'lucide-react';

import { rooms } from '../data/rooms';
import { teachers } from '../data/teachers';

type RoomKind =
  | 'office'
  | 'lab'
  | 'vc'
  | 'cabin'
  | 'stairs'
  | 'lift'
  | 'washroom'
  | 'room';

interface FloorRoom {
  id: string;
  label: string;
  subtitle?: string;

  /**
   * Actual location/node ID used by the navigation system.
   */
  navigationId: string;

  /**
   * Optional alternate IDs that may be used by the
   * location selector.
   */
  aliases?: string[];

  x: number;
  y: number;
  width: number;
  height: number;
  kind: RoomKind;
  gates?: number;
}

interface ThirdFloorMapProps {
  selectedLocationId?: string;
  destinationLocationId?: string;
  onSelectLocation?: (id: string) => void;
  darkMode?: boolean;
}

const TILE = 24;

const floorWidth = 64 * TILE;
const floorHeight = 56 * TILE;

/**
 * ------------------------------------------------------------
 * Resolve the user-facing location ID from an actual
 * navigation/node ID.
 *
 * Priority:
 * 1. Room nodeId
 * 2. Teacher nodeId
 * 3. navigation node ID itself
 * ------------------------------------------------------------
 */
function resolveLocationId(navigationId: string): string {
  const room = rooms.find(
    (item) =>
      item.floor === 3 &&
      item.building === 'AI' &&
      item.nodeId === navigationId
  );

  if (room) {
    return room.id;
  }

  const teacher = teachers.find(
    (item) =>
      item.floor === 3 &&
      item.building === 'AI' &&
      item.nodeId === navigationId
  );

  if (teacher) {
    return teacher.id;
  }

  return navigationId;
}

/**
 * Check whether the currently selected location represents
 * this map item.
 */
function isLocationSelected(
  selectedLocationId: string | undefined,
  room: FloorRoom
): boolean {
  if (!selectedLocationId) return false;

  const resolvedId = resolveLocationId(room.navigationId);

  return (
    selectedLocationId === room.navigationId ||
    selectedLocationId === resolvedId ||
    room.aliases?.includes(selectedLocationId) === true
  );
}

/**
 * ------------------------------------------------------------
 * F3 FLOOR PLAN
 *
 * 1 tile = 24px
 *
 * Confirmed structure:
 *
 * M301:
 *   - 2 gates
 *   - 16 tile gate spacing
 *
 * M302:
 *   - 2 gates
 *   - 16 tile gate spacing
 *
 * M303:
 *   - 1 gate
 *
 * M302 → 2 tiles → stairs
 *
 * Stairs → 4 tiles → male washroom
 *
 * Male washroom → female washroom
 *
 * M303 is positioned opposite the stairs.
 *
 * Labs:
 *   PhD Lab      = 4 × 4 tiles
 *   Research Lab = 4 × 4 tiles
 *   HPC Lab      = 4 × 4 tiles
 * ------------------------------------------------------------
 */

const roomsOnThirdFloor: FloorRoom[] = [
  // ==========================================================
  // FACULTY OFFICES 1–3
  // ==========================================================

  {
    id: 'AI_F3_OFFICE_1',
    label: 'Office 1',
    subtitle: 'Dr. Vijay Shankar Sharma',
    navigationId: 'AI_F3_OFFICE_1',
    x: 5,
    y: 7,
    width: 7,
    height: 5,
    kind: 'office',
  },

  {
    id: 'AI_F3_OFFICE_2',
    label: 'Office 2',
    subtitle: 'Dr. Mausam Chouksey',
    navigationId: 'AI_F3_OFFICE_2',
    x: 5,
    y: 13,
    width: 7,
    height: 5,
    kind: 'office',
  },

  {
    id: 'AI_F3_OFFICE_3',
    label: 'Office 3',
    subtitle: 'CSD Core Faculty',
    navigationId: 'AI_F3_OFFICE_3',
    x: 5,
    y: 19,
    width: 7,
    height: 5,
    kind: 'office',
  },

  // ==========================================================
  // FACULTY OFFICES 4–6
  // ==========================================================

  {
    id: 'AI_F3_OFFICE_4',
    label: 'Office 4',
    subtitle: 'Dr. Satyam Omar',
    navigationId: 'AI_F3_OFFICE_4',
    x: 18,
    y: 4,
    width: 7,
    height: 5,
    kind: 'office',
  },

  {
    id: 'AI_F3_OFFICE_5',
    label: 'Office 5',
    subtitle: 'Dr. Vivek Sharma',
    navigationId: 'AI_F3_OFFICE_5',
    x: 26,
    y: 4,
    width: 7,
    height: 5,
    kind: 'office',
  },

  {
    id: 'AI_F3_OFFICE_6',
    label: 'Office 6',
    subtitle: 'Faculty Office',
    navigationId: 'AI_F3_OFFICE_6',
    x: 34,
    y: 4,
    width: 7,
    height: 5,
    kind: 'office',
  },

  // ==========================================================
  // FACULTY OFFICES 7–9
  // ==========================================================

  {
    id: 'AI_F3_OFFICE_7',
    label: 'Office 7',
    subtitle: 'Dr. Pooja Tripathi',
    navigationId: 'AI_F3_OFFICE_7',
    x: 44,
    y: 7,
    width: 7,
    height: 5,
    kind: 'office',
  },

  {
    id: 'AI_F3_OFFICE_8',
    label: 'Office 8',
    subtitle: 'Dr. Namita Arya',
    navigationId: 'AI_F3_OFFICE_8',
    x: 44,
    y: 13,
    width: 7,
    height: 5,
    kind: 'office',
  },

  {
    id: 'AI_F3_OFFICE_9',
    label: 'Office 9',
    subtitle: 'Dr. Devanshu Tiwari',
    navigationId: 'AI_F3_OFFICE_9',
    x: 44,
    y: 19,
    width: 7,
    height: 5,
    kind: 'office',
  },

  // ==========================================================
  // LABS — EXACTLY 4 × 4 TILES
  // ==========================================================

  {
    id: 'AI_F3_PHD_LAB',
    label: 'PhD Lab',
    subtitle: 'Research Area',
    navigationId: 'AI_F3_PHD_LAB_ENTRY',
    x: 14,
    y: 11,
    width: 4,
    height: 4,
    kind: 'lab',
  },

  {
    id: 'AI_F3_RESEARCH_LAB',
    label: 'Research Lab',
    subtitle: 'Research Area',
    navigationId: 'AI_F3_RESEARCH_LAB_ENTRY',
    x: 32,
    y: 11,
    width: 4,
    height: 4,
    kind: 'lab',
  },

  {
    id: 'AI_F3_HPC_LAB',
    label: 'HPC Lab',
    subtitle: 'High Performance Computing',
    navigationId: 'AI_F3_HPC_LAB_ENTRY',
    x: 26,
    y: 21,
    width: 4,
    height: 4,
    kind: 'lab',
  },

  // ==========================================================
  // ADMINISTRATIVE / FACULTY AREAS
  // ==========================================================

  {
    id: 'AI_F3_VC_OFFICE',
    label: 'Vice Chancellor Office',
    subtitle: 'Administrative Office',
    navigationId: 'AI_F3_VC_OFFICE_ENTRY',
    x: 14,
    y: 28,
    width: 12,
    height: 6,
    kind: 'vc',
  },

  {
    id: 'AI_F3_PROFESSORS_CABIN',
    label: "Professors' Cabin",
    subtitle: 'Faculty Area',
    navigationId: 'AI_F3_PROFESSORS_CABIN_ENTRY',
    x: 28,
    y: 28,
    width: 10,
    height: 6,
    kind: 'cabin',
  },

  // ==========================================================
  // LIFT
  // ==========================================================

  {
    id: 'AI_F3_LIFT',
    label: 'Lift',
    subtitle: 'Vertical Access',
    navigationId: 'AI_F3_LIFT_01',
    x: 4,
    y: 28,
    width: 6,
    height: 6,
    kind: 'lift',
  },

  // ==========================================================
  // LOWER SECTION
  // ==========================================================

  {
    id: 'AI_F3_M302',
    label: 'M302',
    subtitle: '2 Gates • 16 Tile Gate Spacing',
    navigationId: 'AI_F3_M302_GATE_1',
    aliases: ['AI_F3_M302_GATE_2'],
    x: 7,
    y: 36,
    width: 16,
    height: 7,
    kind: 'room',
    gates: 2,
  },

  {
    id: 'AI_F3_STAIRS',
    label: 'Stairs',
    subtitle: 'Floor Transition',
    navigationId: 'AI_F3_STAIRS_01',
    aliases: ['AI_F3_COR_STAIRS'],
    x: 25,
    y: 36,
    width: 6,
    height: 7,
    kind: 'stairs',
  },

  {
    id: 'AI_F3_M303',
    label: 'M303',
    subtitle: 'Single Gate',
    navigationId: 'AI_F3_M303_GATE',
    x: 34,
    y: 36,
    width: 8,
    height: 7,
    kind: 'room',
    gates: 1,
  },

  {
    id: 'AI_F3_M301',
    label: 'M301',
    subtitle: '2 Gates • 16 Tile Gate Spacing',
    navigationId: 'AI_F3_M301_GATE_1',
    aliases: ['AI_F3_M301_GATE_2'],
    x: 44,
    y: 36,
    width: 16,
    height: 7,
    kind: 'room',
    gates: 2,
  },

  // ==========================================================
  // WASHROOMS
  // ==========================================================

  {
    id: 'AI_F3_WASHROOM_M',
    label: 'Male Washroom',
    subtitle: 'Washroom',
    navigationId: 'AI_F3_WASHROOM_M_ENTRY',
    x: 33,
    y: 46,
    width: 10,
    height: 6,
    kind: 'washroom',
  },

  {
    id: 'AI_F3_WASHROOM_F',
    label: 'Female Washroom',
    subtitle: 'Washroom',
    navigationId: 'AI_F3_WASHROOM_F_ENTRY',
    x: 44,
    y: 46,
    width: 10,
    height: 6,
    kind: 'washroom',
  },
];

function getRoomFill(
  kind: RoomKind,
  darkMode: boolean
): string {
  if (darkMode) {
    switch (kind) {
      case 'office':
        return '#2A1722';

      case 'lab':
        return '#17283A';

      case 'vc':
      case 'cabin':
        return '#2A2117';

      case 'stairs':
      case 'lift':
        return '#20252B';

      case 'washroom':
        return '#17282B';

      default:
        return '#261A22';
    }
  }

  switch (kind) {
    case 'office':
      return '#FFF7FB';

    case 'lab':
      return '#F2F7FC';

    case 'vc':
    case 'cabin':
      return '#FFF8EC';

    case 'stairs':
    case 'lift':
      return '#F1F3F5';

    case 'washroom':
      return '#EFF9FA';

    default:
      return '#FFF8FB';
  }
}

function getRoomStroke(kind: RoomKind): string {
  switch (kind) {
    case 'office':
      return '#C2185B';

    case 'lab':
      return '#3878B8';

    case 'vc':
    case 'cabin':
      return '#A46A22';

    case 'stairs':
    case 'lift':
      return '#68737D';

    case 'washroom':
      return '#23838A';

    default:
      return '#97144D';
  }
}

function RoomIcon({
  kind,
  size = 16,
}: {
  kind: RoomKind;
  size?: number;
}) {
  if (kind === 'office') {
    return <UserRound size={size} />;
  }

  if (kind === 'lab') {
    return <Layers3 size={size} />;
  }

  if (kind === 'stairs') {
    return <MoveUp size={size} />;
  }

  if (kind === 'lift') {
    return <ArrowUp size={size} />;
  }

  if (kind === 'washroom') {
    return <WashingMachine size={size} />;
  }

  if (kind === 'vc' || kind === 'cabin') {
    return <GraduationCap size={size} />;
  }

  return <DoorOpen size={size} />;
}

function Gate({
  x,
  y,
}: {
  x: number;
  y: number;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x="-7"
        y="-3"
        width="14"
        height="6"
        rx="2"
        fill="#FFFFFF"
        stroke="#97144D"
        strokeWidth="2"
      />

      <path
        d="M-7 0 H7"
        stroke="#97144D"
        strokeWidth="2"
      />
    </g>
  );
}

function RoomCard({
  room,
  selected,
  destination,
  darkMode,
  onSelect,
}: {
  room: FloorRoom;
  selected: boolean;
  destination: boolean;
  darkMode: boolean;
  onSelect?: (id: string) => void;
}) {
  const x = room.x * TILE;
  const y = room.y * TILE;

  const width = room.width * TILE;
  const height = room.height * TILE;

  const stroke = destination
    ? '#F08AB4'
    : getRoomStroke(room.kind);

  const selectableId = resolveLocationId(room.navigationId);

  const handleClick = () => {
    if (!onSelect) return;

    onSelect(selectableId);
  };

  return (
    <g
      onClick={handleClick}
      style={{
        cursor: onSelect ? 'pointer' : 'default',
      }}
    >
      {/* Main room */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="8"
        fill={getRoomFill(room.kind, darkMode)}
        stroke={stroke}
        strokeWidth={
          destination
            ? 4
            : selected
              ? 3
              : 2
        }
      />

      {/* Destination glow */}
      {destination && (
        <>
          <rect
            x={x - 5}
            y={y - 5}
            width={width + 10}
            height={height + 10}
            rx="12"
            fill="none"
            stroke="#F08AB4"
            strokeWidth="2"
            opacity="0.5"
          />

          <circle
            cx={x + width / 2}
            cy={y - 10}
            r="7"
            fill="#F08AB4"
          >
            <animate
              attributeName="r"
              values="6;9;6"
              dur="1.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0.55;1"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
        </>
      )}

      {/* Selected glow */}
      {selected && !destination && (
        <rect
          x={x - 4}
          y={y - 4}
          width={width + 8}
          height={height + 8}
          rx="11"
          fill="none"
          stroke={darkMode ? '#F08AB4' : '#97144D'}
          strokeWidth="2"
          strokeDasharray="6 4"
          opacity="0.8"
        />
      )}

      {/* Room text */}
      <foreignObject
        x={x + 6}
        y={y + 6}
        width={Math.max(width - 12, 20)}
        height={Math.max(height - 12, 20)}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily:
              'Inter, ui-sans-serif, system-ui, sans-serif',
            color: darkMode
              ? '#FFF5FA'
              : '#241820',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              fontSize: 12,
              fontWeight: 800,
              lineHeight: 1.15,
            }}
          >
            <RoomIcon
              kind={room.kind}
              size={14}
            />

            <span>{room.label}</span>
          </div>

          {room.subtitle && (
            <div
              style={{
                marginTop: 4,
                fontSize: 8,
                lineHeight: 1.25,
                color: darkMode
                  ? '#C9B6C0'
                  : '#6B5963',
              }}
            >
              {room.subtitle}
            </div>
          )}
        </div>
      </foreignObject>

      {/* ======================================================
          M302 — TWO GATES
          ====================================================== */}
      {room.id === 'AI_F3_M302' && (
        <>
          <Gate
            x={x + TILE}
            y={y}
          />

          <Gate
            x={x + width - TILE}
            y={y}
          />
        </>
      )}

      {/* ======================================================
          M301 — TWO GATES
          ====================================================== */}
      {room.id === 'AI_F3_M301' && (
        <>
          <Gate
            x={x + TILE}
            y={y}
          />

          <Gate
            x={x + width - TILE}
            y={y}
          />
        </>
      )}

      {/* ======================================================
          M303 — SINGLE GATE
          ====================================================== */}
      {room.id === 'AI_F3_M303' && (
        <Gate
          x={x + width / 2}
          y={y}
        />
      )}
    </g>
  );
}

function Legend({
  icon,
  label,
  color,
  darkMode,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  darkMode: boolean;
}) {
  return (
    <div
      className="flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold"
      style={{
        borderColor: darkMode
          ? '#4A2035'
          : '#E3C5D5',

        background: darkMode
          ? '#28131E'
          : '#FFF9FC',

        color: darkMode
          ? '#FFF5FA'
          : '#241820',
      }}
    >
      <span style={{ color }}>
        {icon}
      </span>

      {label}
    </div>
  );
}

export default function ThirdFloorMap({
  selectedLocationId,
  destinationLocationId,
  onSelectLocation,
  darkMode = false,
}: ThirdFloorMapProps) {
  return (
    <div
      className="w-full overflow-hidden rounded-3xl border shadow-xl"
      style={{
        background: darkMode
          ? '#12080E'
          : '#F8F1F6',

        borderColor: darkMode
          ? '#4A2035'
          : '#E3C5D5',
      }}
    >
      {/* ======================================================
          HEADER
          ====================================================== */}

      <div
        className="flex flex-wrap items-center justify-between gap-4 border-b px-5 py-4"
        style={{
          background: darkMode
            ? '#211019'
            : '#FFFFFF',

          borderColor: darkMode
            ? '#4A2035'
            : '#E3C5D5',
        }}
      >
        <div>
          <div
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{
              color: darkMode
                ? '#F08AB4'
                : '#97144D',
            }}
          >
            MITS Indoor Navigation
          </div>

          <h2
            className="mt-1 text-xl font-extrabold"
            style={{
              color: darkMode
                ? '#FFF5FA'
                : '#241820',
            }}
          >
            AI Building — Third Floor
          </h2>

          <p
            className="mt-1 text-sm"
            style={{
              color: darkMode
                ? '#C9B6C0'
                : '#6B5963',
            }}
          >
            Interactive indoor floor-plan
          </p>
        </div>

        <div
          className="rounded-full border px-3 py-2 text-xs font-bold"
          style={{
            background: darkMode
              ? '#28131E'
              : '#FFF7FB',

            borderColor: darkMode
              ? '#4A2035'
              : '#E3C5D5',

            color: darkMode
              ? '#F08AB4'
              : '#97144D',
          }}
        >
          FLOOR 3
        </div>
      </div>

      {/* ======================================================
          MAP
          ====================================================== */}

            <div
        className="overflow-auto p-2 sm:p-4"
        style={{
          background: darkMode
            ? '#160A11'
            : '#F5F1F3',
        }}
      >
        <svg
          viewBox={`0 0 ${floorWidth} ${floorHeight}`}
          width="100%"
                    style={{
            minWidth: 760,
            display: 'block',
          }}
        >
          <defs>
            {/* Floor tiles */}
            <pattern
              id="third-floor-tiles"
              width={TILE}
              height={TILE}
              patternUnits="userSpaceOnUse"
            >
              <rect
                width={TILE}
                height={TILE}
                fill={
                  darkMode
                    ? '#1C1118'
                    : '#FFFFFF'
                }
              />

              <path
                d={`M ${TILE} 0 L 0 0 0 ${TILE}`}
                fill="none"
                stroke={
                  darkMode
                    ? '#2C2027'
                    : '#E8E2E5'
                }
                strokeWidth="1"
              />
            </pattern>

            {/* Soft route shadow */}
            <filter
              id="route-shadow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="0"
                dy="3"
                stdDeviation="4"
                floodOpacity="0.22"
              />
            </filter>
          </defs>

          {/* ==================================================
              FLOOR BASE
              ================================================== */}

          <rect
            x="2"
            y="2"
            width={floorWidth - 4}
            height={floorHeight - 4}
            rx="18"
            fill="url(#third-floor-tiles)"
            stroke={
              darkMode
                ? '#4A2035'
                : '#D8CBD1'
            }
            strokeWidth="3"
          />

          {/* ==================================================
              MAIN CORRIDOR
              ================================================== */}

          <rect
            x={12 * TILE}
            y={9 * TILE}
            width={32 * TILE}
            height={19 * TILE}
            rx="8"
            fill={
              darkMode
                ? '#241820'
                : '#FAF8F9'
            }
            stroke={
              darkMode
                ? '#49333D'
                : '#D8CDD2'
            }
            strokeWidth="3"
          />

          <text
            x={28 * TILE}
            y={18.5 * TILE}
            textAnchor="middle"
            fontSize="16"
            fontWeight="800"
            fill={
              darkMode
                ? '#C9B6C0'
                : '#8A7A82'
            }
            letterSpacing="3"
          >
            MAIN CORRIDOR
          </text>

          {/* ==================================================
              WEST FACULTY LABEL
              ================================================== */}

          <text
            x={8 * TILE}
            y={5 * TILE}
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            fill={
              darkMode
                ? '#F08AB4'
                : '#97144D'
            }
          >
            FACULTY OFFICES
          </text>

          {/* ==================================================
              EAST FACULTY LABEL
              ================================================== */}

          <text
            x={48 * TILE}
            y={5 * TILE}
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            fill={
              darkMode
                ? '#F08AB4'
                : '#97144D'
            }
          >
            FACULTY OFFICES
          </text>

          {/* ==================================================
              M302 → STAIRS — 2 TILES
              ================================================== */}

          <line
            x1={23 * TILE}
            y1={39.5 * TILE}
            x2={25 * TILE}
            y2={39.5 * TILE}
            stroke="#97144D"
            strokeWidth="2"
            strokeDasharray="5 4"
          />

          <text
            x={24 * TILE}
            y={38.5 * TILE}
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill={
              darkMode
                ? '#F08AB4'
                : '#97144D'
            }
          >
            2 TILES
          </text>

          {/* ==================================================
              STAIRS → MALE WASHROOM — 4 TILES
              ================================================== */}

          <line
            x1={31 * TILE}
            y1={44.5 * TILE}
            x2={33 * TILE}
            y2={44.5 * TILE}
            stroke="#23838A"
            strokeWidth="2"
            strokeDasharray="5 4"
          />

          <text
            x={32 * TILE}
            y={43.5 * TILE}
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill="#23838A"
          >
            4 TILES
          </text>

          {/* ==================================================
              M302 — 16 TILE GATE SPACING
              ================================================== */}

          <line
            x1={8 * TILE}
            y1={44.5 * TILE}
            x2={22 * TILE}
            y2={44.5 * TILE}
            stroke="#97144D"
            strokeWidth="2"
            strokeDasharray="6 4"
          />

          <text
            x={15 * TILE}
            y={45.5 * TILE}
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill={
              darkMode
                ? '#F08AB4'
                : '#97144D'
            }
          >
            16 TILE GATE SPACING
          </text>

          {/* ==================================================
              M301 — 16 TILE GATE SPACING
              ================================================== */}

          <line
            x1={45 * TILE}
            y1={44.5 * TILE}
            x2={59 * TILE}
            y2={44.5 * TILE}
            stroke="#97144D"
            strokeWidth="2"
            strokeDasharray="6 4"
          />

          <text
            x={52 * TILE}
            y={45.5 * TILE}
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fill={
              darkMode
                ? '#F08AB4'
                : '#97144D'
            }
          >
            16 TILE GATE SPACING
          </text>

          {/* ==================================================
              ROOM CARDS
              ================================================== */}

          {roomsOnThirdFloor.map((room) => {
            const selected = isLocationSelected(
              selectedLocationId,
              room
            );

            const destination =
              isLocationSelected(
                destinationLocationId,
                room
              );

            return (
              <RoomCard
                key={room.id}
                room={room}
                selected={selected}
                destination={destination}
                darkMode={darkMode}
                onSelect={onSelectLocation}
              />
            );
          })}

          {/* ==================================================
              CURRENT / DESTINATION PIN
              ================================================== */}

          {destinationLocationId && (
            <g
              transform={`translate(${60 * TILE}, ${
                3 * TILE
              })`}
            >
              <circle
                r="18"
                fill={
                  darkMode
                    ? '#28131E'
                    : '#FFFFFF'
                }
                stroke={
                  darkMode
                    ? '#4A2035'
                    : '#E3C5D5'
                }
                strokeWidth="2"
              />

              <MapPin
                x="-10"
                y="-10"
                size={20}
                color={
                  darkMode
                    ? '#F08AB4'
                    : '#97144D'
                }
              />

              <text
                y="28"
                textAnchor="middle"
                fontSize="8"
                fontWeight="800"
                fill={
                  darkMode
                    ? '#C9B6C0'
                    : '#6B5963'
                }
              >
                DESTINATION
              </text>
            </g>
          )}

          {/* ==================================================
              NORTH
              ================================================== */}

          <g
            transform={`translate(${60 * TILE}, ${
              7 * TILE
            })`}
          >
            <circle
              r="18"
              fill={
                darkMode
                  ? '#28131E'
                  : '#FFFFFF'
              }
              stroke={
                darkMode
                  ? '#4A2035'
                  : '#E3C5D5'
              }
              strokeWidth="2"
            />

            <path
              d="M0 -11 L5 7 L0 4 L-5 7 Z"
              fill={
                darkMode
                  ? '#F08AB4'
                  : '#97144D'
              }
            />

            <text
              y="28"
              textAnchor="middle"
              fontSize="8"
              fontWeight="800"
              fill={
                darkMode
                  ? '#C9B6C0'
                  : '#6B5963'
              }
            >
              N
            </text>
          </g>
        </svg>
      </div>

      {/* ======================================================
          LEGEND
          ====================================================== */}

      <div
        className="flex flex-wrap gap-3 border-t px-5 py-4"
        style={{
          background: darkMode
            ? '#211019'
            : '#FFFFFF',

          borderColor: darkMode
            ? '#4A2035'
            : '#E3C5D5',
        }}
      >
        <Legend
          icon={<UserRound size={14} />}
          label="Faculty Office"
          color="#C2185B"
          darkMode={darkMode}
        />

        <Legend
          icon={<Layers3 size={14} />}
          label="Lab"
          color="#3878B8"
          darkMode={darkMode}
        />

        <Legend
          icon={<MoveUp size={14} />}
          label="Stairs"
          color="#68737D"
          darkMode={darkMode}
        />

        <Legend
          icon={<ArrowUp size={14} />}
          label="Lift"
          color="#68737D"
          darkMode={darkMode}
        />

        <Legend
          icon={<WashingMachine size={14} />}
          label="Washroom"
          color="#23838A"
          darkMode={darkMode}
        />

        <Legend
          icon={<DoorOpen size={14} />}
          label="Room"
          color="#97144D"
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}