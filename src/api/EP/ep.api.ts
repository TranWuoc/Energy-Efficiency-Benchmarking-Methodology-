import http from '../../utils/http';
import type { EnergyPerformance } from './ep.type';

export const getAllEPBuilding = async () => {
    const response = await http.get<EnergyPerformance>('/energy-performances');
    return response.data;
};

export const getEPByBuildingId = async (buildingId: string) => {
    const response = await http.get<EnergyPerformance>(`/energy-performances/${buildingId}`);
    return response.data;
};
