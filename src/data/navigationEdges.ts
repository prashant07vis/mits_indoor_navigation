import type { NavigationEdge } from '../types/navigation';

export const navigationEdges: NavigationEdge[] = [
  // =========================================================================
  // 1. AI BUILDING - GROUND FLOOR (Floor 0)
  // =========================================================================

  // Entrance & Central Crossway
  {
    from: 'AI_G_ENTRY_MAIN',
    to: 'AI_G_PORCH',
    distance: 6.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_G_PORCH',
    to: 'AI_G_COR_CENTRAL',
    distance: 7.2,
    type: 'corridor',
    accessible: true,
  },

  // Central Vertical Connectors
  {
    from: 'AI_G_COR_CENTRAL',
    to: 'AI_G_COR_LIFT',
    distance: 10.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_G_COR_LIFT',
    to: 'AI_G_LIFT_01',
    distance: 3.5,
    type: 'lift',
    accessible: true,
  },
  {
    from: 'AI_G_COR_LIFT',
    to: 'AI_G_COR_STAIRS',
    distance: 4.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_G_COR_STAIRS',
    to: 'AI_G_STAIRS_01',
    distance: 3.8,
    type: 'stairs',
    accessible: false,
  },

  // West Corridor
  {
    from: 'AI_G_COR_CENTRAL',
    to: 'AI_G_COR_W1',
    distance: 8.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_G_COR_W1',
    to: 'AI_G_COR_M003',
    distance: 7.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_G_COR_M003',
    to: 'AI_G_M003_ENTRY',
    distance: 3.8,
    type: 'door',
    accessible: true,
  },

  {
    from: 'AI_G_COR_M003',
    to: 'AI_G_COR_M004',
    distance: 5.6,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_G_COR_M004',
    to: 'AI_G_M004_ENTRY',
    distance: 4.2,
    type: 'door',
    accessible: true,
  },

  {
    from: 'AI_G_COR_M004',
    to: 'AI_G_COR_M005',
    distance: 9.8,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_G_COR_M005',
    to: 'AI_G_M005_ENTRY',
    distance: 3.8,
    type: 'door',
    accessible: true,
  },

  {
    from: 'AI_G_COR_M005',
    to: 'AI_G_COR_STAIRS_WEST',
    distance: 2.1,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_G_COR_STAIRS_WEST',
    to: 'AI_G_STAIRS_WEST',
    distance: 3.8,
    type: 'stairs',
    accessible: false,
  },

  {
    from: 'AI_G_COR_STAIRS_WEST',
    to: 'AI_G_COR_WASHROOMS',
    distance: 4.9,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_G_COR_WASHROOMS',
    to: 'AI_G_WASHROOM_F_ENTRY',
    distance: 3.8,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_G_COR_WASHROOMS',
    to: 'AI_G_WASHROOM_M_ENTRY',
    distance: 3.8,
    type: 'door',
    accessible: true,
  },

  // East Corridor
  {
    from: 'AI_G_COR_STAIRS',
    to: 'AI_G_COR_M002',
    distance: 4.2,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_G_COR_M002',
    to: 'AI_G_M002_ENTRY',
    distance: 3.8,
    type: 'door',
    accessible: true,
  },

  {
    from: 'AI_G_COR_M002',
    to: 'AI_G_COR_M007',
    distance: 7.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_G_COR_M007',
    to: 'AI_G_M007_ENTRY',
    distance: 3.8,
    type: 'door',
    accessible: true,
  },

  {
    from: 'AI_G_M007_ENTRY',
    to: 'AI_G_M007_OFFICE_01',
    distance: 4.2,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_G_M007_ENTRY',
    to: 'AI_G_M007_OFFICE_02',
    distance: 7.7,
    type: 'door',
    accessible: true,
  },

  {
    from: 'AI_G_COR_M007',
    to: 'AI_G_COR_M001',
    distance: 4.9,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_G_COR_M001',
    to: 'AI_G_M001_ENTRY',
    distance: 4.2,
    type: 'door',
    accessible: true,
  },

  {
    from: 'AI_G_COR_M001',
    to: 'AI_G_COR_FACULTY_E',
    distance: 6.3,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_G_COR_FACULTY_E',
    to: 'AI_G_M001_OFFICE_01',
    distance: 8.1,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_G_COR_FACULTY_E',
    to: 'AI_G_M001_OFFICE_02',
    distance: 8.8,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_G_COR_FACULTY_E',
    to: 'AI_G_M001_OFFICE_03',
    distance: 4.2,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_G_COR_FACULTY_E',
    to: 'AI_G_M001_OFFICE_04',
    distance: 6.0,
    type: 'door',
    accessible: true,
  },

  // =========================================================================
  // 2. AI BUILDING - FIRST FLOOR (Floor 1)
  // =========================================================================

  {
    from: 'AI_F1_COR_LIFT',
    to: 'AI_F1_LIFT_01',
    distance: 3.6,
    type: 'lift',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_LIFT',
    to: 'AI_F1_COR_STAIRS',
    distance: 4.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_STAIRS',
    to: 'AI_F1_STAIRS_01',
    distance: 3.6,
    type: 'stairs',
    accessible: false,
  },
  {
    from: 'AI_F1_COR_LIFT',
    to: 'AI_F1_COR_CENTRAL',
    distance: 9.5,
    type: 'corridor',
    accessible: true,
  },

  // West Wing
  {
    from: 'AI_F1_COR_CENTRAL',
    to: 'AI_F1_COR_M103',
    distance: 11.9,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_M103',
    to: 'AI_F1_M103_ENTRY',
    distance: 3.4,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_M103',
    to: 'AI_F1_COR_M104',
    distance: 2.1,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_M104',
    to: 'AI_F1_M104_ENTRY',
    distance: 3.6,
    type: 'door',
    accessible: true,
  },

  {
    from: 'AI_F1_COR_M104',
    to: 'AI_F1_COR_M105',
    distance: 13.3,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_M105',
    to: 'AI_F1_M105_ENTRY',
    distance: 3.4,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_M105',
    to: 'AI_F1_COR_STAIRS_WEST',
    distance: 2.1,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_STAIRS_WEST',
    to: 'AI_F1_STAIRS_WEST',
    distance: 3.6,
    type: 'stairs',
    accessible: false,
  },

  {
    from: 'AI_F1_COR_STAIRS_WEST',
    to: 'AI_F1_WASHROOM_F_ENTRY',
    distance: 6.3,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_STAIRS_WEST',
    to: 'AI_F1_WASHROOM_M_ENTRY',
    distance: 4.2,
    type: 'door',
    accessible: true,
  },

  // East Wing
  {
    from: 'AI_F1_COR_STAIRS',
    to: 'AI_F1_COR_M102',
    distance: 2.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_M102',
    to: 'AI_F1_M102_ENTRY',
    distance: 3.4,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_M102',
    to: 'AI_F1_COR_M101',
    distance: 9.8,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_M101',
    to: 'AI_F1_M101_ENTRY',
    distance: 3.6,
    type: 'door',
    accessible: true,
  },

  {
    from: 'AI_F1_COR_M101',
    to: 'AI_F1_COR_FACULTY_E',
    distance: 3.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_FACULTY_E',
    to: 'AI_F1_T_ARCHANA',
    distance: 7.7,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_FACULTY_E',
    to: 'AI_F1_T_PRERNA',
    distance: 10.2,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_FACULTY_E',
    to: 'AI_F1_T_ABHISHEK',
    distance: 5.6,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_FACULTY_E',
    to: 'AI_F1_T_NEERAJ',
    distance: 5.6,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_FACULTY_E',
    to: 'AI_F1_T_TEJ',
    distance: 9.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_FACULTY_E',
    to: 'AI_F1_T_PAWAN',
    distance: 11.2,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_FACULTY_E',
    to: 'AI_F1_T_ANU',
    distance: 7.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_FACULTY_E',
    to: 'AI_F1_T_SHUBHA',
    distance: 8.4,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_FACULTY_E',
    to: 'AI_F1_T_HARDEV',
    distance: 8.8,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F1_COR_FACULTY_E',
    to: 'AI_F1_T_BHAGAT',
    distance: 10.5,
    type: 'door',
    accessible: true,
  },

  // =========================================================================
  // 3. AI BUILDING - SECOND FLOOR (Floor 2)
  // =========================================================================

  {
    from: 'AI_F2_COR_LIFT',
    to: 'AI_F2_LIFT_01',
    distance: 3.4,
    type: 'lift',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_LIFT',
    to: 'AI_F2_COR_STAIRS',
    distance: 3.9,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_STAIRS',
    to: 'AI_F2_STAIRS_01',
    distance: 3.4,
    type: 'stairs',
    accessible: false,
  },
  {
    from: 'AI_F2_COR_LIFT',
    to: 'AI_F2_COR_CENTRAL',
    distance: 9.5,
    type: 'corridor',
    accessible: true,
  },

  // Central Suites
  {
    from: 'AI_F2_COR_CENTRAL',
    to: 'AI_F2_PVC_ENTRY',
    distance: 4.2,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F2_PVC_ENTRY',
    to: 'AI_F2_T_MANJREE',
    distance: 0.1,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_CENTRAL',
    to: 'AI_F2_T_ATUL',
    distance: 3.8,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_CENTRAL',
    to: 'AI_F2_T_PRIYANKA',
    distance: 5.6,
    type: 'door',
    accessible: true,
  },

  // West Wing
  {
    from: 'AI_F2_COR_CENTRAL',
    to: 'AI_F2_COR_M203',
    distance: 11.9,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_M203',
    to: 'AI_F2_M203_ENTRY',
    distance: 3.3,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_M203',
    to: 'AI_F2_COR_M204',
    distance: 2.1,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_M204',
    to: 'AI_F2_M204_ENTRY',
    distance: 3.4,
    type: 'door',
    accessible: true,
  },

  {
    from: 'AI_F2_COR_M204',
    to: 'AI_F2_COR_M205',
    distance: 12.6,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_M205',
    to: 'AI_F2_M205_ENTRY',
    distance: 3.3,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_M205',
    to: 'AI_F2_COR_STAIRS_WEST',
    distance: 2.8,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_STAIRS_WEST',
    to: 'AI_F2_STAIRS_WEST',
    distance: 3.4,
    type: 'stairs',
    accessible: false,
  },

  {
    from: 'AI_F2_COR_STAIRS_WEST',
    to: 'AI_F2_WASHROOM_F_ENTRY',
    distance: 5.6,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_STAIRS_WEST',
    to: 'AI_F2_WASHROOM_M_ENTRY',
    distance: 3.5,
    type: 'door',
    accessible: true,
  },

  // East Wing
  {
    from: 'AI_F2_COR_STAIRS',
    to: 'AI_F2_COR_M202',
    distance: 2.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_M202',
    to: 'AI_F2_M202_ENTRY',
    distance: 3.3,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_M202',
    to: 'AI_F2_COR_M201',
    distance: 9.8,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_M201',
    to: 'AI_F2_M201_ENTRY',
    distance: 3.4,
    type: 'door',
    accessible: true,
  },

  {
    from: 'AI_F2_COR_M201',
    to: 'AI_F2_COR_FACULTY_E',
    distance: 3.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_FACULTY_E',
    to: 'AI_F2_T_ABHISHEK_CST',
    distance: 4.9,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_FACULTY_E',
    to: 'AI_F2_T_SUMIT',
    distance: 6.3,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_FACULTY_E',
    to: 'AI_F2_T_SUNIL',
    distance: 7.7,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_FACULTY_E',
    to: 'AI_F2_T_NANDKISHOR',
    distance: 10.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_FACULTY_E',
    to: 'AI_F2_T_RAMNARESH',
    distance: 8.4,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_FACULTY_E',
    to: 'AI_F2_T_TEJASWITA',
    distance: 11.2,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F2_COR_FACULTY_E',
    to: 'AI_F2_T_VIBHA',
    distance: 11.9,
    type: 'door',
    accessible: true,
  },

  // =========================================================================
  // 4. AI BUILDING - VERTICAL SHAFTS
  // =========================================================================

  // Central Lift
  {
    from: 'AI_G_LIFT_01',
    to: 'AI_F1_LIFT_01',
    distance: 4.2,
    type: 'lift',
    accessible: true,
  },
  {
    from: 'AI_F1_LIFT_01',
    to: 'AI_F2_LIFT_01',
    distance: 4.2,
    type: 'lift',
    accessible: true,
  },

  // Central Stairs
  {
    from: 'AI_G_STAIRS_01',
    to: 'AI_F1_STAIRS_01',
    distance: 6.5,
    type: 'stairs',
    accessible: false,
  },
  {
    from: 'AI_F1_STAIRS_01',
    to: 'AI_F2_STAIRS_01',
    distance: 6.5,
    type: 'stairs',
    accessible: false,
  },

  // West Stairs
  {
    from: 'AI_G_STAIRS_WEST',
    to: 'AI_F1_STAIRS_WEST',
    distance: 6.5,
    type: 'stairs',
    accessible: false,
  },
  {
    from: 'AI_F1_STAIRS_WEST',
    to: 'AI_F2_STAIRS_WEST',
    distance: 6.5,
    type: 'stairs',
    accessible: false,
  },

  // =========================================================================
  // 5. AI BUILDING - THIRD FLOOR (Floor 3)
  // =========================================================================

  // -------------------------------------------------------------------------
  // F3 Lift & Main Corridor
  // -------------------------------------------------------------------------
  {
    from: 'AI_F3_LIFT_01',
    to: 'AI_F3_COR_LIFT',
    distance: 3.0,
    type: 'lift',
    accessible: true,
  },
  {
    from: 'AI_F3_COR_LIFT',
    to: 'AI_F3_COR_MAIN',
    distance: 7.0,
    type: 'corridor',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // F3 Main Corridor -> Stairs
  // -------------------------------------------------------------------------
  {
    from: 'AI_F3_COR_MAIN',
    to: 'AI_F3_COR_STAIRS',
    distance: 8.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F3_COR_STAIRS',
    to: 'AI_F3_STAIRS_01',
    distance: 3.5,
    type: 'stairs',
    accessible: false,
  },

  // -------------------------------------------------------------------------
  // F3 M302 — two gates with 16-tile spacing
  // -------------------------------------------------------------------------
  {
    from: 'AI_F3_COR_STAIRS',
    to: 'AI_F3_M302_GATE_2',
    distance: 6.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F3_M302_GATE_1',
    to: 'AI_F3_M302_GATE_2',
    distance: 16.0,
    type: 'corridor',
    accessible: true,
  },

  // Connect M302 Gate 1 to lower corridor
  {
    from: 'AI_F3_M302_GATE_1',
    to: 'AI_F3_COR_LOWER',
    distance: 6.0,
    type: 'corridor',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // F3 M303
  // -------------------------------------------------------------------------
  {
    from: 'AI_F3_COR_STAIRS',
    to: 'AI_F3_M303_GATE',
    distance: 10.0,
    type: 'corridor',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // F3 M301 — two gates with 16-tile spacing
  // -------------------------------------------------------------------------
  {
    from: 'AI_F3_M303_GATE',
    to: 'AI_F3_M301_GATE_1',
    distance: 7.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F3_M301_GATE_1',
    to: 'AI_F3_M301_GATE_2',
    distance: 16.0,
    type: 'corridor',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // F3 Washrooms
  // -------------------------------------------------------------------------
  {
    from: 'AI_F3_M303_GATE',
    to: 'AI_F3_WASHROOM_M_ENTRY',
    distance: 10.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F3_WASHROOM_M_ENTRY',
    to: 'AI_F3_WASHROOM_F_ENTRY',
    distance: 11.0,
    type: 'corridor',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // F3 Research / Academic Labs
  // -------------------------------------------------------------------------
  {
    from: 'AI_F3_COR_MAIN',
    to: 'AI_F3_PHD_LAB_ENTRY',
    distance: 14.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F3_COR_MAIN',
    to: 'AI_F3_RESEARCH_LAB_ENTRY',
    distance: 14.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F3_COR_MAIN',
    to: 'AI_F3_HPC_LAB_ENTRY',
    distance: 8.0,
    type: 'door',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // F3 VC Office & Professors' Cabin
  // -------------------------------------------------------------------------
  {
    from: 'AI_F3_COR_MAIN',
    to: 'AI_F3_VC_OFFICE_ENTRY',
    distance: 8.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F3_COR_MAIN',
    to: 'AI_F3_PROFESSORS_CABIN_ENTRY',
    distance: 8.0,
    type: 'door',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // F3 West Faculty Area
  // -------------------------------------------------------------------------
  {
    from: 'AI_F3_COR_MAIN',
    to: 'AI_F3_COR_WEST',
    distance: 16.0,
    type: 'corridor',
    accessible: true,
  },

  {
    from: 'AI_F3_COR_WEST',
    to: 'AI_F3_OFFICE_1',
    distance: 7.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F3_COR_WEST',
    to: 'AI_F3_OFFICE_2',
    distance: 7.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F3_COR_WEST',
    to: 'AI_F3_OFFICE_3',
    distance: 7.0,
    type: 'door',
    accessible: true,
  },

  {
    from: 'AI_F3_OFFICE_1',
    to: 'AI_F3_OFFICE_2',
    distance: 6.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F3_OFFICE_2',
    to: 'AI_F3_OFFICE_3',
    distance: 6.0,
    type: 'corridor',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // F3 Central Faculty Offices
  // -------------------------------------------------------------------------
  {
    from: 'AI_F3_COR_MAIN',
    to: 'AI_F3_OFFICE_4',
    distance: 13.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F3_COR_MAIN',
    to: 'AI_F3_OFFICE_5',
    distance: 8.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F3_COR_MAIN',
    to: 'AI_F3_OFFICE_6',
    distance: 10.0,
    type: 'door',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // F3 East Faculty Area
  // -------------------------------------------------------------------------
  {
    from: 'AI_F3_COR_MAIN',
    to: 'AI_F3_COR_EAST',
    distance: 16.0,
    type: 'corridor',
    accessible: true,
  },

  {
    from: 'AI_F3_COR_EAST',
    to: 'AI_F3_OFFICE_7',
    distance: 7.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F3_COR_EAST',
    to: 'AI_F3_OFFICE_8',
    distance: 7.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'AI_F3_COR_EAST',
    to: 'AI_F3_OFFICE_9',
    distance: 7.0,
    type: 'door',
    accessible: true,
  },

  {
    from: 'AI_F3_OFFICE_7',
    to: 'AI_F3_OFFICE_8',
    distance: 6.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'AI_F3_OFFICE_8',
    to: 'AI_F3_OFFICE_9',
    distance: 6.0,
    type: 'corridor',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // F2 -> F3 Lift
  // -------------------------------------------------------------------------
  {
    from: 'AI_F2_LIFT_01',
    to: 'AI_F3_LIFT_01',
    distance: 4.2,
    type: 'lift',
    accessible: true,
  },

  // -------------------------------------------------------------------------
  // F2 -> F3 Central Stairs
  // -------------------------------------------------------------------------
  {
    from: 'AI_F2_STAIRS_01',
    to: 'AI_F3_STAIRS_01',
    distance: 6.5,
    type: 'stairs',
    accessible: false,
  },

  // =========================================================================
  // 6. MAIN BUILDING - GROUND FLOOR (Floor 0)
  // =========================================================================

  // South Corridor from Foyer
  {
    from: 'MAIN_G_FOYER_ENTRY',
    to: 'MAIN_G_COR_SOUTH_FOYER',
    distance: 3.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_SOUTH_FOYER',
    to: 'MAIN_G_COR_CONCLAVE',
    distance: 4.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_CONCLAVE',
    to: 'MAIN_G_CONCLAVE_ENTRY',
    distance: 3.0,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_CONCLAVE',
    to: 'MAIN_G_COR_SEM1',
    distance: 5.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_SEM1',
    to: 'MAIN_G_SEM1_ENTRY',
    distance: 3.0,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_SEM1',
    to: 'MAIN_G_COR_SEM2',
    distance: 7.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_SEM2',
    to: 'MAIN_G_SEM2_ENTRY',
    distance: 3.0,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_SEM2',
    to: 'MAIN_G_COR_SEM3',
    distance: 7.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_SEM3',
    to: 'MAIN_G_SEM3_ENTRY',
    distance: 3.0,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_SEM3',
    to: 'MAIN_G_COR_BEEE',
    distance: 6.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_BEEE',
    to: 'MAIN_G_BEEE_ENTRY',
    distance: 3.0,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_BEEE',
    to: 'MAIN_G_COR_SW_CORNER',
    distance: 5.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_SW_CORNER',
    to: 'MAIN_G_J006_ENTRY',
    distance: 4.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_SW_CORNER',
    to: 'MAIN_G_STAIRS_SOUTH',
    distance: 2.5,
    type: 'stairs',
    accessible: false,
  },

  // West Corridor
  {
    from: 'MAIN_G_COR_SW_CORNER',
    to: 'MAIN_G_COR_HOD_EE',
    distance: 7.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_HOD_EE',
    to: 'MAIN_G_T_SHISHIR',
    distance: 2.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_HOD_EE',
    to: 'MAIN_G_J007_ENTRY',
    distance: 2.8,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_HOD_EE',
    to: 'MAIN_G_COR_ELEARNING',
    distance: 4.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_ELEARNING',
    to: 'MAIN_G_ELEARNING_ENTRY',
    distance: 2.0,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_ELEARNING',
    to: 'MAIN_G_COR_J008',
    distance: 4.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_J008',
    to: 'MAIN_G_J008_ENTRY',
    distance: 2.0,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_J008',
    to: 'MAIN_G_COR_J009',
    distance: 7.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_J009',
    to: 'MAIN_G_J009_ENTRY',
    distance: 2.0,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_J009',
    to: 'MAIN_G_COR_SEM4',
    distance: 7.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_SEM4',
    to: 'MAIN_G_SEM4_ENTRY',
    distance: 2.0,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_SEM4',
    to: 'MAIN_G_COR_SEM12',
    distance: 7.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_SEM12',
    to: 'MAIN_G_SEM12_ENTRY',
    distance: 2.0,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_SEM12',
    to: 'MAIN_G_COR_NW_CORNER',
    distance: 4.0,
    type: 'corridor',
    accessible: true,
  },

  // North Corridor
  {
    from: 'MAIN_G_COR_NW_CORNER',
    to: 'MAIN_G_T_CSMALVI',
    distance: 4.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_NW_CORNER',
    to: 'MAIN_G_T_BHUPENDRA',
    distance: 5.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_NW_CORNER',
    to: 'MAIN_G_T_RPKORI',
    distance: 4.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_NW_CORNER',
    to: 'MAIN_G_T_JYOTI',
    distance: 4.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_NW_CORNER',
    to: 'MAIN_G_T_MKGAUR',
    distance: 4.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_NW_CORNER',
    to: 'MAIN_G_T_VEDANSH',
    distance: 3.5,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_NW_CORNER',
    to: 'MAIN_G_COR_J012',
    distance: 10.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_J012',
    to: 'MAIN_G_J012_ENTRY',
    distance: 3.5,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_J012',
    to: 'MAIN_G_COR_J013',
    distance: 7.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_J013',
    to: 'MAIN_G_J013_ENTRY',
    distance: 3.5,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_J013',
    to: 'MAIN_G_COR_J014',
    distance: 7.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_J014',
    to: 'MAIN_G_J014_ENTRY',
    distance: 3.5,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_J014',
    to: 'MAIN_G_COR_IC_ENGINE',
    distance: 4.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_IC_ENGINE',
    to: 'MAIN_G_IC_ENGINE_ENTRY',
    distance: 3.5,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_IC_ENGINE',
    to: 'MAIN_G_COR_SEM6',
    distance: 4.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_SEM6',
    to: 'MAIN_G_SEM6_ENTRY',
    distance: 3.5,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_SEM6',
    to: 'MAIN_G_COR_SURVEY',
    distance: 4.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_SURVEY',
    to: 'MAIN_G_SURVEY_ENTRY',
    distance: 3.5,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_SURVEY',
    to: 'MAIN_G_COR_MOOC',
    distance: 3.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_MOOC',
    to: 'MAIN_G_MOOC_ENTRY',
    distance: 3.5,
    type: 'door',
    accessible: true,
  },

  // Central Hub
  {
    from: 'MAIN_G_COR_MOOC',
    to: 'MAIN_G_COR_004',
    distance: 8.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_004',
    to: 'MAIN_G_004_ENTRY',
    distance: 2.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_004',
    to: 'MAIN_G_003_ENTRY',
    distance: 5.5,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_004',
    to: 'MAIN_G_COR_CENTRAL_HUB',
    distance: 11.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_CENTRAL_HUB',
    to: 'MAIN_G_LIFT_01',
    distance: 2.5,
    type: 'lift',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_CENTRAL_HUB',
    to: 'MAIN_G_STAIRS_CENTRAL',
    distance: 3.0,
    type: 'stairs',
    accessible: false,
  },

  {
    from: 'MAIN_G_COR_CENTRAL_HUB',
    to: 'MAIN_G_COR_CROSS_W',
    distance: 14.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_CROSS_W',
    to: 'MAIN_G_COR_SEM5',
    distance: 9.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_SEM5',
    to: 'MAIN_G_SEM5_ENTRY',
    distance: 2.0,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_CROSS_W',
    to: 'MAIN_G_J025_ENTRY',
    distance: 8.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_CROSS_W',
    to: 'MAIN_G_T_SANJAY_TIWARI',
    distance: 5.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_CROSS_W',
    to: 'MAIN_G_J026_ENTRY',
    distance: 8.8,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_CENTRAL_HUB',
    to: 'MAIN_G_FACULTY_RESOURCE_ENTRY',
    distance: 9.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_CENTRAL_HUB',
    to: 'MAIN_G_J022_ENTRY',
    distance: 14.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_CENTRAL_HUB',
    to: 'MAIN_G_J021_ENTRY',
    distance: 19.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_CENTRAL_HUB',
    to: 'MAIN_G_IQAC_ENTRY',
    distance: 16.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_CENTRAL_HUB',
    to: 'MAIN_G_COR_SOUTH_FOYER',
    distance: 20.0,
    type: 'corridor',
    accessible: true,
  },

  // Admin & Library
  {
    from: 'MAIN_G_COR_CENTRAL_HUB',
    to: 'MAIN_G_COR_ADMIN_PASSAGE',
    distance: 11.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_ADMIN_PASSAGE',
    to: 'MAIN_G_DIRECTORS_ENTRY',
    distance: 4.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_ADMIN_PASSAGE',
    to: 'MAIN_G_BOARD_ROOM_ENTRY',
    distance: 5.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_ADMIN_PASSAGE',
    to: 'MAIN_G_ADMIN_OFFICE_ENTRY',
    distance: 9.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_ADMIN_PASSAGE',
    to: 'MAIN_G_ACCOUNTANT_ENTRY',
    distance: 13.0,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_ADMIN_PASSAGE',
    to: 'MAIN_G_COR_LIBRARY',
    distance: 12.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_LIBRARY',
    to: 'MAIN_G_LIBRARY_ENTRY',
    distance: 3.5,
    type: 'door',
    accessible: true,
  },

  // East Corridors
  {
    from: 'MAIN_G_COR_CENTRAL_HUB',
    to: 'MAIN_G_COR_EAST_CROSS',
    distance: 10.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_EAST_CROSS',
    to: 'MAIN_G_LT1_ENTRY',
    distance: 5.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_EAST_CROSS',
    to: 'MAIN_G_T_RK_GUPTA',
    distance: 3.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_EAST_CROSS',
    to: 'MAIN_G_T_MANISH_DIXIT',
    distance: 4.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_EAST_CROSS',
    to: 'MAIN_G_PROJECT_RESEARCH_ENTRY',
    distance: 6.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_EAST_CROSS',
    to: 'MAIN_G_GIRLS_COMMON_ENTRY',
    distance: 9.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_EAST_CROSS',
    to: 'MAIN_G_T_RS_JADON',
    distance: 11.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_EAST_CROSS',
    to: 'MAIN_G_LT2_ENTRY',
    distance: 13.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_EAST_CROSS',
    to: 'MAIN_G_STAIRS_3',
    distance: 15.0,
    type: 'stairs',
    accessible: false,
  },

  {
    from: 'MAIN_G_COR_EAST_CROSS',
    to: 'MAIN_G_PL5_ENTRY',
    distance: 6.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_EAST_CROSS',
    to: 'MAIN_G_T_ANSHU',
    distance: 4.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_EAST_CROSS',
    to: 'MAIN_G_T_PARUL',
    distance: 5.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_EAST_CROSS',
    to: 'MAIN_G_PL2_ENTRY',
    distance: 15.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_PL2_ENTRY',
    to: 'MAIN_G_PL1_ENTRY',
    distance: 6.0,
    type: 'door',
    accessible: true,
  },

  // Diamond Wing
  {
    from: 'MAIN_G_COR_EAST_CROSS',
    to: 'MAIN_G_COR_DIAMOND_ENTRY',
    distance: 10.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_DIAMOND_ENTRY',
    to: 'MAIN_G_EXAM_CENTRE_ENTRY',
    distance: 3.8,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_DIAMOND_ENTRY',
    to: 'MAIN_G_CONVENTION_ENTRY',
    distance: 2.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_DIAMOND_ENTRY',
    to: 'MAIN_G_CSE_STAFF_ENTRY',
    distance: 3.5,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_G_COR_DIAMOND_ENTRY',
    to: 'MAIN_G_COR_DIAMOND_COURT',
    distance: 9.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_DIAMOND_COURT',
    to: 'MAIN_G_STUDIO2_ENTRY',
    distance: 9.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_DIAMOND_COURT',
    to: 'MAIN_G_STUDIO1_ENTRY',
    distance: 8.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_DIAMOND_COURT',
    to: 'MAIN_G_ARCH_LIB_ENTRY',
    distance: 10.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_DIAMOND_COURT',
    to: 'MAIN_G_STAIRS_NORTH',
    distance: 10.5,
    type: 'stairs',
    accessible: false,
  },
  {
    from: 'MAIN_G_COR_DIAMOND_COURT',
    to: 'MAIN_G_STUDIO5_ENTRY',
    distance: 10.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_DIAMOND_COURT',
    to: 'MAIN_G_STUDIO4_ENTRY',
    distance: 8.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_G_COR_DIAMOND_COURT',
    to: 'MAIN_G_STUDIO3_ENTRY',
    distance: 9.0,
    type: 'door',
    accessible: true,
  },

  // =========================================================================
  // 7. MAIN BUILDING - FIRST FLOOR (Floor 1)
  // =========================================================================

  {
    from: 'MAIN_F1_LIFT_01',
    to: 'MAIN_F1_COR_SOUTH',
    distance: 20.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_F1_STAIRS_CENTRAL',
    to: 'MAIN_F1_LIFT_01',
    distance: 5.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_SOUTH',
    to: 'MAIN_F1_STAIRS_SOUTH',
    distance: 26.0,
    type: 'corridor',
    accessible: true,
  },

  {
    from: 'MAIN_F1_COR_SOUTH',
    to: 'MAIN_F1_COLLOQUIUM_ENTRY',
    distance: 10.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_SOUTH',
    to: 'MAIN_F1_SEM7_ENTRY',
    distance: 4.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_SOUTH',
    to: 'MAIN_F1_SEM8_ENTRY',
    distance: 8.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_SOUTH',
    to: 'MAIN_F1_SEM9_ENTRY',
    distance: 15.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_SOUTH',
    to: 'MAIN_F1_SEM10_ENTRY',
    distance: 22.0,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_F1_COR_SOUTH',
    to: 'MAIN_F1_COR_WEST',
    distance: 30.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_WEST',
    to: 'MAIN_F1_SEM11_ENTRY',
    distance: 10.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_WEST',
    to: 'MAIN_F1_COR_NORTH',
    distance: 20.0,
    type: 'corridor',
    accessible: true,
  },

  {
    from: 'MAIN_F1_COR_NORTH',
    to: 'MAIN_F1_SAC_ENTRY',
    distance: 4.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_NORTH',
    to: 'MAIN_F1_EXAM_ENTRY',
    distance: 16.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_NORTH',
    to: 'MAIN_F1_J124_ENTRY',
    distance: 9.5,
    type: 'door',
    accessible: true,
  },

  {
    from: 'MAIN_F1_LIFT_01',
    to: 'MAIN_F1_TPO_ENTRY',
    distance: 11.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_LIFT_01',
    to: 'MAIN_F1_CONFERENCE_ENTRY',
    distance: 10.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_LIFT_01',
    to: 'MAIN_F1_LIBRARY_ENTRY',
    distance: 15.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_LIFT_01',
    to: 'MAIN_F1_J133_ENTRY',
    distance: 9.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_LIFT_01',
    to: 'MAIN_F1_J137_ENTRY',
    distance: 19.5,
    type: 'door',
    accessible: true,
  },

  // First Floor Diamond Wing
  {
    from: 'MAIN_F1_LIFT_01',
    to: 'MAIN_F1_COR_DIAMOND',
    distance: 23.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_DIAMOND',
    to: 'MAIN_F1_STAIRS_NORTH',
    distance: 10.5,
    type: 'stairs',
    accessible: false,
  },
  {
    from: 'MAIN_F1_COR_DIAMOND',
    to: 'MAIN_F1_J140_ENTRY',
    distance: 10.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_DIAMOND',
    to: 'MAIN_F1_J141_ENTRY',
    distance: 7.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_DIAMOND',
    to: 'MAIN_F1_J142_ENTRY',
    distance: 9.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_DIAMOND',
    to: 'MAIN_F1_J143_ENTRY',
    distance: 13.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_DIAMOND',
    to: 'MAIN_F1_J144_ENTRY',
    distance: 12.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_DIAMOND',
    to: 'MAIN_F1_J146_ENTRY',
    distance: 12.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_DIAMOND',
    to: 'MAIN_F1_J147_ENTRY',
    distance: 10.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_DIAMOND',
    to: 'MAIN_F1_J148_ENTRY',
    distance: 8.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_DIAMOND',
    to: 'MAIN_F1_J149_ENTRY',
    distance: 9.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F1_COR_DIAMOND',
    to: 'MAIN_F1_J150_ENTRY',
    distance: 13.0,
    type: 'door',
    accessible: true,
  },

  // =========================================================================
  // 8. MAIN BUILDING - SECOND FLOOR (Floor 2)
  // =========================================================================

  {
    from: 'MAIN_F2_LIFT_01',
    to: 'MAIN_F2_COR_NORTH',
    distance: 3.5,
    type: 'lift',
    accessible: true,
  },
  {
    from: 'MAIN_F2_COR_NORTH',
    to: 'MAIN_F2_J206_ENTRY',
    distance: 8.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F2_COR_NORTH',
    to: 'MAIN_F2_J203_ENTRY',
    distance: 26.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F2_J203_ENTRY',
    to: 'MAIN_F2_T_NIDHI',
    distance: 0.1,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F2_COR_NORTH',
    to: 'MAIN_F2_J202_ENTRY',
    distance: 37.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F2_COR_NORTH',
    to: 'MAIN_F2_J201_ENTRY',
    distance: 48.0,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F2_COR_NORTH',
    to: 'MAIN_F2_STAIRS_WEST',
    distance: 54.0,
    type: 'stairs',
    accessible: false,
  },

  {
    from: 'MAIN_F2_COR_NORTH',
    to: 'MAIN_F2_HOD_ECE_ENTRY',
    distance: 41.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F2_HOD_ECE_ENTRY',
    to: 'MAIN_F2_T_VANDANA',
    distance: 0.1,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F2_COR_NORTH',
    to: 'MAIN_F2_STAIRS_EAST',
    distance: 49.0,
    type: 'stairs',
    accessible: false,
  },

  // Project Wing
  {
    from: 'MAIN_F2_COR_NORTH',
    to: 'MAIN_F2_COR_PROJECT_WING',
    distance: 9.5,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_F2_COR_PROJECT_WING',
    to: 'MAIN_F2_J204_ENTRY',
    distance: 7.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F2_COR_PROJECT_WING',
    to: 'MAIN_F2_J205_ENTRY',
    distance: 16.5,
    type: 'door',
    accessible: true,
  },

  // Computer Wing
  {
    from: 'MAIN_F2_COR_NORTH',
    to: 'MAIN_F2_COR_COMP_WING',
    distance: 42.0,
    type: 'corridor',
    accessible: true,
  },
  {
    from: 'MAIN_F2_COR_COMP_WING',
    to: 'MAIN_F2_J208_ENTRY',
    distance: 7.5,
    type: 'door',
    accessible: true,
  },
  {
    from: 'MAIN_F2_COR_COMP_WING',
    to: 'MAIN_F2_J209_ENTRY',
    distance: 16.5,
    type: 'door',
    accessible: true,
  },

  // =========================================================================
  // 9. MAIN BUILDING VERTICAL CONNECTIONS
  // =========================================================================

  // Main Central Lift
  {
    from: 'MAIN_G_LIFT_01',
    to: 'MAIN_F1_LIFT_01',
    distance: 4.5,
    type: 'lift',
    accessible: true,
  },
  {
    from: 'MAIN_F1_LIFT_01',
    to: 'MAIN_F2_LIFT_01',
    distance: 4.5,
    type: 'lift',
    accessible: true,
  },

  // Main Central Stairs
  {
    from: 'MAIN_G_STAIRS_CENTRAL',
    to: 'MAIN_F1_STAIRS_CENTRAL',
    distance: 7.0,
    type: 'stairs',
    accessible: false,
  },

  // South Stairs
  {
    from: 'MAIN_G_STAIRS_SOUTH',
    to: 'MAIN_F1_STAIRS_SOUTH',
    distance: 7.0,
    type: 'stairs',
    accessible: false,
  },

  // North Stairs
  {
    from: 'MAIN_G_STAIRS_NORTH',
    to: 'MAIN_F1_STAIRS_NORTH',
    distance: 7.0,
    type: 'stairs',
    accessible: false,
  },
  {
    from: 'MAIN_F1_STAIRS_NORTH',
    to: 'MAIN_F2_STAIRS_EAST',
    distance: 7.0,
    type: 'stairs',
    accessible: false,
  },

  // =========================================================================
  // 10. INTER-BUILDING PEDESTRIAN CONNECTION
  // =========================================================================

  {
    from: 'AI_G_ENTRY_MAIN',
    to: 'CAMPUS_WALKWAY_AI_MAIN',
    distance: 60.0,
    type: 'external',
    accessible: true,
  },
  {
    from: 'CAMPUS_WALKWAY_AI_MAIN',
    to: 'MAIN_G_FOYER_ENTRY',
    distance: 55.0,
    type: 'external',
    accessible: true,
  },
];