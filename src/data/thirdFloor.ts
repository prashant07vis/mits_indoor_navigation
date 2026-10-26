export interface ThirdFloorTeacherOffice {
  officeId: string;
  name: string;
  type: 'teacher' | 'department';
}

export const thirdFloorTeacherOffices: ThirdFloorTeacherOffice[] = [
  {
    officeId: 'office-1',
    name: 'Dr. Vijay Shankar Sharma',
    type: 'teacher',
  },
  {
    officeId: 'office-2',
    name: 'Dr. Mausam Chouksey',
    type: 'teacher',
  },
  {
    officeId: 'office-3',
    name: 'CSD Department – Core Faculty Sitting',
    type: 'department',
  },
  {
    officeId: 'office-4',
    name: 'Dr. Satyam Omar',
    type: 'teacher',
  },
  {
    officeId: 'office-5',
    name: 'Dr. Vivek Sharma',
    type: 'teacher',
  },
  {
    officeId: 'office-6',
    name: 'Dr. Unknown Teacher',
    type: 'teacher',
  },
  {
    officeId: 'office-7',
    name: 'Dr. Pooja Tripathi',
    type: 'teacher',
  },
  {
    officeId: 'office-8',
    name: 'Dr. Namita Arya',
    type: 'teacher',
  },
  {
    officeId: 'office-9',
    name: 'Dr. Devanshu Tiwari',
    type: 'teacher',
  },
];

export const thirdFloorRooms = {
  m301: {
    id: 'm301',
    name: 'M301',
    gates: 2,
    gateSpacingTiles: 16,
  },

  m302: {
    id: 'm302',
    name: 'M302',
    gates: 2,
    gateSpacingTiles: 16,
  },

  m303: {
    id: 'm303',
    name: 'M303',
    gates: 1,
  },

  phdLab: {
    id: 'phd-lab',
    name: 'PhD Lab',
    widthTiles: 4,
    heightTiles: 4,
  },

  researchLab: {
    id: 'research-lab',
    name: 'Research Lab',
    widthTiles: 4,
    heightTiles: 4,
  },

  hpcLab: {
    id: 'hpc-lab',
    name: 'HPC Lab',
    widthTiles: 4,
    heightTiles: 4,
  },

  stairs: {
    id: 'stairs-3f',
    name: 'Stairs',
  },

  lift: {
    id: 'lift-3f',
    name: 'Lift',
  },

  viceChancellorOffice: {
    id: 'vc-office',
    name: 'Vice Chancellor Office',
  },

  professorsCabin: {
    id: 'professors-cabin',
    name: "Professors' Cabin",
  },

  maleWashroom: {
    id: 'male-washroom',
    name: 'Male Washroom',
  },

  femaleWashroom: {
    id: 'female-washroom',
    name: 'Female Washroom',
  },
} as const;