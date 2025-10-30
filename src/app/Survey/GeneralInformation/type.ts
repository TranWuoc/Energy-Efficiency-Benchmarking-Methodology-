export interface FormSaveGeneralInformation {
    name: string;
    direction: string;
    owner: string;
    officeStyle: string;
    yearOperator: number;
    HVACSystem: string;
    lightingSystem: string;
    hotWaterSystem: string;
    otherSystem: string;
    temperatureSetup: string;
    humiditySetup: string;
    lightingSetup: string;
    otherSetup: string;
    buildingControlType: string;
    floorCount: number;
    aboveGroundCount: number;
    basementCount: number;
    totalArea: number;
    nonRentalCarArea: number;
    rentalArea: number;
    leaseArea: number;
    vacantArea: number;
}
