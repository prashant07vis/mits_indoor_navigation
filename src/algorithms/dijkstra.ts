/**
 * DIJKSTRA SHORTEST PATH ALGORITHM
 * 
 * Manually implemented for MITS INDOOR CAMPUS NAVIGATION SYSTEM.
 * Operates over a weighted campus graph respecting multi-floor transitions,
 * accessibility constraints, and user navigation modes.
 */

import type { NavigationEdge, NavigationMode, NavigationNode } from '../types/navigation';

export interface GraphData {
  nodes: Map<string, NavigationNode>;
  adjacency: Map<string, Array<{ to: string; distance: number; edge: NavigationEdge }>>;
}

export interface DijkstraResult {
  path: string[];
  distance: number;
}

/**
 * Builds an internal adjacency lookup structure from nodes and edges lists.
 */
export function buildGraph(nodes: NavigationNode[], edges: NavigationEdge[]): GraphData {
  const nodeMap = new Map<string, NavigationNode>();
  const adjacency = new Map<string, Array<{ to: string; distance: number; edge: NavigationEdge }>>();

  for (const node of nodes) {
    nodeMap.set(node.id, node);
    adjacency.set(node.id, []);
  }

  for (const edge of edges) {
    // Ensure both nodes exist in the graph
    if (!adjacency.has(edge.from)) {
      adjacency.set(edge.from, []);
    }
    if (!adjacency.has(edge.to)) {
      adjacency.set(edge.to, []);
    }

    // Bidirectional edge addition
    adjacency.get(edge.from)!.push({
      to: edge.to,
      distance: edge.distance,
      edge,
    });

    adjacency.get(edge.to)!.push({
      to: edge.from,
      distance: edge.distance,
      edge,
    });
  }

  return {
    nodes: nodeMap,
    adjacency,
  };
}

/**
 * Validates whether an edge is traversable under the current navigation mode.
 * 
 * Rules:
 * - "normal": allows corridor, door, lift, stairs, external
 * - "lift": allows corridor, door, lift, external; strictly forbids stairs
 * - "stairs": allows corridor, door, stairs, external; strictly forbids lift
 * - "step-free": allows corridor, door, lift, external; strictly forbids stairs AND inaccessible edges
 */
export function isEdgeTraversable(edge: NavigationEdge, mode: NavigationMode): boolean {
  switch (mode) {
    case 'lift':
      // Permit corridor, door, lift, external; reject stairs
      if (edge.type === 'stairs') return false;
      return true;

    case 'stairs':
      // Permit corridor, door, stairs, external; reject lift
      if (edge.type === 'lift') return false;
      return true;

    case 'step-free':
      // Wheelchair / accessible routing:
      // Strictly reject stairs and any edge marked inaccessible
      if (edge.type === 'stairs') return false;
      if (!edge.accessible) return false;
      return true;

    case 'normal':
    default:
      return true;
  }
}

/**
 * Executes Dijkstra's Shortest Path Algorithm on the provided navigation graph.
 * 
 * @param graph The pre-indexed GraphData (nodes and adjacency list)
 * @param startNodeId Unique identifier of the origin node
 * @param destinationNodeId Unique identifier of the target destination node
 * @param navigationMode Selected transport mode ('normal' | 'lift' | 'stairs' | 'step-free')
 * @returns { path: string[], distance: number } or null if no valid path exists
 */
export function dijkstra(
  graph: GraphData,
  startNodeId: string,
  destinationNodeId: string,
  navigationMode: NavigationMode = 'normal'
): DijkstraResult | null {
  const { adjacency, nodes } = graph;

  // 0. Boundary & existence checks
  if (!nodes.has(startNodeId) || !nodes.has(destinationNodeId)) {
    return null;
  }

  // Trivial identity case
  if (startNodeId === destinationNodeId) {
    return {
      path: [startNodeId],
      distance: 0,
    };
  }

  // If in step-free mode, verify that start and end nodes are themselves accessible
  if (navigationMode === 'step-free') {
    const startNode = nodes.get(startNodeId);
    const destNode = nodes.get(destinationNodeId);
    if (startNode && !startNode.accessible) return null;
    if (destNode && !destNode.accessible) return null;
  }

  // 1. Initialize all node distances to Infinity
  const distances = new Map<string, number>();
  const previous = new Map<string, string | null>();
  const visited = new Set<string>();

  for (const nodeId of adjacency.keys()) {
    distances.set(nodeId, Infinity);
    previous.set(nodeId, null);
  }

  // 2. Set starting node distance to 0
  distances.set(startNodeId, 0);

  // Priority queue tracking { id, dist }
  const queue: Array<{ id: string; dist: number }> = [{ id: startNodeId, dist: 0 }];

  // 7. Loop until target is reached or queue exhausted
  while (queue.length > 0) {
    // 3. Select unvisited node with smallest cumulative distance
    queue.sort((a, b) => a.dist - b.dist);
    const current = queue.shift()!;

    if (visited.has(current.id)) continue;
    visited.add(current.id);

    // Target reached early termination
    if (current.id === destinationNodeId) {
      break;
    }

    // 4. Examine neighboring nodes
    const neighbors = adjacency.get(current.id) || [];
    for (const neighbor of neighbors) {
      if (visited.has(neighbor.to)) continue;

      // 6. Respect navigation mode
      if (!isEdgeTraversable(neighbor.edge, navigationMode)) {
        continue;
      }

      // Check node accessibility if step-free
      if (navigationMode === 'step-free') {
        const neighborNode = nodes.get(neighbor.to);
        if (neighborNode && !neighborNode.accessible) {
          continue;
        }
      }

      // 5. Relax edges
      const currentDist = distances.get(current.id) ?? Infinity;
      const candidateDist = currentDist + neighbor.distance;
      const existingDist = distances.get(neighbor.to) ?? Infinity;

      if (candidateDist < existingDist) {
        distances.set(neighbor.to, candidateDist);
        previous.set(neighbor.to, current.id);
        queue.push({ id: neighbor.to, dist: candidateDist });
      }
    }
  }

  const totalDistance = distances.get(destinationNodeId);
  if (totalDistance === undefined || totalDistance === Infinity) {
    return null; // No route could be found under given constraints
  }

  // 8. Reconstruct shortest path by back-tracking from destination
  const path: string[] = [];
  let curr: string | null = destinationNodeId;

  while (curr !== null) {
    path.unshift(curr);
    curr = previous.get(curr) || null;
  }

  // Path validity assertion
  if (path.length === 0 || path[0] !== startNodeId) {
    return null;
  }

  // 9. Return final route and total distance
  return {
    path,
    distance: Math.round(totalDistance * 10) / 10,
  };
}
