
import React, {useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Compass,
  Footprints,
  
  MapPin,
  Navigation,
  Search,
  Sparkles,
  X,
  Accessibility,
} from 'lucide-react';

import { Header } from './components/Header';
import { LocationSelector } from './components/LocationSelector';
import { MapView } from './components/MapView';
import { NavigationView } from './components/NavigationView';
import { NavigationInstructions } from './components/NavigationInstructions';
import { FloorSelector } from './components/FloorSelector';
import ThirdFloorMap from './components/ThirdFloorMap';
import { AboutModal } from './components/AboutModal';
import { Feedback } from './components/Feedback';
import { DevelopersModal } from './components/DevelopersModal';
import { Footer } from './components/Footer';

import type {
  LocationOption,
  NavigationMode,
  RouteResult,
  NavigationNode,
} from './types/navigation';

import { getAllLocationOptions } from './services/locationService';
import { buildGraph, dijkstra } from './algorithms/dijkstra';
import { generateDirections } from './services/directionService';
import { navigationNodes } from './data/navigationNodes';
import { navigationEdges } from './data/navigationEdges';
import { getBuildingById } from './data/buildings';
import { getFloorInfo } from './data/floors';

type BuildingId = 'AI' | 'MAIN';
type Screen = 'home' | 'explore' | 'setup' | 'navigation';

type ExploreCategory =
  | 'All'
  | 'Faculty'
  | 'Classrooms'
  | 'Labs & Halls'
  | 'Offices'
  | 'Facilities'
  | 'Entrances';

const CATEGORIES: ExploreCategory[] = [
  'All',
  'Faculty',
  'Classrooms',
  'Labs & Halls',
  'Offices',
  'Facilities',
  'Entrances',
];

const MODES: {
  value: NavigationMode;
  title: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    value: 'normal',
    title: 'Shortest route',
    description: 'Use the shortest available connected path.',
    icon: Compass,
  },
  {
    value: 'stairs',
    title: 'Stairs',
    description: 'Prefer routes using stairs.',
    icon: Footprints,
  },
  {
    value: 'lift',
    title: 'Lift',
    description: 'Prefer connected lift routes between floors.',
    icon: ArrowUpRight,
  },
  {
    value: 'step-free',
    title: 'Step-free',
    description: 'Use an accessible route when map data supports it.',
    icon: Accessibility,
  },
];

function getCategory(location: LocationOption): ExploreCategory {
  if (location.category === 'teacher') return 'Faculty';
  if (location.category === 'entrance') return 'Entrances';

  const words = [
    location.name,
    location.subtitle,
    location.details ?? '',
    ...location.keywords,
  ]
    .join(' ')
    .toLowerCase();

  if (/laborator|\blab\b|research|seminar|conference/.test(words)) {
    return 'Labs & Halls';
  }

  if (/classroom|lecture room|\bclass\b|\broom\b/.test(words)) {
    return 'Classrooms';
  }

  if (/office|cabin|administrative|admin/.test(words)) {
    return 'Offices';
  }

  if (/lift|stairs|washroom|toilet|library|foyer|corridor|facility/.test(words)) {
    return 'Facilities';
  }

  return location.category === 'room' ? 'Classrooms' : 'Facilities';
}

