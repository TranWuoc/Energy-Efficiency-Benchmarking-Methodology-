import type { TimeRange } from '../../../api/building.type';

// Space Zone Operation (matching Backend BuildingOperationSchema)
export interface SpaceZoneOperation {
    zoneCode: 'administration' | 'meeting' | 'lobby' | 'corridor_wc' | 'security' | 'other';
    weekday: TimeRange;
    saturday: TimeRange;
    sunday: TimeRange;
    utilisationLevel?: string | null;
    averagePeople?: number | null;
    note?: string | null;
}

// Form Type
export interface FormOperatorBuilding {
    spaceZones: SpaceZoneOperation[];
}

// Zone options mapping
export const SPACE_ZONE_OPTIONS = [
    { label: 'Khu vực làm việc hành chính', value: 'administration' as const },
    { label: 'Hội trường/ phòng họp lớn', value: 'meeting' as const },
    { label: 'Sảnh chính & lễ tân', value: 'lobby' as const },
    { label: 'Hành lang, cầu thang, khu vệ sinh', value: 'corridor_wc' as const },
    { label: 'Khu bảo vệ/ an ninh', value: 'security' as const },
    { label: 'Khu vực khác', value: 'other' as const },
];

// Helper: Get label by zoneCode
export function getZoneLabelByCode(zoneCode: string): string {
    const zone = SPACE_ZONE_OPTIONS.find((z) => z.value === zoneCode);
    return zone?.label || zoneCode;
}
