import { useMemo } from 'react';
import * as yup from 'yup';

// Monthly Consumption Schema
const monthlyConsumptionSchema = yup.object({
    month: yup.number().min(1).max(12).required('Tháng là bắt buộc'),
    energyConsumption: yup.number().min(0, 'Điện tiêu thụ phải >= 0').required('Điện tiêu thụ là bắt buộc'),
});

// Electricity Consumption Schema (per year)
const electricityConsumptionSchema = yup.object({
    year: yup.number().min(2000).max(2100).required('Năm là bắt buộc'),
    dataSource: yup
        .number()
        .oneOf([1, 2], 'Nguồn dữ liệu phải là 1 (Hóa đơn) hoặc 2 (Đồng hồ đo)')
        .required('Nguồn dữ liệu là bắt buộc'),
    monthlyData: yup
        .array()
        .of(monthlyConsumptionSchema)
        .length(12, 'Phải có đủ 12 tháng')
        .required('Dữ liệu hàng tháng là bắt buộc'),
});

// Solar Schema
const solarSchema = yup.object({
    isSelected: yup.boolean().default(false),
    installedArea: yup.number().min(0).nullable(),
    installedCapacity: yup.number().min(0).nullable(),
    averageEfficiency: yup.number().min(0).max(100).nullable(),
    averageSunHoursPerYear: yup.number().min(0).nullable(),
    systemLosses: yup.number().min(0).max(100).nullable(),
});

// Wind Schema
const windSchema = yup.object({
    isSelected: yup.boolean().default(false),
    turbineCount: yup.number().min(0).nullable(),
    turbineCapacity: yup.number().min(0).nullable(),
    averageWindSpeed: yup.number().min(0).nullable(),
    operatingHoursPerYear: yup.number().min(0).nullable(),
    capacityFactor: yup.number().min(0).max(100).nullable(),
});

// Geothermal Schema
const geothermalSchema = yup.object({
    isSelected: yup.boolean().default(false),
    installedCapacity: yup.number().min(0).nullable(),
    sourceTemperature: yup.number().nullable(),
    operatingHoursPerYear: yup.number().min(0).nullable(),
    systemCOP: yup.number().min(0).nullable(),
});

// Renewable Production Schema (per year)
const renewableProductionSchema = yup.object({
    year: yup.number().min(2000).max(2100).required('Năm là bắt buộc'),
    solar: solarSchema.default({ isSelected: false }),
    wind: windSchema.default({ isSelected: false }),
    geothermal: geothermalSchema.default({ isSelected: false }),
});

export function useGetMonthlyElectricitySchema() {
    const schema = useMemo(() => {
        return yup.object({
            consumedElectricity: yup
                .array()
                .of(electricityConsumptionSchema)
                .min(1, 'Phải có ít nhất 1 năm dữ liệu')
                .required('Dữ liệu điện tiêu thụ là bắt buộc'),
            producedElectricity: yup.array().of(renewableProductionSchema).default([]),
        });
    }, []);

    return schema;
}

// Helper: Generate default monthly data
export function generateDefaultMonthlyData(): { month: number; energyConsumption: number }[] {
    return Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        energyConsumption: 0,
    }));
}

// Helper: Generate default year consumption
export function generateDefaultYearConsumption(year: number): {
    year: number;
    dataSource: 1 | 2;
    monthlyData: { month: number; energyConsumption: number }[];
} {
    return {
        year,
        dataSource: 1,
        monthlyData: generateDefaultMonthlyData(),
    };
}

// Helper: Generate default renewable production
export function generateDefaultRenewableProduction(year: number) {
    return {
        year,
        solar: { isSelected: false },
        wind: { isSelected: false },
        geothermal: { isSelected: false },
    };
}
