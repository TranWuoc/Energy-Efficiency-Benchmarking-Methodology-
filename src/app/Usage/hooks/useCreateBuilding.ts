import { useMutation } from '@tanstack/react-query';
import { createBuilding } from '../../../api/buildings/buildings.api';

export const useCreateBuilding = () => {
    return useMutation({
        mutationFn: createBuilding,
    });
};
