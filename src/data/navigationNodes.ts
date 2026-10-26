import type { NavigationNode } from '../types/navigation';

export const navigationNodes: NavigationNode[] = [
  // =========================================================================
  // AI BUILDING - GROUND FLOOR (Floor 0) [Image: 1858 x 684]
  // =========================================================================

  // -------------------------------------------------------------------------
  // External Main Entrance & Porch
  // -------------------------------------------------------------------------
  {
    id: 'AI_G_ENTRY_MAIN',
    building: 'AI',
    floor: 0,
    x: 892.4,
    y: 592.5,
    type: 'entrance',
    name: 'AI Building Main Entrance',
    accessible: true,
  },
  {
    id: 'AI_G_ENTRY_NORTH',
    building: 'AI',
    floor: 0,
    x: 1060.2,
    y: 592.5,
    type: 'entrance',
    name: 'AI Building North Entrance',
    accessible: true,
  },
  {
    id: 'AI_G_ENTRY_SOUTH',
    building: 'AI',
    floor: 0,
    x: 892.4,
    y: 655.1,
    type: 'entrance',
    name: 'AI Building South Entrance',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // Main Ground Floor Corridor Network
  // -------------------------------------------------------------------------
  {
    id: 'AI_G_COR_MAIN',
    building: 'AI',
    floor: 0,
    x: 892.4,
    y: 520.4,
    type: 'corridor',
    name: 'AI Ground Main Corridor',
    accessible: true,
  },
  {
    id: 'AI_G_COR_NORTH',
    building: 'AI',
    floor: 0,
    x: 1060.2,
    y: 520.4,
    type: 'corridor',
    name: 'AI Ground North Corridor',
    accessible: true,
  },
  {
    id: 'AI_G_COR_SOUTH',
    building: 'AI',
    floor: 0,
    x: 892.4,
    y: 430.8,
    type: 'corridor',
    name: 'AI Ground South Corridor',
    accessible: true,
  },
  {
    id: 'AI_G_COR_WEST',
    building: 'AI',
    floor: 0,
    x: 540.2,
    y: 430.8,
    type: 'corridor',
    name: 'AI Ground West Corridor',
    accessible: true,
  },
  {
    id: 'AI_G_COR_EAST',
    building: 'AI',
    floor: 0,
    x: 1320.5,
    y: 430.8,
    type: 'corridor',
    name: 'AI Ground East Corridor',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // Central Lift & Stairs
  // -------------------------------------------------------------------------
  {
    id: 'AI_G_LIFT_01',
    building: 'AI',
    floor: 0,
    x: 1098.8,
    y: 257.6,
    type: 'lift',
    name: 'AI Building Lift',
    accessible: true,
  },
  {
    id: 'AI_G_COR_LIFT',
    building: 'AI',
    floor: 0,
    x: 1098.8,
    y: 328.5,
    type: 'corridor',
    name: 'AI Ground Corridor at Lift',
    accessible: true,
  },
  {
    id: 'AI_G_STAIRS_01',
    building: 'AI',
    floor: 0,
    x: 1185.4,
    y: 257.6,
    type: 'stairs',
    name: 'AI Building Central Stairs',
    accessible: false,
  },
  {
    id: 'AI_G_COR_STAIRS',
    building: 'AI',
    floor: 0,
    x: 1185.4,
    y: 328.5,
    type: 'corridor',
    name: 'AI Ground Corridor at Stairs',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // West Stairs
  // -------------------------------------------------------------------------
  {
    id: 'AI_G_STAIRS_WEST',
    building: 'AI',
    floor: 0,
    x: 374.2,
    y: 292.5,
    type: 'stairs',
    name: 'AI Building West Stairs',
    accessible: false,
  },
  {
    id: 'AI_G_COR_STAIRS_WEST',
    building: 'AI',
    floor: 0,
    x: 432.8,
    y: 354.7,
    type: 'corridor',
    name: 'AI Ground West Stair Corridor',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // M001 - Faculty / Office Area
  // -------------------------------------------------------------------------
  {
    id: 'AI_G_M001_ENTRY',
    building: 'AI',
    floor: 0,
    x: 1500.2,
    y: 340.5,
    type: 'door',
    name: 'M001 Faculty Office Entrance',
    accessible: true,
  },
  {
    id: 'AI_G_M001_OFFICE_01',
    building: 'AI',
    floor: 0,
    x: 1571.6,
    y: 180.3,
    type: 'door',
    name: 'M001-01 Office — Dr. Dhananjay Bisen',
    accessible: true,
  },
  {
    id: 'AI_G_M001_OFFICE_02',
    building: 'AI',
    floor: 0,
    x: 1678.2,
    y: 180.3,
    type: 'door',
    name: 'M001-02 Office — Dr. Ajay Dubey',
    accessible: true,
  },
  {
    id: 'AI_G_M001_OFFICE_03',
    building: 'AI',
    floor: 0,
    x: 1678.2,
    y: 334.9,
    type: 'door',
    name: 'M001-03 Office — Dr. Modi Manohar',
    accessible: true,
  },
  {
    id: 'AI_G_M001_OFFICE_04',
    building: 'AI',
    floor: 0,
    x: 1678.2,
    y: 425.1,
    type: 'door',
    name: 'M001-04 Office — Dr. Bhavna Rathore',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // M002
  // -------------------------------------------------------------------------
  {
    id: 'AI_G_M002_ENTRY',
    building: 'AI',
    floor: 0,
    x: 1455.4,
    y: 498.4,
    type: 'door',
    name: 'M002 Classroom Entrance',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // M003
  // -------------------------------------------------------------------------
  {
    id: 'AI_G_M003_ENTRY',
    building: 'AI',
    floor: 0,
    x: 1320.4,
    y: 498.4,
    type: 'door',
    name: 'M003 Classroom Entrance',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // M004
  // -------------------------------------------------------------------------
  {
    id: 'AI_G_M004_ENTRY',
    building: 'AI',
    floor: 0,
    x: 1192.4,
    y: 498.4,
    type: 'door',
    name: 'M004 Classroom Entrance',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // M005
  // -------------------------------------------------------------------------
  {
    id: 'AI_G_M005_ENTRY',
    building: 'AI',
    floor: 0,
    x: 1035.4,
    y: 498.4,
    type: 'door',
    name: 'M005 Classroom Entrance',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // M006
  // -------------------------------------------------------------------------
  {
    id: 'AI_G_M006_ENTRY',
    building: 'AI',
    floor: 0,
    x: 876.4,
    y: 498.4,
    type: 'door',
    name: 'M006 Classroom Entrance',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // M007 - IoT Lab / Faculty Area
  // -------------------------------------------------------------------------
  {
    id: 'AI_G_M007_ENTRY',
    building: 'AI',
    floor: 0,
    x: 702.8,
    y: 498.4,
    type: 'door',
    name: 'M007 IoT Lab Entrance',
    accessible: true,
  },
  {
    id: 'AI_G_M007_OFFICE_01',
    building: 'AI',
    floor: 0,
    x: 638.2,
    y: 382.4,
    type: 'door',
    name: 'M007-01 Office — Dr. Poonam Bansal',
    accessible: true,
  },
  {
    id: 'AI_G_M007_OFFICE_02',
    building: 'AI',
    floor: 0,
    x: 638.2,
    y: 294.8,
    type: 'door',
    name: 'M007-02 Office — Dr. Kaushal Pratap Sengar',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // Ground Floor Common Facilities
  // -------------------------------------------------------------------------
  {
    id: 'AI_G_WASHROOM_M',
    building: 'AI',
    floor: 0,
    x: 505.4,
    y: 498.4,
    type: 'door',
    name: 'Male Washroom — Ground Floor',
    accessible: true,
  },
  {
    id: 'AI_G_WASHROOM_F',
    building: 'AI',
    floor: 0,
    x: 432.8,
    y: 498.4,
    type: 'door',
    name: 'Female Washroom — Ground Floor',
    accessible: true,
  },

  // =========================================================================
  // AI BUILDING - FIRST FLOOR (Floor 1) [Image: 1816 x 636]
  // =========================================================================

  // -------------------------------------------------------------------------
  // Central Vertical Transport
  // -------------------------------------------------------------------------
  {
    id: 'AI_F1_LIFT_01',
    building: 'AI',
    floor: 1,
    x: 1074.1,
    y: 241.1,
    type: 'lift',
    name: 'AI Building Lift — First Floor',
    accessible: true,
  },
  {
    id: 'AI_F1_COR_LIFT',
    building: 'AI',
    floor: 1,
    x: 1074.1,
    y: 319.5,
    type: 'corridor',
    name: 'AI First Floor Corridor at Lift',
    accessible: true,
  },
  {
    id: 'AI_F1_STAIRS_01',
    building: 'AI',
    floor: 1,
    x: 1157.9,
    y: 241.1,
    type: 'stairs',
    name: 'AI Building Central Stairs — First Floor',
    accessible: false,
  },
  {
    id: 'AI_F1_COR_STAIRS',
    building: 'AI',
    floor: 1,
    x: 1157.9,
    y: 319.5,
    type: 'corridor',
    name: 'AI First Floor Corridor at Stairs',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // Main Corridor
  // -------------------------------------------------------------------------
  {
    id: 'AI_F1_COR_CENTRAL',
    building: 'AI',
    floor: 1,
    x: 868.4,
    y: 319.5,
    type: 'corridor',
    name: 'AI First Floor Central Corridor',
    accessible: true,
  },
  {
    id: 'AI_F1_COR_WEST',
    building: 'AI',
    floor: 1,
    x: 420.4,
    y: 319.5,
    type: 'corridor',
    name: 'AI First Floor West Corridor',
    accessible: true,
  },
  {
    id: 'AI_F1_COR_EAST',
    building: 'AI',
    floor: 1,
    x: 1450.4,
    y: 319.5,
    type: 'corridor',
    name: 'AI First Floor East Corridor',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // First Floor Classrooms
  // -------------------------------------------------------------------------
  {
    id: 'AI_F1_M101_ENTRY',
    building: 'AI',
    floor: 1,
    x: 260.4,
    y: 319.5,
    type: 'door',
    name: 'M101 Classroom Entrance',
    accessible: true,
  },
  {
    id: 'AI_F1_M102_ENTRY',
    building: 'AI',
    floor: 1,
    x: 420.4,
    y: 452.5,
    type: 'door',
    name: 'M102 Classroom Entrance',
    accessible: true,
  },
  {
    id: 'AI_F1_M103_ENTRY',
    building: 'AI',
    floor: 1,
    x: 690.4,
    y: 452.5,
    type: 'door',
    name: 'M103 Classroom Entrance',
    accessible: true,
  },
  {
    id: 'AI_F1_M104_ENTRY',
    building: 'AI',
    floor: 1,
    x: 1380.4,
    y: 452.5,
    type: 'door',
    name: 'M104 Classroom Entrance',
    accessible: true,
  },
  {
    id: 'AI_F1_M105_ENTRY',
    building: 'AI',
    floor: 1,
    x: 1540.4,
    y: 319.5,
    type: 'door',
    name: 'M105 Classroom Entrance',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // First Floor Facilities
  // -------------------------------------------------------------------------
  {
    id: 'AI_F1_WASHROOM_M',
    building: 'AI',
    floor: 1,
    x: 560.4,
    y: 452.5,
    type: 'door',
    name: 'Male Washroom — First Floor',
    accessible: true,
  },
  {
    id: 'AI_F1_WASHROOM_F',
    building: 'AI',
    floor: 1,
    x: 620.4,
    y: 452.5,
    type: 'door',
    name: 'Female Washroom — First Floor',
    accessible: true,
  },

  // =========================================================================
  // AI BUILDING - SECOND FLOOR (Floor 2) [Image: 1816 x 520]
  // =========================================================================

  // -------------------------------------------------------------------------
  // Central Vertical Transport
  // -------------------------------------------------------------------------
  {
    id: 'AI_F2_LIFT_01',
    building: 'AI',
    floor: 2,
    x: 1072.3,
    y: 183.0,
    type: 'lift',
    name: 'AI Building Lift — Second Floor',
    accessible: true,
  },
  {
    id: 'AI_F2_COR_LIFT',
    building: 'AI',
    floor: 2,
    x: 1072.3,
    y: 256.2,
    type: 'corridor',
    name: 'AI Second Floor Corridor at Lift',
    accessible: true,
  },
  {
    id: 'AI_F2_STAIRS_01',
    building: 'AI',
    floor: 2,
    x: 1157.2,
    y: 183.0,
    type: 'stairs',
    name: 'AI Building Central Stairs — Second Floor',
    accessible: false,
  },
  {
    id: 'AI_F2_COR_STAIRS',
    building: 'AI',
    floor: 2,
    x: 1157.2,
    y: 256.2,
    type: 'corridor',
    name: 'AI Second Floor Corridor at Stairs',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // Main Corridor
  // -------------------------------------------------------------------------
  {
    id: 'AI_F2_COR_CENTRAL',
    building: 'AI',
    floor: 2,
    x: 864.0,
    y: 256.2,
    type: 'corridor',
    name: 'AI Second Floor Central Corridor',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // PVC / Faculty Area
  // -------------------------------------------------------------------------
  {
    id: 'AI_F2_PVC_ENTRY',
    building: 'AI',
    floor: 2,
    x: 894.9,
    y: 343.1,
    type: 'door',
    name: 'PVC Office Entrance',
    accessible: true,
  },
  {
    id: 'AI_F2_T_MANJREE',
    building: 'AI',
    floor: 2,
    x: 894.9,
    y: 343.1,
    type: 'door',
    name: 'Faculty Office — T. Manjree',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // Second Floor Classrooms
  // -------------------------------------------------------------------------
  {
    id: 'AI_F2_M204_ENTRY',
    building: 'AI',
    floor: 2,
    x: 555.4,
    y: 183.0,
    type: 'door',
    name: 'M204 Classroom Entrance',
    accessible: true,
  },
  {
    id: 'AI_F2_M203_ENTRY',
    building: 'AI',
    floor: 2,
    x: 601.7,
    y: 327.9,
    type: 'door',
    name: 'M203 Classroom Entrance',
    accessible: true,
  },
  {
    id: 'AI_F2_M205_ENTRY',
    building: 'AI',
    floor: 2,
    x: 277.7,
    y: 327.9,
    type: 'door',
    name: 'M205 Classroom Entrance',
    accessible: true,
  },
  {
    id: 'AI_F2_M202_ENTRY',
    building: 'AI',
    floor: 2,
    x: 1188.0,
    y: 327.9,
    type: 'door',
    name: 'M202 Classroom Entrance',
    accessible: true,
  },
  {
    id: 'AI_F2_M201_ENTRY',
    building: 'AI',
    floor: 2,
    x: 1404.0,
    y: 183.0,
    type: 'door',
    name: 'M201 Classroom Entrance',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // Second Floor Facilities
  // -------------------------------------------------------------------------
  {
    id: 'AI_F2_WASHROOM_M',
    building: 'AI',
    floor: 2,
    x: 470.4,
    y: 327.9,
    type: 'door',
    name: 'Male Washroom — Second Floor',
    accessible: true,
  },
  {
    id: 'AI_F2_WASHROOM_F',
    building: 'AI',
    floor: 2,
    x: 530.4,
    y: 327.9,
    type: 'door',
    name: 'Female Washroom — Second Floor',
    accessible: true,
  },

  // =========================================================================
  // MAIN BUILDING - GROUND FLOOR (Floor 0)
  // =========================================================================

  {
    id: 'MAIN_G_ENTRY_MAIN',
    building: 'MAIN',
    floor: 0,
    x: 671.5,
    y: 889.4,
    type: 'entrance',
    name: 'Main Building Main Entrance',
    accessible: true,
  },
  {
    id: 'MAIN_G_ENTRY_NORTH',
    building: 'MAIN',
    floor: 0,
    x: 670.0,
    y: 180.4,
    type: 'entrance',
    name: 'Main Building North Entrance',
    accessible: true,
  },
  {
    id: 'MAIN_G_ENTRY_WEST',
    building: 'MAIN',
    floor: 0,
    x: 125.4,
    y: 525.6,
    type: 'entrance',
    name: 'Main Building West Entrance',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // Main Building Ground Corridor Network
  // -------------------------------------------------------------------------
  {
    id: 'MAIN_G_COR_MAIN',
    building: 'MAIN',
    floor: 0,
    x: 670.0,
    y: 760.0,
    type: 'corridor',
    name: 'Main Building Ground Main Corridor',
    accessible: true,
  },
  {
    id: 'MAIN_G_COR_NORTH',
    building: 'MAIN',
    floor: 0,
    x: 670.0,
    y: 330.0,
    type: 'corridor',
    name: 'Main Building Ground North Corridor',
    accessible: true,
  },
  {
    id: 'MAIN_G_COR_WEST',
    building: 'MAIN',
    floor: 0,
    x: 350.0,
    y: 525.6,
    type: 'corridor',
    name: 'Main Building Ground West Corridor',
    accessible: true,
  },
  {
    id: 'MAIN_G_COR_EAST',
    building: 'MAIN',
    floor: 0,
    x: 1010.0,
    y: 525.6,
    type: 'corridor',
    name: 'Main Building Ground East Corridor',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // Main Building Ground Stairs / Lift
  // -------------------------------------------------------------------------
  {
    id: 'MAIN_G_LIFT_01',
    building: 'MAIN',
    floor: 0,
    x: 670.0,
    y: 450.0,
    type: 'lift',
    name: 'Main Building Lift — Ground Floor',
    accessible: true,
  },
  {
    id: 'MAIN_G_STAIRS_01',
    building: 'MAIN',
    floor: 0,
    x: 770.0,
    y: 450.0,
    type: 'stairs',
    name: 'Main Building Stairs — Ground Floor',
    accessible: false,
  },

  // -------------------------------------------------------------------------
  // Main Building Ground Rooms
  // -------------------------------------------------------------------------
  {
    id: 'MAIN_G_ROOM_001',
    building: 'MAIN',
    floor: 0,
    x: 270.0,
    y: 330.0,
    type: 'door',
    name: 'Main Building Room G001',
    accessible: true,
  },
  {
    id: 'MAIN_G_ROOM_002',
    building: 'MAIN',
    floor: 0,
    x: 390.0,
    y: 330.0,
    type: 'door',
    name: 'Main Building Room G002',
    accessible: true,
  },
  {
    id: 'MAIN_G_ROOM_003',
    building: 'MAIN',
    floor: 0,
    x: 950.0,
    y: 330.0,
    type: 'door',
    name: 'Main Building Room G003',
    accessible: true,
  },
  {
    id: 'MAIN_G_ROOM_004',
    building: 'MAIN',
    floor: 0,
    x: 1070.0,
    y: 330.0,
    type: 'door',
    name: 'Main Building Room G004',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // Main Building Ground Facilities
  // -------------------------------------------------------------------------
  {
    id: 'MAIN_G_WASHROOM_M',
    building: 'MAIN',
    floor: 0,
    x: 430.0,
    y: 650.0,
    type: 'door',
    name: 'Male Washroom — Main Ground Floor',
    accessible: true,
  },
  {
    id: 'MAIN_G_WASHROOM_F',
    building: 'MAIN',
    floor: 0,
    x: 490.0,
    y: 650.0,
    type: 'door',
    name: 'Female Washroom — Main Ground Floor',
    accessible: true,
  },

  // =========================================================================
  // MAIN BUILDING - FIRST FLOOR (Floor 1)
  // =========================================================================

  {
    id: 'MAIN_F1_LIFT_01',
    building: 'MAIN',
    floor: 1,
    x: 650.0,
    y: 445.0,
    type: 'lift',
    name: 'Main Building Lift — First Floor',
    accessible: true,
  },
  {
    id: 'MAIN_F1_STAIRS_01',
    building: 'MAIN',
    floor: 1,
    x: 750.0,
    y: 445.0,
    type: 'stairs',
    name: 'Main Building Stairs — First Floor',
    accessible: false,
  },
  {
    id: 'MAIN_F1_COR_MAIN',
    building: 'MAIN',
    floor: 1,
    x: 650.0,
    y: 525.0,
    type: 'corridor',
    name: 'Main Building First Floor Main Corridor',
    accessible: true,
  },

  {
    id: 'MAIN_F1_ROOM_101',
    building: 'MAIN',
    floor: 1,
    x: 270.0,
    y: 350.0,
    type: 'door',
    name: 'Main Building Room 101',
    accessible: true,
  },
  {
    id: 'MAIN_F1_ROOM_102',
    building: 'MAIN',
    floor: 1,
    x: 390.0,
    y: 350.0,
    type: 'door',
    name: 'Main Building Room 102',
    accessible: true,
  },
  {
    id: 'MAIN_F1_ROOM_103',
    building: 'MAIN',
    floor: 1,
    x: 920.0,
    y: 350.0,
    type: 'door',
    name: 'Main Building Room 103',
    accessible: true,
  },
  {
    id: 'MAIN_F1_ROOM_104',
    building: 'MAIN',
    floor: 1,
    x: 1040.0,
    y: 350.0,
    type: 'door',
    name: 'Main Building Room 104',
    accessible: true,
  },

  {
    id: 'MAIN_F1_WASHROOM_M',
    building: 'MAIN',
    floor: 1,
    x: 440.0,
    y: 650.0,
    type: 'door',
    name: 'Male Washroom — Main First Floor',
    accessible: true,
  },
  {
    id: 'MAIN_F1_WASHROOM_F',
    building: 'MAIN',
    floor: 1,
    x: 500.0,
    y: 650.0,
    type: 'door',
    name: 'Female Washroom — Main First Floor',
    accessible: true,
  },

  // =========================================================================
  // MAIN BUILDING - SECOND FLOOR (Floor 2)
  // =========================================================================

  {
    id: 'MAIN_F2_LIFT_01',
    building: 'MAIN',
    floor: 2,
    x: 780.0,
    y: 445.0,
    type: 'lift',
    name: 'Main Building Lift — Second Floor',
    accessible: true,
  },
  {
    id: 'MAIN_F2_STAIRS_01',
    building: 'MAIN',
    floor: 2,
    x: 880.0,
    y: 445.0,
    type: 'stairs',
    name: 'Main Building Stairs — Second Floor',
    accessible: false,
  },
  {
    id: 'MAIN_F2_COR_MAIN',
    building: 'MAIN',
    floor: 2,
    x: 780.0,
    y: 525.0,
    type: 'corridor',
    name: 'Main Building Second Floor Main Corridor',
    accessible: true,
  },

  {
    id: 'MAIN_F2_ROOM_201',
    building: 'MAIN',
    floor: 2,
    x: 280.0,
    y: 350.0,
    type: 'door',
    name: 'Main Building Room 201',
    accessible: true,
  },
  {
    id: 'MAIN_F2_ROOM_202',
    building: 'MAIN',
    floor: 2,
    x: 400.0,
    y: 350.0,
    type: 'door',
    name: 'Main Building Room 202',
    accessible: true,
  },
  {
    id: 'MAIN_F2_ROOM_203',
    building: 'MAIN',
    floor: 2,
    x: 1040.0,
    y: 350.0,
    type: 'door',
    name: 'Main Building Room 203',
    accessible: true,
  },
  {
    id: 'MAIN_F2_ROOM_204',
    building: 'MAIN',
    floor: 2,
    x: 1160.0,
    y: 350.0,
    type: 'door',
    name: 'Main Building Room 204',
    accessible: true,
  },

  {
    id: 'MAIN_F2_WASHROOM_M',
    building: 'MAIN',
    floor: 2,
    x: 470.0,
    y: 650.0,
    type: 'door',
    name: 'Male Washroom — Main Second Floor',
    accessible: true,
  },
  {
    id: 'MAIN_F2_WASHROOM_F',
    building: 'MAIN',
    floor: 2,
    x: 530.0,
    y: 650.0,
    type: 'door',
    name: 'Female Washroom — Main Second Floor',
    accessible: true,
  },

  // =========================================================================
  // CAMPUS EXTERNAL CONNECTION
  // =========================================================================

  {
    id: 'CAMPUS_WALKWAY_AI_MAIN',
    building: 'MAIN',
    floor: 0,
    x: 733.8,
    y: 905.5,
    type: 'external',
    name: 'Campus Central Walkway between AI & Main Building',
    accessible: true,
  },

  // =========================================================================
  // AI BUILDING - THIRD FLOOR (Floor 3)
  // =========================================================================
  // F3 is based on the supplied third-floor layout.
  // Coordinate system:
  // 64 tiles × 56 tiles
  // 1 tile = 24 px
  // Canvas = 1536 × 1344
  // =========================================================================

  // -------------------------------------------------------------------------
  // Vertical Transport
  // -------------------------------------------------------------------------
  {
    id: 'AI_F3_LIFT_01',
    building: 'AI',
    floor: 3,
    x: 168,
    y: 744,
    type: 'lift',
    name: 'AI Building Lift — Third Floor',
    accessible: true,
  },
  {
    id: 'AI_F3_COR_LIFT',
    building: 'AI',
    floor: 3,
    x: 240,
    y: 744,
    type: 'corridor',
    name: 'Third Floor Corridor at Lift',
    accessible: true,
  },
  {
    id: 'AI_F3_STAIRS_01',
    building: 'AI',
    floor: 3,
    x: 672,
    y: 948,
    type: 'stairs',
    name: 'AI Building Central Stairs — Third Floor',
    accessible: false,
  },
  {
    id: 'AI_F3_COR_STAIRS',
    building: 'AI',
    floor: 3,
    x: 672,
    y: 864,
    type: 'corridor',
    name: 'Third Floor Corridor at Stairs',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // Main F3 Corridors
  // -------------------------------------------------------------------------
  {
    id: 'AI_F3_COR_MAIN',
    building: 'AI',
    floor: 3,
    x: 672,
    y: 672,
    type: 'corridor',
    name: 'Third Floor Main Corridor',
    accessible: true,
  },
  {
    id: 'AI_F3_COR_WEST',
    building: 'AI',
    floor: 3,
    x: 288,
    y: 432,
    type: 'corridor',
    name: 'Third Floor West Corridor',
    accessible: true,
  },
  {
    id: 'AI_F3_COR_EAST',
    building: 'AI',
    floor: 3,
    x: 1056,
    y: 432,
    type: 'corridor',
    name: 'Third Floor East Corridor',
    accessible: true,
  },
  {
    id: 'AI_F3_COR_LOWER',
    building: 'AI',
    floor: 3,
    x: 672,
    y: 864,
    type: 'corridor',
    name: 'Third Floor Lower Corridor',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // M302 Gates
  // -------------------------------------------------------------------------
  {
    id: 'AI_F3_M302_GATE_1',
    building: 'AI',
    floor: 3,
    x: 192,
    y: 864,
    type: 'door',
    name: 'M302 Gate 1',
    accessible: true,
  },
  {
    id: 'AI_F3_M302_GATE_2',
    building: 'AI',
    floor: 3,
    x: 528,
    y: 864,
    type: 'door',
    name: 'M302 Gate 2',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // M303 Gate
  // -------------------------------------------------------------------------
  {
    id: 'AI_F3_M303_GATE',
    building: 'AI',
    floor: 3,
    x: 912,
    y: 864,
    type: 'door',
    name: 'M303 Gate',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // M301 Gates
  // -------------------------------------------------------------------------
  {
    id: 'AI_F3_M301_GATE_1',
    building: 'AI',
    floor: 3,
    x: 1080,
    y: 864,
    type: 'door',
    name: 'M301 Gate 1',
    accessible: true,
  },
  {
    id: 'AI_F3_M301_GATE_2',
    building: 'AI',
    floor: 3,
    x: 1416,
    y: 864,
    type: 'door',
    name: 'M301 Gate 2',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // F3 Washrooms
  // -------------------------------------------------------------------------
  {
    id: 'AI_F3_WASHROOM_M_ENTRY',
    building: 'AI',
    floor: 3,
    x: 912,
    y: 1104,
    type: 'door',
    name: 'Male Washroom Door — Third Floor',
    accessible: true,
  },
  {
    id: 'AI_F3_WASHROOM_F_ENTRY',
    building: 'AI',
    floor: 3,
    x: 1176,
    y: 1104,
    type: 'door',
    name: 'Female Washroom Door — Third Floor',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // Labs
  // -------------------------------------------------------------------------
  {
    id: 'AI_F3_PHD_LAB_ENTRY',
    building: 'AI',
    floor: 3,
    x: 384,
    y: 360,
    type: 'door',
    name: 'PhD Lab Entrance',
    accessible: true,
  },
  {
    id: 'AI_F3_RESEARCH_LAB_ENTRY',
    building: 'AI',
    floor: 3,
    x: 816,
    y: 360,
    type: 'door',
    name: 'Research Lab Entrance',
    accessible: true,
  },
  {
    id: 'AI_F3_HPC_LAB_ENTRY',
    building: 'AI',
    floor: 3,
    x: 672,
    y: 552,
    type: 'door',
    name: 'HPC Lab Entrance',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // Administrative / Faculty Areas
  // -------------------------------------------------------------------------
  {
    id: 'AI_F3_VC_OFFICE_ENTRY',
    building: 'AI',
    floor: 3,
    x: 480,
    y: 672,
    type: 'door',
    name: 'Vice Chancellor Office Entrance',
    accessible: true,
  },
  {
    id: 'AI_F3_PROFESSORS_CABIN_ENTRY',
    building: 'AI',
    floor: 3,
    x: 792,
    y: 672,
    type: 'door',
    name: "Professors' Cabin Entrance",
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // West Faculty Offices
  // -------------------------------------------------------------------------
  {
    id: 'AI_F3_OFFICE_1',
    building: 'AI',
    floor: 3,
    x: 204,
    y: 288,
    type: 'door',
    name: 'Office 1 — Dr. Vijay Shankar Sharma',
    accessible: true,
  },
  {
    id: 'AI_F3_OFFICE_2',
    building: 'AI',
    floor: 3,
    x: 204,
    y: 432,
    type: 'door',
    name: 'Office 2 — Dr. Mausam Chouksey',
    accessible: true,
  },
  {
    id: 'AI_F3_OFFICE_3',
    building: 'AI',
    floor: 3,
    x: 204,
    y: 576,
    type: 'door',
    name: 'Office 3 — CSD Core Faculty',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // Central Faculty Offices
  // -------------------------------------------------------------------------
  {
    id: 'AI_F3_OFFICE_4',
    building: 'AI',
    floor: 3,
    x: 516,
    y: 216,
    type: 'door',
    name: 'Office 4 — Dr. Satyam Omar',
    accessible: true,
  },
  {
    id: 'AI_F3_OFFICE_5',
    building: 'AI',
    floor: 3,
    x: 708,
    y: 216,
    type: 'door',
    name: 'Office 5 — Dr. Vivek Sharma',
    accessible: true,
  },
  {
    id: 'AI_F3_OFFICE_6',
    building: 'AI',
    floor: 3,
    x: 900,
    y: 216,
    type: 'door',
    name: 'Office 6',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // East Faculty Offices
  // -------------------------------------------------------------------------
  {
    id: 'AI_F3_OFFICE_7',
    building: 'AI',
    floor: 3,
    x: 1140,
    y: 288,
    type: 'door',
    name: 'Office 7 — Dr. Pooja Tripathi',
    accessible: true,
  },
  {
    id: 'AI_F3_OFFICE_8',
    building: 'AI',
    floor: 3,
    x: 1140,
    y: 432,
    type: 'door',
    name: 'Office 8 — Dr. Namita Arya',
    accessible: true,
  },
  {
    id: 'AI_F3_OFFICE_9',
    building: 'AI',
    floor: 3,
    x: 1140,
    y: 576,
    type: 'door',
    name: 'Office 9 — Dr. Devanshu Tiwari',
    accessible: true,
  },
// =========================================================================
// AI BUILDING - THIRD FLOOR (Floor 3)
// Additional F3 navigation / service nodes
// =========================================================================

// -------------------------------------------------------------------------
// Additional F3 corridor reference nodes
// -------------------------------------------------------------------------
{
  id: 'AI_F3_COR_WEST_ENTRY',
  building: 'AI',
  floor: 3,
  x: 288,
  y: 432,
  type: 'corridor',
  name: 'Third Floor West Corridor Entry',
  accessible: true,
},
{
  id: 'AI_F3_COR_EAST_ENTRY',
  building: 'AI',
  floor: 3,
  x: 1056,
  y: 432,
  type: 'corridor',
  name: 'Third Floor East Corridor Entry',
  accessible: true,
},

// -------------------------------------------------------------------------
// F3 Room / Hall reference nodes
// -------------------------------------------------------------------------
{
  id: 'AI_F3_M301_ENTRY',
  building: 'AI',
  floor: 3,
  x: 1080,
  y: 864,
  type: 'door',
  name: 'M301 Entrance',
  accessible: true,
},
{
  id: 'AI_F3_M302_ENTRY',
  building: 'AI',
  floor: 3,
  x: 192,
  y: 864,
  type: 'door',
  name: 'M302 Entrance',
  accessible: true,
},
{
  id: 'AI_F3_M303_ENTRY',
  building: 'AI',
  floor: 3,
  x: 912,
  y: 864,
  type: 'door',
  name: 'M303 Entrance',
  accessible: true,
},

// -------------------------------------------------------------------------
// F3 research / academic area
// -------------------------------------------------------------------------
{
  id: 'AI_F3_PHD_LAB',
  building: 'AI',
  floor: 3,
  x: 384,
  y: 360,
  type: 'door',
  name: 'PhD Lab',
  accessible: true,
},
{
  id: 'AI_F3_RESEARCH_LAB',
  building: 'AI',
  floor: 3,
  x: 816,
  y: 360,
  type: 'door',
  name: 'Research Lab',
  accessible: true,
},
{
  id: 'AI_F3_HPC_LAB',
  building: 'AI',
  floor: 3,
  x: 672,
  y: 552,
  type: 'door',
  name: 'HPC Lab',
  accessible: true,
},

// -------------------------------------------------------------------------
// F3 administrative area
// -------------------------------------------------------------------------
{
  id: 'AI_F3_VC_OFFICE',
  building: 'AI',
  floor: 3,
  x: 480,
  y: 672,
  type: 'door',
  name: 'Vice Chancellor Office',
  accessible: true,
},
{
  id: 'AI_F3_PROFESSORS_CABIN',
  building: 'AI',
  floor: 3,
  x: 792,
  y: 672,
  type: 'door',
  name: "Professors' Cabin",
  accessible: true,
},

// -------------------------------------------------------------------------
// F3 faculty / office nodes
// -------------------------------------------------------------------------
{
  id: 'AI_F3_CSD_CORE_FACULTY',
  building: 'AI',
  floor: 3,
  x: 204,
  y: 576,
  type: 'door',
  name: 'CSD Core Faculty',
  accessible: true,
},
{
  id: 'AI_F3_SATYAM_OMAR',
  building: 'AI',
  floor: 3,
  x: 516,
  y: 216,
  type: 'door',
  name: 'Dr. Satyam Omar Office',
  accessible: true,
},
{
  id: 'AI_F3_VIVEK_SHARMA',
  building: 'AI',
  floor: 3,
  x: 708,
  y: 216,
  type: 'door',
  name: 'Dr. Vivek Sharma Office',
  accessible: true,
},
{
  id: 'AI_F3_POOJA_TRIPATHI',
  building: 'AI',
  floor: 3,
  x: 1140,
  y: 288,
  type: 'door',
  name: 'Dr. Pooja Tripathi Office',
  accessible: true,
},
{
  id: 'AI_F3_NAMITA_ARYA',
  building: 'AI',
  floor: 3,
  x: 1140,
  y: 432,
  type: 'door',
  name: 'Dr. Namita Arya Office',
  accessible: true,
},
{
  id: 'AI_F3_DEVANSHU_TIWAARI',
  building: 'AI',
  floor: 3,
  x: 1140,
  y: 576,
  type: 'door',
  name: 'Dr. Devanshu Tiwari Office',
  accessible: true,
},

// =========================================================================
// AI BUILDING - CONNECTION / REFERENCE NODES
// =========================================================================

// -------------------------------------------------------------------------
// Ground Floor additional corridor references
// -------------------------------------------------------------------------
{
  id: 'AI_G_COR_M001',
  building: 'AI',
  floor: 0,
  x: 1500.2,
  y: 340.5,
  type: 'corridor',
  name: 'AI Ground M001 Corridor',
  accessible: true,
},
{
  id: 'AI_G_COR_M007',
  building: 'AI',
  floor: 0,
  x: 702.8,
  y: 498.4,
  type: 'corridor',
  name: 'AI Ground M007 Corridor',
  accessible: true,
},

// -------------------------------------------------------------------------
// First Floor additional corridor references
// -------------------------------------------------------------------------
{
  id: 'AI_F1_COR_M101',
  building: 'AI',
  floor: 1,
  x: 260.4,
  y: 319.5,
  type: 'corridor',
  name: 'AI First Floor M101 Corridor',
  accessible: true,
},
{
  id: 'AI_F1_COR_M105',
  building: 'AI',
  floor: 1,
  x: 1540.4,
  y: 319.5,
  type: 'corridor',
  name: 'AI First Floor M105 Corridor',
  accessible: true,
},

// -------------------------------------------------------------------------
// Second Floor additional corridor references
// -------------------------------------------------------------------------
{
  id: 'AI_F2_COR_M201',
  building: 'AI',
  floor: 2,
  x: 1404.0,
  y: 183.0,
  type: 'corridor',
  name: 'AI Second Floor M201 Corridor',
  accessible: true,
},
{
  id: 'AI_F2_COR_M204',
  building: 'AI',
  floor: 2,
  x: 555.4,
  y: 183.0,
  type: 'corridor',
  name: 'AI Second Floor M204 Corridor',
  accessible: true,
},

// =========================================================================
// MAIN BUILDING - ADDITIONAL NODES
// =========================================================================

// -------------------------------------------------------------------------
// Ground Floor additional rooms
// -------------------------------------------------------------------------
{
  id: 'MAIN_G_SEMINAR_1',
  building: 'MAIN',
  floor: 0,
  x: 220.0,
  y: 760.0,
  type: 'door',
  name: 'Seminar Hall 1',
  accessible: true,
},
{
  id: 'MAIN_G_SEMINAR_2',
  building: 'MAIN',
  floor: 0,
  x: 340.0,
  y: 760.0,
  type: 'door',
  name: 'Seminar Hall 2',
  accessible: true,
},
{
  id: 'MAIN_G_SEMINAR_3',
  building: 'MAIN',
  floor: 0,
  x: 460.0,
  y: 760.0,
  type: 'door',
  name: 'Seminar Hall 3',
  accessible: true,
},
{
  id: 'MAIN_G_SEMINAR_4',
  building: 'MAIN',
  floor: 0,
  x: 580.0,
  y: 760.0,
  type: 'door',
  name: 'Seminar Hall 4',
  accessible: true,
},
{
  id: 'MAIN_G_SEMINAR_5',
  building: 'MAIN',
  floor: 0,
  x: 820.0,
  y: 760.0,
  type: 'door',
  name: 'Seminar Hall 5',
  accessible: true,
},
{
  id: 'MAIN_G_SEMINAR_6',
  building: 'MAIN',
  floor: 0,
  x: 940.0,
  y: 760.0,
  type: 'door',
  name: 'Seminar Hall 6',
  accessible: true,
},

// -------------------------------------------------------------------------
// First Floor Seminar Halls
// -------------------------------------------------------------------------
{
  id: 'MAIN_F1_SEMINAR_7',
  building: 'MAIN',
  floor: 1,
  x: 220.0,
  y: 700.0,
  type: 'door',
  name: 'Seminar Hall 7',
  accessible: true,
},
{
  id: 'MAIN_F1_SEMINAR_8',
  building: 'MAIN',
  floor: 1,
  x: 340.0,
  y: 700.0,
  type: 'door',
  name: 'Seminar Hall 8',
  accessible: true,
},
{
  id: 'MAIN_F1_SEMINAR_9',
  building: 'MAIN',
  floor: 1,
  x: 460.0,
  y: 700.0,
  type: 'door',
  name: 'Seminar Hall 9',
  accessible: true,
},
{
  id: 'MAIN_F1_SEMINAR_10',
  building: 'MAIN',
  floor: 1,
  x: 580.0,
  y: 700.0,
  type: 'door',
  name: 'Seminar Hall 10',
  accessible: true,
},
{
  id: 'MAIN_F1_SEMINAR_11',
  building: 'MAIN',
  floor: 1,
  x: 700.0,
  y: 700.0,
  type: 'door',
  name: 'Seminar Hall 11 / Language Lab',
  accessible: true,
},
{
  id: 'MAIN_G_SEMINAR_12',
  building: 'MAIN',
  floor: 0,
  x: 1060.0,
  y: 760.0,
  type: 'door',
  name: 'Seminar Hall 12',
  accessible: true,
},

// =========================================================================
// CAMPUS / EXTERNAL NODES
// =========================================================================

{
  id: 'CAMPUS_AI_GATE',
  building: 'AI',
  floor: 0,
  x: 892.4,
  y: 592.5,
  type: 'gate',
  name: 'AI Building Gate',
  accessible: true,
},
{
  id: 'CAMPUS_MAIN_GATE',
  building: 'MAIN',
  floor: 0,
  x: 671.5,
  y: 889.4,
  type: 'gate',
  name: 'Main Building Gate',
  accessible: true,
},
];
// =========================================================================
// NAVIGATION NODE HELPERS
// =========================================================================

/**
 * Find a navigation node by its unique node ID.
 */
export function getNodeById(
  id: string
): NavigationNode | undefined {
  return navigationNodes.find((node) => node.id === id);
}

/**
 * Get all navigation nodes for a particular building and floor.
 */
export function getNodesByFloor(
  building: 'AI' | 'MAIN',
  floor: number
): NavigationNode[] {
  return navigationNodes.filter(
    (node) =>
      node.building === building &&
      node.floor === floor
  );
}

/**
 * Get all nodes belonging to a particular building.
 */
export function getNodesByBuilding(
  building: 'AI' | 'MAIN'
): NavigationNode[] {
  return navigationNodes.filter(
    (node) => node.building === building
  );
}

/**
 * Get all accessible nodes for a building/floor.
 */
export function getAccessibleNodesByFloor(
  building: 'AI' | 'MAIN',
  floor: number
): NavigationNode[] {
  return navigationNodes.filter(
    (node) =>
      node.building === building &&
      node.floor === floor &&
      node.accessible
  );
}

/**
 * Get nodes of a specific type.
 */
export function getNodesByType(
  type: NavigationNode['type']
): NavigationNode[] {
  return navigationNodes.filter(
    (node) => node.type === type
  );
}

/**
 * Get all lift nodes.
 */
export function getLiftNodes(): NavigationNode[] {
  return navigationNodes.filter(
    (node) => node.type === 'lift'
  );
}

/**
 * Get all stair nodes.
 */
export function getStairNodes(): NavigationNode[] {
  return navigationNodes.filter(
    (node) => node.type === 'stairs'
  );
}

/**
 * Get all entrance / gate nodes.
 */
export function getEntranceNodes(): NavigationNode[] {
  return navigationNodes.filter(
    (node) =>
      node.type === 'entrance' ||
      node.type === 'gate'
  );
}

/**
 * Get all nodes on a floor sorted approximately
 * from left to right and then top to bottom.
 *
 * Useful for floor-plan rendering and debugging.
 */
export function getSortedFloorNodes(
  building: 'AI' | 'MAIN',
  floor: number
): NavigationNode[] {
  return getNodesByFloor(building, floor).sort(
    (a, b) => {
      if (Math.abs(a.x - b.x) > 20) {
        return a.x - b.x;
      }

      return a.y - b.y;
    }
  );
}

/**
 * Get all AI Building Third Floor nodes.
 *
 * This helper is intentionally explicit because F3
 * uses the dedicated vector floor-plan renderer.
 */
export function getThirdFloorNodes(): NavigationNode[] {
  return navigationNodes.filter(
    (node) =>
      node.building === 'AI' &&
      node.floor === 3
  );
}