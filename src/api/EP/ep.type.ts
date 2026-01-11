// Inputs dùng để tính toán EP
export interface EPInputs {
    GFA: number; // Gross Floor Area - Tổng diện tích sàn
    CPA: number; // Car Park Area - Diện tích bãi đỗ xe ngoài trời
    DCA: number; // Data Center Area - Diện tích trung tâm dữ liệu
    GLA: number; // Gross Lettable Area - Tổng diện tích cho thuê
    VA: number; // Vacant Area - Diện tích trống
    EC: number; // Energy Consumption - Năng lượng tiêu thụ (kWh)
    RE: number; // Renewable Energy - Năng lượng tái tạo (kWh)
}

// Các giá trị đã chuẩn hóa
export interface EPNormalised {
    NLA: number; // Net Lettable Area = GLA - VA
    adjustedArea: number; // Diện tích đã điều chỉnh = GFA - CPA - DCA
    netEnergy: number; // Năng lượng ròng = EC - RE
    occupancyRate: number; // Tỷ lệ sử dụng = (GLA - VA) / GLA
}

// Schema chính của Energy Performance
export interface EnergyPerformance {
    _id?: string;
    buildingId: string;
    year: number;
    ep: number; // Chỉ số hiệu suất năng lượng (kWh/m²/năm)
    buildingType: 1 | 2; // 1 = Công sở, 2 = Thương mại
    buildingName: string;

    inputs: EPInputs;
    normalised: EPNormalised;

    ruleVersion: string;
    computedAt: Date;

    createdAt?: Date;
    updatedAt?: Date;
}

// Response khi lấy EP theo buildingId
export interface EPResponse {
    success: boolean;
    data: EnergyPerformance | EnergyPerformance[];
    message?: string;
}

// Request tính toán EP
export interface EPCalculationRequest {
    buildingId: string;
    year?: number; // Nếu không có thì tính tất cả các năm
}
