// building.type.tsx

// ===== Common =====
export interface TimeRange {
    from: string | null;
    to: string | null;
}

export interface MonthlyConsumption {
    month: number; // 1-12
    energyConsumption: number; // kWh
}

export type DataSource = 1 | 2; // 1 = Hoá đơn, 2 = Công tơ / Báo cáo hệ thống

export interface ElectricityConsumption {
    year: number;
    dataSource: DataSource;
    monthlyData: MonthlyConsumption[];
}

// ===== System Zones (BMS schedule per system zone) =====
export interface SystemZoneOperation {
    zoneCode: string;
    hvac?: TimeRange;
    lighting?: TimeRange;
    waterHeating?: TimeRange;
    camera?: TimeRange;
}

// ===== Operation Zones (NEW model) =====
export type UtilisationLevel = 'Thấp' | 'Trung bình' | 'Cao';

export type GovernmentZoneCode =
    | 'admin_work'
    | 'hall_meeting'
    | 'lobby_reception'
    | 'corridor_wc'
    | 'security'
    | 'indoor_parking';

export type CommercialZoneCode =
    | 'rental_office'
    | 'hall_meeting'
    | 'lobby_reception'
    | 'corridor_wc'
    | 'security'
    | 'canteen_fnb'
    | 'commercial_area'
    | 'indoor_parking';

export interface BaseOperationZone {
    zoneCode: string;
    weekday?: TimeRange;
    saturday?: TimeRange;
    sunday?: TimeRange;
    utilisationLevel?: UtilisationLevel;
    averagePeople?: number;
    note?: string;
    isRented?: boolean;
    rentableArea?: number | null;
}

export interface GovernmentOperationZone extends BaseOperationZone {
    zoneCode: GovernmentZoneCode;
    isRented: false;
}

export interface CommercialOperationZone extends BaseOperationZone {
    zoneCode: CommercialZoneCode;
    isRented: boolean;
}

export interface BuildingOperation {
    governmentZones?: GovernmentOperationZone[];
    commercialZones?: CommercialOperationZone[];
}

// ===== Renewable =====
export interface SolarEnergy {
    isSelected: boolean;
    installedArea?: number; // m²
    installedCapacity?: number; // (theo model hiện tại BE của bạn)
    averageEfficiency?: number; // %
    averageSunHoursPerYear?: number; // hours/year
    systemLosses?: number; // %
}

export interface WindEnergy {
    isSelected: boolean;
    turbineCount?: number;
    turbineCapacity?: number;
    averageWindSpeed?: number; // m/s
    operatingHoursPerYear?: number; // hours/year
    capacityFactor?: number; // %
}

export interface GeothermalEnergy {
    isSelected: boolean;
    installedCapacity?: number;
    sourceTemperature?: number; // °C
    operatingHoursPerYear?: number; // hours/year
    systemCOP?: number;
}

export interface RenewableProduction {
    year: number;
    solar?: SolarEnergy;
    wind?: WindEnergy;
    geothermal?: GeothermalEnergy;
}

// ===== General Info =====
// BuildingType
export const BuildingType = {
    GOVERNMENT: 1,
    COMMERCIAL: 2,
} as const;

export type BuildingType = (typeof BuildingType)[keyof typeof BuildingType];

export interface BuildingGeneralInfo {
    name: string;
    address: string;
    owner?: string;

    buildingType: BuildingType;
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

    // System zones schedule
    governmentSystemZones?: SystemZoneOperation[];
    commercialOfficeZones?: SystemZoneOperation[];

    // Control & Climate
    controlSystemType?: string;
    climateZone?: string;

    // Areas (m²)
    totalFloorArea?: number;
    aboveGroundFloorArea?: number;
    basementFloorArea?: number;

    outdoorParkingArea?: number;
    indoorParkingArea?: number;

    dataCenterArea?: number;

    nonRentableArea?: number;
    totalRentableArea?: number;
    vacantArea?: number;
}

// ===== Main Building =====
export interface Building {
    _id: string;
    buildingId: string;

    generalInfo: BuildingGeneralInfo;
    operation?: BuildingOperation;

    consumedElectricity?: ElectricityConsumption[];
    producedElectricity?: RenewableProduction[];

    createdAt?: string; // ISO
    updatedAt?: string; // ISO
    __v?: number;
}

export interface BuildingsResponse {
    total: number;
    data: Building[];
}

// ===== Payloads (Create / Update) =====
export interface CreateBuildingPayload {
    generalInfo: BuildingGeneralInfo;
    operation?: BuildingOperation;
    consumedElectricity?: ElectricityConsumption[];
    producedElectricity?: RenewableProduction[];
}

export type UpdateBuildingPayload = Partial<CreateBuildingPayload>;
