import { useMemo } from 'react';
import * as yup from 'yup';

export function useGetSaveGeneralInformationSchema() {
    const schema = useMemo(() => {
        return yup.object({
            name: yup.string().required('Vui điền tên toà nhà'),
            direction: yup.string().required('Vui lòng điền địa chỉ'),
            owner: yup.string().required('Vui lòng điền chủ sở hữu'),
            officeStyle: yup.string().required('Vui lòng chọn loại toà nhà'),
            yearOperator: yup.number().typeError('Phải là số').required('Vui lòng nhập năm đưa vào vận hành'),
            HVACSystem: yup.string().required('Vui chọn hệ thống HVAC'),
            lightingSystem: yup.string().required('Vui chọn hệ thống chiếu sáng'),
            hotWaterSystem: yup.string().required('Vui chọn hệ thống cấp nước nóng'),
            otherSystem: yup.string().required('Vui nhập hệ thống khác'),
            temperatureSetup: yup.string().required('Vui nhập thông số nhiệt độ'),
            humiditySetup: yup.string().required(),
            lightingSetup: yup.string().required('Vui nhập thông số chiếu sáng'),
            otherSetup: yup.string().required('Vui nhập thông số khác'),
            buildingControlType: yup.string().required(),
            floorCount: yup.number().typeError('Phải là số').required('Vui lòng nhập thông số'),
            aboveGroundCount: yup.number().typeError('Phải là số').required('Vui lòng nhập thông số'),
            basementCount: yup.number().typeError('Phải là số').required('Vui lòng nhập thông số'),
            totalArea: yup.number().typeError('Phải là số').required('Vui lòng nhập thông số'),
            nonRentalCarArea: yup.number().typeError('Phải là số').required('Vui lòng nhập thông số'),
            rentalArea: yup.number().typeError('Phải là số').required('Vui lòng nhập thông số'),
            leaseArea: yup.number().typeError('Phải là số').required('Vui lòng nhập thông số'),
            vacantArea: yup.number().typeError('Phải là số').required('Vui lòng nhập thông số'),
        });
    }, []);

    return schema;
}
