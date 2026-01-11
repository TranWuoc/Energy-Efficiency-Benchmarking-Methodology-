import { useMutation } from '@tanstack/react-query';
import http from '../../utils/http';
import type { Building } from './building.type';

export const getBuildings = async () => {
    const response = await http.get<Building>('/buildings');
    return response.data;
};

export const useCreateBuilding = () => {
    return useMutation({
        mutationFn: async (data: Omit<Building, 'buildingId'>) => {
            const response = await http.post<Building>('/buildings', data);
            const newBuilding = response.data;

            return {
                building: newBuilding,
                buildingId: newBuilding.buildingId,
            };
        },
    });
};
