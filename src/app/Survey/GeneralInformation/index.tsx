import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../../components/InputField';
import CommercialOffice from '../../../components/StyleOffiec/CommercialOffice';
import GovernmentOffice from '../../../components/StyleOffiec/Government';
import DropdownItems from '../../../components/DropdownComponenets/DropdownItems';
import type { FormSaveGeneralInformation } from './type';
import { useGetSaveGeneralInformationSchema } from './useSchema';

function GeneralInformation() {
    const schema = useGetSaveGeneralInformationSchema();
    const methods = useForm<FormSaveGeneralInformation>({
        resolver: yupResolver(Object(schema) as yup.ObjectSchema<FormSaveGeneralInformation>),
    });

    const onSubmit = async (data: FormSaveGeneralInformation) => {
        console.log(data);
    };

    const buildingType = methods.watch('buildingType');
    console.log('🚀 ~ GeneralInformation ~ buildingType:', buildingType);

    return (
        <div className="mx-20 my-[20px] rounded-t-[50px] bg-[#F1ECE5] px-[50px] py-[20px]">
            <div className="flex flex-col items-center">
                <span className="text-3xl font-bold uppercase"> I. Thông tin chung </span>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-[20px]">
                        <div className="mt-[20px] flex flex-wrap gap-[20px]">
                            <InputField name="name" placeholder="1. Tên toà nhà" />
                            <InputField name="address" placeholder="2. Địa chỉ toà nhà" />
                            <InputField name="owner" placeholder="3. Chủ sở hữu" />
                            <InputField
                                name="buildingType"
                                placeholder="4. Loại tòa nhà/ chức năng tòa nhà"
                                component={DropdownItems}
                            />
                            <InputField name="commissioningYear" placeholder="5. Năm đưa vào vận hành" />
                        </div>
                        <div>
                            <span> 6. Hệ thống kỹ thuật </span>
                            <div className="mt-[20px] flex flex-wrap gap-[20px]">
                                <InputField name="hasHVAC" placeholder="Hệ thống HVAC" />
                                <InputField name="hasLighting" placeholder="Hệ thống chiếu sáng" />
                                <InputField name="hasWaterHeating" placeholder="Hệ thống cấp nước nóng" />
                                <InputField name="otherSystems" placeholder="Hệ thống khác" />
                            </div>
                        </div>
                        <div>
                            <span> 7. Thông số cài đặt trong toà nhà </span>
                            <div className="mt-[20px] flex flex-wrap gap-[20px]">
                                <InputField name="setpointTemperature" placeholder="Nhiệt độ (°C)" />
                                <InputField name="setpointHumidity" placeholder="Độ ẩm (%)" />
                                <InputField name="setpointLightingLevel" placeholder="Chiếu sáng (lx)" />
                            </div>
                        </div>
                        <div>
                            <span> 8. Giờ vận hành các hệ thống thiết bị tại các khu vực không gian </span>
                            <div className="mt-[20px]">
                                {buildingType === 1 && <GovernmentOffice />}
                                {buildingType === 2 && <CommercialOffice />}
                                {buildingType === undefined && (
                                    <p className="text-red-500"> * Vui lòng chọn loại văn phòng </p>
                                )}
                            </div>
                        </div>
                        <InputField name="controlSystemType" placeholder="9. Loại kiểm soát hệ thống toà nhà" />
                        <div>
                            <span> 10. Tổng diện tích sàn</span>
                            <div className="mt-[20px] flex flex-col">
                                <div className="flex items-center gap-5">
                                    <InputField
                                        name="totalFloorArea"
                                        placeholder="Tổng diện tích sàn (m²)"
                                        className="!w-[150px]"
                                    />
                                    <span> Gồm: </span>
                                    <InputField
                                        name="aboveGroundFloorArea"
                                        placeholder="Diện tích trên mặt đất (m²)"
                                        className="!w-[150px]"
                                    />
                                    <InputField
                                        name="basementFloorArea"
                                        placeholder="Diện tích tầng hầm (m²)"
                                        className="!w-[150px]"
                                    />
                                </div>
                                <div className="mt-[10px] flex flex-col gap-5">
                                    <div className="flex items-center gap-5">
                                        <span>
                                            Tổng diện tích sàn xây dựng không bao gồm diện tích khu đỗ xe bên ngoài toà
                                            nhà (nếu có) :
                                        </span>
                                        <InputField name="outdoorParkingArea" placeholder="m²" className="!w-[100px]" />
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <span>Diện tích không cho thuê (m²):</span>
                                        <InputField name="nonRentableArea" placeholder="m²" className="!w-[100px]" />
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <span> Tổng diện tích cho thuê (m²):</span>
                                        <InputField name="totalRentableArea" placeholder="m²" className="!w-[100px]" />
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <span>Diện tích khu vực người thuê không có người thuê (còn trống):</span>
                                        <InputField name="vacantArea" placeholder="m²" className="!w-[100px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

export default GeneralInformation;
