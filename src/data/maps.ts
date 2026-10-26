import type { MapConfig } from '../types/navigation';

export const mapConfigs: Record<string, MapConfig> = {
  // ============================================================
  // AI BUILDING
  // ============================================================

  'AI_0': {
    building: 'AI',
    floor: 0,
    image: '/maps/ai-building/ground-floor.png',
    width: 1858,
    height: 684,
    coordinateScale: 1.0,
    aspectRatio: '1858 / 684',
  },

  'AI_1': {
    building: 'AI',
    floor: 1,
    image: '/maps/ai-building/first-floor.png',
    width: 1816,
    height: 636,
    coordinateScale: 1.0,
    aspectRatio: '1816 / 636',
  },

  'AI_2': {
    building: 'AI',
    floor: 2,
    image: '/maps/ai-building/second-floor.png',
    width: 1816,
    height: 520,
    coordinateScale: 1.0,
    aspectRatio: '1816 / 520',
  },

  /**
   * Third Floor
   *
   * F3 is rendered using the dedicated vector floor-plan
   * component (ThirdFloorMap.tsx), so it does not require
   * a raster blueprint image.
   */
  'AI_3': {
    building: 'AI',
    floor: 3,
    image: '',
    width: 1536,
    height: 1344,
    coordinateScale: 24,
    aspectRatio: '1536 / 1344',
  },

  // ============================================================
  // MAIN BUILDING
  // ============================================================

  'MAIN_0': {
    building: 'MAIN',
    floor: 0,
    image: '/maps/main-building/ground-floor.png',
    width: 1349,
    height: 949,
    coordinateScale: 1.0,
    aspectRatio: '1349 / 949',
  },

  'MAIN_1': {
    building: 'MAIN',
    floor: 1,
    image: '/maps/main-building/first-floor.png',
    width: 1297,
    height: 949,
    coordinateScale: 1.0,
    aspectRatio: '1297 / 949',
  },

  'MAIN_2': {
    building: 'MAIN',
    floor: 2,
    image: '/maps/main-building/second-floor.png',
    width: 1571,
    height: 949,
    coordinateScale: 1.0,
    aspectRatio: '1571 / 949',
  },
};

/**
 * Returns the map configuration for a specific
 * building and floor.
 */
export function getMapConfig(
  building: 'AI' | 'MAIN',
  floor: number
): MapConfig | undefined {
  return mapConfigs[`${building}_${floor}`];
}