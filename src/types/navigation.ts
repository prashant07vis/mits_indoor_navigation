export type NavigationMode = 'normal' | 'lift' | 'stairs' | 'step-free';

export type NodeType =
  | 'corridor'
  | 'door'
  | 'stairs'
  | 'lift'
  | 'gate'
  | 'entrance'
  | 'external';

export type EdgeType = 'corridor' | 'door' | 'stairs' | 'lift' | 'external';

export interface NavigationNode {
  id: string;
  building: 'AI' | 'MAIN';
  floor: number;
  x: number;
  y: number;
  type: NodeType;
  name: string;
  accessible: boolean;
  code?: string;
  description?: string;
}

export interface NavigationEdge {
  from: string;
  to: string;
  distance: number;
  type: EdgeType;
  accessible: boolean;
  notes?: string;
}

export interface Teacher {
  id: string;
  name: string;
  building: 'AI' | 'MAIN';
  floor: number;
  room: string;
  office: string;
  nodeId: string;
  designation?: string;
  department?: string;
  email?: string;
  phone?: string;
}

export interface Room {
  id: string;
  name: string;
  building: 'AI' | 'MAIN';
  floor: number;
  type:
    | 'classroom'
    | 'laboratory'
    | 'office'
    | 'seminar_hall'
    | 'library'
    | 'washroom'
    | 'common_area'
    | 'administrative';
  nodeId: string;
  gateNodes?: string[];
  aliases?: string[];
  department?: string;
}

export interface Building {
  id: 'AI' | 'MAIN';
  name: string;
  shortName: string;
  description: string;
  floors: number[];
  accessible: boolean;
  totalFloors: number;
}

export interface FloorInfo {
  building: 'AI' | 'MAIN';
  floor: number;
  name: string;
  label: string;
  isAvailable: boolean;
  statusNote?: string;
}

export interface MapConfig {
  building: 'AI' | 'MAIN';
  floor: number;
  image: string;
  width: number;
  height: number;
  coordinateScale: number;
  aspectRatio: string;
}

export interface StepInstruction {
  index: number;
  nodeId: string;
  nodeName: string;
  instruction: string;
  direction:
    | 'start'
    | 'straight'
    | 'left'
    | 'right'
    | 'slight-left'
    | 'slight-right'
    | 'lift-up'
    | 'lift-down'
    | 'stairs-up'
    | 'stairs-down'
    | 'arrive'
    | 'exit-lift'
    | 'exit-stairs'
    | 'enter-building';
  distance: number;
  cumulativeDistance: number;
  floor: number;
  building: 'AI' | 'MAIN';
  type: NodeType | EdgeType;
}

export interface RouteResult {
  path: string[];
  distance: number;
  steps: StepInstruction[];
  estimatedTime: number;
  floors: number[];
  buildings: ('AI' | 'MAIN')[];
  mode: NavigationMode;
  transitionTypes: ('lift' | 'stairs' | 'none')[];
}

export interface LocationOption {
  id: string;
  name: string;
  building: 'AI' | 'MAIN';
  floor: number;
  nodeId: string;
  category: 'room' | 'teacher' | 'entrance' | 'facility' | 'transport';
  subtitle: string;
  details?: string;
  accessible: boolean;
  keywords: string[];
}

export interface FeedbackItem {
  id: string;
  name?: string;
  email?: string;
  rating: number;
  category:
    | 'Route Accuracy'
    | 'Map Issue'
    | 'Wrong Teacher/Room Information'
    | 'UI/Design'
    | 'Other';
  message: string;
  timestamp: string;
}
