import http from '../utils/http';
import type { Building } from './building.type';

export const getBuildings = async () => {
    const response = await http.get<Building>('/buildings');
    return response.data;
};
