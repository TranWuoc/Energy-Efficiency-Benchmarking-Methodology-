import { useMemo } from 'react';
import * as yup from 'yup';

// Time Range Schema
const timeRangeSchema = yup.object({
    from: yup.string().nullable().default(null),
    to: yup.string().nullable().default(null),
});

// Government Zone Schema
const governmentZoneSchema = yup.object({
    zoneCode: yup
        .string()
        .oneOf(['administration', 'meeting', 'lobby', 'corridor_wc', 'security'])
        .required('Zone code là bắt buộc'),
    hvac: timeRangeSchema.default({ from: null, to: null }),
    lighting: timeRangeSchema.default({ from: null, to: null }),
    waterHeating: timeRangeSchema.default({ from: null, to: null }),
    camera: timeRangeSchema.default({ from: null, to: null }),
});

// Commercial Zone Schema
const commercialZoneSchema = yup.object({
    zoneCode: yup
        .string()
        .oneOf([
            'rental_office',
            'meeting',
            'lobby',
            'corridor_wc',
            'security',
            'canteen_fnb',
            'commercial_area',
            'indoor_parking',
        ])
        .required('Zone code là bắt buộc'),
    hvac: timeRangeSchema.default({ from: null, to: null }),
    lighting: timeRangeSchema.default({ from: null, to: null }),
    waterHeating: timeRangeSchema.default({ from: null, to: null }),
    camera: timeRangeSchema.default({ from: null, to: null }),
});

// Helper để transform giá trị rỗng thành null
const nullableNumber = yup
    .number()
    .transform((value, originalValue) => {
        // Nếu giá trị gốc là chuỗi rỗng hoặc chỉ có khoảng trắng, trả về null
        if (originalValue === '' || (typeof originalValue === 'string' && originalValue.trim() === '')) {
            return null;
        }
        return value;
    })
    .nullable();

export function useGetSaveGeneralInformationSchema() {
    const schema = useMemo(() => {
        return yup.object({
            // Thông tin cơ bản
            name: yup.string().required('Tên toà nhà là bắt buộc'),
            address: yup.string().required('Địa chỉ là bắt buộc'),
            owner: yup.string().nullable().default(null),
            buildingType: yup
                .number()
                .oneOf([1, 2], 'Loại tòa nhà phải là 1 (Công sở) hoặc 2 (Thương mại)')
                .required('Loại tòa nhà là bắt buộc'),
            commissioningYear: nullableNumber.min(1900, 'Năm phải >= 1900').max(3000, 'Năm phải <= 3000').default(null),

            // Hệ thống kỹ thuật
            hasHVAC: yup.boolean().default(false),
            hasLighting: yup.boolean().default(false),
            hasWaterHeating: yup.boolean().default(false),
            otherSystems: yup.string().nullable().default(null),

            // Thông số cài đặt
            setpointTemperature: nullableNumber
                .min(20, 'Nhiệt độ phải >= 20°C')
                .max(30, 'Nhiệt độ phải <= 30°C')
                .default(null),
            setpointHumidity: nullableNumber.min(0, 'Độ ẩm phải >= 0%').max(100, 'Độ ẩm phải <= 100%').default(null),
            setpointLightingLevel: nullableNumber.min(0, 'Mức chiếu sáng phải >= 0 lx').default(null),

            // Zones
            governmentSystemZones: yup.array().of(governmentZoneSchema).default([]),
            commercialOfficeZones: yup.array().of(commercialZoneSchema).default([]),

            // Kiểm soát & Khí hậu
            controlSystemType: yup.string().nullable().default(null),
            climateZone: yup.string().nullable().default(null),

            // Diện tích (m²)
            totalFloorArea: nullableNumber.min(0, 'Diện tích phải >= 0').required('Tổng diện tích sàn là bắt buộc'),
            aboveGroundFloorArea: nullableNumber
                .min(0, 'Diện tích phải >= 0')
                .required('Diện tích trên mặt đất là bắt buộc'),
            basementFloorArea: nullableNumber.min(0, 'Diện tích phải >= 0').required('Diện tích tầng hầm là bắt buộc'),
            outdoorParkingArea: nullableNumber.min(0).default(0),
            indoorParkingArea: nullableNumber.min(0).default(0),
            dataCenterArea: nullableNumber.min(0).default(0),
            nonRentableArea: nullableNumber.min(0).default(0),
            totalRentableArea: nullableNumber.min(0).default(0),
            vacantArea: nullableNumber.min(0).default(0),
        });
    }, []);

    return schema;
}
