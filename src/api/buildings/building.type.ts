// TimeRange
interface TimeRange {
    from: string | null;
    to: string | null;
}

// Monthly Consumption (CẤU TRÚC MỚI)
interface MonthlyConsumption {
    month: number; // 1-12
    energyConsumption: number;
}

// Electricity Consumption theo năm (CẤU TRÚC MỚI)
interface ElectricityConsumption {
    year: number;
    dataSource: 1 | 2;
    monthlyData: MonthlyConsumption[]; // 12 items
}

// Zone Operation
interface SystemZoneOperation {
    zoneCode: string;
    hvac?: TimeRange;
    lighting?: TimeRange;
    waterHeating?: TimeRange;
    camera?: TimeRange;
}

interface SpaceZoneOperation {
    zoneCode: 'administration' | 'meeting' | 'lobby' | 'corridor_wc' | 'security' | 'other';
    weekday?: TimeRange;
    saturday?: TimeRange;
    sunday?: TimeRange;
    utilisationLevel?: string;
    averagePeople?: number;
    note?: string;
}

// General Info
interface BuildingGeneralInfo {
    name: string;
    address: string;
    owner?: string;
    buildingType: 1 | 2; // 1 = Government, 2 = Commercial
    commissioningYear?: number;

    // Systems
    hasHVAC?: boolean;
    hasLighting?: boolean;
    hasWaterHeating?: boolean;
    otherSystems?: string;

    // Setpoints
    setpointTemperature?: number;
    setpointHumidity?: number;
    setpointLightingLevel?: number;

    // Zones
    governmentSystemZones?: SystemZoneOperation[];
    commercialOfficeZones?: SystemZoneOperation[];

    // Control & Climate
    controlSystemType?: string;
    climateZone?: string;

    // Areas (m²)
    totalFloorArea: number;
    aboveGroundFloorArea: number;
    basementFloorArea: number;
    outdoorParkingArea?: number;
    indoorParkingArea?: number;
    dataCenterArea?: number;
    nonRentableArea?: number;
    totalRentableArea?: number;
    vacantArea?: number;
}

// Operation
interface BuildingOperation {
    spaceZones?: SpaceZoneOperation[];
}

// Renewable Energy
interface SolarEnergy {
    isSelected: boolean;
    installedArea?: number;
    installedCapacity?: number;
    averageEfficiency?: number;
    averageSunHoursPerYear?: number;
    systemLosses?: number;
}

interface WindEnergy {
    isSelected: boolean;
    turbineCount?: number;
    turbineCapacity?: number;
    averageWindSpeed?: number;
    operatingHoursPerYear?: number;
    capacityFactor?: number;
}

interface GeothermalEnergy {
    isSelected: boolean;
    installedCapacity?: number;
    sourceTemperature?: number;
    operatingHoursPerYear?: number;
    systemCOP?: number;
}

interface RenewableProduction {
    year: number;
    solar?: SolarEnergy;
    wind?: WindEnergy;
    geothermal?: GeothermalEnergy;
}

// Main Building Type
interface Building {
    buildingId: string;
    generalInfo: BuildingGeneralInfo;
    operation?: BuildingOperation;
    consumedElectricity: ElectricityConsumption[];
    producedElectricity?: RenewableProduction[];
    createdAt?: string;
    updatedAt?: string;
}

// Create/Update payload
interface CreateBuildingPayload {
    generalInfo: BuildingGeneralInfo;
    operation?: BuildingOperation;
    consumedElectricity: ElectricityConsumption[];
    producedElectricity?: RenewableProduction[];
}

type UpdateBuildingPayload = Partial<CreateBuildingPayload>;

export type {
    Building,
    CreateBuildingPayload,
    UpdateBuildingPayload,
    BuildingGeneralInfo,
    BuildingOperation,
    ElectricityConsumption,
    MonthlyConsumption,
    RenewableProduction,
    TimeRange,
    SystemZoneOperation,
    SpaceZoneOperation,
};
