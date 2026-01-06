import { useMemo } from 'react';
import * as yup from 'yup';
import type { SpaceZoneOperation } from './type';

// Time Range Schema
const timeRangeSchema = yup.object({
    from: yup.string().nullable().default(null),
    to: yup.string().nullable().default(null),
});

// Space Zone Operation Schema
const spaceZoneOperationSchema = yup.object({
    zoneCode: yup
        .string()
        .oneOf(['administration', 'meeting', 'lobby', 'corridor_wc', 'security', 'other'])
        .required('Zone code là bắt buộc'),
    weekday: timeRangeSchema.default({ from: null, to: null }),
    saturday: timeRangeSchema.default({ from: null, to: null }),
    sunday: timeRangeSchema.default({ from: null, to: null }),
    utilisationLevel: yup.string().nullable().default(null),
    averagePeople: yup.number().min(0).nullable().default(null),
    note: yup.string().nullable().default(null),
});

export function useGetOperatorBuildingSchema() {
    const schema = useMemo(() => {
        return yup.object({
            spaceZones: yup.array().of(spaceZoneOperationSchema).default([]),
        });
    }, []);

    return schema;
}

// Helper: Generate default space zone
export function generateDefaultSpaceZone(zoneCode: SpaceZoneOperation['zoneCode']): SpaceZoneOperation {
    return {
        zoneCode,
        weekday: { from: null, to: null },
        saturday: { from: null, to: null },
        sunday: { from: null, to: null },
        utilisationLevel: undefined,
        averagePeople: undefined,
        note: undefined,
    };
}
