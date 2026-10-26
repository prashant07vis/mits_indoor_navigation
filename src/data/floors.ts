export interface FloorInfo {
  building: 'AI' | 'MAIN';
  floor: number;
  name: string;
  label: string;
  isAvailable: boolean;
  statusNote?: string;
}

export const floors: FloorInfo[] = [
  // =========================================================================
  // AI BUILDING
  // =========================================================================

  {
    building: 'AI',
    floor: 0,
    name: 'Ground Floor',
    label: 'F0',
    isAvailable: true,
  },

  {
    building: 'AI',
    floor: 1,
    name: 'First Floor',
    label: 'F1',
    isAvailable: true,
  },

  {
    building: 'AI',
    floor: 2,
    name: 'Second Floor',
    label: 'F2',
    isAvailable: true,
  },

  // F3 UNLOCKED
  {
    building: 'AI',
    floor: 3,
    name: 'Third Floor',
    label: 'F3',
    isAvailable: true,
  },

  // =========================================================================
  // MAIN BUILDING
  // =========================================================================

  {
    building: 'MAIN',
    floor: 0,
    name: 'Ground Floor',
    label: 'F0',
    isAvailable: true,
  },

  {
    building: 'MAIN',
    floor: 1,
    name: 'First Floor',
    label: 'F1',
    isAvailable: true,
  },

  {
    building: 'MAIN',
    floor: 2,
    name: 'Second Floor',
    label: 'F2',
    isAvailable: true,
  },
];

/**
 * Get floor information for a specific building and floor.
 */
export function getFloorInfo(
  building: 'AI' | 'MAIN',
  floor: number
): FloorInfo | undefined {
  return floors.find(
    (item) =>
      item.building === building &&
      item.floor === floor
  );
}

/**
 * Get all available floors for a building.
 */
export function getAvailableFloors(
  building: 'AI' | 'MAIN'
): FloorInfo[] {
  return floors.filter(
    (item) =>
      item.building === building &&
      item.isAvailable
  );
}

/**
 * Check whether a floor is available.
 */
export function isFloorAvailable(
  building: 'AI' | 'MAIN',
  floor: number
): boolean {
  return (
    getFloorInfo(building, floor)?.isAvailable === true
  );
}

/**
 * Get all floors for a building.
 * When includeUnavailable is true, floors that are not yet available are
 * returned too (FloorSelector shows them as disabled).
 */
export function getFloorsByBuilding(
  building: 'AI' | 'MAIN',
  includeUnavailable = false
): FloorInfo[] {
  return floors.filter(
    (item) =>
      item.building === building &&
      (includeUnavailable || item.isAvailable)
  );
}