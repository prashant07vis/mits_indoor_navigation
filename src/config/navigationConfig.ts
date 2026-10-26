/**
 * Global Configuration for MITS Indoor Campus Navigation System
 * All constants are configurable here without touching algorithm or UI logic.
 */

export interface NavigationConfig {
  /** Average walking speed in meters per second (default: 1.4 m/s ~ 5 km/h) */
  walkingSpeed: number;
  /** Estimated time per floor transition via Lift in seconds */
  liftTransitionTime: number;
  /** Estimated time per floor transition via Stairs in seconds */
  stairsTransitionTime: number;
  /** Penalty added to stairs during normal routing to slightly favor elevators when accessible */
  stairsWeightPenalty: number;
  /** System Branding and Metadata */
  appName: string;
  shortName: string;
  tagline: string;
  parentCompany: string;
  collegeName: string;
  location: string;
  /** Default start and destination node IDs for instant demonstration */
  defaultStartNodeId: string;
  defaultDestinationNodeId: string;
}

export const navigationConfig: NavigationConfig = {
  walkingSpeed: 1.4, // 1.4 meters per second
  liftTransitionTime: 25, // 25 seconds average waiting + transit per floor
  stairsTransitionTime: 35, // 35 seconds walking up/down stairs per flight
  stairsWeightPenalty: 1.0, // standard weight factor
  appName: 'MITS INDOOR CAMPUS NAVIGATION SYSTEM',
  shortName: 'MITS Navigator',
  tagline: 'Indoor navigation made simple.',
  parentCompany: 'Code Yoddha',
  collegeName: 'Madhav Institute of Technology & Science, Gwalior',
  location: 'Gwalior, Madhya Pradesh, India',
  defaultStartNodeId: 'AI_G_ENTRY_MAIN',
  defaultDestinationNodeId: 'AI_G_M005_ENTRY',
};
