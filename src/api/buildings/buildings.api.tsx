import http from '../../utils/http';
import type { Building, BuildingsResponse } from './building.type';

export const getBuildings = async () => {
    const response = await http.get<BuildingsResponse>('/buildings');
    return response.data;
};

export const getDetailBuilding = async (buildingId: string) => {
    const res = await http.get<Building>(`/buildings/${buildingId}`);
    return res.data;
};

export const createBuilding = async (data: Omit<Building, 'buildingId'>) => {
    const response = await http.post<Building>('/buildings', data);
    const newBuilding = response.data;

    return {
        building: newBuilding,
        buildingId: newBuilding.buildingId,
    };
};

export const deleteBuidling = async (buildingId: string) => {
    const response = await http.delete(`/buildings/${buildingId}`);
    return response.data;
};
