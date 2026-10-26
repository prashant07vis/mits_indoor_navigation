import type { LocationOption } from '../types/navigation';
import { rooms } from '../data/rooms';
import { teachers } from '../data/teachers';
import { navigationNodes } from '../data/navigationNodes';

/**
 * All node ids that really exist in the navigation graph.
 */
const validNodeIds = new Set(
  navigationNodes.map((node) => node.id)
);

const normalizeKey = (value: string): string =>
  value.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Resolve the navigation node for a teacher.
 *
 * Many faculty records point to their own personal node
 * (e.g. AI_F1_T_NEERAJ) that does not exist in the graph yet.
 * In that case we fall back to the node of the room/cabin
 * where the teacher sits, so routing still works.
 *
 * Returns null if no valid node can be found.
 */
function resolveTeacherNodeId(
  teacher: (typeof teachers)[number]
): string | null {
  if (validNodeIds.has(teacher.nodeId)) {
    return teacher.nodeId;
  }

  const roomKey = normalizeKey(teacher.room || '');

  const matchedRoom = rooms.find(
    (room) =>
      room.building === teacher.building &&
      room.floor === teacher.floor &&
      validNodeIds.has(room.nodeId) &&
      (normalizeKey(room.name) === roomKey ||
        (room.aliases || []).some(
          (alias) => normalizeKey(alias) === roomKey
        ))
  );

  return matchedRoom ? matchedRoom.nodeId : null;
}

function getFloorName(floor: number): string {
  if (floor === 0) return 'Ground Floor';
  if (floor === 1) return 'First Floor';
  if (floor === 2) return 'Second Floor';
  return `Floor ${floor}`;
}

function getBuildingName(
  building: 'AI' | 'MAIN'
): string {
  return building === 'AI'
    ? 'AI Building'
    : 'Main Building';
}

/**
 * Normalize search text.
 *
 * This makes searches like:
 * M204
 * m-204
 * M 204
 * Room M204
 *
 * easier to match.
 */
function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[-_/.,]/g, ' ')
    .replace(/\s+/g, ' ');
}

/**
 * Builds one unified searchable catalog
 * from the actual MITS navigation data.
 */
export function getAllLocationOptions(): LocationOption[] {
  const options: LocationOption[] = [];

  /* ==========================================================
     1. FACULTY
  ========================================================== */

  for (const teacher of teachers) {
    /*
     * Use the teacher's own node if it exists, otherwise the node
     * of their room. If neither exists we keep the original id;
     * the app then shows a clear "route not available" message.
     */
    const teacherNodeId =
      resolveTeacherNodeId(teacher) ?? teacher.nodeId;

    const buildingName =
      getBuildingName(teacher.building);

    const floorName =
      getFloorName(teacher.floor);

    options.push({
      id: teacher.id,
      name: teacher.name,
      building: teacher.building,
      floor: teacher.floor,
      nodeId: teacherNodeId,
      category: 'teacher',

      subtitle:
        `${buildingName} · ${floorName} · ${teacher.room}`,

      details: [
        teacher.designation,
        teacher.department,
      ]
        .filter(Boolean)
        .join(' · '),

      accessible: true,

      keywords: [
        teacher.name,
        teacher.room,
        teacher.office,
        teacher.department || '',
        teacher.designation || '',
        buildingName,
        floorName,

        'teacher',
        'faculty',
        'professor',
        'sir',
        'madam',
        'cabin',
        'office',
        'staff',
      ],
    });
  }

  /* ==========================================================
     2. ROOMS / CLASSROOMS / LABS / HALLS
  ========================================================== */

  for (const room of rooms) {
    const buildingName =
      getBuildingName(room.building);

    const floorName =
      getFloorName(room.floor);

    const category =
      room.type === 'classroom'
        ? 'room'
        : 'facility';

    const readableType =
      room.type
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) =>
          char.toUpperCase()
        );

    options.push({
      id: room.id,

      name: room.name,

      building: room.building,

      floor: room.floor,

      nodeId: room.nodeId,

      category,

      subtitle:
        `${buildingName} · ${floorName}`,

      details: room.department
        ? `${readableType} · Dept: ${room.department}`
        : readableType,

      accessible: true,

      keywords: [
        room.name,
        room.id,

        ...(room.aliases || []),

        room.department || '',

        room.type,
        readableType,

        buildingName,
        floorName,

        'room',
        'class',
        'classroom',
        'lab',
        'laboratory',
        'hall',
        'seminar',
        'seminar hall',
        'library',
        'office',
        'washroom',
        'facility',

        /*
         * Useful short searches
         */
        room.name
          .replace(/[-_/]/g, ' '),

        room.id
          .replace(/[-_/]/g, ' '),
      ],
    });
  }

  /* ==========================================================
     3. GATES / ENTRANCES / FOYERS
  ========================================================== */

  for (const node of navigationNodes) {
    if (node.type !== 'entrance') {
      continue;
    }

    const buildingName =
      getBuildingName(node.building);

    const floorName =
      getFloorName(node.floor);

    options.push({
      id: node.id,

      name: node.name,

      building: node.building,

      floor: node.floor,

      nodeId: node.id,

      category: 'entrance',

      subtitle:
        `${buildingName} · ${floorName}`,

      details:
        node.description ||
        'Campus Entry Point',

      accessible: node.accessible,

      keywords: [
        node.name,

        node.code || '',

        node.description || '',

        buildingName,
        floorName,

        'entrance',
        'entry',
        'gate',
        'foyer',
        'main gate',
        'campus gate',
      ],
    });
  }

  /* ==========================================================
     REMOVE DUPLICATES
  ========================================================== */

  const uniqueOptions =
    Array.from(
      new Map(
        options.map((option) => [
          `${option.category}:${option.id}`,
          option,
        ])
      ).values()
    );

  /* ==========================================================
     SORT
  ========================================================== */

  return uniqueOptions.sort(
    (a, b) => {

      const categoryOrder: Record<
        LocationOption['category'],
        number
      > = {
        teacher: 1,
        room: 2,
        facility: 3,
        entrance: 4,
        transport: 5,
      };

      const categoryDifference =
        categoryOrder[a.category] -
        categoryOrder[b.category];

      if (categoryDifference !== 0) {
        return categoryDifference;
      }

      if (a.floor !== b.floor) {
        return a.floor - b.floor;
      }

      return a.name.localeCompare(
        b.name
      );
    }
  );
}

