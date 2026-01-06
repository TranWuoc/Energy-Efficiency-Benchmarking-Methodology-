import type { TimeRange } from '../../../api/building.type';

// Government Office Zone
export interface GovernmentSystemZone {
    zoneCode: 'administration' | 'meeting' | 'lobby' | 'corridor_wc' | 'security';
    hvac?: TimeRange;
    lighting?: TimeRange;
    waterHeating?: TimeRange;
    camera?: TimeRange;
}

// Commercial Office Zone
export interface CommercialOfficeZone {
    zoneCode:
        | 'rental_office'
        | 'meeting'
        | 'lobby'
        | 'corridor_wc'
        | 'security'
        | 'canteen_fnb'
        | 'commercial_area'
        | 'indoor_parking';
    hvac?: TimeRange;
    lighting?: TimeRange;
    waterHeating?: TimeRange;
    camera?: TimeRange;
}

// Form Type (matching Backend BuildingGeneralSchema)
export interface FormSaveGeneralInformation {
    // Thông tin cơ bản
    name: string;
    address: string;
    owner?: string | null;
    buildingType: 1 | 2; // 1 = Government, 2 = Commercial
    commissioningYear?: number | null;

    // Hệ thống kỹ thuật
    hasHVAC?: boolean;
    hasLighting?: boolean;
    hasWaterHeating?: boolean;
    otherSystems?: string | null;

    // Thông số cài đặt
    setpointTemperature?: number | null;
    setpointHumidity?: number | null;
    setpointLightingLevel?: number | null;

    // Zones theo loại tòa nhà
    governmentSystemZones?: GovernmentSystemZone[];
    commercialOfficeZones?: CommercialOfficeZone[];

    // Kiểm soát & Khí hậu
    controlSystemType?: string | null;
    climateZone?: string | null;

    // Diện tích (m²)
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
