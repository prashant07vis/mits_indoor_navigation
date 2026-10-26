import type { NavigationEdge, NavigationMode, NavigationNode, RouteResult, StepInstruction } from '../types/navigation';
import { navigationConfig } from '../config/navigationConfig';

export function calculateTurnAngle(
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number }
): number {
  const v1 = { x: p2.x - p1.x, y: p2.y - p1.y };
  const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };

  const dot = v1.x * v2.x + v1.y * v2.y;
  const cross = v1.x * v2.y - v1.y * v2.x;

  // returns angle in degrees between -180 and 180
  return (Math.atan2(cross, dot) * 180) / Math.PI;
}

export function generateDirections(
  path: string[],
  totalDistance: number,
  nodeMap: Map<string, NavigationNode>,
  edgeList: NavigationEdge[],
  mode: NavigationMode
): RouteResult {
  const steps: StepInstruction[] = [];
  const floorsVisited = new Set<number>();
  const buildingsVisited = new Set<'AI' | 'MAIN'>();
  const transitions: ('lift' | 'stairs' | 'none')[] = [];

  // Build edge distance lookup for quick querying
  const edgeLookup = new Map<string, NavigationEdge>();
  for (const edge of edgeList) {
    edgeLookup.set(`${edge.from}::${edge.to}`, edge);
    edgeLookup.set(`${edge.to}::${edge.from}`, edge);
  }

  let cumulativeDistance = 0;
  let transitionTimeBonus = 0;

  for (let i = 0; i < path.length; i++) {
    const currentNode = nodeMap.get(path[i]);
    if (!currentNode) continue;

    floorsVisited.add(currentNode.floor);
    buildingsVisited.add(currentNode.building);

    const prevNode = i > 0 ? nodeMap.get(path[i - 1]) : undefined;
    const nextNode = i < path.length - 1 ? nodeMap.get(path[i + 1]) : undefined;

    const segmentEdge = prevNode
      ? edgeLookup.get(`${prevNode.id}::${currentNode.id}`)
      : undefined;

    const segDist = segmentEdge ? segmentEdge.distance : 0;
    cumulativeDistance += segDist;

    let direction: StepInstruction['direction'] = 'straight';
    let instruction = '';

    // Floor / building transition detection
    if (prevNode && prevNode.floor !== currentNode.floor) {
      const isAscending = currentNode.floor > prevNode.floor;
      const targetFloorName =
        currentNode.floor === 0 ? 'Ground Floor' : `Floor ${currentNode.floor}`;

      if (segmentEdge?.type === 'lift') {
        direction = isAscending ? 'lift-up' : 'lift-down';
        instruction = `Take the lift ${isAscending ? 'up' : 'down'} to ${targetFloorName}.`;
        transitionTimeBonus += navigationConfig.liftTransitionTime;
        transitions.push('lift');
      } else {
        direction = isAscending ? 'stairs-up' : 'stairs-down';
        instruction = `Take the stairs ${isAscending ? 'up' : 'down'} to ${targetFloorName}.`;
        transitionTimeBonus += navigationConfig.stairsTransitionTime;
        transitions.push('stairs');
      }
    } else if (prevNode && prevNode.building !== currentNode.building) {
      direction = 'enter-building';
      instruction = `Cross the central campus walkway and enter the ${
        currentNode.building === 'AI' ? 'AI Building' : 'Main Building'
      }.`;
    } else if (i === 0) {
      direction = 'start';
      instruction = `Start from ${currentNode.name}.`;
    } else if (i === path.length - 1) {
      direction = 'arrive';
      instruction = `You have arrived at ${currentNode.name}.`;
    } else if (prevNode && nextNode) {
      // Check if entering or exiting a lift/stairs
      if (currentNode.type === 'lift' && nextNode.type === 'lift') {
        direction = 'lift-up';
        instruction = `Walk into the lift.`;
      } else if (prevNode.type === 'lift' && currentNode.type !== 'lift') {
        direction = 'exit-lift';
        instruction = `Exit the lift onto the corridor.`;
      } else if (prevNode.type === 'stairs' && currentNode.type !== 'stairs') {
        direction = 'exit-stairs';
        instruction = `Exit the staircase onto the corridor.`;
      } else {
        const angle = calculateTurnAngle(prevNode, currentNode, nextNode);
        if (Math.abs(angle) < 25) {
          direction = 'straight';
          instruction = `Continue straight along the corridor for ${segDist.toFixed(1)} m.`;
        } else if (angle > 55) {
          direction = 'right';
          instruction = `Turn right at ${currentNode.name}.`;
        } else if (angle < -55) {
          direction = 'left';
          instruction = `Turn left at ${currentNode.name}.`;
        } else if (angle > 0) {
          direction = 'slight-right';
          instruction = `Bear slightly right toward ${nextNode.name}.`;
        } else {
          direction = 'slight-left';
          instruction = `Bear slightly left toward ${nextNode.name}.`;
        }
      }
    } else {
      direction = 'straight';
      instruction = `Head toward ${currentNode.name}.`;
    }

    steps.push({
      index: i,
      nodeId: currentNode.id,
      nodeName: currentNode.name,
      instruction,
      direction,
      distance: Math.round(segDist * 10) / 10,
      cumulativeDistance: Math.round(cumulativeDistance * 10) / 10,
      floor: currentNode.floor,
      building: currentNode.building,
      type: segmentEdge?.type || currentNode.type,
    });
  }

  // Estimated walking time in seconds
  const walkingTimeSec = totalDistance / navigationConfig.walkingSpeed;
  const totalEstimatedTimeSec = Math.round(walkingTimeSec + transitionTimeBonus);

  return {
    path,
    distance: totalDistance,
    steps,
    estimatedTime: totalEstimatedTimeSec,
    floors: Array.from(floorsVisited).sort((a, b) => a - b),
    buildings: Array.from(buildingsVisited),
    mode,
    transitionTypes: transitions.length > 0 ? transitions : ['none'],
  };
}

export function formatDistance(meters: number): string {
  if (meters < 1) return '< 1 m';
  return `${Math.round(meters)} m`;
}

export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} sec`;
  }
  const mins = Math.floor(seconds / 60);
  const remainingSecs = seconds % 60;
  if (remainingSecs === 0) {
    return `${mins} min`;
  }
  return `${mins} min ${remainingSecs} sec`;
}