const App: React.FC = () => {
  const locations = useMemo<LocationOption[]>(
    () => getAllLocationOptions(),
    []
  );

  const aiLocations = useMemo(
    () => locations.filter((location) => location.building === 'AI'),
    [locations]
  );

  const graph = useMemo(
    () => buildGraph(navigationNodes, navigationEdges),
    []
  );

  const nodeMap = useMemo(() => graph.nodes, [graph]);

  const [screen, setScreen] = useState<Screen>('home');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ExploreCategory>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [destination, setDestination] = useState<LocationOption | null>(null);
  const [start, setStart] = useState<LocationOption | null>(null);

  const [mode, setMode] = useState<NavigationMode>('normal');
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [message, setMessage] = useState('');
  const [calculating, setCalculating] = useState(false);

  const [currentBuilding, setCurrentBuilding] =
    useState<BuildingId>('AI');
  const [currentFloor, setCurrentFloor] = useState(0);

  const [aboutOpen, setAboutOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [developersOpen, setDevelopersOpen] = useState(false);

  const filteredLocations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return aiLocations.filter((location) => {
      const matchesCategory =
        category === 'All' || getCategory(location) === category;

      const searchable = [
        location.name,
        location.id,
        location.subtitle,
        location.details ?? '',
        ...location.keywords,
      ]
        .join(' ')
        .toLowerCase();

      return matchesCategory && (!query || searchable.includes(query));
    });
  }, [aiLocations, category, search]);

  const buildingName =
    getBuildingById(currentBuilding)?.name ?? currentBuilding;

  const floorName =
    getFloorInfo(currentBuilding, currentFloor)?.label ??
    `Floor ${currentFloor}`;

  const chooseDestination = (location: LocationOption) => {
    setDestination(location);
    setStart(null);
    setRoute(null);
    setMessage('');
    setMode('normal');
    setScreen('setup');
  };

  

  const startNavigation = () => {
    if (!destination) {
      setMessage('Please select a destination first.');
      return;
    }

    if (!start) {
      setMessage('Please select your starting position.');
      return;
    }

    if (start.nodeId === destination.nodeId) {
      setMessage('Your starting position and destination cannot be the same.');
      return;
    }

    const startNode = nodeMap.get(start.nodeId);
    const destinationNode = nodeMap.get(destination.nodeId);

    if (!startNode || !destinationNode) {
      setMessage(
        'Navigation data is unavailable for one of these locations. Please choose another location.'
      );
      return;
    }

    setCalculating(true);
    setMessage('');
    setRoute(null);

    try {
      const result = dijkstra(
        graph,
        start.nodeId,
        destination.nodeId,
        mode
      );

      if (!result) {
        setMessage(
          mode === 'step-free'
            ? 'No step-free route was found in the current map data. Try another route type.'
            : 'No connected route was found for this selection. Try another route type or location.'
        );
        setCalculating(false);
        return;
      }

      const directions = generateDirections(
        result.path,
        result.distance,
        nodeMap,
        navigationEdges,
        mode
      );

      setRoute(directions);
      setCurrentBuilding(start.building);
      setCurrentFloor(start.floor);
      setScreen('navigation');
    } catch (error) {
      console.error('Navigation calculation failed:', error);
      setMessage('Unable to calculate this route. Please try again.');
    } finally {
      setCalculating(false);
    }
  };

  const handleMapNodeClick = (node: NavigationNode) => {
    const found = locations.find(
      (location) => location.nodeId === node.id
    );

    if (!found) {
      setMessage('This map node is not listed as a selectable location yet.');
      return;
    }

    if (screen === 'navigation') {
      return;
    }

    if (!start) {
      setStart(found);
    } else {
      setDestination(found);
    }
  };

  const handleThirdFloorLocationClick = (locationId: string) => {
    const found = locations.find(
      (location) =>
        location.id === locationId || location.nodeId === locationId
    );

    if (!found) {
      const node = navigationNodes.find(
        (item) => item.id === locationId
      );

      if (!node) {
        setMessage('This room is not connected to the navigation graph yet.');
        return;
      }

      const fallback: LocationOption = {
        id: node.id,
        name: node.name,
        building: node.building,
        floor: node.floor,
        nodeId: node.id,
        category:
          node.type === 'lift' || node.type === 'stairs'
            ? 'transport'
            : 'facility',
        subtitle: `${
          getBuildingById(node.building)?.shortName ?? node.building
        } · Floor ${node.floor}`,
        details: 'Selected from the floor map.',
        accessible: node.accessible,
        keywords: [node.name, node.id],
      };

      if (!start) {
        setStart(fallback);
      } else {
        setDestination(fallback);
      }

      return;
    }

    if (!start) {
      setStart(found);
    } else {
      setDestination(found);
    }
  };

  const goBackFromNavigation = () => {
    setRoute(null);
    setMessage('');
    setScreen('setup');
  };

  const goBackFromSetup = () => {
    setMessage('');
    setScreen('explore');
  };

  const handleFloorChange = (floor: number) => {
    setCurrentFloor(floor);
  };

  const handleBuildingChange = (building: BuildingId) => {
    setCurrentBuilding(building);
    setCurrentFloor(0);
  };

  /*
   * The navigation page is intentionally isolated from the Explore UI.
   * No directory cards, dashboard or footer render while navigation is active.
   */
  if (screen === 'navigation') {
    return (
      <div className="min-h-screen overflow-x-hidden bg-[#080D19] text-white">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080D19]/95 px-4 py-3 backdrop-blur-xl sm:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBackFromNavigation}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="min-w-0 text-center">
              <p className="truncate text-xs text-slate-400">
                Navigation to
              </p>
              <h1 className="truncate text-sm font-extrabold sm:text-base">
                {destination?.name}
              </h1>
            </div>

            <button
              type="button"
              onClick={goBackFromNavigation}
              aria-label="Exit navigation"
              className="rounded-xl border border-white/10 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl space-y-4 px-3 py-4 sm:px-6 sm:py-6">
          <section className="rounded-2xl border border-cyan-300/20 bg-gradient-to-r from-cyan-400/10 to-violet-400/10 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-cyan-300/10 p-2.5 text-cyan-200">
                <Navigation className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-200">
                  Your route
                </p>
                <h2 className="mt-1 break-words text-lg font-black sm:text-xl">
                  {start?.name} <ArrowRight className="inline h-4 w-4" />{' '}
                  {destination?.name}
                </h2>
                <p className="mt-2 text-xs text-slate-300">
                  Route type: {mode === 'normal' ? 'Shortest route' : mode}
                  {' · '}
                  {buildingName} · {floorName}
                </p>
              </div>
            </div>
          </section>

          {route && (
            <NavigationView
              route={route}
              currentMode={mode}
              onReset={goBackFromNavigation}
            />
          )}

          {route && route.steps.length > 0 && (
            <NavigationInstructions
              steps={route.steps}
              onSelectFloor={handleFloorChange}
              activeFloor={currentFloor}
            />
          )}

          <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111827] p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-extrabold sm:text-base">
                  Route map
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Select a floor to view the corresponding map.
                </p>
              </div>

              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] font-bold text-cyan-200">
                {floorName}
              </span>
            </div>

            <FloorSelector
              selectedBuilding={currentBuilding}
              onSelectBuilding={handleBuildingChange}
              selectedFloor={currentFloor}
              onSelectFloor={handleFloorChange}
              floorsInRoute={[]}
            />

            <div className="mt-4 min-w-0">
              {currentBuilding === 'AI' && currentFloor === 3 ? (
                <ThirdFloorMap
                  selectedLocationId={start?.id ?? start?.nodeId}
                  destinationLocationId={
                    destination?.id ?? destination?.nodeId
                  }
                  onSelectLocation={handleThirdFloorLocationClick}
                />
              ) : (
                <MapView
                  buildingId={currentBuilding}
                  floorNumber={currentFloor}
                  route={route}
                  onSelectNode={handleMapNodeClick}
                />
              )}
            </div>
          </section>

          <button
            type="button"
            onClick={goBackFromNavigation}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to route settings
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="mits-shell min-h-screen w-full overflow-x-clip bg-[#080D19] text-slate-100">
      <Header
        currentBuildingName={buildingName}
        currentFloorName={floorName}
        onOpenAbout={() => setAboutOpen(true)}
      />

      <main className="mx-auto w-full max-w-7xl px-3 pb-12 pt-5 sm:px-6 sm:pt-8">
        {screen === 'home' && (
          <section className="relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-[#111827] p-6 sm:p-10">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-20 left-1/4 -z-10 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"
            />

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200">
                <Sparkles className="h-3.5 w-3.5" />
                MITS Indoor Navigation
              </span>

              <h1 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">
                Explore the
                <span className="mits-gradient-text block">
                  AI Building
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Find faculty cabins, classrooms, labs and campus facilities.
                Select your destination, choose your starting position and
                get a route using the existing campus map.
              </p>

              <button
                type="button"
                onClick={() => setScreen('explore')}
                className="mits-primary-button mt-7 inline-flex items-center justify-center gap-3 rounded-xl px-6 py-4 text-sm font-extrabold text-white"
              >
                <Building2 className="h-5 w-5" />
                Explore AI Building
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        )}

        {screen === 'explore' && (
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827]">
            <div className="border-b border-white/10 bg-gradient-to-r from-[#111827] to-[#18243A] p-5 sm:p-7">
              <button
                type="button"
                onClick={() => setScreen('home')}
                className="mb-5 inline-flex items-center gap-2 text-xs font-bold text-slate-400 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-cyan-300/10 p-3 text-cyan-200">
                  <Building2 className="h-6 w-6" />
                </div>

                <div>
                  <h1 className="text-2xl font-black sm:text-3xl">
                    Explore AI Building
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    Search the available location directory and select
                    Navigate to plan your journey.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search faculty, room number, lab..."
                  aria-label="Search AI Building locations"
                  className="w-full rounded-xl border border-white/10 bg-[#080D19] py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10"
                />
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {CATEGORIES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
                      category === item
                        ? 'border-cyan-300 bg-cyan-300 text-slate-950'
                        : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {category === 'All' ? 'All locations' : category}
                </p>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-cyan-200">
                  {filteredLocations.length} results
                </span>
              </div>

              {filteredLocations.length > 0 ? (
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {filteredLocations.map((location) => {
                    const expanded = expandedId === location.id;

                    return (
                      <article
                        key={`${location.category}-${location.id}`}
                        className="flex min-w-0 flex-col rounded-2xl border border-white/10 bg-[#0B1220] p-4 transition hover:border-cyan-300/30"
                      >
                        <div className="flex items-start gap-3">
                          <div className="rounded-xl bg-cyan-300/10 p-2.5 text-cyan-200">
                            <MapPin className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h2 className="break-words text-sm font-extrabold text-white">
                              {location.name}
                            </h2>
                            <p className="mt-1 text-xs leading-5 text-slate-400">
                              {location.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-full bg-violet-300/10 px-2.5 py-1 text-[10px] font-bold text-violet-200">
                            {getCategory(location)}
                          </span>
                          <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-slate-300">
                            {location.floor === 0
                              ? 'Ground Floor'
                              : `Floor ${location.floor}`}
                          </span>
                        </div>

                        {expanded && (
                          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-6 text-slate-300">
                            <p>
                              {location.details ||
                                'No additional description is available for this location yet.'}
                            </p>
                            <p className="mt-1 text-slate-500">
                              Location ID: {location.id}
                            </p>
                          </div>
                        )}

                        <div className="mt-auto flex gap-2 pt-4">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedId(expanded ? null : location.id)
                            }
                            className="flex-1 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-bold text-slate-300 transition hover:bg-white/5"
                          >
                            {expanded ? 'Hide details' : 'View details'}
                          </button>

                          <button
                            type="button"
                            onClick={() => chooseDestination(location)}
                            className="mits-primary-button inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-extrabold text-white"
                          >
                            Navigate
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-white/15 p-8 text-center">
                  <Search className="mx-auto h-7 w-7 text-slate-500" />
                  <p className="mt-3 text-sm font-bold text-white">
                    No locations found
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Try a different search or category.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      setCategory('All');
                    }}
                    className="mt-3 text-xs font-bold text-cyan-200 underline underline-offset-4"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {screen === 'setup' && destination && (
          <section className="mx-auto max-w-3xl space-y-4">
            <button
              type="button"
              onClick={goBackFromSetup}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Explore Building
            </button>

            <div className="rounded-3xl border border-white/10 bg-[#111827] p-5 sm:p-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-300/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-200">
                <Navigation className="h-3.5 w-3.5" />
                Set up navigation
              </span>

              <h1 className="mt-4 text-2xl font-black sm:text-3xl">
                Where are you starting from?
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Your destination is already selected. Choose your current
                position and preferred route type to continue.
              </p>

              <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-cyan-300/10 p-2.5 text-cyan-200">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-200">
                      Selected destination
                    </p>
                    <p className="mt-1 break-words text-base font-extrabold text-white">
                      {destination.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {destination.subtitle} ·{' '}
                      {destination.floor === 0
                        ? 'Ground Floor'
                        : `Floor ${destination.floor}`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Your initial position
                </label>

                <LocationSelector
                  label="Starting point"
                  selected={start}
                  onSelect={(location) => {
                    setStart(location);
                    setMessage('');
                  }}
                  options={locations.filter(
                    (location) => location.nodeId !== destination.nodeId
                  )}
                  placeholder="Search entrance, room, lab or faculty..."
                  colorScheme="emerald"
                />

                {start && (
                  <div className="mt-3 flex items-start gap-2 rounded-xl bg-emerald-300/10 p-3 text-xs text-emerald-200">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      Starting point: <strong>{start.name}</strong>
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-7">
                <h2 className="text-sm font-extrabold text-white">
                  Choose navigation type
                </h2>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Available routes depend on the connections in the campus map.
                </p>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {MODES.map((item) => {
                    const Icon = item.icon;
                    const selected = mode === item.value;

                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => {
                          setMode(item.value);
                          setMessage('');
                        }}
                        aria-pressed={selected}
                        className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                          selected
                            ? 'border-cyan-300/60 bg-cyan-300/10 ring-1 ring-cyan-300/20'
                            : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                        }`}
                      >
                        <div
                          className={`rounded-xl p-2 ${
                            selected
                              ? 'bg-cyan-300 text-slate-950'
                              : 'bg-white/5 text-slate-300'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-extrabold text-white">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            {item.description}
                          </p>
                        </div>

                        {selected && (
                          <Check className="h-4 w-4 shrink-0 text-cyan-200" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {message && (
                <div
                  role="alert"
                  className="mt-5 rounded-xl border border-amber-300/20 bg-amber-300/10 p-3 text-xs leading-5 text-amber-200"
                >
                  {message}
                </div>
              )}

              <button
                type="button"
                disabled={!start || calculating}
                onClick={startNavigation}
                className="mits-primary-button mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {calculating ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Calculating route...
                  </>
                ) : (
                  <>
                    <Navigation className="h-4 w-4" />
                    Start Navigation
                    <ArrowUpRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </section>
        )}
      </main>

      <Footer
        onOpenFeedback={() => setFeedbackOpen(true)}
        onOpenDevelopers={() => setDevelopersOpen(true)}
      />

      <Feedback
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />

      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />

      <DevelopersModal
        isOpen={developersOpen}
        onClose={() => setDevelopersOpen(false)}
      />
    </div>
  );
};

export default App;
