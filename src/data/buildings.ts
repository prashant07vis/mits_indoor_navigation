
import type { Building } from '../types/navigation';

export const buildings: Building[] = [
  {
    id: 'AI',
    name: 'Centre for Artificial Intelligence (AI Building)',
    shortName: 'AI Building',
    description:
      'Modern research and academic facility housing AI & Robotics, IoT labs, conference spaces, and faculty suites across four mapped floors.',
    floors: [0, 1, 2, 3],
    accessible: true,
    totalFloors: 4,
  },
  {
    id: 'MAIN',
    name: 'Main Academic & Administrative Building',
    shortName: 'Main Building',
    description:
      'Historic central academic complex housing engineering departments, Central Library, Examination Centre, Colloquium, Dean offices, and laboratories.',
    floors: [0, 1, 2],
    accessible: true,
    totalFloors: 3,
  },
];

export function getBuildingById(
  id: 'AI' | 'MAIN'
): Building | undefined {
  return buildings.find((building) => building.id === id);
}
