import React, {
  useState,
  useRef,
  useEffect,
} from 'react';

import {
  Search,
  MapPin,
  X,
  User,
  DoorOpen,
  Beaker,
  Landmark,
  ChevronDown,
  Check,
  Building2,
  Layers3,
  Accessibility,
  Navigation,
  Sparkles,
} from 'lucide-react';

import type {
  LocationOption,
} from '../types/navigation';

import {
  searchLocations,
} from '../services/locationService';

interface LocationSelectorProps {
  label: string;
  selected: LocationOption | null;
  onSelect: (
    location: LocationOption | null
  ) => void;
  options: LocationOption[];
  placeholder?: string;
  colorScheme?: 'emerald' | 'indigo' | 'amber';
}

export const LocationSelector: React.FC<
  LocationSelectorProps
> = ({
  label,
  selected,
  onSelect,
  options,
  placeholder = 'Search classroom, teacher, lab, hall...',
  colorScheme = 'indigo',
}) => {

  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const [
    query,
    setQuery,
  ] = useState('');

  const [
    activeCategory,
    setActiveCategory,
  ] = useState<string>('all');

  const containerRef =
    useRef<HTMLDivElement>(null);

  const inputRef =
    useRef<HTMLInputElement>(null);

  /* ==========================================================
     CLOSE WHEN CLICKING OUTSIDE
  ========================================================== */

  useEffect(() => {

    const handleClickOutside = (
      event: MouseEvent
    ) => {

      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };

  }, []);

  /* ==========================================================
     SEARCH
  ========================================================== */

  const filteredBySearch =
    searchLocations(
      query,
      options
    );

  /* ==========================================================
     CATEGORY FILTER
  ========================================================== */

  const filteredByCategory =
    activeCategory === 'all'
      ? filteredBySearch
      : filteredBySearch.filter(
          (item) => {

            if (
              activeCategory ===
              'teacher'
            ) {
              return (
                item.category ===
                'teacher'
              );
            }

            if (
              activeCategory ===
              'room'
            ) {
              return (
                item.category ===
                'room'
              );
            }

            if (
              activeCategory ===
              'facility'
            ) {
              return (
                item.category ===
                'facility'
              );
            }

            if (
              activeCategory ===
              'entrance'
            ) {
              return (
                item.category ===
                'entrance'
              );
            }

            return true;
          }
        );

  /* ==========================================================
     CATEGORY ICON
  ========================================================== */

  const getCategoryIcon = (
    category: string
  ) => {

    switch (category) {

      case 'teacher':
        return (
          <User
            className="
              w-4 h-4
              text-purple-500
              dark:text-purple-400
            "
          />
        );

      case 'facility':
        return (
          <Beaker
            className="
              w-4 h-4
              text-cyan-600
              dark:text-cyan-400
            "
          />
        );

      case 'entrance':
        return (
          <Landmark
            className="
              w-4 h-4
              text-emerald-600
              dark:text-emerald-400
            "
          />
        );

      default:
        return (
          <DoorOpen
            className="
              w-4 h-4
              text-amber-600
              dark:text-amber-400
            "
          />
        );
    }
  };

  /* ==========================================================
     CATEGORY LABEL
  ========================================================== */

  const getCategoryLabel = (
    category: string
  ) => {

    switch (category) {

      case 'teacher':
        return 'Faculty';

      case 'room':
        return 'Classroom';

      case 'facility':
        return 'Lab / Hall';

      case 'entrance':
        return 'Gate / Foyer';

      default:
        return 'Location';
    }
  };

  /* ==========================================================
     COLORS
  ========================================================== */

  const ringColor =
    colorScheme === 'emerald'
      ? `
        focus-within:ring-emerald-500/30
        border-emerald-500/40
        hover:border-emerald-500/70
      `
      : colorScheme === 'amber'
        ? `
          focus-within:ring-amber-500/30
          border-amber-500/40
          hover:border-amber-500/70
        `
        : `
          focus-within:ring-[#C2185B]/30
          border-[#C2185B]/40
          hover:border-[#C2185B]/70
        `;

  const dotColor =
    colorScheme === 'emerald'
      ? 'bg-emerald-400 shadow-emerald-500/50'
      : colorScheme === 'amber'
        ? 'bg-amber-400 shadow-amber-500/50'
        : 'bg-[#C2185B] shadow-[#C2185B]/50';

  /* ==========================================================
     OPEN SEARCH
  ========================================================== */

  const openSearch = () => {

    setIsOpen(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  /* ==========================================================
     SELECT LOCATION
  ========================================================== */

  const handleSelect = (
    location: LocationOption
  ) => {

    onSelect(location);

    setIsOpen(false);

    setQuery('');
  };

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div
      className="relative w-full"
      ref={containerRef}
    >

      {/* ======================================================
          LABEL
      ====================================================== */}

      <label
        className="
          flex items-center gap-1.5
          text-xs font-semibold
          text-[#6B5963]
          dark:text-[#C9B6C0]
          mb-1.5
          tracking-wide uppercase
        "
      >

        <span
          className={`
            w-2 h-2
            rounded-full
            ${dotColor}
            shadow-sm
            animate-pulse
          `}
        />

        {label}

      </label>

      {/* ======================================================
          SELECTED LOCATION
      ====================================================== */}

      <div
        onClick={openSearch}
        className={`
          flex items-center gap-2
          px-3 py-2.5
          bg-white
          dark:bg-[#28131E]
          border rounded-xl
          cursor-pointer
          transition-all duration-300
          shadow-sm
          hover:-translate-y-[1px]
          hover:shadow-md
          ${ringColor}
        `}
      >

        <MapPin
          className={`
            w-4 h-4
            shrink-0
            transition-colors
            ${
              selected
                ? colorScheme === 'emerald'
                  ? 'text-emerald-500 dark:text-emerald-400'
                  : colorScheme === 'amber'
                    ? 'text-amber-500 dark:text-amber-400'
                    : 'text-[#97144D] dark:text-[#F08AB4]'
                : 'text-[#8B7881] dark:text-[#735564]'
            }
          `}
        />

        <div className="flex-1 min-w-0">

          {selected ? (

            <div className="min-w-0">

              <div
                className="
                  flex items-center
                  gap-2
                  min-w-0
                "
              >

                <span
                  className="
                    text-sm font-bold
                    text-[#241820]
                    dark:text-[#FFF5FA]
                    truncate
                  "
                >
                  {selected.name}
                </span>

                <span
                  className="
                    shrink-0
                    text-[9px]
                    font-bold
                    px-1.5 py-0.5
                    rounded-md
                    bg-[#F3E7EF]
                    dark:bg-[#351524]
                    text-[#97144D]
                    dark:text-[#F08AB4]
                    border
                    border-[#E3C5D5]
                    dark:border-[#4A2035]
                  "
                >
                  F{selected.floor}
                </span>

              </div>

              <div
                className="
                  text-xs
                  text-[#6B5963]
                  dark:text-[#C9B6C0]
                  truncate
                  mt-0.5
                "
              >
                {selected.subtitle}
              </div>

            </div>

          ) : (

            <span
              className="
                text-sm
                text-[#7A6871]
                dark:text-[#C9B6C0]
                select-none
                truncate
              "
            >
              {placeholder}
            </span>

          )}

        </div>

        {selected ? (

          <button
            type="button"
            onClick={(event) => {

              event.stopPropagation();

              onSelect(null);

              setQuery('');

            }}
            className="
              p-1
              hover:bg-[#F3E7EF]
              dark:hover:bg-[#351524]
              rounded-lg
              text-[#7A6871]
              dark:text-[#C9B6C0]
              hover:text-[#97144D]
              dark:hover:text-[#F08AB4]
              transition-colors
            "
            title="Clear selection"
          >
            <X className="w-4 h-4" />
          </button>

        ) : (

          <ChevronDown
            className="
              w-4 h-4
              text-[#8B7881]
              dark:text-[#735564]
            "
          />

        )}

      </div>

      {/* ======================================================
          DROPDOWN
      ====================================================== */}

      {isOpen && (
        <div
          className="
            absolute
            z-[9999]
            left-0 right-0
            mt-2
            bg-white
            dark:bg-[#211019]
            backdrop-blur-xl
            border
            border-[#E3C5D5]
            dark:border-[#4A2035]
            rounded-2xl
            shadow-2xl
            shadow-black/15
            dark:shadow-black/70
            overflow-hidden
            animate-in
            fade-in
            slide-in-from-top-2
            duration-200
          "
        >

          {/* ==================================================
              SEARCH AREA
          ================================================== */}

          <div
            className="
              p-3
              border-b
              border-[#E3C5D5]
              dark:border-[#4A2035]
              bg-[#F8F1F6]
              dark:bg-[#160A11]
            "
          >

            {/* Search box */}

            <div className="relative">

              <Search
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  w-4 h-4
                  text-[#7A6871]
                  dark:text-[#C9B6C0]
                "
              />

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) =>
                  setQuery(
                    event.target.value
                  )
                }
                placeholder="
                  Search room number, office,
                  teacher, lab, hall...
                "
                className="
                  w-full
                  pl-9 pr-8
                  py-2.5
                  bg-white
                  dark:bg-[#28131E]
                  text-sm
                  text-[#241820]
                  dark:text-[#FFF5FA]
                  placeholder-[#8B7881]
                  dark:placeholder-[#9D8791]
                  rounded-xl
                  border
                  border-[#D8B8C8]
                  dark:border-[#4A2035]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#C2185B]/25
                  focus:border-[#C2185B]
                  transition-all
                "
                autoFocus
              />

              {query && (

                <button
                  type="button"
                  onClick={() =>
                    setQuery('')
                  }
                  className="
                    absolute
                    right-2.5
                    top-1/2
                    -translate-y-1/2
                    p-1
                    text-[#7A6871]
                    dark:text-[#C9B6C0]
                    hover:text-[#97144D]
                    dark:hover:text-[#F08AB4]
                  "
                >
                  <X className="w-3.5 h-3.5" />
                </button>

              )}

            </div>

            {/* =================================================
                SMART SEARCH HINT
            ================================================= */}

            <div
              className="
                mt-2.5
                flex items-center gap-2
                text-[10px]
                text-[#6B5963]
                dark:text-[#C9B6C0]
              "
            >

              <Sparkles
                className="
                  w-3 h-3
                  text-[#C2185B]
                  dark:text-[#F08AB4]
                "
              />

              <span>
                Try <b>room number</b>, <b>SH</b>,
                faculty name, department or office
              </span>

            </div>

            {/* =================================================
                FILTER PILLS
            ================================================= */}

            <div
              className="
                flex gap-1.5
                mt-2.5
                overflow-x-auto
                pb-1
              "
            >

              {[
                {
                  id: 'all',
                  label: 'All',
                },
                {
                  id: 'teacher',
                  label: 'Faculty',
                },
                {
                  id: 'room',
                  label: 'Classrooms',
                },
                {
                  id: 'facility',
                  label: 'Labs & Halls',
                },
                {
                  id: 'entrance',
                  label: 'Gates & Foyers',
                },
              ].map((category) => (

                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    setActiveCategory(
                      category.id
                    )
                  }
                  className={`
                    px-2.5 py-1
                    rounded-lg
                    text-[11px]
                    font-bold
                    whitespace-nowrap
                    transition-all
                    ${
                      activeCategory ===
                      category.id
                        ? `
                          bg-[#97144D]
                          dark:bg-[#C2185B]
                          text-white
                          shadow-sm
                          scale-[1.02]
                        `
                        : `
                          bg-[#F3E7EF]
                          dark:bg-[#351524]
                          text-[#6B5963]
                          dark:text-[#C9B6C0]
                          hover:bg-[#E8D3DF]
                          dark:hover:bg-[#4A2035]
                        `
                    }
                  `}
                >
                  {category.label}
                </button>

              ))}

            </div>

          </div>

          {/* ==================================================
              RESULT COUNT
          ================================================== */}

          <div
            className="
              px-4 py-2
              border-b
              border-[#E3C5D5]
              dark:border-[#4A2035]
              flex items-center
              justify-between
            "
          >

            <span
              className="
                text-[10px]
                uppercase
                tracking-wider
                font-black
                text-[#6B5963]
                dark:text-[#C9B6C0]
              "
            >
              {query
                ? 'Search Results'
                : 'All Locations'}
            </span>

            <span
              className="
                text-[10px]
                font-bold
                text-[#97144D]
                dark:text-[#F08AB4]
              "
            >
              {filteredByCategory.length}
            </span>

          </div>

          {/* ==================================================
              RESULTS
          ================================================== */}

          <div
            className="
              max-h-[390px]
              overflow-y-auto
              custom-scrollbar
            "
          >

            {filteredByCategory.length === 0 ? (

              <div
                className="
                  p-8
                  text-center
                "
              >

                <Search
                  className="
                    w-8 h-8
                    mx-auto
                    text-[#C8AEBB]
                    dark:text-[#735564]
                  "
                />

                <p
                  className="
                    mt-3
                    text-sm
                    font-bold
                    text-[#4A3942]
                    dark:text-[#FFF5FA]
                  "
                >
                  No matching locations
                </p>

                <p
                  className="
                    text-xs
                    text-[#8B7881]
                    dark:text-[#9D8791]
                    mt-1
                  "
                >
                  Try M204, SH7, teacher name,
                  office or department
                </p>

              </div>

            ) : (

              <div className="p-2">

                {filteredByCategory.map(
                  (loc) => {

                    const isItemActive =
                      selected?.id ===
                      loc.id;

                    return (

                      <div
                        key={`${loc.category}-${loc.id}`}
                        onClick={() =>
                          handleSelect(loc)
                        }
                        className={`
                          group
                          relative
                          p-3
                          rounded-xl
                          cursor-pointer
                          transition-all
                          duration-200
                          border
                          mb-1.5
                          ${
                            isItemActive
                              ? `
                                bg-[#F3E7EF]
                                dark:bg-[#351524]
                                border-[#C2185B]/40
                              `
                              : `
                                bg-transparent
                                border-transparent
                                hover:bg-[#FAF4F8]
                                dark:hover:bg-[#28131E]
                                hover:border-[#E3C5D5]
                                dark:hover:border-[#4A2035]
                                hover:-translate-y-[1px]
                              `
                          }
                        `}
                      >

                        <div className="flex items-start gap-3">

                          {/* Category icon */}

                          <div
                            className="
                              p-2.5
                              rounded-xl
                              bg-[#F3E7EF]
                              dark:bg-[#351524]
                              border
                              border-[#E3C5D5]
                              dark:border-[#4A2035]
                              shrink-0
                              transition-all
                              duration-200
                              group-hover:scale-105
                            "
                          >
                            {getCategoryIcon(
                              loc.category
                            )}
                          </div>

                          {/* Main info */}

                          <div
                            className="
                              flex-1
                              min-w-0
                            "
                          >

                            {/* Name + active */}

                            <div
                              className="
                                flex
                                items-start
                                justify-between
                                gap-2
                              "
                            >

                              <div
                                className="
                                  min-w-0
                                "
                              >

                                <div
                                  className="
                                    flex
                                    items-center
                                    gap-2
                                  "
                                >

                                  <span
                                    className={`
                                      text-sm
                                      font-black
                                      truncate
                                      ${
                                        isItemActive
                                          ? `
                                            text-[#97144D]
                                            dark:text-[#F08AB4]
                                          `
                                          : `
                                            text-[#241820]
                                            dark:text-[#FFF5FA]
                                          `
                                      }
                                    `}
                                  >
                                    {loc.name}
                                  </span>

                                  <span
                                    className="
                                      shrink-0
                                      px-1.5 py-0.5
                                      rounded-md
                                      bg-[#F8F1F6]
                                      dark:bg-[#28131E]
                                      border
                                      border-[#E3C5D5]
                                      dark:border-[#4A2035]
                                      text-[8px]
                                      uppercase
                                      tracking-wide
                                      font-black
                                      text-[#6B5963]
                                      dark:text-[#C9B6C0]
                                    "
                                  >
                                    {getCategoryLabel(
                                      loc.category
                                    )}
                                  </span>

                                </div>

                              </div>

                              {isItemActive && (

                                <Check
                                  className="
                                    w-4 h-4
                                    text-[#97144D]
                                    dark:text-[#F08AB4]
                                    shrink-0
                                  "
                                />

                              )}

                            </div>

                            {/* =================================================
                                LOCATION DETAILS
                            ================================================= */}

                            <div
                              className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                gap-x-3
                                gap-y-1.5
                                mt-2
                              "
                            >

                              {/* Building */}

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-1.5
                                  min-w-0
                                "
                              >

                                <Building2
                                  className="
                                    w-3 h-3
                                    shrink-0
                                    text-[#97144D]
                                    dark:text-[#F08AB4]
                                  "
                                />

                                <span
                                  className="
                                    text-[10px]
                                    font-semibold
                                    text-[#6B5963]
                                    dark:text-[#C9B6C0]
                                    truncate
                                  "
                                >
                                  {loc.building ===
                                  'AI'
                                    ? 'AI Building'
                                    : 'Main Building'}
                                </span>

                              </div>

                              {/* Floor */}

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-1.5
                                  min-w-0
                                "
                              >

                                <Layers3
                                  className="
                                    w-3 h-3
                                    shrink-0
                                    text-[#97144D]
                                    dark:text-[#F08AB4]
                                  "
                                />

                                <span
                                  className="
                                    text-[10px]
                                    font-semibold
                                    text-[#6B5963]
                                    dark:text-[#C9B6C0]
                                  "
                                >
                                  {loc.floor === 0
                                    ? 'Ground Floor'
                                    : loc.floor === 1
                                      ? 'First Floor'
                                      : loc.floor === 2
                                        ? 'Second Floor'
                                        : `Floor ${loc.floor}`}
                                </span>

                              </div>

                            </div>

                            {/* Subtitle */}

                            <div
                              className="
                                text-[10px]
                                text-[#7A6871]
                                dark:text-[#9D8791]
                                mt-1.5
                                truncate
                              "
                            >
                              {loc.subtitle}
                            </div>

                            {/* Details */}

                            {loc.details && (

                              <div
                                className="
                                  mt-1
                                  text-[10px]
                                  font-medium
                                  text-[#6B5963]
                                  dark:text-[#C9B6C0]
                                  truncate
                                "
                              >
                                {loc.details}
                              </div>

                            )}

                            {/* Accessibility */}

                            {loc.accessible && (

                              <div
                                className="
                                  mt-2
                                  flex
                                  items-center
                                  gap-1.5
                                "
                              >

                                <span
                                  className="
                                    inline-flex
                                    items-center
                                    gap-1
                                    px-1.5 py-1
                                    rounded-md
                                    bg-emerald-500/10
                                    border
                                    border-emerald-500/20
                                    text-[9px]
                                    font-bold
                                    text-emerald-600
                                    dark:text-emerald-400
                                  "
                                >

                                  <Accessibility
                                    className="
                                      w-3 h-3
                                    "
                                  />

                                  Step-Free

                                </span>

                                <span
                                  className="
                                    text-[9px]
                                    text-[#9D8791]
                                    dark:text-[#735564]
                                  "
                                >
                                  ·
                                </span>

                                <span
                                  className="
                                    text-[9px]
                                    font-semibold
                                    text-[#7A6871]
                                    dark:text-[#9D8791]
                                  "
                                >
                                  Node: {loc.nodeId}
                                </span>

                              </div>

                            )}

                          </div>

                        </div>

                        {/* =================================================
                            HOVER NAVIGATE HINT
                        ================================================= */}

                        <div
                          className="
                            absolute
                            right-3
                            bottom-3
                            opacity-0
                            group-hover:opacity-100
                            transition-opacity
                            hidden
                            sm:flex
                            items-center
                            gap-1
                            text-[9px]
                            font-bold
                            text-[#97144D]
                            dark:text-[#F08AB4]
                          "
                        >

                          <Navigation
                            className="
                              w-3 h-3
                            "
                          />

                          Select location

                        </div>

                      </div>

                    );
                  }
                )}

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
};

export default LocationSelector;