/**
 * Smart location search.
 *
 * Supports:
 *
 * M204
 * M-204
 * M 204
 * SH7
 * SH-7
 * Room M204
 * teacher name
 * office
 * department
 * building
 * floor
 * lab
 * hall
 * library
 */
export function searchLocations(
  query: string,
  options: LocationOption[]
): LocationOption[] {

  const clean =
    normalizeSearchText(query);

  /*
   * Empty search = show complete catalog.
   */
  if (!clean) {
    return options;
  }

  /*
   * ==========================================================
   * SPECIAL SEMINAR HALL SEARCH
   *
   * Typing:
   * SH
   * SH-
   * seminar hall
   *
   * should prioritize ALL seminar halls.
   * ==========================================================
   */

  const compactQuery =
    clean.replace(/\s/g, '');

  const isSHSearch =
    compactQuery === 'sh' ||
    compactQuery === 'seminarhall' ||
    compactQuery === 'seminar';

  if (isSHSearch) {
    return options
      .filter((option) => {
        const searchable = [
          option.name,
          option.details || '',
          ...option.keywords,
        ]
          .map(normalizeSearchText)
          .join(' ');

        return (
          searchable.includes('seminar hall') ||
          searchable.includes('seminarhall') ||
          /\bsh\s*\d+/i.test(searchable)
        );
      })
      .sort((a, b) =>
        a.name.localeCompare(b.name)
      );
  }

  const terms =
    clean.split(/\s+/);

  return options
    .map((option) => {

      let score = 0;

      const name =
        normalizeSearchText(
          option.name
        );

      const subtitle =
        normalizeSearchText(
          option.subtitle
        );

      const details =
        normalizeSearchText(
          option.details || ''
        );

      const keywords =
        option.keywords.map(
          (keyword) =>
            normalizeSearchText(keyword)
        );

      const haystack = [
        name,
        subtitle,
        details,
        ...keywords,
      ].join(' ');

      /*
       * Every search word must match.
       */
      const matchesAll =
        terms.every((term) => {

          /*
           * Normal match
           */
          if (haystack.includes(term)) {
            return true;
          }

          /*
           * Also compare compact form.
           *
           * Example:
           * "m204" matches "m 204"
           */
          const compactHaystack =
            haystack.replace(/\s/g, '');

          const compactTerm =
            term.replace(/\s/g, '');

          return compactHaystack.includes(
            compactTerm
          );
        });

      if (!matchesAll) {
        return {
          option,
          score: 0,
          matchesAll: false,
        };
      }

      /* ======================================================
         SCORING
      ====================================================== */

      /*
       * Basic match
       */
      score += 10;

      /*
       * Exact complete name
       */
      if (name === clean) {
        score += 60;
      }

      /*
       * Name starts with query
       */
      if (name.startsWith(clean)) {
        score += 40;
      }

      /*
       * Name contains query
       */
      if (name.includes(clean)) {
        score += 25;
      }

      /*
       * Exact keyword
       */
      if (
        keywords.some(
          (keyword) =>
            keyword === clean
        )
      ) {
        score += 40;
      }

      /*
       * Room/location ID
       */
      if (
        keywords.some(
          (keyword) =>
            keyword.replace(/\s/g, '') ===
            compactQuery
        )
      ) {
        score += 45;
      }

      /*
       * Room number / classroom
       */
      if (
        option.category === 'room' &&
        (
          name.includes(clean) ||
          keywords.some(
            (keyword) =>
              keyword.includes(clean)
          )
        )
      ) {
        score += 25;
      }

      /*
       * Faculty
       */
      if (
        option.category === 'teacher' &&
        (
          name.includes(clean) ||
          details.includes(clean) ||
          keywords.some(
            (keyword) =>
              keyword.includes(clean)
          )
        )
      ) {
        score += 20;
      }

      /*
       * Building
       */
      if (subtitle.includes(clean)) {
        score += 15;
      }

      /*
       * Department
       */
      if (details.includes(clean)) {
        score += 15;
      }

      /*
       * Prefer exact SH room searches.
       */
      if (
        compactQuery.startsWith('sh') &&
        keywords.some(
          (keyword) =>
            keyword
              .replace(/\s/g, '')
              .startsWith(compactQuery)
        )
      ) {
        score += 35;
      }

      return {
        option,
        score,
        matchesAll: true,
      };
    })
    .filter(
      (item) =>
        item.matchesAll
    )
    .sort(
      (a, b) =>
        b.score - a.score
    )
    .map(
      (item) =>
        item.option
    );
}