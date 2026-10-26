import React, { useState, useRef } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Navigation, 
  Layers, 
  Compass, 
  MapPin,
  AlertCircle
} from 'lucide-react';
import type { RouteResult, NavigationNode } from '../types/navigation';
import { getMapConfig } from '../data/maps';
import { navigationNodes } from '../data/navigationNodes';

interface MapViewProps {
  buildingId: 'AI' | 'MAIN';
  floorNumber: number;
  route: RouteResult | null;
  onSelectNode?: (node: NavigationNode) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  buildingId,
  floorNumber,
  route,
  onSelectNode,
}) => {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<NavigationNode | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const mapConfig = getMapConfig(buildingId, floorNumber);

  // `route.path` is a list of node IDs (string[]) — resolve to full node objects once
  const nodeById = React.useMemo(() => {
    const map = new Map<string, NavigationNode>();
    for (const n of navigationNodes) map.set(n.id, n);
    return map;
  }, []);

  const routePathNodes: NavigationNode[] = route
    ? route.path
        .map((id) => nodeById.get(id))
        .filter((n): n is NavigationNode => Boolean(n))
    : [];

  // Zoom controls
  const handleZoomIn = () => setScale((s) => Math.min(s + 0.25, 3));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.25, 0.6));
  const handleReset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  // Pan dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Filter nodes on current floor
  const currentFloorNodes = navigationNodes.filter(
    (n) => n.building === buildingId && n.floor === floorNumber
  );

  // Extract path nodes that belong to this floor
  const floorPathNodes = routePathNodes.filter(
    (n) => n.building === buildingId && n.floor === floorNumber
  );

  // Generate SVG polyline points for this floor's segment
  // If the path traverses nodes on this floor consecutively:
  const svgPathSegments: string[] = [];
  if (routePathNodes.length > 1) {
    let currentSegment: NavigationNode[] = [];
    for (let i = 0; i < routePathNodes.length; i++) {
      const node = routePathNodes[i];
      if (node.building === buildingId && node.floor === floorNumber) {
        currentSegment.push(node);
      } else {
        if (currentSegment.length > 1) {
          svgPathSegments.push(
            currentSegment.map((n) => `${n.x},${n.y}`).join(' ')
          );
        }
        currentSegment = [];
      }
    }
    if (currentSegment.length > 1) {
      svgPathSegments.push(
        currentSegment.map((n) => `${n.x},${n.y}`).join(' ')
      );
    }
  }

  // Check if starting node is on this floor
  const isStartOnThisFloor =
    routePathNodes.length > 0 &&
    routePathNodes[0].building === buildingId &&
    routePathNodes[0].floor === floorNumber;

  // Check if destination node is on this floor
  const isDestinationOnThisFloor =
    routePathNodes.length > 0 &&
    routePathNodes[routePathNodes.length - 1].building === buildingId &&
    routePathNodes[routePathNodes.length - 1].floor === floorNumber;

  // Find lift/stairs transition nodes on this floor
  const transitionNodes = floorPathNodes.filter(
    (n) => n.type === 'lift' || n.type === 'stairs'
  );

  if (!mapConfig) {
    return (
      <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-950 border border-slate-800 rounded-3xl p-8 text-center">
        <AlertCircle className="w-12 h-12 text-amber-500 mb-3 animate-bounce" />
        <h3 className="text-xl font-bold text-white mb-2">Floor Plan Data Pending Survey</h3>
        <p className="text-sm text-slate-400 max-w-md mb-4">
          The blueprints for {buildingId} Building Floor {floorNumber} are currently being mapped and calibrated.
          Please select Ground, First, or Second floor to navigate active maps.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[650px] bg-slate-950 border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Top Floating Overlay Bar */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
        <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-xs font-bold text-white shadow-lg flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>{buildingId === 'AI' ? 'AI Building' : 'Main Building'}</span>
          <span className="text-slate-500">·</span>
          <span className="text-indigo-300">
            {floorNumber === 0 ? 'Ground Floor' : floorNumber === 1 ? 'First Floor' : `Floor ${floorNumber}`}
          </span>
        </div>

        {route && (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-xs font-semibold text-emerald-300 shadow-lg flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
            <span>Active Navigation View</span>
          </div>
        )}
      </div>

      {/* Compass / Orientation Icon */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <div className="w-10 h-10 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-center text-slate-300 shadow-lg">
          <Compass className="w-6 h-6 text-indigo-400" />
        </div>
      </div>

      {/* Floating Zoom Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-1.5 rounded-2xl shadow-xl">
        <button
          type="button"
          onClick={handleZoomIn}
          className="p-2 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="p-2 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <div className="h-px bg-slate-800 my-0.5" />
        <button
          type="button"
          onClick={handleReset}
          className="p-2 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors"
          title="Reset View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Hover Info Tooltip */}
      {hoveredNode && (
        <div className="absolute bottom-6 left-6 z-20 pointer-events-none bg-slate-900/95 backdrop-blur-md border border-indigo-500/50 px-4 py-2.5 rounded-2xl shadow-2xl">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            {hoveredNode.name}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Type: {hoveredNode.type.toUpperCase()} · X: {hoveredNode.x}, Y: {hoveredNode.y}
          </div>
        </div>
      )}

      {/* Main Interactive Map & SVG Overlay */}
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.15s ease-out',
        }}
      >
        <div
          className="relative"
          style={{
            width: mapConfig.width,
            height: mapConfig.height,
          }}
        >
          {/* Blueprint image background */}
          <img
            src={mapConfig.image}
            alt={`${buildingId} Floor ${floorNumber} Map`}
            className="w-full h-full object-contain pointer-events-none rounded-xl"
            draggable={false}
          />

          {/* SVG Route and Marker Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-auto"
            viewBox={`0 0 ${mapConfig.width} ${mapConfig.height}`}
          >
            <defs>
              {/* Glow filter for the route line */}
              <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Linear gradient for route */}
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>

            {/* Render Route Polyline Segments */}
            {svgPathSegments.map((segmentPoints, idx) => (
              <g key={idx}>
                {/* Background glow shadow line */}
                <polyline
                  points={segmentPoints}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.3"
                  filter="url(#routeGlow)"
                />
                {/* Foreground animated dashed line */}
                <polyline
                  points={segmentPoints}
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="8 6"
                  className="animate-route-dash"
                />
              </g>
            ))}

            {/* Render Waypoint Dots Along Route */}
            {floorPathNodes.map((node) => (
              <circle
                key={node.id}
                cx={node.x}
                cy={node.y}
                r="4.5"
                fill="#38bdf8"
                stroke="#0f172a"
                strokeWidth="1.5"
                className="transition-all"
              />
            ))}

            {/* Start Node Marker */}
            {isStartOnThisFloor && routePathNodes.length > 0 && (
              <g
                transform={`translate(${routePathNodes[0].x}, ${routePathNodes[0].y})`}
                className="cursor-pointer"
              >
                {/* Pulsing ring */}
                <circle r="18" fill="#10b981" opacity="0.25" className="animate-ping" />
                <circle r="11" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
                <circle r="4" fill="#ffffff" />
                <text
                  x="0"
                  y="-18"
                  textAnchor="middle"
                  fill="#10b981"
                  fontSize="12"
                  fontWeight="bold"
                  stroke="#0f172a"
                  strokeWidth="3"
                  paintOrder="stroke"
                >
                  START
                </text>
              </g>
            )}

            {/* Destination Node Marker */}
            {isDestinationOnThisFloor && routePathNodes.length > 0 && (
              <g
                transform={`translate(${routePathNodes[routePathNodes.length - 1].x}, ${routePathNodes[routePathNodes.length - 1].y})`}
                className="cursor-pointer"
              >
                {/* Pulsing ring */}
                <circle r="18" fill="#f43f5e" opacity="0.3" className="animate-ping" />
                <circle r="11" fill="#f43f5e" stroke="#ffffff" strokeWidth="2.5" />
                <circle r="4" fill="#ffffff" />
                <text
                  x="0"
                  y="-18"
                  textAnchor="middle"
                  fill="#f43f5e"
                  fontSize="12"
                  fontWeight="bold"
                  stroke="#0f172a"
                  strokeWidth="3"
                  paintOrder="stroke"
                >
                  DESTINATION
                </text>
              </g>
            )}

            {/* Vertical Transition Badges (Lift/Stairs) */}
            {transitionNodes.map((tNode) => (
              <g
                key={`trans-${tNode.id}`}
                transform={`translate(${tNode.x}, ${tNode.y})`}
                className="cursor-pointer"
              >
                <circle r="14" fill="#8b5cf6" opacity="0.3" className="animate-pulse" />
                <circle r="9" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" />
                <text
                  x="0"
                  y="18"
                  textAnchor="middle"
                  fill="#c084fc"
                  fontSize="10"
                  fontWeight="bold"
                  stroke="#0f172a"
                  strokeWidth="2.5"
                  paintOrder="stroke"
                >
                  {tNode.type === 'lift' ? 'LIFT' : 'STAIRS'}
                </text>
              </g>
            ))}

            {/* All Clickable Nodes on this floor */}
            {currentFloorNodes.map((node) => {
              const isStart = routePathNodes.length > 0 && routePathNodes[0].id === node.id;
              const isEnd =
                routePathNodes.length > 0 &&
                routePathNodes[routePathNodes.length - 1].id === node.id;

              // Don't duplicate rendering if it's already start/end/transition
              if (isStart || isEnd) return null;

              return (
                <circle
                  key={node.id}
                  cx={node.x}
                  cy={node.y}
                  r="3.5"
                  fill={node.type === 'entrance' ? '#10b981' : node.type === 'door' ? '#818cf8' : '#64748b'}
                  opacity={node.type === 'corridor' ? 0.35 : 0.7}
                  className="hover:scale-150 transition-transform cursor-pointer"
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => onSelectNode && onSelectNode(node)}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
