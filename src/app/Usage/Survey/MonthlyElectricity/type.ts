// Monthly Consumption
export interface MonthlyConsumption {
    month: number; // 1-12
    energyConsumption: number; // kWh
}

// Electricity Consumption per Year
export interface ElectricityConsumption {
    year: number;
    dataSource: 1 | 2; // 1 = Hóa đơn điện, 2 = Đồng hồ đo
    monthlyData: MonthlyConsumption[]; // 12 items
}

// Solar Energy
export interface SolarEnergy {
    isSelected: boolean;
    installedArea?: number; // m²
    installedCapacity?: number; // kWp
    averageEfficiency?: number; // %
    averageSunHoursPerYear?: number; // hours
    systemLosses?: number; // %
}

// Wind Energy
export interface WindEnergy {
    isSelected: boolean;
    turbineCount?: number;
    turbineCapacity?: number; // kW
    averageWindSpeed?: number; // m/s
    operatingHoursPerYear?: number; // hours
    capacityFactor?: number; // %
}

// Geothermal Energy
export interface GeothermalEnergy {
    isSelected: boolean;
    installedCapacity?: number; // kW
    sourceTemperature?: number; // °C
    operatingHoursPerYear?: number; // hours
    systemCOP?: number; // Coefficient of Performance
}

// Renewable Production per Year
export interface RenewableProduction {
    year: number;
    solar?: SolarEnergy;
    wind?: WindEnergy;
    geothermal?: GeothermalEnergy;
}

// Form Type
export interface FormMonthlyElectricity {
    consumedElectricity: ElectricityConsumption[];
    producedElectricity: RenewableProduction[];
}

export const ENERGY_SOURCE_OPTIONS = [
    { label: '☀️ Điện mặt trời (Solar PV)', value: 'solar' as const },
    { label: '💨 Điện gió (Wind)', value: 'wind' as const },
    { label: '🌋 Địa nhiệt (Geothermal)', value: 'geothermal' as const },
];

export type EnergySourceType = 'solar' | 'wind' | 'geothermal';
