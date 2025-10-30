export interface EnergyConsumption {
    billMonth: MonthValue[];
    meterMonth: MonthValue[];
    consumptionMoth: MonthValue[];
}

export type MonthValue = string | number | null;
